/*
  Warnings:

  - You are about to drop the column `resume` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "resume",
ADD COLUMN     "interviewCount" INTEGER,
ADD COLUMN     "parsedResume" TEXT,
ADD COLUMN     "password" TEXT,
ADD COLUMN     "reportIds" INTEGER[];

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "totalQ" INTEGER,
    "QAnswered" INTEGER,
    "accuracy" INTEGER[],
    "feedback" TEXT[],
    "finalReport" TEXT,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);
