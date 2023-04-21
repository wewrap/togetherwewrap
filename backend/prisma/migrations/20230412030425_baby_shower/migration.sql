/*
  Warnings:

  - The values [BABYSHOWER] on the enum `Plan_specialEventType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Plan` MODIFY `specialEventType` ENUM('BIRTHDAY', 'ANNIVERSARY', 'GRADUATION', 'WEDDING', 'BABY_SHOWER', 'ACHIEVEMENT', 'HOLIDAY', 'OTHER') NOT NULL;
