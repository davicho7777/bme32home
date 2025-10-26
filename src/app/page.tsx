'use client'

import { useState, useEffect, useMemo } from 'react'
import { format } from 'date-fns'
import { Thermometer, Droplets, Gauge, Wifi, Activity, AlertTriangle, Calendar as CalendarIcon } from 'lucide-react'
import Link from 'next/link'
import SensorChart from '@/components/SensorChart'
import StatsCard from '@/components/StatsCard'
import DeviceStatus from '@/components/DeviceStatus'

interface SensorData {
  id: string
  temperature: number
  humidity: number
  pressure: number
  device_id: string
  timestamp: string
}

type TimeRange = '10m' | '1h' | '6h' | '24h' | '7d' | '30d' | '365d'

export default function Dashboard() {
  const [sensorData, setSensorData] = useState<SensorData[]>([])
  const [latestData, setLatestData] = useState<SensorData | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<TimeRange>('6h')

  useEffect(() => {
    fetchSensorData()
    const interval = setInterval(fetchSensorData, 30000) // Actualizar cada 30 segundos
    return () => clearInterval(interval)
  }, [timeRange])

  // Filtro de valores atípicos/implausibles
  const isValidReading = (d: SensorData) => (
    d.temperature > -40 && d.temperature < 85 &&
    d.humidity >= 0 && d.humidity <= 100 &&
    d.pressure > 300 && d.pressure < 1100
  )

  // Datos filtrados y en orden cronológico ascendente (pasado -> presente)
  const filteredChrono = useMemo(() => {
    const filtered = sensorData.filter(isValidReading)
    return filtered.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
  }, [sensorData])

  const fetchSensorData = async () => {
    try {
      let url = `/api/sensor-data?limit=500&validated=true`;
      if (timeRange === '10m') {
        // Calcular el timestamp de hace 10 minutos
        const now = new Date();
        const from = new Date(now.getTime() - 10 * 60 * 1000);
        url += `&from=${from.toISOString()}`;
      } else {
        url += `&range=${timeRange}`;
      }
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setSensorData(data)
        if (data.length > 0) {
          setLatestData(data[0])
          // Considerar conectado si hay datos de los últimos 2 minutos
          const latestTs = new Date(data[0].timestamp).getTime()
          setIsConnected(Date.now() - latestTs < 2 * 60 * 1000)
        }
      }
    } catch (error) {
      console.error('Error fetching sensor data:', error)
      setIsConnected(false)
    } finally {
      setLoading(false)
    }
  }

  const rangeButtons: { key: TimeRange; label: string }[] = [
    { key: '10m', label: '10m' },
    { key: '1h', label: '1h' },
    { key: '6h', label: '6h' },
    { key: '24h', label: '24h' },
    { key: '7d', label: '7d' },
    { key: '30d', label: '30d' },
    { key: '365d', label: '1a' },
  ]

  // --- Análisis de datos (siempre antes de cualquier return) ---
  const analysis = useMemo(() => {
    if (!filteredChrono.length) return undefined
    const temps = filteredChrono.map(d => d.temperature)
    const hums = filteredChrono.map(d => d.humidity)
    const press = filteredChrono.map(d => d.pressure)
    const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length
    const min = (arr: number[]) => Math.min(...arr)
    const max = (arr: number[]) => Math.max(...arr)
    return {
      temperature: { avg: avg(temps), min: min(temps), max: max(temps) },
      humidity: { avg: avg(hums), min: min(hums), max: max(hums) },
      pressure: { avg: avg(press), min: min(press), max: max(press) },
    }
  }, [filteredChrono])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Activity className="w-6 h-6 animate-pulse text-blue-500" />
          <span className="text-lg">Cargando datos del sensor...</span>
        </div>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard BME280</h1>
              <p className="text-gray-600 mt-1">
                Monitoreo en tiempo real del sensor ambiental
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/calendar">
                <button className="flex items-center gap-1 px-3 py-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition font-medium">
                  <CalendarIcon className="w-4 h-4" />
                  Calendario
                </button>
              </Link>
              <Link href="/esp32">
                <button className="flex items-center gap-1 px-3 py-2 rounded-md bg-green-100 text-green-700 hover:bg-green-200 transition font-medium">
                  <span className="font-bold">ESP32</span>
                </button>
              </Link>
              {/* Rango de tiempo */}
              <div className="hidden md:flex items-center bg-white rounded-lg border border-gray-200 p-1">
                {rangeButtons.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setTimeRange(key)}
                    className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                      timeRange === key
                        ? 'bg-blue-600 text-white shadow'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <DeviceStatus isConnected={isConnected} lastUpdate={(filteredChrono[filteredChrono.length - 1] ?? latestData)?.timestamp} />
            </div>
          </div>
          {/* Rango de tiempo (mobile) */}
          <div className="mt-4 md:hidden">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as TimeRange)}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {rangeButtons.map(({ key, label }) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Última actualización */}
        {(filteredChrono.length > 0 || latestData) && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg shadow p-4 flex flex-col items-center justify-center">
              <span className="text-xs text-blue-700 font-semibold uppercase tracking-wider mb-1">Última actualización</span>
              <span className="text-lg font-bold text-blue-900">{format(new Date((filteredChrono[filteredChrono.length - 1] ?? latestData)!.timestamp), 'dd/MM/yyyy HH:mm:ss')}</span>
            </div>
            {filteredChrono.length > 0 ? (
              <>
                <StatsCard
                  title="Temperatura"
                  value={filteredChrono[filteredChrono.length - 1]!.temperature}
                  unit="°C"
                  icon={Thermometer}
                  color="text-red-500"
                  bgColor="bg-red-50"
                />
                <StatsCard
                  title="Humedad"
                  value={filteredChrono[filteredChrono.length - 1]!.humidity}
                  unit="%"
                  icon={Droplets}
                  color="text-blue-500"
                  bgColor="bg-blue-50"
                />
                <StatsCard
                  title="Presión"
                  value={filteredChrono[filteredChrono.length - 1]!.pressure}
                  unit="hPa"
                  icon={Gauge}
                  color="text-green-500"
                  bgColor="bg-green-50"
                />
              </>
            ) : (
              <div className="md:col-span-3 bg-yellow-50 border border-yellow-200 rounded-lg shadow p-4 flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <div>
                  <div className="text-sm font-semibold text-yellow-800">Sin datos válidos en el rango seleccionado</div>
                  <div className="text-xs text-yellow-800/80">Algunas lecturas fueron descartadas por ser atípicas (outliers). Ajusta el rango o revisa el sensor.</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Análisis de datos */}
        {analysis && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
              <h3 className="font-semibold mb-2 text-red-600 flex items-center gap-2"><Thermometer className="w-4 h-4" /> Temperatura</h3>
              <div className="text-sm">Promedio: <b>{analysis.temperature.avg.toFixed(2)}°C</b></div>
              <div className="text-sm">Mínimo: <b>{analysis.temperature.min.toFixed(2)}°C</b></div>
              <div className="text-sm">Máximo: <b>{analysis.temperature.max.toFixed(2)}°C</b></div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
              <h3 className="font-semibold mb-2 text-blue-600 flex items-center gap-2"><Droplets className="w-4 h-4" /> Humedad</h3>
              <div className="text-sm">Promedio: <b>{analysis.humidity.avg.toFixed(2)}%</b></div>
              <div className="text-sm">Mínimo: <b>{analysis.humidity.min.toFixed(2)}%</b></div>
              <div className="text-sm">Máximo: <b>{analysis.humidity.max.toFixed(2)}%</b></div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
              <h3 className="font-semibold mb-2 text-green-600 flex items-center gap-2"><Gauge className="w-4 h-4" /> Presión</h3>
              <div className="text-sm">Promedio: <b>{analysis.pressure.avg.toFixed(2)} hPa</b></div>
              <div className="text-sm">Mínimo: <b>{analysis.pressure.min.toFixed(2)} hPa</b></div>
              <div className="text-sm">Máximo: <b>{analysis.pressure.max.toFixed(2)} hPa</b></div>
            </div>
          </div>
        )}

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SensorChart
            data={filteredChrono}
            dataKey="temperature"
            title="Temperatura"
            color="#ef4444"
            unit="°C"
            timeRange={timeRange}
          />
          <SensorChart
            data={filteredChrono}
            dataKey="humidity"
            title="Humedad"
            color="#3b82f6"
            unit="%"
            timeRange={timeRange}
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <SensorChart
            data={filteredChrono}
            dataKey="pressure"
            title="Presión Atmosférica"
            color="#10b981"
            unit="hPa"
            timeRange={timeRange}
          />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>
            Dashboard IoT Professional • Actualización automática cada 30 segundos
          </p>
        </div>
      </div>
    </div>
  )
}