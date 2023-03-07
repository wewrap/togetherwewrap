/*
  Warnings:

  - You are about to drop the `Date` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Date` DROP FOREIGN KEY `Date_contactID_fkey`;

-- DropTable
DROP TABLE `Date`;
