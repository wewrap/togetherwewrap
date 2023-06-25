/*
  Warnings:

  - Added the required column `title` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Plan` 
ADD COLUMN `title` 
VARCHAR(191) NULL;

UPDATE `Plan`
SET `title` = 'default plan title'
WHERE `title` IS NULL;

ALTER TABLE `Plan` 
MODIFY COLUMN `title` 
VARCHAR(191) NOT NULL;
