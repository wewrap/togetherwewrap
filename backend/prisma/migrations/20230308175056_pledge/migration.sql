/*
  Warnings:

  - You are about to drop the `UserPlanBridge` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `UserPlanBridge` DROP FOREIGN KEY `UserPlanBridge_planID_fkey`;

-- DropForeignKey
ALTER TABLE `UserPlanBridge` DROP FOREIGN KEY `UserPlanBridge_userID_fkey`;

-- DropTable
DROP TABLE `UserPlanBridge`;

-- CreateTable
CREATE TABLE `Pledge` (
    `PledgeID` VARCHAR(191) NOT NULL,
    `planID` VARCHAR(191) NOT NULL,
    `userID` VARCHAR(191) NOT NULL,
    `inviteStatus` ENUM('INVITED', 'RESENT_INVITE', 'ACCEPTED', 'DENY', 'NOT_APPLICABLE') NULL,
    `role` ENUM('PLAN_LEADER', 'FRIEND') NOT NULL,

    PRIMARY KEY (`PledgeID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pledge` ADD CONSTRAINT `Pledge_planID_fkey` FOREIGN KEY (`planID`) REFERENCES `Plan`(`PlanID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pledge` ADD CONSTRAINT `Pledge_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;
