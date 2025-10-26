-- AlterTable
ALTER TABLE "SensorData" ADD COLUMN "heapFree" INTEGER;
ALTER TABLE "SensorData" ADD COLUMN "lastError" TEXT;
ALTER TABLE "SensorData" ADD COLUMN "rssi" INTEGER;
ALTER TABLE "SensorData" ADD COLUMN "uptime" BIGINT;
