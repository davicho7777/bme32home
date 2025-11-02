'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { Download } from 'lucide-react'
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
  // Estado para el tema: 'default', 'neobrutal', 'cyberpunk' o 'cozy'
  const [theme, setTheme] = useState<'default' | 'neobrutal' | 'cyberpunk' | 'cozy'>('default')
  // Ciclo: default -> neobrutal -> cyberpunk -> cozy -> default
  const toggleTheme = () => setTheme(t => t === 'default' ? 'neobrutal' : t === 'neobrutal' ? 'cyberpunk' : t === 'cyberpunk' ? 'cozy' : 'default')
  const isNeo = theme === 'neobrutal'
  const isCyber = theme === 'cyberpunk'
  const isCozy = theme === 'cozy'
  const [sensorData, setSensorData] = useState<SensorData[]>([])
  const [latestData, setLatestData] = useState<SensorData | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<TimeRange>('6h')

  const [showCsvMenu, setShowCsvMenu] = useState<boolean>(false)
  const [csvLoading, setCsvLoading] = useState<boolean>(false)
  // Descarga CSV para el periodo seleccionado
  const handleDownloadCsv = async (range: TimeRange) => {
    setCsvLoading(true)
    setShowCsvMenu(false)
    try {
      const url = `/api/sensor-data?limit=10000&range=${range}`
      const res = await fetch(url)
      if (!res.ok) throw new Error('Error al obtener datos')
      const data = await res.json()
      if (!Array.isArray(data) || data.length === 0) throw new Error('Sin datos para exportar')
      // Generar CSV
      const header = Object.keys(data[0])
      const rows = data.map((row: any) => header.map(h => row[h]))
      const csv = [header.join(','), ...rows.map(r => r.join(','))].join('\r\n')
      const blob = new Blob([csv], { type: 'text/csv' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `sensor-data-${range}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (e) {
      alert('Error exportando CSV: ' + (e as any).message)
    } finally {
      setCsvLoading(false)
    }
  }

  

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

  const fetchSensorData = useCallback(async () => {
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
  }, [timeRange])

  useEffect(() => {
    fetchSensorData()
    const interval = setInterval(fetchSensorData, 30000) // Actualizar cada 30 segundos
    return () => clearInterval(interval)
  }, [fetchSensorData])

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
  <div className={`min-h-screen p-4 transition-all duration-300 ${isNeo ? 'neo-bg' : isCyber ? 'cyber-bg' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard BME280</h1>
              <p className="mt-1 text-gray-600">Monitoreo en tiempo real del sensor ambiental</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {/* Botón de cambio de tema */}
              <button
                className={`flex-shrink-0 w-[92px] sm:w-[110px] md:w-[130px] px-3 py-2 rounded-md font-bold border-2 transition-all duration-200 leading-tight flex items-center justify-center ${isNeo ? 'neo-btn-active' : isCyber ? 'cyber-btn-active' : isCozy ? 'cozy-btn-active' : 'bg-gray-100 text-gray-900'}`}
                onClick={toggleTheme}
                title="Cambiar tema"
                style={{height: '40px'}} 
              >
                <span className={`truncate w-full block text-center ${isNeo ? 'text-[11px] sm:text-xs' : theme === 'default' ? 'text-xs' : 'text-sm'}`}>
                  {theme === 'default' ? 'Predeterminado' : isNeo ? 'Neo Brutalismo' : isCyber ? 'Cyberpunk' : isCozy ? 'Cozy' : ''}
                </span>
              </button>
              {/* Botón de descarga CSV */}
              <div className="relative">
                <button
                  className={`flex-shrink-0 flex items-center gap-1 px-3 py-2 rounded-md transition font-medium ${isNeo ? 'neo-btn neo-btn-yellow' : isCyber ? 'cyber-btn cyber-btn-yellow' : isCozy ? 'cozy-btn cozy-btn-yellow' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'}`}
                  onClick={() => setShowCsvMenu(v => !v)}
                  disabled={csvLoading}
                  title="Descargar CSV"
                >
                  <Download className="w-4 h-4" />
                  CSV
                </button>
                {showCsvMenu && (
                  <div className={`absolute right-0 mt-2 z-10 min-w-[120px] ${isNeo ? 'neo-dropdown' : isCyber ? 'cyber-dropdown' : isCozy ? 'cozy-dropdown' : 'bg-white border border-gray-200 rounded shadow'}`}>
                    {rangeButtons.map(({ key, label }) => (
                      <button
                        key={key}
                        className={`block w-full text-left px-4 py-2 text-sm ${isNeo ? 'neo-btn neo-btn-yellow' : isCyber ? 'cyber-btn cyber-btn-yellow' : isCozy ? 'cozy-btn cozy-btn-yellow' : 'hover:bg-yellow-50'}`}
                        onClick={() => handleDownloadCsv(key)}
                        disabled={csvLoading}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <Link href="/calendar">
                <button className={`flex-shrink-0 flex items-center gap-1 px-3 py-2 rounded-md transition font-medium ${isNeo ? 'neo-btn neo-btn-blue' : isCyber ? 'cyber-btn cyber-btn-blue' : isCozy ? 'cozy-btn cozy-btn-blue' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}>
                  <CalendarIcon className="w-4 h-4" />
                  Calendario
                </button>
              </Link>
              <Link href="/esp32">
                <button className={`flex-shrink-0 flex items-center gap-1 px-3 py-2 rounded-md font-bold transition font-medium ${isNeo ? 'neo-btn neo-btn-green' : isCyber ? 'cyber-btn cyber-btn-green' : isCozy ? 'cozy-btn cozy-btn-green' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}>
                  <span>ESP32</span>
                </button>
              </Link>
              
                <div className={`hide-below-550 items-center rounded-lg p-1 ${isNeo ? 'neo-range' : isCyber ? 'cyber-range' : isCozy ? 'cozy-range' : 'bg-white border border-gray-200'}`}>
                  {rangeButtons.map(({ key, label }) => (
                      <button
                        key={key}
                        onClick={() => setTimeRange(key)}
                        className={`px-3 py-1.5 text-sm rounded-md transition-colors font-bold ${isNeo
                          ? (timeRange === key ? 'neo-range-btn-active neo-btn-yellow neo-tiny-shadow' : 'neo-range-btn neo-btn-yellow neo-tiny-shadow')
                          : isCyber
                            ? (timeRange === key ? 'cyber-range-btn-active cyber-btn-yellow cyber-tiny-shadow' : 'cyber-range-btn cyber-btn-yellow cyber-tiny-shadow')
                            : isCozy
                              ? (timeRange === key ? 'cozy-range-btn-active cozy-btn-yellow cozy-tiny-shadow' : 'cozy-range-btn cozy-btn-yellow cozy-tiny-shadow')
                              : (timeRange === key ? 'bg-yellow-600 text-white shadow' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200')}`}
                      >
                        {label}
                      </button>
                    ))}
                </div>
              <DeviceStatus theme={theme} isConnected={isConnected} lastUpdate={(filteredChrono[filteredChrono.length - 1] ?? latestData)?.timestamp} />
            </div>
          </div>
          {/* Rango de tiempo (mobile) */}
          <div className="mt-4 show-below-550">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as TimeRange)}
              className={`w-full rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 ${theme === 'neobrutal' ? 'neo-select' : theme === 'cozy' ? 'cozy-select' : 'border border-gray-300 bg-white focus:ring-blue-500'}`}
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
            <div className={`rounded-lg p-4 flex flex-col items-center justify-center ${theme === 'neobrutal' ? 'neo-card neo-card-blue neo-card-shadow-4' : theme === 'cyberpunk' ? 'cyber-card cyber-card-shadow-4' : theme === 'cozy' ? 'cozy-card cozy-card-blue cozy-card-shadow' : 'bg-blue-50 border border-blue-200 shadow'}`}>
              <span className={`text-xs font-semibold uppercase tracking-wider mb-1 ${theme === 'cyberpunk' ? 'cyber-text-cyan' : 'text-blue-700'}`}>Última actualización</span>
              <span className={`text-lg font-bold ${theme === 'cyberpunk' ? 'cyber-text-magenta' : 'text-blue-900'}`}>{format(new Date((filteredChrono[filteredChrono.length - 1] ?? latestData)!.timestamp), 'dd/MM/yyyy HH:mm:ss')}</span>
            </div>
            {filteredChrono.length > 0 ? (
              <>
                <StatsCard
                  title="Temperatura"
                  value={filteredChrono[filteredChrono.length - 1]!.temperature}
                  unit="°C"
                  icon={Thermometer}
                  color={theme === 'cyberpunk' ? 'cyber-text-magenta' : 'text-red-500'}
                  bgColor={theme === 'cyberpunk' ? 'bg-[#1b003f]' : 'bg-red-50'}
                  theme={theme}
                  className={theme === 'neobrutal' ? 'neo-card-shadow-4' : theme === 'cyberpunk' ? 'cyber-card-shadow-4' : theme === 'cozy' ? 'cozy-card-shadow' : ''}
                />
                <StatsCard
                  title="Humedad"
                  value={filteredChrono[filteredChrono.length - 1]!.humidity}
                  unit="%"
                  icon={Droplets}
                  color={theme === 'cyberpunk' ? 'cyber-text-cyan' : 'text-blue-500'}
                  bgColor={theme === 'cyberpunk' ? 'bg-[#18132a]' : 'bg-blue-50'}
                  theme={theme}
                  className={theme === 'neobrutal' ? 'neo-card-shadow-4' : theme === 'cyberpunk' ? 'cyber-card-shadow-4' : theme === 'cozy' ? 'cozy-card-shadow' : ''}
                />
                <StatsCard
                  title="Presión"
                  value={filteredChrono[filteredChrono.length - 1]!.pressure}
                  unit="hPa"
                  icon={Gauge}
                  color={theme === 'cyberpunk' ? 'cyber-text-cyan' : 'text-green-500'}
                  bgColor={theme === 'cyberpunk' ? 'bg-[#18132a]' : 'bg-green-50'}
                  theme={theme}
                  className={theme === 'neobrutal' ? 'neo-card-shadow-4' : theme === 'cyberpunk' ? 'cyber-card-shadow-4' : theme === 'cozy' ? 'cozy-card-shadow' : ''}
                />
              </>
            ) : (
              <div className={`md:col-span-3 rounded-lg shadow p-4 flex items-center gap-3 ${theme === 'neobrutal' ? 'neo-card neo-card-yellow' : theme === 'cyberpunk' ? 'cyber-card cyber-card-shadow-4' : theme === 'cozy' ? 'cozy-card cozy-card-yellow cozy-card-shadow' : 'bg-yellow-50 border border-yellow-200'}`}>
                <AlertTriangle className={`w-5 h-5 ${theme === 'cyberpunk' ? 'cyber-text-magenta' : 'text-yellow-600'}`} />
                <div>
                  <div className={`text-sm font-semibold ${theme === 'cyberpunk' ? 'cyber-text-magenta' : 'text-yellow-800'}`}>Sin datos válidos en el rango seleccionado</div>
                  <div className={`text-xs ${theme === 'cyberpunk' ? 'cyber-text-cyan' : 'text-yellow-800/80'}`}>Algunas lecturas fueron descartadas por ser atípicas (outliers). Ajusta el rango o revisa el sensor.</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Análisis de datos */}
        {analysis && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className={`rounded-lg p-4 border flex flex-col ${theme === 'neobrutal' ? 'neo-card neo-card-red border-black neo-card-shadow-4' : theme === 'cyberpunk' ? 'cyber-card cyber-card-shadow-4' : theme === 'cozy' ? 'cozy-card cozy-card-red cozy-card-shadow' : 'bg-white border-gray-200 shadow'}`}>
              <h3 className={`font-semibold mb-2 flex items-center gap-2 ${theme === 'cyberpunk' ? 'cyber-text-magenta' : 'text-red-600'}`}><Thermometer className="w-4 h-4" /> Temperatura</h3>
              <div className={`text-sm ${theme === 'cyberpunk' ? 'cyber-text-cyan' : ''}`}>Promedio: <b>{analysis.temperature.avg.toFixed(2)}°C</b></div>
              <div className={`text-sm ${theme === 'cyberpunk' ? 'cyber-text-cyan' : ''}`}>Mínimo: <b>{analysis.temperature.min.toFixed(2)}°C</b></div>
              <div className={`text-sm ${theme === 'cyberpunk' ? 'cyber-text-cyan' : ''}`}>Máximo: <b>{analysis.temperature.max.toFixed(2)}°C</b></div>
            </div>
            <div className={`rounded-lg p-4 border flex flex-col ${theme === 'neobrutal' ? 'neo-card neo-card-blue border-black neo-card-shadow-4' : theme === 'cyberpunk' ? 'cyber-card cyber-card-shadow-4' : theme === 'cozy' ? 'cozy-card cozy-card-blue cozy-card-shadow' : 'bg-white border-gray-200 shadow'}`}>
              <h3 className={`font-semibold mb-2 flex items-center gap-2 ${theme === 'cyberpunk' ? 'cyber-text-magenta' : 'text-blue-600'}`}><Droplets className="w-4 h-4" /> Humedad</h3>
              <div className={`text-sm ${theme === 'cyberpunk' ? 'cyber-text-cyan' : ''}`}>Promedio: <b>{analysis.humidity.avg.toFixed(2)}%</b></div>
              <div className={`text-sm ${theme === 'cyberpunk' ? 'cyber-text-cyan' : ''}`}>Mínimo: <b>{analysis.humidity.min.toFixed(2)}%</b></div>
              <div className={`text-sm ${theme === 'cyberpunk' ? 'cyber-text-cyan' : ''}`}>Máximo: <b>{analysis.humidity.max.toFixed(2)}%</b></div>
            </div>
            <div className={`rounded-lg p-4 border flex flex-col ${theme === 'neobrutal' ? 'neo-card neo-card-green border-black neo-card-shadow-4' : theme === 'cyberpunk' ? 'cyber-card cyber-card-shadow-4' : theme === 'cozy' ? 'cozy-card cozy-card-green cozy-card-shadow' : 'bg-white border-gray-200 shadow'}`}>
              <h3 className={`font-semibold mb-2 flex items-center gap-2 ${theme === 'cyberpunk' ? 'cyber-text-magenta' : 'text-green-600'}`}><Gauge className="w-4 h-4" /> Presión</h3>
              <div className={`text-sm ${theme === 'cyberpunk' ? 'cyber-text-cyan' : ''}`}>Promedio: <b>{analysis.pressure.avg.toFixed(2)} hPa</b></div>
              <div className={`text-sm ${theme === 'cyberpunk' ? 'cyber-text-cyan' : ''}`}>Mínimo: <b>{analysis.pressure.min.toFixed(2)} hPa</b></div>
              <div className={`text-sm ${theme === 'cyberpunk' ? 'cyber-text-cyan' : ''}`}>Máximo: <b>{analysis.pressure.max.toFixed(2)} hPa</b></div>
            </div>
          </div>
        )}

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <SensorChart
            data={filteredChrono}
            dataKey="temperature"
            title="Temperatura"
            color={theme === 'neobrutal' ? '#ff3b3b' : '#ef4444'}
            unit="°C"
            timeRange={timeRange}
            theme={theme}
          />
          <SensorChart
            data={filteredChrono}
            dataKey="humidity"
            title="Humedad"
            color={theme === 'neobrutal' ? '#3b82ff' : '#3b82f6'}
            unit="%"
            timeRange={timeRange}
            theme={theme}
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <SensorChart
            data={filteredChrono}
            dataKey="pressure"
            title="Presión Atmosférica"
            color={theme === 'neobrutal' ? '#10b981' : '#10b981'}
            unit="hPa"
            timeRange={timeRange}
            theme={theme}
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