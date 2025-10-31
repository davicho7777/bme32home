'use client'

import { Wifi, WifiOff, Clock } from 'lucide-react'
import { format } from 'date-fns'

interface DeviceStatusProps {
  isConnected: boolean
  lastUpdate?: string
  neo?: boolean
}

export default function DeviceStatus({ isConnected, lastUpdate, neo = false }: DeviceStatusProps) {
  const wrapCls = neo
    ? "flex items-center space-x-4 px-3 py-2 border-2 border-black rounded-none bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
    : "flex items-center space-x-4";
  return (
    <div className={wrapCls}>
      <div className="flex items-center space-x-2">
        {isConnected ? (
          <>
            <Wifi className={neo ? "w-5 h-5 text-green-600" : "w-5 h-5 text-green-500"} />
            <span className={neo ? "text-sm font-bold text-green-800" : "text-sm font-medium text-green-700"}>Conectado</span>
          </>
        ) : (
          <>
            <WifiOff className={neo ? "w-5 h-5 text-red-600" : "w-5 h-5 text-red-500"} />
            <span className={neo ? "text-sm font-bold text-red-800" : "text-sm font-medium text-red-700"}>Desconectado</span>
          </>
        )}
      </div>
      
      {lastUpdate && (
        <div className={neo ? "flex items-center space-x-2 text-gray-900" : "flex items-center space-x-2 text-gray-600"}>
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