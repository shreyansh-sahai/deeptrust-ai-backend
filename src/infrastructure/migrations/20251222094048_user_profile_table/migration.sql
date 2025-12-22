-- CreateTable
CREATE TABLE "user_profiles" (
    "userId" TEXT NOT NULL,
    "professionalHeadline" TEXT,
    "professionalBio" TEXT,
    "currentOrganization" TEXT,
    "state" TEXT,
    "city" TEXT,
    "country" TEXT,
    "timezone" TEXT,
    "videoIntroductionURL" TEXT,
    "mobileNumber" TEXT,
    "linkedinUrl" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
