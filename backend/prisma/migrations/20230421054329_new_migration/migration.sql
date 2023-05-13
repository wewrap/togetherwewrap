/*
  Warnings:

  - You are about to drop the `Plan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlanMembership` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pledge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRelationship` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `PlanMembership` DROP FOREIGN KEY `PlanMembership_planID_fkey`;

-- DropForeignKey
ALTER TABLE `PlanMembership` DROP FOREIGN KEY `PlanMembership_userID_fkey`;

-- DropForeignKey
ALTER TABLE `Pledge` DROP FOREIGN KEY `Pledge_membershipID_fkey`;

-- DropForeignKey
ALTER TABLE `UserRelationship` DROP FOREIGN KEY `UserRelationship_friendsWithID_fkey`;

-- DropForeignKey
ALTER TABLE `UserRelationship` DROP FOREIGN KEY `UserRelationship_userID_fkey`;

-- DropTable
DROP TABLE `Plan`;

-- DropTable
DROP TABLE `PlanMembership`;

-- DropTable
DROP TABLE `Pledge`;

-- DropTable
DROP TABLE `UserRelationship`;

-- CreateTable
CREATE TABLE `Contact` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NULL,
    `phoneNumber` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `source` VARCHAR(191) NULL,
    `ownerID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImportantDateEvent` (
    `id` VARCHAR(191) NOT NULL,
    `contactID` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `eventType` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContactRelationship` (
    `id` VARCHAR(191) NOT NULL,
    `contactID` VARCHAR(191) NOT NULL,
    `relationshipType` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Contact` ADD CONSTRAINT `Contact_ownerID_fkey` FOREIGN KEY (`ownerID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImportantDateEvent` ADD CONSTRAINT `ImportantDateEvent_contactID_fkey` FOREIGN KEY (`contactID`) REFERENCES `Contact`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContactRelationship` ADD CONSTRAINT `ContactRelationship_contactID_fkey` FOREIGN KEY (`contactID`) REFERENCES `Contact`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
