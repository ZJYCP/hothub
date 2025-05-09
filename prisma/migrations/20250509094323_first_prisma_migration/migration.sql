-- CreateTable
CREATE TABLE "HotTrend" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "analyse" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "heart" INTEGER NOT NULL,
    "metric" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HotTrend_pkey" PRIMARY KEY ("id")
);
