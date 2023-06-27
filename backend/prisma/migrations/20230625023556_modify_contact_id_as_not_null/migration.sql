/*
  Warnings:

  - Made the column `contactID` on table `Plan` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Plan` DROP FOREIGN KEY `Plan_contactID_fkey`;

-- AlterTable
ALTER TABLE `Plan` MODIFY `contactID` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Plan` ADD CONSTRAINT `Plan_contactID_fkey` FOREIGN KEY (`contactID`) REFERENCES `Contact`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
