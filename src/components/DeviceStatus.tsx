'use client'

import { Wifi, WifiOff, Clock } from 'lucide-react'
import { format } from 'date-fns'

interface DeviceStatusProps {
  isConnected: boolean
  lastUpdate?: string
}

export default function DeviceStatus({ isConnected, lastUpdate }: DeviceStatusProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        {isConnected ? (
          <>
            <Wifi className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium text-green-700">Conectado</span>
          </>
        ) : (
          <>
            <WifiOff className="w-5 h-5 text-red-500" />
            <span className="text-sm font-medium text-red-700">Desconectado</span>
          </>
        )}
      </div>
      
      {lastUpdate && (
        <div className="flex items-center space-x-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span className="text-sm">
            {format(new Date(lastUpdate), 'HH:mm:ss')}
          </span>
        </div>
      )}
      
      <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
    </div>
  )
}