"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface SensorData {
  id: string;
  temperature: number;
  humidity: number;
  pressure: number;
  device_id: string;
  timestamp: string;
  rssi?: number;
  uptime?: number;
  heapFree?: number;
  lastError?: string;
}


export default function Esp32Page() {
  const [data, setData] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [errorRows, setErrorRows] = useState<SensorData[]>([]);

  // Formatea uptime en ms a un texto legible (meses, días, horas, minutos)
  const formatUptime = (ms?: number) => {
    if (!ms || ms <= 0) return "-";
    let seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60); seconds %= 60;
    const hours = Math.floor(minutes / 60); const remMin = minutes % 60;
    const days = Math.floor(hours / 24); const remHours = hours % 24;
    const months = Math.floor(days / 30); const remDays = days % 30;

    if (months > 0) {
      return `${months} ${months === 1 ? 'mes' : 'meses'}${remDays ? ` ${remDays} d` : ''}`;
    }
    if (days > 0) {
      return `${days} d${remHours ? ` ${remHours} h` : ''}`;
    }
    if (hours > 0) {
      return `${hours} h${remMin ? ` ${remMin} min` : ''}`;
    }
    if (remMin > 0) {
      return `${remMin} min${seconds ? ` ${seconds} s` : ''}`;
    }
    return `${seconds} s`;
  }

  // Cargar datos recientes y errores
  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("/api/sensor-data?limit=50"); // sin validated para ver errores
    const allRows: SensorData[] = await res.json();
    setData(allRows);
    // Detectar errores (outliers)
    const outliers = allRows.filter(d =>
      d.temperature <= -40 || d.temperature >= 85 ||
      d.humidity < 0 || d.humidity > 100 ||
      d.pressure <= 300 || d.pressure >= 1100
    );
    setErrorRows(outliers);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Estado de conexión: si el último dato es reciente (<2min)
  const lastData = data.length > 0 ? data[0] : null;
  const isConnected = lastData && (Date.now() - new Date(lastData.timestamp).getTime() < 2 * 60 * 1000);

  // Botón de prueba de sincronización
  const handleCheck = async () => {
    setSyncStatus("Verificando...");
    setLastChecked(new Date());
    try {
      await fetchData();
      if (!isConnected) {
        setSyncStatus("❌ ESP32 no conectado (no hay datos recientes)");
      } else if (errorRows.length > 0) {
        setSyncStatus("⚠️ Hay errores en los últimos datos (outliers detectados)");
      } else {
        setSyncStatus("✅ Todo correcto y sincronizado");
      }
    } catch {
      setSyncStatus("❌ Error al verificar la conexión");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Datos enviados por el ESP32</h1>
      <Link href="/">
        <button className="mb-4 px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition">
          Volver al inicio
        </button>
      </Link>

      <div className="mb-4 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span className="font-semibold">Estado de conexión:</span>
          <span>{isConnected ? 'Conectado (dato reciente)' : 'Desconectado (sin datos recientes)'}</span>
          {lastData && (
            <span className="text-xs text-gray-500 ml-2">Última actualización: {new Date(lastData.timestamp).toLocaleString()}</span>
          )}
        </div>
        {lastData && (
          <div className="flex items-center gap-2">
            <span className="font-semibold">Uptime:</span>
            <span>{formatUptime(lastData.uptime)}</span>
          </div>
        )}
        {/* Botón de prueba eliminado */}
        {errorRows.length > 0 && (
          <div className="bg-yellow-100 border border-yellow-300 rounded p-2 text-yellow-900 text-sm mt-2">
            <b>Últimos errores detectados (outliers):</b>
            <ul className="list-disc ml-5">
              {errorRows.map((e, i) => (
                <li key={e.id + i}>
                  {new Date(e.timestamp).toLocaleString()} — T: {e.temperature}°C, H: {e.humidity}%, P: {e.pressure} hPa
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Cargando datos...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-1 text-left text-xs font-semibold">Fecha/Hora</th>
                <th className="px-2 py-1 text-left text-xs font-semibold">Temp (°C)</th>
                <th className="px-2 py-1 text-left text-xs font-semibold">Humedad (%)</th>
                <th className="px-2 py-1 text-left text-xs font-semibold">Presión (hPa)</th>
                <th className="px-2 py-1 text-left text-xs font-semibold">ID Dispositivo</th>
                <th className="px-2 py-1 text-left text-xs font-semibold">RSSI (dBm)</th>
                <th className="px-2 py-1 text-left text-xs font-semibold">Uptime (ms)</th>
                <th className="px-2 py-1 text-left text-xs font-semibold">Memoria libre (bytes)</th>
                <th className="px-2 py-1 text-left text-xs font-semibold">Último error</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d) => (
                <tr key={d.id} className="border-t">
                  <td className="px-2 py-1 text-xs">{new Date(d.timestamp).toLocaleString()}</td>
                  <td className="px-2 py-1 text-xs">{d.temperature.toFixed(2)}</td>
                  <td className="px-2 py-1 text-xs">{d.humidity.toFixed(2)}</td>
                  <td className="px-2 py-1 text-xs">{d.pressure.toFixed(2)}</td>
                  <td className="px-2 py-1 text-xs">{d.device_id}</td>
                  <td className="px-2 py-1 text-xs">{d.rssi !== undefined ? d.rssi : '-'}</td>
                  <td className="px-2 py-1 text-xs">{d.uptime !== undefined ? d.uptime : '-'}</td>
                  <td className="px-2 py-1 text-xs">{d.heapFree !== undefined ? d.heapFree : '-'}</td>
                  <td className="px-2 py-1 text-xs">{d.lastError !== undefined ? d.lastError : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
