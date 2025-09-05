/*
  Warnings:

  - Added the required column `imageUrl` to the `Packs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Packs" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ALTER COLUMN "name" SET DEFAULT '';
