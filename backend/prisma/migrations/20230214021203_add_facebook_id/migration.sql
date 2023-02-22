/*
  Warnings:

  - A unique constraint covering the columns `[facebookID]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `facebookID` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_facebookID_key` ON `User`(`facebookID`);
