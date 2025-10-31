
#include <WiFi.h>
#include <HTTPClient.h>
#include <WiFiClientSecure.h>
#include <ArduinoJson.h>
#include <Wire.h>
#include <Adafruit_BME280.h>
#include <TFT_eSPI.h>

// Definir color gris para TFT_eSPI si no existe
#ifndef TFT_GRAY
#define TFT_GRAY 0x8410
#endif

// Configuración WiFi
const char* ssid = "HUAWEI-2.4G-TnR6";
const char* password = "E9273vBr";

// URL del servidor (cambia por tu IP local o dominio)
const char* serverURL = "https://bme32home.vercel.app/api/sensor-data";

// Configuración BME280
Adafruit_BME280 bme;
bool bmeFound = false;

// Configuración pantalla CYD
TFT_eSPI tft = TFT_eSPI();

// Variables para datos del sensor
float temperature = 0.0;
float humidity = 0.0;
float pressure = 0.0;

// Timing variables
unsigned long lastSensorRead = 0;
unsigned long lastServerSend = 0;
unsigned long lastDisplayUpdate = 0;
const unsigned long SENSOR_INTERVAL = 2000;    // Leer sensor cada 2 segundos
const unsigned long SERVER_INTERVAL = 30000;   // Enviar al servidor cada 30 segundos
const unsigned long DISPLAY_INTERVAL = 1000;   // Actualizar pantalla cada 1 segundo

// Estado de conexión
bool wifiConnected = false;
bool serverResponding = true;
int failedRequests = 0;

void setup() {
  Serial.begin(115200);
  
  // Inicializar pantalla
  Serial.println("Inicializando pantalla TFT...");
  tft.init();
  Serial.println("TFT inicializada");
  // Encender backlight si está definido en User_Setup.h
#ifdef TFT_BL
  pinMode(TFT_BL, OUTPUT);
  digitalWrite(TFT_BL, HIGH);
  Serial.println("Backlight activado (TFT_BL HIGH)");
#else
  Serial.println("Backlight: TFT_BL no definido en User_Setup.h");
#endif
  tft.setRotation(1); // Landscape
  tft.fillScreen(TFT_BLACK);
  tft.setTextColor(TFT_WHITE, TFT_BLACK);
  
  // Mostrar mensaje de inicio
  showStartupScreen();
  
  // Inicializar BME280: probar 0x76 y 0x77
  Serial.println("Inicializando BME280 (probando 0x76)...");
  if (bme.begin(0x76)) {
    bmeFound = true;
    Serial.println("BME280 inicializado en 0x76");
  } else {
    Serial.println("No detectado en 0x76, probando 0x77...");
    if (bme.begin(0x77)) {
      bmeFound = true;
      Serial.println("BME280 inicializado en 0x77");
    } else {
      Serial.println("No se pudo encontrar el sensor BME280 en 0x76 ni 0x77");
      showError("BME280 No Encontrado");
      // Ejecutar escáner I2C para ayudar al diagnóstico
      scanI2C();
      delay(3000);
    }
  }
  
  // Conectar a WiFi
  connectWiFi();
  
  // Configurar protocolos de fuerza de BME280
  if (bmeFound) {
    bme.setSampling(Adafruit_BME280::MODE_FORCED,
                    Adafruit_BME280::SAMPLING_X1, // temperature
                    Adafruit_BME280::SAMPLING_X1, // pressure
                    Adafruit_BME280::SAMPLING_X1, // humidity
                    Adafruit_BME280::FILTER_OFF);
  }
}

