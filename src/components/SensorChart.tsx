"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, addMinutes } from 'date-fns';

interface SensorData {
  id?: string;
  temperature?: number;
  humidity?: number;
  pressure?: number;
  device_id?: string;
  timestamp: string;
}

interface SensorChartProps {
  data: SensorData[];
  dataKey: keyof Pick<SensorData, 'temperature' | 'humidity' | 'pressure'>;
  title: string;
  color: string;
  unit: string;
  timeRange: '10m' | '1h' | '6h' | '24h' | '7d' | '30d' | '365d';
}

export default function SensorChart({ data, dataKey, title, color, unit, timeRange }: SensorChartProps) {
  // Determinar minutos según el rango seleccionado
  let timeRangeMinutes = 60;
  switch (timeRange) {
    case '10m': timeRangeMinutes = 10; break;
    case '1h': timeRangeMinutes = 60; break;
    case '6h': timeRangeMinutes = 360; break;
    case '24h': timeRangeMinutes = 1440; break;
    case '7d': timeRangeMinutes = 10080; break;
    case '30d': timeRangeMinutes = 43200; break;
    case '365d': timeRangeMinutes = 525600; break;
  }

  // Usar el último dato como referencia final, si no hay datos usar ahora
  const endTime = data.length > 0 ? new Date(data[data.length - 1].timestamp) : new Date();
  const startTime = new Date(endTime.getTime() - timeRangeMinutes * 60 * 1000);

  // Paso de ticks según el rango
  let step = 1;
  if (timeRange === '10m') step = 1;
  else if (timeRange === '1h') step = 5;
  else if (timeRange === '6h') step = 30;
  else if (timeRange === '24h') step = 60;
  else if (timeRange === '7d') step = 180;
  else if (timeRange === '30d') step = 720;
  else if (timeRange === '365d') step = 1440;

  // Generar los puntos del eje X (ticks) aunque no haya datos
  const ticks: string[] = [];
  let t = new Date(startTime);
  while (t <= endTime) {
    ticks.push(t.toISOString());
    t = new Date(t.getTime() + step * 60 * 1000);
  }

  // Mezclar los datos reales con los ticks vacíos, dejando huecos (connectNulls=false)
  const dataMap = new Map(data.map((d: SensorData) => [format(new Date(d.timestamp), "yyyy-MM-dd'T'HH:mm"), d]));
  const chartData = ticks.map(ts => {
    const key = format(new Date(ts), "yyyy-MM-dd'T'HH:mm");
    return dataMap.get(key) || { timestamp: ts };
  });

  const formatTime = (timestamp: string) => {
    return format(new Date(timestamp), timeRangeMinutes >= 1440 ? 'dd/MM HH:mm' : 'HH:mm');
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-md">
          <p className="text-sm text-gray-600">
            {format(new Date(label), 'dd/MM HH:mm')}
          </p>
          <p className="font-medium" style={{ color: color }}>
            {`${title}: ${payload[0].value !== undefined ? payload[0].value.toFixed(1) : '--'} ${unit}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatTime}
              stroke="#666"
              fontSize={12}
              ticks={ticks}
              minTickGap={0}
            />
            <YAxis
              stroke="#666"
              fontSize={12}
              domain={['dataMin - 1', 'dataMax + 1']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
/*
'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { format, addMinutes, addHours, addDays, isAfter, isBefore } from 'date-fns'

interface SensorData {
  id: string
  temperature: number
  humidity: number
  pressure: number
  device_id: string
  timestamp: string
}

interface SensorChartProps {
  data: SensorData[]
  dataKey: keyof Pick<SensorData, 'temperature' | 'humidity' | 'pressure'>
  title: string
  color: string
  unit: string
}


  // Determinar el rango de tiempo a mostrar según los datos
  let timeRangeMinutes = 60; // default 1h
  if (data.length > 1) {
    const first = new Date(data[0].timestamp);
    const last = new Date(data[data.length - 1].timestamp);
    const diffMs = last.getTime() - first.getTime();
    const diffMin = Math.round(diffMs / 60000);
    if (diffMin > 60 && diffMin <= 360) timeRangeMinutes = 360; // 6h
    else if (diffMin > 360 && diffMin <= 1440) timeRangeMinutes = 1440; // 24h
    else if (diffMin > 1440 && diffMin <= 10080) timeRangeMinutes = 10080; // 7d
    else if (diffMin > 10080 && diffMin <= 43200) timeRangeMinutes = 43200; // 30d
    else if (diffMin > 43200) timeRangeMinutes = 525600; // 1a
    else timeRangeMinutes = 60;
  }

  // Si hay datos, usar el último timestamp como referencia final
  const endTime = data.length > 0 ? new Date(data[data.length - 1].timestamp) : new Date();

  'use client'

  import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
  import { format, addMinutes } from 'date-fns'

  interface SensorData {
    id?: string
    temperature?: number
    humidity?: number
    pressure?: number
    device_id?: string
    timestamp: string
  }

  interface SensorChartProps {
    data: SensorData[]
    dataKey: keyof Pick<SensorData, 'temperature' | 'humidity' | 'pressure'>
    title: string
    color: string
    unit: string
    timeRange: '10m' | '1h' | '6h' | '24h' | '7d' | '30d' | '365d'
  }

  export default function SensorChart({ data, dataKey, title, color, unit, timeRange }: SensorChartProps) {
    // Determinar minutos según el rango seleccionado
    let timeRangeMinutes = 60;
    switch (timeRange) {
      case '10m': timeRangeMinutes = 10; break;
      case '1h': timeRangeMinutes = 60; break;
      case '6h': timeRangeMinutes = 360; break;
      case '24h': timeRangeMinutes = 1440; break;
      case '7d': timeRangeMinutes = 10080; break;
      case '30d': timeRangeMinutes = 43200; break;
      case '365d': timeRangeMinutes = 525600; break;
    }

    // Usar el último dato como referencia final, si no hay datos usar ahora
    const endTime = data.length > 0 ? new Date(data[data.length - 1].timestamp) : new Date();
    const startTime = new Date(endTime.getTime() - timeRangeMinutes * 60 * 1000);

    // Paso de ticks según el rango
    let step = 1;
    if (timeRange === '10m') step = 1;
    else if (timeRange === '1h') step = 5;
    else if (timeRange === '6h') step = 30;
    else if (timeRange === '24h') step = 60;
    else if (timeRange === '7d') step = 180;
    else if (timeRange === '30d') step = 720;
    else if (timeRange === '365d') step = 1440;

    // Generar los puntos del eje X (ticks) aunque no haya datos
    const ticks: string[] = [];
    let t = new Date(startTime);
    while (t <= endTime) {
      ticks.push(t.toISOString());
      t = new Date(t.getTime() + step * 60 * 1000);
    }

    // Mezclar los datos reales con los ticks vacíos
    const dataMap = new Map(data.map((d: SensorData) => [format(new Date(d.timestamp), "yyyy-MM-dd'T'HH:mm"), d]));
    const chartData = ticks.map(ts => {
      const key = format(new Date(ts), "yyyy-MM-dd'T'HH:mm");
      return dataMap.get(key) || { timestamp: ts };
    });

    const formatTime = (timestamp: string) => {
      return format(new Date(timestamp), timeRangeMinutes >= 1440 ? 'dd/MM HH:mm' : 'HH:mm')
    }

    const CustomTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-md">
            <p className="text-sm text-gray-600">
              {format(new Date(label), 'dd/MM HH:mm')}
            </p>
            <p className="font-medium" style={{ color: color }}>
              {`${title}: ${payload[0].value !== undefined ? payload[0].value.toFixed(1) : '--'} ${unit}`}
            </p>
          </div>
        )
      }
      return null
    }

    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="timestamp" 
                tickFormatter={formatTime}
                stroke="#666"
                fontSize={12}
                ticks={ticks}
                minTickGap={0}
              />
              <YAxis 
                stroke="#666"
                fontSize={12}
                domain={['dataMin - 1', 'dataMax + 1']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey={dataKey} 
                stroke={color} 
                strokeWidth={2}
                dot={{ fill: color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
  }
        </ResponsiveContainer>
      </div>
    </div>
  )
}
*/