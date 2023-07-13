/*
  Warnings:

  - Made the column `currentPledgeAmount` on table `Plan` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pledgeGoal` on table `Plan` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
UPDATE `Plan`
SET `currentPledgeAmount` = 0, `pledgeGoal` = 0
WHERE `pledgeGoal` IS NULL OR `currentPledgeAmount` IS NULL;

ALTER TABLE `Plan` MODIFY `currentPledgeAmount` INTEGER NOT NULL DEFAULT 0,
    MODIFY `pledgeGoal` INTEGER NOT NULL DEFAULT 0;
