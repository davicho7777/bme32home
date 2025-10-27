import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
// Crear cliente de Supabase para uso en server-side (API route)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validar datos requeridos

    const { temperature, humidity, pressure, device_id, rssi, uptime, heap_free, heapFree, last_error, lastError } = body

    if (temperature === undefined || humidity === undefined || pressure === undefined || !device_id) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos: temperature, humidity, pressure, device_id' },
        { status: 400 }
      )
    }
    // Insertar en Supabase
    const { data, error } = await supabase
      .from('sensor_data')
      .insert([
        {
          device_id: String(device_id),
          temperature: parseFloat(temperature),
          humidity: parseFloat(humidity),
          pressure: parseFloat(pressure),
          rssi: rssi !== undefined ? parseInt(rssi) : null,
          uptime: uptime !== undefined ? Number(uptime) : null,
          heap_free: heap_free !== undefined ? parseInt(heap_free) : (heapFree !== undefined ? parseInt(heapFree) : null),
          last_error: last_error !== undefined ? String(last_error) : (lastError !== undefined ? String(lastError) : null),
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Error insertando en Supabase:', error)
      return NextResponse.json({ error: 'Error al guardar en Supabase', details: error.message }, { status: 500 })
    }

    return NextResponse.json(
      {
        message: 'Datos recibidos correctamente',
        data: {
          id: data.id,
          device_id: data.device_id,
          temperature: data.temperature,
          humidity: data.humidity,
          pressure: data.pressure,
          rssi: data.rssi,
          uptime: data.uptime,
          heapFree: data.heap_free,
          lastError: data.last_error,
          timestamp: data.created_at,
        }
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error procesando datos del sensor:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const limit = parseInt(url.searchParams.get('limit') || '200')
    const device_id = url.searchParams.get('device_id') || undefined
    const range = url.searchParams.get('range') // e.g., 1h, 6h, 24h, 7d, 30d
    const from = url.searchParams.get('from')
    const to = url.searchParams.get('to')
    const validated = url.searchParams.get('validated')

    let where: any = {}
    if (device_id) where.deviceId = device_id

    // Determinar ventana de tiempo

    // Construir filtros para Supabase
    let query = supabase.from('sensor_data').select('*').order('created_at', { ascending: false }).limit(limit)
    if (device_id) query = query.eq('device_id', device_id)

    // Filtros de tiempo
    let fromDate: Date | undefined
    let toDate: Date | undefined
    const now = new Date()
    if (to) {
      toDate = new Date(to)
    }
    if (from) {
      fromDate = new Date(from)
    } else if (range) {
      const match = range.match(/^(\d+)([hdw])$/)
      if (match) {
        const value = parseInt(match[1])
        const unit = match[2]
        const d = new Date(now)
        if (unit === 'h') d.setHours(d.getHours() - value)
        if (unit === 'd') d.setDate(d.getDate() - value)
        if (unit === 'w') d.setDate(d.getDate() - value * 7)
        fromDate = d
      }
    }
    if (fromDate) query = query.gte('created_at', fromDate.toISOString())
    if (toDate) query = query.lte('created_at', toDate.toISOString())

    // Validación de rangos plausibles
    if (validated && ['true', '1', 'yes'].includes(validated.toLowerCase())) {
      query = query.gte('temperature', -40).lte('temperature', 85)
        .gte('humidity', 0).lte('humidity', 100)
        .gte('pressure', 300).lte('pressure', 1100)
    }

    const { data, error } = await query
    if (error) {
      console.error('Error consultando Supabase:', error)
      return NextResponse.json({ error: 'Error consultando Supabase', details: error.message }, { status: 500 })
    }

    const mapped = (data ?? []).map((r: any) => ({
      id: r.id,
      device_id: r.device_id,
      temperature: r.temperature,
      humidity: r.humidity,
      pressure: r.pressure,
      rssi: r.rssi,
      uptime: r.uptime,
      heapFree: r.heap_free,
      lastError: r.last_error,
      timestamp: r.created_at,
    }))

    return NextResponse.json(mapped, { status: 200 })
  } catch (error) {
    console.error('Error obteniendo datos del sensor:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// Endpoint para obtener estadísticas
export async function HEAD(request: NextRequest) {
  try {

    // Total de registros
    const { count: totalRecords, error: countError } = await supabase
      .from('sensor_data')
      .select('*', { count: 'exact', head: true })
    if (countError) {
      console.error('Error contando registros:', countError)
      return NextResponse.json({ error: 'Error contando registros', details: countError.message }, { status: 500 })
    }

    // Dispositivos únicos
    const { data: devicesRows, error: devicesError } = await supabase
      .from('sensor_data')
      .select('device_id')
      .neq('device_id', null)
      .order('device_id', { ascending: true })
    if (devicesError) {
      console.error('Error obteniendo dispositivos:', devicesError)
      return NextResponse.json({ error: 'Error obteniendo dispositivos', details: devicesError.message }, { status: 500 })
    }
    const devices = Array.from(new Set((devicesRows ?? []).map((d: any) => d.device_id)))

    // Último registro
    const { data: latestArr, error: latestError } = await supabase
      .from('sensor_data')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
    if (latestError) {
      console.error('Error obteniendo último registro:', latestError)
      return NextResponse.json({ error: 'Error obteniendo último registro', details: latestError.message }, { status: 500 })
    }
    const latest = latestArr && latestArr.length > 0 ? latestArr[0] : null

    // Primer registro
    const { data: oldestArr, error: oldestError } = await supabase
      .from('sensor_data')
      .select('*')
      .order('created_at', { ascending: true })
      .limit(1)
    if (oldestError) {
      console.error('Error obteniendo primer registro:', oldestError)
      return NextResponse.json({ error: 'Error obteniendo primer registro', details: oldestError.message }, { status: 500 })
    }
    const oldest = oldestArr && oldestArr.length > 0 ? oldestArr[0] : null

    return NextResponse.json({
      totalRecords,
      devices,
      latestData: latest
        ? {
            id: latest.id,
            device_id: latest.device_id,
            temperature: latest.temperature,
            humidity: latest.humidity,
            pressure: latest.pressure,
            timestamp: latest.created_at,
          }
        : null,
      oldestData: oldest
        ? {
            id: oldest.id,
            device_id: oldest.device_id,
            temperature: oldest.temperature,
            humidity: oldest.humidity,
            pressure: oldest.pressure,
            timestamp: oldest.created_at,
          }
        : null,
    }, { status: 200 })

  } catch (error) {
    console.error('Error obteniendo estadísticas:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}