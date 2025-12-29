-- CreateTable
CREATE TABLE "user_identities" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "identity" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_identities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_identities_userId_idx" ON "user_identities"("userId");

-- CreateIndex
CREATE INDEX "user_identities_isDeleted_idx" ON "user_identities"("isDeleted");

-- AddForeignKey
ALTER TABLE "user_identities" ADD CONSTRAINT "user_identities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;