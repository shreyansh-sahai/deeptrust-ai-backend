-- AlterTable
ALTER TABLE "users" ADD COLUMN     "fullName" TEXT;

-- CreateTable
CREATE TABLE "integrations" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "isGlobalEnabled" BOOLEAN NOT NULL DEFAULT true,
    "authBaseUrl" TEXT,
    "tokenUrl" TEXT,
    "requiredScopes" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "integrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "integration_accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "integrationId" TEXT NOT NULL,
    "remoteProviderId" TEXT NOT NULL,
    "remoteEmail" TEXT,
    "accessTokenEnc" TEXT NOT NULL,
    "refreshTokenEnc" TEXT NOT NULL,
    "tokenExpiresAt" TIMESTAMP(3) NOT NULL,
    "scopesGranted" TEXT[],
    "status" TEXT NOT NULL DEFAULT 'active',
    "lastErrorMessage" TEXT,
    "disconnectReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "integration_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sync_states" (
    "id" TEXT NOT NULL,
    "integrationAccountId" TEXT NOT NULL,
    "resourceType" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL DEFAULT 'default',
    "syncToken" TEXT,
    "historyId" TEXT,
    "currentPageToken" TEXT,
    "lastSyncedAt" TIMESTAMP(3),
    "lastSuccessAt" TIMESTAMP(3),
    "lastAttemptStatus" TEXT NOT NULL DEFAULT 'pending',
    "fullSyncRequired" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sync_states_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sync_logs" (
    "id" TEXT NOT NULL,
    "integrationAccountId" TEXT,
    "syncStateId" TEXT,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3),
    "durationMs" INTEGER,
    "status" TEXT NOT NULL,
    "triggerSource" TEXT,
    "itemsFetched" INTEGER NOT NULL DEFAULT 0,
    "itemsUpserted" INTEGER NOT NULL DEFAULT 0,
    "itemsDeleted" INTEGER NOT NULL DEFAULT 0,
    "errorCode" TEXT,
    "errorMessage" TEXT,
    "stackTrace" TEXT,
    "meta" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "sync_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" TEXT NOT NULL,
    "integrationAccountId" TEXT NOT NULL,
    "googleResourceName" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "displayName" TEXT,
    "email" TEXT,
    "phoneNumber" TEXT,
    "organization" TEXT,
    "jobTitle" TEXT,
    "notes" TEXT,
    "photoUrl" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "syncedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "integrations_slug_key" ON "integrations"("slug");

-- CreateIndex
CREATE INDEX "integration_accounts_status_idx" ON "integration_accounts"("status");

-- CreateIndex
CREATE UNIQUE INDEX "integration_accounts_userId_integrationId_remoteProviderId_key" ON "integration_accounts"("userId", "integrationId", "remoteProviderId");

-- CreateIndex
CREATE INDEX "sync_states_integrationAccountId_idx" ON "sync_states"("integrationAccountId");

-- CreateIndex
CREATE INDEX "sync_states_resourceType_idx" ON "sync_states"("resourceType");

-- CreateIndex
CREATE UNIQUE INDEX "sync_states_integrationAccountId_resourceType_resourceId_key" ON "sync_states"("integrationAccountId", "resourceType", "resourceId");

-- CreateIndex
CREATE INDEX "sync_logs_syncStateId_startTime_idx" ON "sync_logs"("syncStateId", "startTime" DESC);

-- CreateIndex
CREATE INDEX "sync_logs_integrationAccountId_idx" ON "sync_logs"("integrationAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_googleResourceName_key" ON "contacts"("googleResourceName");

-- CreateIndex
CREATE INDEX "contacts_integrationAccountId_idx" ON "contacts"("integrationAccountId");

-- CreateIndex
CREATE INDEX "contacts_googleResourceName_idx" ON "contacts"("googleResourceName");

-- CreateIndex
CREATE INDEX "contacts_email_idx" ON "contacts"("email");

-- CreateIndex
CREATE INDEX "contacts_isDeleted_idx" ON "contacts"("isDeleted");

-- AddForeignKey
ALTER TABLE "integration_accounts" ADD CONSTRAINT "integration_accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "integration_accounts" ADD CONSTRAINT "integration_accounts_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES "integrations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sync_states" ADD CONSTRAINT "sync_states_integrationAccountId_fkey" FOREIGN KEY ("integrationAccountId") REFERENCES "integration_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sync_logs" ADD CONSTRAINT "sync_logs_integrationAccountId_fkey" FOREIGN KEY ("integrationAccountId") REFERENCES "integration_accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sync_logs" ADD CONSTRAINT "sync_logs_syncStateId_fkey" FOREIGN KEY ("syncStateId") REFERENCES "sync_states"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_integrationAccountId_fkey" FOREIGN KEY ("integrationAccountId") REFERENCES "integration_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
