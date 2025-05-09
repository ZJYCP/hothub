/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `HotTrend` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `source` to the `HotTrend` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HotTrend" ADD COLUMN     "source" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "HotTrend_title_key" ON "HotTrend"("title");
