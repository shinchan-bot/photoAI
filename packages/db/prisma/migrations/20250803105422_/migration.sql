/*
  Warnings:

  - The values [Completed] on the enum `ModelTrainingPendingStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."ModelTrainingPendingStatus_new" AS ENUM ('Pending', 'Generated', 'Failed');
ALTER TABLE "public"."Model" ALTER COLUMN "trainingStatus" DROP DEFAULT;
ALTER TABLE "public"."Model" ALTER COLUMN "trainingStatus" TYPE "public"."ModelTrainingPendingStatus_new" USING ("trainingStatus"::text::"public"."ModelTrainingPendingStatus_new");
ALTER TYPE "public"."ModelTrainingPendingStatus" RENAME TO "ModelTrainingPendingStatus_old";
ALTER TYPE "public"."ModelTrainingPendingStatus_new" RENAME TO "ModelTrainingPendingStatus";
DROP TYPE "public"."ModelTrainingPendingStatus_old";
ALTER TABLE "public"."Model" ALTER COLUMN "trainingStatus" SET DEFAULT 'Pending';
COMMIT;
