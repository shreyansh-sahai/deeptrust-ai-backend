/*
  Warnings:

  - You are about to drop the column `googleResourceName` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `integrationAccountId` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `contacts` table. All the data in the column will be lost.
  - You are about to drop the column `syncedAt` on the `contacts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `contacts` will be added. If there are existing duplicate values, this will fail.
  - Made the column `email` on table `contacts` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "contacts" DROP CONSTRAINT "contacts_integrationAccountId_fkey";

-- DropIndex
DROP INDEX "contacts_googleResourceName_idx";

-- DropIndex
DROP INDEX "contacts_googleResourceName_key";

-- DropIndex
DROP INDEX "contacts_integrationAccountId_idx";

-- DropIndex
DROP INDEX "contacts_isDeleted_idx";

-- AlterTable
ALTER TABLE "contacts" DROP COLUMN "googleResourceName",
DROP COLUMN "integrationAccountId",
DROP COLUMN "isDeleted",
DROP COLUMN "syncedAt",
ALTER COLUMN "email" SET NOT NULL;

-- CreateTable
CREATE TABLE "integration_accounts_contacts" (
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

    CONSTRAINT "integration_accounts_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_contacts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    "metadata" JSONB,
    "buckets" TEXT[],
    "featureTags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_contacts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "calendar_events" (
    "id" TEXT NOT NULL,
    "integrationAccountId" TEXT NOT NULL,
    "googleEventId" TEXT NOT NULL,
    "calendarId" TEXT NOT NULL,
    "iCalUID" TEXT,
    "recurringEventId" TEXT,
    "summary" TEXT,
    "description" TEXT,
    "location" TEXT,
    "startDateTime" TIMESTAMP(3),
    "startDate" TEXT,
    "endDateTime" TIMESTAMP(3),
    "endDate" TEXT,
    "isAllDay" BOOLEAN NOT NULL DEFAULT false,
    "timeZone" TEXT,
    "organizerEmail" TEXT,
    "organizerName" TEXT,
    "attendeeEmails" TEXT[],
    "attendeeNames" TEXT[],
    "status" TEXT,
    "visibility" TEXT,
    "recurrence" TEXT[],
    "htmlLink" TEXT,
    "hangoutLink" TEXT,
    "colorId" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "syncedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "calendar_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "integration_accounts_contacts_googleResourceName_key" ON "integration_accounts_contacts"("googleResourceName");

-- CreateIndex
CREATE INDEX "integration_accounts_contacts_integrationAccountId_idx" ON "integration_accounts_contacts"("integrationAccountId");

-- CreateIndex
CREATE INDEX "integration_accounts_contacts_googleResourceName_idx" ON "integration_accounts_contacts"("googleResourceName");

-- CreateIndex
CREATE INDEX "integration_accounts_contacts_email_idx" ON "integration_accounts_contacts"("email");

-- CreateIndex
CREATE INDEX "integration_accounts_contacts_isDeleted_idx" ON "integration_accounts_contacts"("isDeleted");

-- CreateIndex
CREATE INDEX "user_contacts_userId_idx" ON "user_contacts"("userId");

-- CreateIndex
CREATE INDEX "user_contacts_contactId_idx" ON "user_contacts"("contactId");

-- CreateIndex
CREATE UNIQUE INDEX "user_contacts_userId_contactId_key" ON "user_contacts"("userId", "contactId");

-- CreateIndex
CREATE INDEX "calendar_events_integrationAccountId_idx" ON "calendar_events"("integrationAccountId");

-- CreateIndex
CREATE INDEX "calendar_events_calendarId_idx" ON "calendar_events"("calendarId");

-- CreateIndex
CREATE INDEX "calendar_events_googleEventId_idx" ON "calendar_events"("googleEventId");

-- CreateIndex
CREATE INDEX "calendar_events_iCalUID_idx" ON "calendar_events"("iCalUID");

-- CreateIndex
CREATE INDEX "calendar_events_isDeleted_idx" ON "calendar_events"("isDeleted");

-- CreateIndex
CREATE INDEX "calendar_events_startDateTime_idx" ON "calendar_events"("startDateTime");

-- CreateIndex
CREATE INDEX "calendar_events_startDate_idx" ON "calendar_events"("startDate");

-- CreateIndex
CREATE UNIQUE INDEX "calendar_events_integrationAccountId_calendarId_googleEvent_key" ON "calendar_events"("integrationAccountId", "calendarId", "googleEventId");

-- CreateIndex
CREATE UNIQUE INDEX "contacts_email_key" ON "contacts"("email");

-- AddForeignKey
ALTER TABLE "integration_accounts_contacts" ADD CONSTRAINT "integration_accounts_contacts_integrationAccountId_fkey" FOREIGN KEY ("integrationAccountId") REFERENCES "integration_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_contacts" ADD CONSTRAINT "user_contacts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_contacts" ADD CONSTRAINT "user_contacts_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "calendar_events" ADD CONSTRAINT "calendar_events_integrationAccountId_fkey" FOREIGN KEY ("integrationAccountId") REFERENCES "integration_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
