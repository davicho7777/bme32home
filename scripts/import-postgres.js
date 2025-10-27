/*
 Import SensorData JSON into Postgres using Prisma default client
 Requires: DATABASE_URL in .env pointing to Postgres (Supabase)
 Usage:
   npm run import:postgres
*/

const path = require('path')
const fs = require('fs')
require('dotenv').config()

const { PrismaClient } = require('@prisma/client')

async function chunk(array, size) {
  const res = []
  for (let i = 0; i < array.length; i += size) res.push(array.slice(i, i + size))
  return res
}

async function main() {
  const inFile = path.join(__dirname, '..', 'tmp', 'sqlite-export.json')
  if (!fs.existsSync(inFile)) {
    console.error(`[import] File not found: ${inFile}. Run export first.`)
    process.exit(1)
  }
  const raw = fs.readFileSync(inFile, 'utf-8')
  /** @type {Array<any>} */
  const rows = JSON.parse(raw)

  // Restore BigInt
  const prepared = rows.map(r => ({
    id: r.id,
    deviceId: r.deviceId,
    temperature: r.temperature,
    humidity: r.humidity,
    pressure: r.pressure,
    rssi: r.rssi ?? null,
    uptime: r.uptime != null ? BigInt(r.uptime) : null,
    heapFree: r.heapFree ?? null,
    lastError: r.lastError ?? null,
    createdAt: new Date(r.createdAt),
  }))

  const prisma = new PrismaClient({ log: ['error'] })

  console.log(`[import] Importing ${prepared.length} records into Postgres...`)
  const batches = await chunk(prepared, 1000)
  let inserted = 0
  for (const batch of batches) {
    if (batch.length === 0) continue
    const res = await prisma.sensorData.createMany({
      data: batch,
      skipDuplicates: true,
    })
    inserted += res.count
    console.log(`[import] Inserted +${res.count} (total: ${inserted})`)
  }

  await prisma.$disconnect()
  console.log('[import] Done!')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
