-- AlterTable
ALTER TABLE `Plan` ADD COLUMN `chosenGiftLink` VARCHAR(191) NULL,
    ADD COLUMN `chosenGiftName` VARCHAR(191) NULL,
    ADD COLUMN `currentPledgeAmount` INTEGER NULL,
    ADD COLUMN `pledgeGoal` INTEGER NULL;
