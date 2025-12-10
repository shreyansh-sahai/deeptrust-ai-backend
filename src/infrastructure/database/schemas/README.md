# Prisma Schema Organization

This directory contains separate Prisma schema files organized by domain. The schemas are combined into a single `schema.prisma` file using the `combine-schemas.js` script.

## Schema Files

### `base.prisma`
Contains the datasource and generator configuration:
- PostgreSQL datasource
- Prisma Client generator

### `user.prisma`
User model - represents application users:
- Basic user information (email, fullName)
- Relations to contacts and integration accounts

### `integration.prisma`
Integration-related models:
- **Integration**: Registry of supported integrations (Google Contacts, Calendar, Gmail, etc.)
- **IntegrationAccount**: Links users to integrations with encrypted OAuth credentials

### `sync.prisma`
Synchronization state and logging models:
- **SyncState**: Tracks sync tokens, pagination state, and sync metadata (Anchor State pattern)
- **SyncLog**: Operational logging for sync processes with metrics and diagnostics

### `contact.prisma`
Contact model:
- Stores synced contacts from Google Contacts
- Links to IntegrationAccount
- Supports soft deletes

## Usage

### Combining Schemas

Run the combine script to generate the main `schema.prisma`:

```bash
npm run prisma:merge
# or
node src/infrastructure/database/combine-schemas.js
```

### Generating Prisma Client

After combining, generate the Prisma client:

```bash
npm run prisma:generate
```

### Creating Migrations

Create a new migration:

```bash
npm run prisma:migrate:create migration_name
```

## File Order

The combine script processes files in this order (important for dependencies):
1. `base.prisma` - Datasource and generator
2. `user.prisma` - Base user model
3. `integration.prisma` - Integration models (depends on User)
4. `sync.prisma` - Sync models (depends on IntegrationAccount)
5. `contact.prisma` - Contact model (depends on IntegrationAccount)

## Adding New Schemas

1. Create a new `.prisma` file in this directory
2. Add it to the `schemaFiles` array in `combine-schemas.js` in the correct order
3. Run `npm run prisma:merge` to regenerate `schema.prisma`

## Notes

- The combined `schema.prisma` file is generated automatically and should not be edited manually
- Always edit the individual schema files in this directory
- The combine script adds section headers to make the combined file readable

