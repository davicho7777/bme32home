-- Prisma migration adjusted for PostgreSQL
-- CreateTable
CREATE TABLE IF NOT EXISTS "SensorData" (
    "id" TEXT PRIMARY KEY,
    "deviceId" TEXT NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "humidity" DOUBLE PRECISION NOT NULL,
    "pressure" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- CreateIndex
CREATE INDEX IF NOT EXISTS "SensorData_deviceId_created_at_idx" ON "SensorData" ("deviceId", "created_at");
