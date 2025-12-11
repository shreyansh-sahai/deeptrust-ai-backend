-- CreateTable
CREATE TABLE "emails" (
    "id" TEXT NOT NULL,
    "integrationAccountId" TEXT NOT NULL,
    "gmailMessageId" TEXT NOT NULL,
    "threadId" TEXT NOT NULL,
    "subject" TEXT,
    "fromEmail" TEXT,
    "fromName" TEXT,
    "toEmails" TEXT[],
    "ccEmails" TEXT[],
    "bccEmails" TEXT[],
    "replyTo" TEXT,
    "snippet" TEXT,
    "bodyText" TEXT,
    "bodyHtml" TEXT,
    "labels" TEXT[],
    "internalDate" TIMESTAMP(3),
    "receivedDate" TIMESTAMP(3),
    "sizeEstimate" INTEGER,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "syncedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "emails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "emails_gmailMessageId_key" ON "emails"("gmailMessageId");

-- CreateIndex
CREATE INDEX "emails_integrationAccountId_idx" ON "emails"("integrationAccountId");

-- CreateIndex
CREATE INDEX "emails_gmailMessageId_idx" ON "emails"("gmailMessageId");

-- CreateIndex
CREATE INDEX "emails_threadId_idx" ON "emails"("threadId");

-- CreateIndex
CREATE INDEX "emails_isDeleted_idx" ON "emails"("isDeleted");

-- CreateIndex
CREATE INDEX "emails_internalDate_idx" ON "emails"("internalDate");

-- AddForeignKey
ALTER TABLE "emails" ADD CONSTRAINT "emails_integrationAccountId_fkey" FOREIGN KEY ("integrationAccountId") REFERENCES "integration_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
