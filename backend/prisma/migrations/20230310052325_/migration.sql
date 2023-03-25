/*
  Warnings:

  - You are about to drop the column `pledgeID` on the `GiftChoice` table. All the data in the column will be lost.
  - You are about to drop the `FinalGift` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `planID` to the `GiftChoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `FinalGift` DROP FOREIGN KEY `FinalGift_planID_fkey`;

-- DropForeignKey
ALTER TABLE `GiftChoice` DROP FOREIGN KEY `GiftChoice_pledgeID_fkey`;

-- AlterTable
ALTER TABLE `Contact` MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `GiftChoice` DROP COLUMN `pledgeID`,
    ADD COLUMN `planID` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `FinalGift`;

-- AddForeignKey
ALTER TABLE `GiftChoice` ADD CONSTRAINT `GiftChoice_planID_fkey` FOREIGN KEY (`planID`) REFERENCES `Plan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
