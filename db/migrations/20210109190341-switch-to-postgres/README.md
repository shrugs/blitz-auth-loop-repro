# Migration `20210109190341-switch-to-postgres`

This migration has been generated by Matt Condon (shrugs) at 1/9/2021, 2:03:41 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210109185408-initial-migration..20210109190341-switch-to-postgres
--- datamodel.dml
+++ datamodel.dml
@@ -1,10 +1,7 @@
-// This is your Prisma schema file,
-// learn more about it in the docs: https://pris.ly/d/prisma-schema
-
 datasource db {
-  provider = "sqlite"
-  url = "***"
+  provider = "postgres"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -12,9 +9,9 @@
 // --------------------------------------
 model User {
-  id             Int       @default(autoincrement()) @id
+  id             Int       @id @default(autoincrement())
   createdAt      DateTime  @default(now())
   updatedAt      DateTime  @updatedAt
   name           String?
   email          String    @unique
@@ -23,9 +20,9 @@
   sessions       Session[]
 }
 model Session {
-  id                 Int       @default(autoincrement()) @id
+  id                 Int       @id @default(autoincrement())
   createdAt          DateTime  @default(now())
   updatedAt          DateTime  @updatedAt
   expiresAt          DateTime?
   handle             String    @unique
```


