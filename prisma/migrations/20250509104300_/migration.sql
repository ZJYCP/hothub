/*
  Warnings:

  - Added the required column `url` to the `HotTrend` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HotTrend" ADD COLUMN     "url" TEXT NOT NULL;
