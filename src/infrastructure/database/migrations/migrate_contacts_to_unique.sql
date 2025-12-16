-- Migration script to migrate contacts to unique_contacts structure
-- This script should be run AFTER the Prisma migration that creates the new tables
-- 
-- Steps:
-- 1. Rename existing contacts table to integration_accounts_contacts
-- 2. Create new contacts table (unique by email) - done by Prisma migration
-- 3. Create user_contacts table - done by Prisma migration
-- 4. Migrate unique contacts from integration_accounts_contacts to contacts
-- 5. Create user_contacts entries linking users to their unique contacts

-- Step 1: Rename existing contacts table to integration_accounts_contacts
-- Note: This is handled by Prisma migration, but if running manually:
-- ALTER TABLE contacts RENAME TO integration_accounts_contacts;

-- Step 4: Migrate unique contacts from integration_accounts_contacts to contacts
-- Insert unique contacts (grouped by email, taking the most recent data)
INSERT INTO contacts (
    id, email, "firstName", "lastName", "displayName",
    "phoneNumber", organization, "jobTitle", notes, "photoUrl",
    "createdAt", "updatedAt"
)
SELECT DISTINCT ON (email)
    gen_random_uuid() as id,
    email,
    "firstName",
    "lastName",
    "displayName",
    "phoneNumber",
    organization,
    "jobTitle",
    notes,
    "photoUrl",
    MIN("createdAt") as "createdAt",
    MAX("updatedAt") as "updatedAt"
FROM integration_accounts_contacts
WHERE email IS NOT NULL
    AND email != ''
    AND "isDeleted" = false
GROUP BY email, "firstName", "lastName", "displayName", "phoneNumber", organization, "jobTitle", notes, "photoUrl"
ON CONFLICT (email) DO NOTHING;

-- Step 5: Create user_contacts entries linking users to their unique contacts
-- For each integration_account_contact, find the corresponding unique contact and create user_contact
INSERT INTO user_contacts (
    id, "userId", "contactId", metadata, buckets, "featureTags",
    "createdAt", "updatedAt"
)
SELECT DISTINCT
    gen_random_uuid() as id,
    ia."userId",
    c.id as "contactId",
    NULL as metadata,
    ARRAY[]::text[] as buckets,
    ARRAY[]::text[] as "featureTags",
    NOW() as "createdAt",
    NOW() as "updatedAt"
FROM integration_accounts_contacts iac
INNER JOIN integration_accounts ia ON iac."integrationAccountId" = ia.id
INNER JOIN contacts c ON iac.email = c.email
WHERE iac.email IS NOT NULL
    AND iac.email != ''
    AND iac."isDeleted" = false
ON CONFLICT ("userId", "contactId") DO NOTHING;

-- Log migration completion (this would be done by application code, not SQL)
-- Migration completed successfully

