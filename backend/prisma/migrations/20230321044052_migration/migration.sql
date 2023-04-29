/*
  Warnings:

  - You are about to drop the `GiftChoice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `GiftChoice` DROP FOREIGN KEY `GiftChoice_planID_fkey`;

-- DropTable
DROP TABLE `GiftChoice`;
