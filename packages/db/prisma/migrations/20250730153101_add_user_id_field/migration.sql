/*
  Warnings:

  - Added the required column `useId` to the `Model` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Model" ADD COLUMN     "useId" TEXT NOT NULL;
