/*
  Warnings:

  - The values [AsianAmerican,EastAsian,SouthEastAsian,MiddleEastern] on the enum `EthinicityEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."EthinicityEnum_new" AS ENUM ('White', 'Black', 'Asian American', 'East Asian', 'South East Asian', 'Middle Eastern', 'Pacific', 'Hispanic');
ALTER TABLE "public"."Model" ALTER COLUMN "ethinicity" TYPE "public"."EthinicityEnum_new" USING ("ethinicity"::text::"public"."EthinicityEnum_new");
ALTER TYPE "public"."EthinicityEnum" RENAME TO "EthinicityEnum_old";
ALTER TYPE "public"."EthinicityEnum_new" RENAME TO "EthinicityEnum";
DROP TYPE "public"."EthinicityEnum_old";
COMMIT;
