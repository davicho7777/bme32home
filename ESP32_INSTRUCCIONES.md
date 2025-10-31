# Configuración ESP32-2432S028R (CYD) con BME280

## Librerías Necesarias

Instala estas librerías desde el Gestor de Librerías de Arduino IDE:

1. **TFT_eSPI** (by Bodmer) - Para controlar la pantalla
2. **Adafruit BME280 Library** (by Adafruit)
3. **Adafruit Unified Sensor** (by Adafruit)
4. **ArduinoJson** (by Benoit Blanchon)
5. **WiFi** (ya incluida en ESP32)
6. **HTTPClient** (ya incluida en ESP32)

## Configuración de TFT_eSPI

**IMPORTANTE**: Debes configurar la librería TFT_eSPI para la pantalla CYD.

### Ubicación del archivo de configuración:
- Windows: `Documents\Arduino\libraries\TFT_eSPI\User_Setup.h`
- O busca: `TFT_eSPI\User_Setup.h`

### Configuración requerida en User_Setup.h:

```cpp
// Descomenta estas líneas:
#define ILI9341_DRIVER

// Pines para ESP32-2432S028R
#define TFT_MISO 12
#define TFT_MOSI 13
#define TFT_SCLK 14
#define TFT_CS   15
#define TFT_DC   2
#define TFT_RST  -1  // Set TFT_RST to -1 if display RESET is connected to ESP32 board RST

// Para el backlight (opcional)
#define TFT_BL   21

// Velocidad SPI
#define SPI_FREQUENCY  27000000
```

## Conexiones Hardware

### BME280 al ESP32-2432S028R:
- **VCC** → 3.3V
- **GND** → GND  
- **SDA** → GPIO 21 (I2C Data)
- **SCL** → GPIO 22 (I2C Clock)

### Pantalla (ya conectada internamente en CYD):
- La pantalla ya está conectada internamente en la CYD
- Solo necesitas configurar la librería TFT_eSPI

## Configuración del Código

### 1. Edita estas líneas en el archivo .ino:

```cpp
// Cambia por tu red WiFi
const char* ssid = "TU_WIFI_SSID";
const char* password = "TU_WIFI_PASSWORD";

// Cambia por la IP de tu servidor Next.js
const char* serverURL = "http://192.168.1.100:3000/api/sensor-data";
```

### 2. Para encontrar tu IP local:
- Windows: Abre CMD y ejecuta `ipconfig`
- Busca tu IP en "Adaptador de LAN inalámbrica Wi-Fi"

## Compilación y Carga

1. **Selecciona la placa**: ESP32 Dev Module
2. **Configuración del ESP32**:
   - Board: "ESP32 Dev Module"
   - Upload Speed: "921600"
   - CPU Frequency: "240MHz"
   - Flash Frequency: "80MHz"
   - Flash Mode: "QIO"
   - Flash Size: "4MB"
   - Partition Scheme: "Default 4MB with spiffs"
   - Core Debug Level: "None"
   - PSRAM: "Disabled"

3. **Puerto**: Selecciona el puerto COM donde está conectado tu ESP32

## Funcionalidades del Código

### Pantalla:
- **Temperatura** en rojo
- **Humedad** en azul  
- **Presión** en verde
- **Estado WiFi** (verde=conectado, rojo=desconectado)
- **Estado del servidor** (verde=OK, naranja=error)
- **IP local** del ESP32
- **Tiempo de actividad**
- **Contador de fallos** de conexión

### Comunicación:
- Lee sensor cada 2 segundos
- Envía datos al servidor cada 30 segundos
- Actualiza pantalla cada 1 segundo
- Reconexión automática WiFi

### Datos enviados:
```json
{
  "deviceId": "ESP32-CYD-001",
  "temperature": 25.4,
  "humidity": 60.2,
  "pressure": 1013.2,
  "timestamp": 1635789123000
}
```

## Solución de Problemas

### Si la pantalla no funciona:
1. Verifica la configuración de TFT_eSPI
2. Asegúrate de usar la configuración correcta para CYD

### Si BME280 no se detecta:
1. Verifica las conexiones I2C
2. Prueba con dirección 0x77 en lugar de 0x76:
   ```cpp
   if (!bme.begin(0x77)) {
   ```

### Si no conecta WiFi:
1. Verifica SSID y contraseña
2. Asegúrate de estar en rango
3. Revisa que la red sea 2.4GHz (no 5GHz)

### Si no envía datos al servidor:
1. Verifica que el servidor Next.js esté corriendo
2. Usa la IP correcta (no localhost)
3. Asegúrate de que ESP32 y PC estén en la misma red

## Monitor Serie

Abre el Monitor Serie (115200 baud) para ver:
- Estado de inicialización
- Conexión WiFi
- Lecturas del sensor
- Respuestas del servidor
- Errores y debugging

El ESP32 mostrará toda la información en tiempo real tanto en la pantalla como en el monitor serie.