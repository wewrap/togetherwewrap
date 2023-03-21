/*
  Warnings:

  - Added the required column `date` to the `ImportantDateEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventType` to the `ImportantDateEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `relationshipType` to the `UserContactRelationship` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ImportantDateEvent` ADD COLUMN `date` VARCHAR(191) NOT NULL,
    ADD COLUMN `eventType` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `UserContactRelationship` ADD COLUMN `relationshipType` VARCHAR(191) NOT NULL;
