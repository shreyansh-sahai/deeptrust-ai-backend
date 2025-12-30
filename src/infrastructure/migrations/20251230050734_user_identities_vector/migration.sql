-- AlterTable
ALTER TABLE "user_identities" ADD COLUMN     "embedding" vector(1536),
ALTER COLUMN "identity" SET DEFAULT '{}';
