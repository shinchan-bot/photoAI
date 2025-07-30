/*
  Warnings:

  - You are about to drop the `OutPutImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."OutputImageStatusEnum" AS ENUM ('Pending', 'Generated', 'Failed');

-- DropForeignKey
ALTER TABLE "public"."OutPutImage" DROP CONSTRAINT "OutPutImage_modelId_fkey";

-- DropTable
DROP TABLE "public"."OutPutImage";

-- DropEnum
DROP TYPE "public"."OutPutImageStatusEnum";

-- CreateTable
CREATE TABLE "public"."OutputImages" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL DEFAULT '',
    "modelId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "public"."OutputImageStatusEnum" NOT NULL DEFAULT 'Pending',
    "prompt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OutputImages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."OutputImages" ADD CONSTRAINT "OutputImages_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "public"."Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
