'use client'

import { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: number
  unit: string
  icon: LucideIcon
  color: string
  bgColor: string
  theme?: 'default' | 'neobrutal' | 'cyberpunk' | 'cozy'
  className?: string
}

export default function StatsCard({ title, value, unit, icon: Icon, color, bgColor, theme = 'default', className = '' }: StatsCardProps) {
  let cardClass = 'rounded-lg p-6 ';
  if (theme === 'neobrutal') {
    cardClass += 'neo-card border-black neo-card-shadow-4 ';
  } else if (theme === 'cyberpunk') {
    cardClass += 'cyber-card cyber-card-shadow-4 ';
  } else if (theme === 'cozy') {
    cardClass += 'cozy-card cozy-card-shadow ';
  } else {
    cardClass += 'bg-white border border-gray-200 shadow ';
  }

  if (theme === 'cozy') {
    return (
      <div className={`${cardClass}${className ? ' ' + className : ''}`}>
        <div className="cozy-inner">
          <div className="cozy-header">
            <div className="cozy-avatar">
              <Icon className={`w-8 h-8 ${color}`} />
            </div>
            <div>
              <div className="cozy-title">{title}</div>
              <div className="cozy-subtitle">{value.toFixed(1)} <span>{unit}</span></div>
            </div>
          </div>
          <div className="cozy-body">
            {/* Aquí puedes poner una breve descripción o dejarlo vacío */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${cardClass}${className ? ' ' + className : ''}`}>
      <div className={`flex items-center justify-between ${theme === 'neobrutal' ? 'pl-3' : ''}`}>
        <div>
          <p className={`text-sm font-medium ${theme === 'cyberpunk' ? 'cyber-text-cyan' : 'text-gray-600'}`}>{title}</p>
          <p className={`text-2xl font-bold mt-1 ${theme === 'cyberpunk' ? 'cyber-text-magenta' : 'text-gray-900'}`}> 
            {value.toFixed(1)} <span className={`text-lg font-normal ${theme === 'cyberpunk' ? 'cyber-text-cyan' : 'text-gray-500'}`}>{unit}</span>
          </p>
        </div>
        <div className={`p-3 rounded-full ${bgColor} ${theme === 'cyberpunk' ? 'cyber-glow' : ''}`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      </div>
    </div>
  );
}