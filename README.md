# BME280 IoT Dashboard 🌡️📊

Dashboard profesional para monitoreo en tiempo real de sensores BME280 conectados a ESP32. Este proyecto proporciona una interfaz web moderna para visualizar datos de temperatura, humedad y presión atmosférica.

## 🚀 Características

- **Monitoreo en Tiempo Real**: Visualización en tiempo real de datos del sensor BME280
- **Gráficos Interactivos**: Charts profesionales con Recharts para análisis de tendencias
- **API Endpoints**: Endpoints RESTful para recibir datos desde ESP32
- **Dashboard Responsivo**: Diseño adaptativo que funciona en dispositivos móviles y desktop
- **Indicadores de Estado**: Estado de conexión y última actualización en tiempo real
- **Histórico de Datos**: Almacenamiento y visualización de datos históricos

## 📱 Vista Previa

El dashboard incluye:
- 📊 **Tarjetas de Estadísticas**: Temperatura, Humedad y Presión actuales
- 📈 **Gráficos en Tiempo Real**: Visualización de tendencias históricas
- 🔌 **Estado de Conexión**: Indicador visual del estado del dispositivo
- ⏰ **Actualización Automática**: Datos actualizados cada 30 segundos

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS con diseño personalizado
- **Charts**: Recharts para visualización de datos
- **Icons**: Lucide React
- **API**: Next.js API Routes
- **Hardware**: ESP32 + BME280

## 🏗️ Estructura del Proyecto

```
bmeproy/
├── src/
│   ├── app/
│   │   ├── api/sensor-data/     # API endpoints
│   │   ├── globals.css          # Estilos globales
│   │   ├── layout.tsx           # Layout principal
│   │   └── page.tsx             # Dashboard principal
│   └── components/
│       ├── DeviceStatus.tsx     # Estado de conexión
│       ├── SensorChart.tsx      # Gráficos de sensores
│       └── StatsCard.tsx        # Tarjetas de estadísticas
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18+ 
- npm o yarn
- ESP32 con sensor BME280

### 1. Clonar e Instalar

```bash
git clone <tu-repositorio>
cd bmeproy
npm install
```

### 2. Ejecutar en Desarrollo

```bash
npm run dev
```

El dashboard estará disponible en `http://localhost:3000`

### 3. Compilar para Producción

```bash
npm run build
npm start
```

## 📡 Configuración del ESP32

### Código del ESP32

El ESP32 debe enviar datos JSON al endpoint `/api/sensor-data` con el siguiente formato:

```json
{
  "temperature": 25.6,
  "humidity": 65.2,
  "pressure": 1013.25,
  "device_id": "ESP32_BME280_001"
}
```

### Ejemplo de código Arduino

```cpp
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <Adafruit_BME280.h>

const char* serverURL = "http://tu-servidor.com/api/sensor-data";

void sendSensorData(float temp, float hum, float press) {
  HTTPClient http;
  http.begin(serverURL);
  http.addHeader("Content-Type", "application/json");
  
  StaticJsonDocument<200> doc;
  doc["temperature"] = temp;
  doc["humidity"] = hum;
  doc["pressure"] = press;
  doc["device_id"] = "ESP32_BME280_001";
  
  String jsonString;
  serializeJson(doc, jsonString);
  
  int httpResponseCode = http.POST(jsonString);
  http.end();
}
```

## 🔌 API Endpoints

### POST `/api/sensor-data`
Recibe datos del sensor ESP32.

**Body:**
```json
{
  "temperature": number,
  "humidity": number,
  "pressure": number,
  "device_id": string
}
```

**Response:**
```json
{
  "message": "Datos recibidos correctamente",
  "data": { ... }
}
```

### GET `/api/sensor-data`
Obtiene datos históricos del sensor.

**Query Parameters:**
- `limit`: Número de registros (default: 50)
- `device_id`: Filtrar por dispositivo específico

**Response:**
```json
[
  {
    "id": "1234567890",
    "temperature": 25.6,
    "humidity": 65.2,
    "pressure": 1013.25,
    "device_id": "ESP32_BME280_001",
    "timestamp": "2025-10-26T10:30:00.000Z"
  }
]
```

## 🎨 Personalización

### Colores y Estilos

Los colores se pueden personalizar en `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      temperature: '#ef4444', // Rojo para temperatura
      humidity: '#3b82f6',    // Azul para humedad
      pressure: '#10b981',    // Verde para presión
    }
  }
}
```

### Intervalos de Actualización

Cambiar el intervalo de actualización en `src/app/page.tsx`:

```javascript
const interval = setInterval(fetchSensorData, 30000) // 30 segundos
```

## 📊 Datos de Ejemplo

Para pruebas, puedes enviar datos de ejemplo usando curl:

```bash
curl -X POST http://localhost:3000/api/sensor-data \
  -H "Content-Type: application/json" \
  -d '{
    "temperature": 23.5,
    "humidity": 60.0,
    "pressure": 1015.3,
    "device_id": "ESP32_TEST"
  }'
```

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno si es necesario
3. Despliega automáticamente

### Vercel + Supabase (DB y variables de entorno)

Para producción, usa una base de datos externa (por ejemplo, Supabase Postgres) y configura las variables:

1) En Vercel > Project > Settings > Environment Variables agrega:


2) Localmente, copia `.env.example` a `.env.local` y completa `DATABASE_URL` si vas a correr migraciones.

3) Si migras de SQLite a Postgres, en `prisma/schema.prisma` cambia el provider a `postgresql` y aplica migraciones:

```bash
npx prisma migrate deploy
```

4) En el código, el cliente de Supabase está centralizado en `src/lib/supabaseClient.ts` y usa las variables `NEXT_PUBLIC_*`.

<!-- SQLite migration instructions removed: now only Supabase/Postgres is supported. -->
### Migrar datos de SQLite (local) a Postgres (Supabase)

Si ya tienes datos en SQLite y quieres llevarlos a Supabase:

1) Asegúrate de tener la base local (por ejemplo `prisma/dev.db`) y crea un archivo `.env` con:

```
SQLITE_URL="file:./prisma/dev.db"
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DB?pgbouncer=true&connection_limit=1
```

2) Genera el cliente para SQLite y exporta datos a JSON:

```bash
npm run generate:sqlite
npm run export:sqlite
```

3) Aplica migraciones en Postgres (si no lo hiciste):

Nota: Para Prisma + Supabase, usa conexión directa (5432) para migraciones. Puedes poner
`DIRECT_URL` en tu `.env` con la URL directa (5432) y dejar `DATABASE_URL` con la URL pooled (6543).
El schema ya incluye `directUrl = env("DIRECT_URL")`.

```bash
npm run db:deploy
```

4) Importa los datos exportados en Postgres:

```bash
npm run import:postgres
```

También puedes ejecutar todo junto:

```bash
npm run migrate:from-sqlite
```

Los archivos involucrados:

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔧 Troubleshooting

### El ESP32 no puede enviar datos

1. Verifica la conexión WiFi
2. Confirma que la URL del servidor sea correcta
3. Revisa los logs del ESP32 en el Serial Monitor

### Los gráficos no se muestran

1. Verifica que hay datos en la API
2. Abre las Developer Tools para ver errores de consola
3. Confirma que Recharts esté instalado correctamente

### Errores de compilación

```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install

# Verificar tipos
npm run build
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📧 Contacto

Si tienes preguntas o sugerencias, no dudes en crear un issue en el repositorio.

---

**¡Disfruta monitoreando tus sensores BME280! 🌡️📊**