void loop() {
  unsigned long currentTime = millis();
  
  // Verificar conexión WiFi
  if (WiFi.status() != WL_CONNECTED) {
    wifiConnected = false;
    reconnectWiFi();
  } else {
    wifiConnected = true;
  }
  
  // Leer datos del sensor
  if (currentTime - lastSensorRead >= SENSOR_INTERVAL && bmeFound) {
    readSensorData();
    lastSensorRead = currentTime;
  }
  
  // Enviar datos al servidor
  if (currentTime - lastServerSend >= SERVER_INTERVAL && wifiConnected) {
    sendDataToServer();
    lastServerSend = currentTime;
  }
  
  // Actualizar pantalla
  if (currentTime - lastDisplayUpdate >= DISPLAY_INTERVAL) {
    updateDisplay();
    lastDisplayUpdate = currentTime;
  }
  
  delay(100); // Pequeña pausa para no saturar el procesador
}

void showStartupScreen() {
  tft.fillScreen(TFT_BLACK);
  tft.setTextSize(2);
  tft.setTextColor(TFT_CYAN);
  tft.drawCentreString("BME280 Monitor", 240, 50, 2);
  tft.setTextSize(1);
  tft.setTextColor(TFT_WHITE);
  tft.drawCentreString("ESP32-2432S028R", 240, 80, 2);
  tft.drawCentreString("Iniciando...", 240, 120, 2);
  delay(2000);
}

void showError(String message) {
  tft.fillScreen(TFT_RED);
  tft.setTextColor(TFT_WHITE);
  tft.setTextSize(2);
  tft.drawCentreString("ERROR", 240, 100, 2);
  tft.setTextSize(1);
  tft.drawCentreString(message, 240, 140, 2);
}

void connectWiFi() {
  tft.fillScreen(TFT_BLACK);
  tft.setTextColor(TFT_YELLOW);
  tft.setTextSize(1);
  tft.drawCentreString("Conectando WiFi...", 240, 120, 2);
  
  WiFi.begin(ssid, password);
  Serial.print("Conectando a WiFi");
  
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(500);
    Serial.print(".");
    attempts++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    wifiConnected = true;
    Serial.println();
    Serial.println("WiFi conectado!");
    Serial.print("IP: ");
    Serial.println(WiFi.localIP());
    
    tft.fillScreen(TFT_BLACK);
    tft.setTextColor(TFT_GREEN);
    tft.drawCentreString("WiFi Conectado", 240, 100, 2);
    tft.setTextColor(TFT_WHITE);
    tft.drawCentreString(WiFi.localIP().toString(), 240, 130, 2);
    delay(2000);
  } else {
    wifiConnected = false;
    Serial.println();
    Serial.println("Fallo al conectar WiFi");
    showError("WiFi No Conectado");
    delay(3000);
  }
}

void reconnectWiFi() {
  static unsigned long lastReconnectAttempt = 0;
  if (millis() - lastReconnectAttempt > 30000) { // Intentar cada 30 segundos
    Serial.println("Intentando reconectar WiFi...");
    WiFi.disconnect();
    WiFi.begin(ssid, password);
    lastReconnectAttempt = millis();
  }
}

void readSensorData() {
  // Forzar una nueva lectura
  bme.takeForcedMeasurement();
  
  temperature = bme.readTemperature();
  humidity = bme.readHumidity();
  pressure = bme.readPressure() / 100.0F; // Convertir a hPa
  
  Serial.printf("Temp: %.2f°C, Hum: %.2f%%, Press: %.2f hPa\n", 
                temperature, humidity, pressure);
}

void sendDataToServer() {
  if (!wifiConnected || !bmeFound) return;

  HTTPClient http;
  WiFiClientSecure client;
  client.setInsecure(); // Ignorar certificado SSL (solo para pruebas)
  http.begin(client, serverURL);
  http.addHeader("Content-Type", "application/json");

  // Crear JSON con los datos
  StaticJsonDocument<200> doc;
  doc["deviceId"] = "ESP32-CYD-001";
  doc["temperature"] = temperature;
  doc["humidity"] = humidity;
  doc["pressure"] = pressure;
  doc["timestamp"] = millis(); // Timestamp en millisegundos

  String jsonString;
  serializeJson(doc, jsonString);

  Serial.println("Enviando datos al servidor...");
  Serial.println(jsonString);

  int httpResponseCode = http.POST(jsonString);

  if (httpResponseCode == 200 || httpResponseCode == 201) {
    String response = http.getString();
    Serial.println("Datos enviados correctamente");
    Serial.println(response);
    serverResponding = true;
    failedRequests = 0;
  } else {
    Serial.printf("Error al enviar datos. Código: %d\n", httpResponseCode);
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("Respuesta del servidor:");
      Serial.println(response);
    }
    serverResponding = false;
    failedRequests++;
  }

  http.end();
}

