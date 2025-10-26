"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, CheckCircle2 } from 'lucide-react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, getYear, getMonth } from 'date-fns';
import { es } from 'date-fns/locale';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function getLocalDate(dateString: string) {
  // Ajusta a tu zona horaria local (CDMX, UTC-6)
  const date = new Date(dateString)
  return new Date(date.getTime() - (date.getTimezoneOffset() * 60000))
}

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

export default function CalendarPage() {
  const router = useRouter();
  const [daysWithData, setDaysWithData] = useState<string[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [yearsWithData, setYearsWithData] = useState<number[]>([]);
  const [monthsWithData, setMonthsWithData] = useState<{ [year: number]: number[] }>({});
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const yearDropdownRef = useRef<HTMLDivElement>(null);
  const monthDropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdowns al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target as Node)) {
        setShowYearDropdown(false);
      }
      if (monthDropdownRef.current && !monthDropdownRef.current.contains(event.target as Node)) {
        setShowMonthDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cargar días, meses y años con datos
  useEffect(() => {
    fetch(`/api/sensor-data?range=365d&limit=2000&validated=true`)
      .then(res => res.json())
      .then(data => {
        const days = Array.from(new Set(
          data.map((d: any) => format(getLocalDate(d.timestamp), 'yyyy-MM-dd'))
        ));
        setDaysWithData(days as string[]);

        // Años y meses con datos
        const yearSet = new Set<number>();
        const monthMap: { [year: number]: number[] } = {};
        data.forEach((d: any) => {
          const date = getLocalDate(d.timestamp);
          const y = getYear(date);
          const m = getMonth(date);
          yearSet.add(y);
          if (!monthMap[y]) monthMap[y] = [];
          if (!monthMap[y].includes(m)) monthMap[y].push(m);
        });
        setYearsWithData(Array.from(yearSet).sort((a, b) => a - b));
        setMonthsWithData(monthMap);
      });
  }, []);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const currentYear = getYear(currentMonth);
  const currentMonthNum = getMonth(currentMonth);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'yyyy-MM-dd');
      const isCurrentMonth = isSameMonth(day, monthStart);
      const hasData = daysWithData.includes(formattedDate);
      days.push(
        <div
          key={day.toString()}
          className={`flex items-center justify-center aspect-square w-10 sm:w-12 md:w-14 lg:w-16 rounded-lg mx-auto mb-1 text-base font-semibold transition-all
            ${isCurrentMonth ? 'bg-white' : 'bg-gray-100 text-gray-400'}
            ${hasData ? 'ring-2 ring-blue-500 bg-blue-100 text-blue-800 font-bold shadow' : ''}
            hover:bg-blue-200 hover:text-blue-900 cursor-pointer select-none`
          }
        >
          {format(day, 'd', { locale: es })}
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="grid grid-cols-7 gap-1" key={day.toString()}>
        {days}
      </div>
    );
    days = [];
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Calendario de Datos del Sensor</h1>
      <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
        <div className="flex gap-2">
          {/* Dropdown estilizado de año */}
          <div className="relative" ref={yearDropdownRef}>
            <button
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-300 bg-white font-semibold shadow-sm hover:bg-blue-50 transition"
              onClick={() => setShowYearDropdown((v) => !v)}
              type="button"
            >
              {currentYear}
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            {showYearDropdown && (
              <div className="absolute z-20 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto animate-fade-in">
                {yearsWithData.map((y) => (
                  <button
                    key={y}
                    className={`flex items-center w-full px-3 py-2 text-left hover:bg-blue-100 transition font-medium ${y === currentYear ? 'bg-blue-100 text-blue-800' : ''}`}
                    onClick={() => {
                      setCurrentMonth(new Date(y, currentMonthNum, 1));
                      setShowYearDropdown(false);
                    }}
                  >
                    {monthsWithData[y] && monthsWithData[y].length > 0 && (
                      <CheckCircle2 className="w-4 h-4 text-blue-500 mr-2" />
                    )}
                    {y}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Dropdown estilizado de mes */}
          <div className="relative" ref={monthDropdownRef}>
            <button
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-300 bg-white font-semibold shadow-sm hover:bg-blue-50 transition"
              onClick={() => setShowMonthDropdown((v) => !v)}
              type="button"
            >
              {format(new Date(currentYear, currentMonthNum, 1), 'MMMM', { locale: es })}
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            {showMonthDropdown && (
              <div className="absolute z-20 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-2 animate-fade-in">
                <div className="grid grid-cols-3 grid-rows-4 gap-2">
                  {[...Array(12)].map((_, m) => (
                    <button
                      key={m}
                      className={`flex items-center justify-start w-full px-2 py-2 rounded-lg text-left hover:bg-blue-100 transition font-medium text-sm
                        ${m === currentMonthNum ? 'bg-blue-100 text-blue-800 font-bold' : ''}
                        ${monthsWithData[currentYear]?.includes(m) ? '' : 'opacity-40 cursor-not-allowed'}`}
                      onClick={() => {
                        if (monthsWithData[currentYear]?.includes(m)) {
                          setCurrentMonth(new Date(currentYear, m, 1));
                          setShowMonthDropdown(false);
                        }
                      }}
                      disabled={!monthsWithData[currentYear]?.includes(m)}
                    >
                      {monthsWithData[currentYear]?.includes(m) && (
                        <CheckCircle2 className="w-4 h-4 text-blue-500 mr-1" />
                      )}
                      {format(new Date(currentYear, m, 1), 'MMM', { locale: es })}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          <button
            className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-blue-100 font-medium border border-gray-300 shadow-sm transition"
            onClick={() => setCurrentMonth(addDays(monthStart, -1))}
          >
            ← Mes anterior
          </button>
          <span className="font-semibold text-lg">
            {format(currentMonth, 'MMMM yyyy', { locale: es })}
          </span>
          <button
            className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-blue-100 font-medium border border-gray-300 shadow-sm transition"
            onClick={() => setCurrentMonth(addDays(monthEnd, 1))}
          >
            Mes siguiente →
          </button>
          <button
            className="px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold border border-blue-600 shadow-sm transition ml-2"
            onClick={() => router.push('/')}
            title="Ir a la página principal"
          >
            Ir al inicio
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(d => (
          <div key={d} className="text-center text-xs font-semibold text-gray-500 py-1">{d}</div>
        ))}
      </div>
      <div className="flex flex-col gap-1">
        {rows}
      </div>
      <div className="mt-4 text-sm text-gray-600 flex items-center gap-2 justify-center">
        <span className="inline-block w-4 h-4 rounded ring-2 ring-blue-500 bg-blue-100 mr-1"></span> Día con datos registrados
      </div>
      <div className="mt-8">
        <SensorChart 
          data={[]} // Aquí debes pasar los datos reales
          dataKey="temperature"
          title="Temperatura"
          color="#ff7300"
          unit="°C"
          timeRange="24h"
        />
      </div>
    </div>
  );
}

function SensorChart({ data, dataKey, title, color, unit, timeRange }: SensorChartProps) {
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
