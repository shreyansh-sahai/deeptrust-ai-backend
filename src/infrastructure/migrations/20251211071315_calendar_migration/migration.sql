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

-- AddForeignKey
ALTER TABLE "calendar_events" ADD CONSTRAINT "calendar_events_integrationAccountId_fkey" FOREIGN KEY ("integrationAccountId") REFERENCES "integration_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
