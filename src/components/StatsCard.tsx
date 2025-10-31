'use client'

import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: number
  unit: string
  icon: LucideIcon
  color: string
  bgColor: string
  neo?: boolean
}

export default function StatsCard({ title, value, unit, icon: Icon, color, bgColor, neo = false }: StatsCardProps) {
  return (
    <div
      className={
        neo
          ? "bg-white p-6 border-2 border-black rounded-none shadow-[6px_6px_0_0_rgba(0,0,0,1)]"
          : "bg-white rounded-lg shadow-md p-6 border border-gray-200"
      }
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={neo ? "text-sm font-bold text-gray-900" : "text-sm font-medium text-gray-600"}>{title}</p>
          <p className={neo ? "text-2xl font-extrabold text-gray-900 mt-1" : "text-2xl font-bold text-gray-900 mt-1"}>
            {value.toFixed(1)} <span className="text-lg font-normal text-gray-500">{unit}</span>
          </p>
        </div>
        {neo ? (
          <div className={`p-3 border-2 border-black rounded-none bg-white`}>
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
        ) : (
          <div className={`p-3 rounded-full ${bgColor}`}>
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
        )}
      </div>
    </div>
  )
}