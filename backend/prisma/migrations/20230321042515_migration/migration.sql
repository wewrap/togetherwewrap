/*
  Warnings:

  - You are about to drop the column `contactID` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `createdDate` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `Pledge` table. All the data in the column will be lost.
  - You are about to drop the column `inviteStatus` on the `Pledge` table. All the data in the column will be lost.
  - You are about to drop the column `planID` on the `Pledge` table. All the data in the column will be lost.
  - You are about to drop the column `pledgeStatus` on the `Pledge` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Pledge` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `Pledge` table. All the data in the column will be lost.
  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ImportantDateEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserContactRelationship` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `membershipID` to the `Pledge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pledgeAmount` to the `Pledge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Pledge` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Contact` DROP FOREIGN KEY `Contact_ownerID_fkey`;

-- DropForeignKey
ALTER TABLE `ImportantDateEvent` DROP FOREIGN KEY `ImportantDateEvent_contactID_fkey`;

-- DropForeignKey
ALTER TABLE `Plan` DROP FOREIGN KEY `Plan_contactID_fkey`;

-- DropForeignKey
ALTER TABLE `Pledge` DROP FOREIGN KEY `Pledge_planID_fkey`;

-- DropForeignKey
ALTER TABLE `Pledge` DROP FOREIGN KEY `Pledge_userID_fkey`;

-- DropForeignKey
ALTER TABLE `UserContactRelationship` DROP FOREIGN KEY `UserContactRelationship_contactID_fkey`;

-- AlterTable
ALTER TABLE `Plan` DROP COLUMN `contactID`,
    DROP COLUMN `createdDate`;

-- AlterTable
ALTER TABLE `Pledge` DROP COLUMN `amount`,
    DROP COLUMN `inviteStatus`,
    DROP COLUMN `planID`,
    DROP COLUMN `pledgeStatus`,
    DROP COLUMN `role`,
    DROP COLUMN `userID`,
    ADD COLUMN `membershipID` VARCHAR(191) NOT NULL,
    ADD COLUMN `pledgeAmount` INTEGER NOT NULL,
    ADD COLUMN `pledgeDate` DATETIME(3) NULL,
    ADD COLUMN `status` ENUM('SENT_MONEY', 'HAVENT_SENT_MONEY') NOT NULL;

-- DropTable
DROP TABLE `Contact`;

-- DropTable
DROP TABLE `ImportantDateEvent`;

-- DropTable
DROP TABLE `UserContactRelationship`;

-- CreateTable
CREATE TABLE `PlanMembership` (
    `id` VARCHAR(191) NOT NULL,
    `planID` VARCHAR(191) NOT NULL,
    `userID` VARCHAR(191) NOT NULL,
    `inviteStatus` ENUM('INVITED', 'RESENT_INVITE', 'ACCEPTED', 'DENY', 'NOT_APPLICABLE') NOT NULL,
    `role` ENUM('PLAN_LEADER', 'FRIEND', 'SPECIAL_PERSON') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pledge` ADD CONSTRAINT `Pledge_membershipID_fkey` FOREIGN KEY (`membershipID`) REFERENCES `PlanMembership`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlanMembership` ADD CONSTRAINT `PlanMembership_planID_fkey` FOREIGN KEY (`planID`) REFERENCES `Plan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlanMembership` ADD CONSTRAINT `PlanMembership_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
