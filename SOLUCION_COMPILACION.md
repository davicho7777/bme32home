# 🔧 Guía de Instalación de Librerías para ESP32-CYD

## Error: "exit status 1 - cannot open source file"

Este error indica que las librerías necesarias no están instaladas. Sigue estos pasos:

## 📚 PASO 1: Instalar Librerías Requeridas

### Abrir Arduino IDE:
1. Ve a **Herramientas** → **Administrar Librerías...**
2. O presiona `Ctrl+Shift+I`

### Instalar cada librería buscando por nombre:

#### 1. ArduinoJson
- **Buscar**: `ArduinoJson`
- **Autor**: Benoit Blanchon
- **Instalar**: La versión más reciente (6.x.x)

#### 2. Adafruit BME280 Library
- **Buscar**: `Adafruit BME280`
- **Autor**: Adafruit
- **Instalar**: La versión más reciente
- **IMPORTANTE**: También instalará automáticamente "Adafruit Unified Sensor"

#### 3. TFT_eSPI
- **Buscar**: `TFT_eSPI`
- **Autor**: Bodmer
- **Instalar**: La versión más reciente

#### 4. Wire (Ya incluida)
- Esta librería ya viene con ESP32, no necesitas instalarla

---

## ⚙️ PASO 2: Configurar TFT_eSPI para CYD

**MUY IMPORTANTE**: Debes configurar TFT_eSPI para tu pantalla específica.

### Ubicar archivo de configuración:
```
Windows: Documents\Arduino\libraries\TFT_eSPI\User_Setup.h
Mac: ~/Documents/Arduino/libraries/TFT_eSPI/User_Setup.h
Linux: ~/Arduino/libraries/TFT_eSPI/User_Setup.h
```

### Editar User_Setup.h:

#### Comentar estas líneas (agregar // al inicio):
```cpp
//#define ILI9341_DRIVER
//#define ST7735_DRIVER
// ... (comenta todos los drivers)
```

#### Descomentar SOLO esta línea:
```cpp
#define ILI9341_DRIVER  // Para ESP32-2432S028R
```

#### Configurar pines para CYD:
```cpp
// Para ESP32-2432S028R (CYD)
#define TFT_MISO 12
#define TFT_MOSI 13
#define TFT_SCLK 14
#define TFT_CS   15
#define TFT_DC   2
#define TFT_RST  -1

// Para el backlight
#define TFT_BL   21

// Velocidad SPI
#define SPI_FREQUENCY  27000000
```

---

## 🎯 PASO 3: Configurar Arduino IDE para ESP32

### Instalar soporte para ESP32:
1. **Archivo** → **Preferencias**
2. En "Gestor de URLs Adicionales de Tarjetas":
   ```
   https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
   ```
3. **Herramientas** → **Placa** → **Gestor de tarjetas**
4. Buscar "esp32" e instalar "ESP32 by Espressif Systems"

### Configuración de la placa:
- **Placa**: "ESP32 Dev Module"
- **Upload Speed**: "921600"
- **CPU Frequency**: "240MHz"
- **Flash Frequency**: "80MHz"
- **Flash Mode**: "QIO"
- **Flash Size**: "4MB (32Mb)"
- **Partition Scheme**: "Default 4MB with spiffs (1.2MB APP/1.5MB SPIFFS)"
- **Core Debug Level**: "None"
- **PSRAM**: "Disabled"

---

## ✅ PASO 4: Verificar Instalación

### Crear sketch de prueba:
```cpp
#include <ArduinoJson.h>
#include <Wire.h>
#include <Adafruit_BME280.h>
#include <TFT_eSPI.h>

void setup() {
  Serial.begin(115200);
  Serial.println("Librerías instaladas correctamente!");
}

void loop() {
  delay(1000);
}
```

### Si compila sin errores: ✅ ¡Listo!

---

## 🔍 Solución de Problemas Comunes

### Error: "TFT_eSPI.h not found"
- Reinstala la librería TFT_eSPI
- Reinicia Arduino IDE

### Error: "Adafruit_BME280.h not found"
- Instala también "Adafruit Unified Sensor"
- Reinicia Arduino IDE

### La pantalla no funciona:
- Verifica la configuración User_Setup.h
- Asegúrate de tener SOLO ILI9341_DRIVER descomentado

### Error de compilación con ESP32:
- Verifica que tienes instalado el soporte ESP32
- Selecciona "ESP32 Dev Module" como placa

---

## 📋 Lista de Verificación Final

- [ ] ArduinoJson instalada
- [ ] Adafruit BME280 Library instalada  
- [ ] Adafruit Unified Sensor instalada (automática)
- [ ] TFT_eSPI instalada
- [ ] User_Setup.h configurado para CYD
- [ ] Soporte ESP32 instalado
- [ ] Placa "ESP32 Dev Module" seleccionada
- [ ] Puerto COM correcto seleccionado

Una vez completados estos pasos, el código debería compilar sin problemas.

## 🌐 URLs del servidor

Para desarrollo local:
```cpp
const char* serverURL = "http://192.168.1.XXX:3000/api/sensor-data";
```

Para producción (Vercel):
```cpp
const char* serverURL = "https://bme32home.vercel.app/api/sensor-data";
```