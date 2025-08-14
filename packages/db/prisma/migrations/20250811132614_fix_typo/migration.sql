/*
  Warnings:

  - You are about to drop the column `ethinicity` on the `Model` table. All the data in the column will be lost.
  - Added the required column `ethnicity` to the `Model` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."EthnicityEnum" AS ENUM ('White', 'Black', 'Asian American', 'East Asian', 'South East Asian', 'Middle Eastern', 'Pacific', 'Hispanic');

-- AlterTable
ALTER TABLE "public"."Model" DROP COLUMN "ethinicity",
ADD COLUMN     "ethnicity" "public"."EthnicityEnum" NOT NULL;

-- DropEnum
DROP TYPE "public"."EthinicityEnum";
