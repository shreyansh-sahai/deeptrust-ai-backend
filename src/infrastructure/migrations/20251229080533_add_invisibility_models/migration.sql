-- AlterTable
ALTER TABLE "user_contacts" ADD COLUMN     "lastInteractionAt" TIMESTAMP(3),
ADD COLUMN     "recencyScore" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "dt_invisibility_processes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lastProcessedAt" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'IDLE',
    "lockedAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dt_invisibility_processes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dt_invisibility_process_logs" (
    "id" TEXT NOT NULL,
    "dtInvisibilityProcessId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "metrics" JSONB NOT NULL DEFAULT '{}',
    "error" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dt_invisibility_process_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dt_invisibility_processes_userId_key" ON "dt_invisibility_processes"("userId");

-- AddForeignKey
ALTER TABLE "dt_invisibility_processes" ADD CONSTRAINT "dt_invisibility_processes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dt_invisibility_process_logs" ADD CONSTRAINT "dt_invisibility_process_logs_dtInvisibilityProcessId_fkey" FOREIGN KEY ("dtInvisibilityProcessId") REFERENCES "dt_invisibility_processes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
