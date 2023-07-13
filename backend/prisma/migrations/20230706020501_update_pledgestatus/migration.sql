/*
  Warnings:

  - The values [SENT_MONEY,HAVENT_SENT_MONEY] on the enum `Pledge_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Pledge` MODIFY `status` ENUM('CONFIRMED', 'NOT_CONFIRMED') NOT NULL;
