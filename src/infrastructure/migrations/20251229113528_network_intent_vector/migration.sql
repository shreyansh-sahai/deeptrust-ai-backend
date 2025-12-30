CREATE EXTENSION IF NOT EXISTS vector;
-- AlterTable
ALTER TABLE "network_user_intents" ADD COLUMN     "embedding" vector(1536);
