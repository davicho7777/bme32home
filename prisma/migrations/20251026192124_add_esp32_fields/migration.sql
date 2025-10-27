-- Prisma migration adjusted for PostgreSQL
-- AlterTable
ALTER TABLE "SensorData" 
	ADD COLUMN IF NOT EXISTS "heapFree" INTEGER,
	ADD COLUMN IF NOT EXISTS "lastError" TEXT,
	ADD COLUMN IF NOT EXISTS "rssi" INTEGER,
	ADD COLUMN IF NOT EXISTS "uptime" BIGINT;
