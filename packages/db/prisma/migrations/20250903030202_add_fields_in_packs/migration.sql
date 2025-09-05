/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Packs` table. All the data in the column will be lost.
  - Added the required column `imageUrl1` to the `Packs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl2` to the `Packs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Packs" DROP COLUMN "imageUrl",
ADD COLUMN     "imageUrl1" TEXT NOT NULL,
ADD COLUMN     "imageUrl2" TEXT NOT NULL;
