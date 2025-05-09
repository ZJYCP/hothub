/*
  Warnings:

  - You are about to drop the column `heart` on the `HotTrend` table. All the data in the column will be lost.
  - Added the required column `heat` to the `HotTrend` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HotTrend" DROP COLUMN "heart",
ADD COLUMN     "heat" INTEGER NOT NULL,
ALTER COLUMN "analyse" DROP NOT NULL;
