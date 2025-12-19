-- CreateTable
CREATE TABLE "network_user_intents" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "intent" TEXT NOT NULL,
    "intent_description" TEXT NOT NULL,
    "metadata" JSONB NOT NULL DEFAULT '{}',
    "voice_file_link" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "network_user_intents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "network_user_intents_userId_idx" ON "network_user_intents"("userId");

-- CreateIndex
CREATE INDEX "network_user_intents_isDeleted_idx" ON "network_user_intents"("isDeleted");

-- AddForeignKey
ALTER TABLE "network_user_intents" ADD CONSTRAINT "network_user_intents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
