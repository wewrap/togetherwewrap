/*
  Warnings:

  - You are about to drop the column `createDate` on the `Plan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Plan` DROP COLUMN `createDate`,
    ADD COLUMN `createdDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `GiftChoice` (
    `GiftChoiceID` VARCHAR(191) NOT NULL,
    `pledgeID` VARCHAR(191) NOT NULL,
    `giftUrl` VARCHAR(191) NOT NULL,
    `giftName` VARCHAR(191) NOT NULL,
    `dateCreated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `price` INTEGER NOT NULL,

    PRIMARY KEY (`GiftChoiceID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FinalGift` (
    `FinalGiftID` VARCHAR(191) NOT NULL,
    `planID` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `FinalGift_planID_key`(`planID`),
    PRIMARY KEY (`FinalGiftID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GiftChoice` ADD CONSTRAINT `GiftChoice_pledgeID_fkey` FOREIGN KEY (`pledgeID`) REFERENCES `Pledge`(`PledgeID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinalGift` ADD CONSTRAINT `FinalGift_planID_fkey` FOREIGN KEY (`planID`) REFERENCES `Plan`(`PlanID`) ON DELETE RESTRICT ON UPDATE CASCADE;
