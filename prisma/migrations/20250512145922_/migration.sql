/*
  Warnings:

  - A unique constraint covering the columns `[appId]` on the table `open_api_apps` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "HotTrend_title_key";

-- CreateTable
CREATE TABLE "sync_task_records" (
    "id" SERIAL NOT NULL,
    "taskName" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sync_task_records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "open_api_apps_appId_key" ON "open_api_apps"("appId");
