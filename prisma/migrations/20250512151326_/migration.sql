/*
  Warnings:

  - You are about to drop the column `status` on the `sync_task_records` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title,source]` on the table `HotTrend` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[taskName]` on the table `sync_task_records` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `lastSyncAt` to the `sync_task_records` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sync_task_records" DROP COLUMN "status",
ADD COLUMN     "lastSyncAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "HotTrend_title_source_key" ON "HotTrend"("title", "source");

-- CreateIndex
CREATE UNIQUE INDEX "sync_task_records_taskName_key" ON "sync_task_records"("taskName");
