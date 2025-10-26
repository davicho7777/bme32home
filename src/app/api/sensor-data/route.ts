import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

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
    const record = await prisma.sensorData.create({
      data: {
        deviceId: String(device_id),
        temperature: parseFloat(temperature),
        humidity: parseFloat(humidity),
        pressure: parseFloat(pressure),
        rssi: rssi !== undefined ? parseInt(rssi) : null,
        uptime: uptime !== undefined ? BigInt(uptime) : null,
        heapFree: heap_free !== undefined ? parseInt(heap_free) : (heapFree !== undefined ? parseInt(heapFree) : null),
        lastError: last_error !== undefined ? String(last_error) : (lastError !== undefined ? String(lastError) : null),
      }
    })

    console.log('Datos recibidos del ESP32:', record)


    return NextResponse.json(
      {
        message: 'Datos recibidos correctamente',
        data: {
          id: record.id,
          device_id: record.deviceId,
          temperature: record.temperature,
          humidity: record.humidity,
          pressure: record.pressure,
          rssi: record.rssi,
          uptime: record.uptime != null ? Number(record.uptime) : null,
          heapFree: record.heapFree,
          lastError: record.lastError,
          timestamp: record.createdAt,
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
    if (fromDate || toDate) {
      where.createdAt = {}
      if (fromDate) where.createdAt.gte = fromDate
      if (toDate) where.createdAt.lte = toDate
    }

    // Si se solicita validación, filtrar por rangos plausibles en base de datos
    if (validated && ['true', '1', 'yes'].includes(validated.toLowerCase())) {
      where.AND = [
        { temperature: { gt: -40, lt: 85 } },
        { humidity: { gte: 0, lte: 100 } },
        { pressure: { gt: 300, lt: 1100 } },
      ]
    }

    const rows = await prisma.sensorData.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
    })


    const data = rows.map((r: any) => ({
      id: r.id,
      device_id: r.deviceId,
      temperature: r.temperature,
      humidity: r.humidity,
      pressure: r.pressure,
      rssi: r.rssi,
      uptime: r.uptime != null ? Number(r.uptime) : null,
      heapFree: r.heapFree,
      lastError: r.lastError,
      timestamp: r.createdAt,
    }))

    return NextResponse.json(data, { status: 200 })

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
    const totalRecords = await prisma.sensorData.count()
    const devicesRows: { deviceId: string }[] = await prisma.sensorData.findMany({
      distinct: ['deviceId'],
      select: { deviceId: true },
    })
    const latest = await prisma.sensorData.findFirst({ orderBy: { createdAt: 'desc' } })
    const oldest = await prisma.sensorData.findFirst({ orderBy: { createdAt: 'asc' } })

    return NextResponse.json({
      totalRecords,
  devices: devicesRows.map((d: any) => d.deviceId),
      latestData: latest
        ? {
            id: latest.id,
            device_id: latest.deviceId,
            temperature: latest.temperature,
            humidity: latest.humidity,
            pressure: latest.pressure,
            timestamp: latest.createdAt,
          }
        : null,
      oldestData: oldest
        ? {
            id: oldest.id,
            device_id: oldest.deviceId,
            temperature: oldest.temperature,
            humidity: oldest.humidity,
            pressure: oldest.pressure,
            timestamp: oldest.createdAt,
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