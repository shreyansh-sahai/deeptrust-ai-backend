-- AlterTable
ALTER TABLE "users" ADD COLUMN     "contactId" TEXT,
ADD COLUMN     "metadata" JSONB NOT NULL DEFAULT '{}';
