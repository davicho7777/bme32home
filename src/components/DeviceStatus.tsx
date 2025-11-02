'use client'

import { Wifi, WifiOff, Clock } from 'lucide-react'
import { format } from 'date-fns'

interface DeviceStatusProps {
	isConnected: boolean
	lastUpdate?: string
}

type CozyTheme = 'default' | 'neobrutal' | 'cyberpunk' | 'cozy'

export default function DeviceStatus(
	{ isConnected, lastUpdate, theme = 'default' }: DeviceStatusProps & { theme?: CozyTheme }
) {
	// Layout especial para tema cozy
	if (theme === 'cozy') {
		return (
			<div className="cozy-card cozy-card-shadow">
				<div className="cozy-inner">
					<div className="cozy-header">
						<div className="cozy-avatar">
							{isConnected ? (
								<Wifi className="w-7 h-7 text-emerald-400" />
							) : (
								<WifiOff className="w-7 h-7 text-rose-400" />
							)}
						</div>
						<div>
							<div className="cozy-title">{isConnected ? 'Conectado' : 'Desconectado'}</div>
							<div className="cozy-subtitle flex items-center gap-2">
								<span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
								{lastUpdate && (
									<>
										<Clock className="w-4 h-4 inline-block text-gray-400" />
										<span>{format(new Date(lastUpdate), 'HH:mm:ss')}</span>
									</>
								)}
							</div>
						</div>
					</div>
					<div className="cozy-body">
						{/* Detalles adicionales del dispositivo (opcional) */}
					</div>
				</div>
			</div>
		)
	}

	// Resto de temas
	let cardClass = 'flex items-center space-x-4 '
	if (theme === 'neobrutal') {
		cardClass = 'neo-card p-2 flex items-center space-x-3 neo-card-shadow-4 '
	} else if (theme === 'cyberpunk') {
		cardClass = 'cyber-card p-2 flex items-center space-x-3 cyber-card-shadow-4 '
	}

	return (
		<div className={cardClass}>
			<div className="flex items-center space-x-2">
				{isConnected ? (
					<>
						<Wifi className="w-5 h-5 text-green-500" />
						<span className={`text-sm font-medium ${theme === 'cyberpunk' ? 'cyber-text-cyan' : 'text-green-700'}`}>Conectado</span>
					</>
				) : (
					<>
						<WifiOff className="w-5 h-5 text-red-500" />
						<span className={`text-sm font-medium ${theme === 'cyberpunk' ? 'cyber-text-magenta' : 'text-red-700'}`}>Desconectado</span>
					</>
				)}
			</div>

			{lastUpdate && (
				<div className={`flex items-center space-x-2 ${theme === 'cyberpunk' ? 'cyber-text-cyan' : 'text-gray-600'}`}>
					<Clock className="w-4 h-4" />
					<span className="text-sm">{format(new Date(lastUpdate), 'HH:mm:ss')}</span>
				</div>
			)}

			<div
				className={`w-2 h-2 rounded-full ${
					isConnected
						? theme === 'cyberpunk'
							? 'bg-cyan-400 animate-pulse'
							: 'bg-green-500 animate-pulse'
						: theme === 'cyberpunk'
							? 'bg-pink-500'
							: 'bg-red-500'
				}`}
			/>
		</div>
	)
}