void updateDisplay() {
  // Limpiar pantalla
  tft.fillScreen(TFT_BLACK);
  
  // Título
  tft.setTextSize(2);
  tft.setTextColor(TFT_CYAN);
  tft.drawCentreString("BME280 Monitor", 240, 10, 2);
  
  // Estado de conexión
  tft.setTextSize(1);
  if (wifiConnected) {
    tft.setTextColor(TFT_GREEN);
    tft.drawString("WiFi: Conectado", 10, 45, 2);
  } else {
    tft.setTextColor(TFT_RED);
    tft.drawString("WiFi: Desconectado", 10, 45, 2);
  }
  
  if (serverResponding && wifiConnected) {
    tft.setTextColor(TFT_GREEN);
    tft.drawString("Servidor: OK", 250, 45, 2);
  } else if (wifiConnected) {
    tft.setTextColor(TFT_ORANGE);
    tft.drawString("Servidor: Error", 250, 45, 2);
  }
  
  if (!bmeFound) {
    tft.setTextColor(TFT_RED);
    tft.setTextSize(2);
    tft.drawCentreString("Sensor BME280", 240, 120, 2);
    tft.drawCentreString("No Encontrado", 240, 150, 2);
    return;
  }
  
  // Datos del sensor
  tft.setTextSize(2);
  
  // Temperatura
  tft.setTextColor(TFT_RED);
  tft.drawString("Temp:", 20, 80, 2);
  tft.setTextColor(TFT_WHITE);
  tft.drawString(String(temperature, 1) + " C", 100, 80, 2);
  
  // Humedad
  tft.setTextColor(TFT_BLUE);
  tft.drawString("Hum:", 20, 110, 2);
  tft.setTextColor(TFT_WHITE);
  tft.drawString(String(humidity, 1) + " %", 100, 110, 2);
  
  // Presión
  tft.setTextColor(TFT_GREEN);
  tft.drawString("Press:", 20, 140, 2);
  tft.setTextColor(TFT_WHITE);
  tft.drawString(String(pressure, 1) + " hPa", 120, 140, 2);
  
  // Información adicional
  tft.setTextSize(1);
  tft.setTextColor(TFT_GRAY);
  tft.drawString("IP: " + WiFi.localIP().toString(), 10, 180, 1);
  
  if (failedRequests > 0) {
    tft.setTextColor(TFT_ORANGE);
    tft.drawString("Fallos: " + String(failedRequests), 10, 200, 1);
  }
  
  // Mostrar tiempo de actividad
  unsigned long uptime = millis() / 1000;
  tft.setTextColor(TFT_GRAY);
  tft.drawString("Uptime: " + String(uptime) + "s", 200, 200, 1);
}

// Escáner I2C para debug (muestra direcciones encontradas)
void scanI2C() {
  Serial.println("Escaneando bus I2C...");
  Wire.begin();
  byte count = 0;
  for (byte addr = 1; addr < 127; addr++) {
    Wire.beginTransmission(addr);
    byte error = Wire.endTransmission();
    if (error == 0) {
      Serial.print("Dispositivo I2C encontrado en 0x");
      if (addr < 16) Serial.print('0');
      Serial.println(addr, HEX);
      count++;
      delay(10);
    }
  }
  if (count == 0) {
    Serial.println("No se encontraron dispositivos I2C");
  } else {
    Serial.print(count);
    Serial.println(" dispositivos I2C encontrados");
  }
}