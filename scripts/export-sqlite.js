/*
 Export SensorData from SQLite to JSON
 Requires: SQLITE_URL in .env (e.g., SQLITE_URL="file:./prisma/dev.db")
 Usage:
   npm run generate:sqlite
   npm run export:sqlite
*/

const path = require('path')
const fs = require('fs')
require('dotenv').config()

const { PrismaClient } = require('../prisma/generated/sqlite-client')

async function main() {
  const outDir = path.join(__dirname, '..', 'tmp')
  const outFile = path.join(outDir, 'sqlite-export.json')
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

  const prisma = new PrismaClient({
    log: ['error']
  })

  console.log('[export] Starting export from SQLite...')
  const rows = await prisma.sensorData.findMany({ orderBy: { createdAt: 'asc' } })
  console.log(`[export] Fetched ${rows.length} rows`)

  // Prepare for JSON: convert BigInt to string to avoid JSON issues
  const data = rows.map(r => ({
    ...r,
    uptime: r.uptime != null ? r.uptime.toString() : null,
  }))

  fs.writeFileSync(outFile, JSON.stringify(data, null, 2))
  console.log(`[export] Wrote ${rows.length} records to ${outFile}`)

  await prisma.$disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
