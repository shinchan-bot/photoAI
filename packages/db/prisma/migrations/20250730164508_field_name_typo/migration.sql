/*
  Warnings:

  - You are about to drop the column `useId` on the `Model` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Model` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Model" DROP COLUMN "useId",
ADD COLUMN     "userId" TEXT NOT NULL;
