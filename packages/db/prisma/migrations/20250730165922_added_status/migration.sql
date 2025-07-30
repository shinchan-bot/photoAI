/*
  Warnings:

  - Added the required column `prompt` to the `OutPutImage` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."OutPutImageStatusEnum" AS ENUM ('Pending', 'Generated', 'Failed');

-- AlterTable
ALTER TABLE "public"."OutPutImage" ADD COLUMN     "prompt" TEXT NOT NULL,
ADD COLUMN     "status" "public"."OutPutImageStatusEnum" NOT NULL DEFAULT 'Pending';
