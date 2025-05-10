/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `open_api_apps` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "open_api_apps" DROP COLUMN "updatedAt",
ADD COLUMN     "remark" TEXT;
