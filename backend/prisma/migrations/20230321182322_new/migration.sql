/*
  Warnings:

  - You are about to drop the column `importantDates` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `relationships` on the `Contact` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Contact` DROP COLUMN `importantDates`,
    DROP COLUMN `relationships`,
    MODIFY `source` VARCHAR(191) NULL;
