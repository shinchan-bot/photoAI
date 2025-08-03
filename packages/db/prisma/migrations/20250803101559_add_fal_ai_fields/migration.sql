-- CreateEnum
CREATE TYPE "public"."ModelTrainingPendingStatus" AS ENUM ('Pending', 'Generated', 'Failed');

-- AlterTable
ALTER TABLE "public"."Model" ADD COLUMN     "falAiRequestId" TEXT,
ADD COLUMN     "tensorPath" TEXT,
ADD COLUMN     "trainingStatus" "public"."ModelTrainingPendingStatus" NOT NULL DEFAULT 'Pending',
ADD COLUMN     "triggerWord" TEXT;

-- AlterTable
ALTER TABLE "public"."OutputImages" ADD COLUMN     "falAiRequestId" TEXT;
