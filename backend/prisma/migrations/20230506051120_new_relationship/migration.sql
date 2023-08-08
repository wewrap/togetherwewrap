/*
  Warnings:

  - You are about to alter the column `relationshipStatus` on the `UserRelationship` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `UserRelationship` MODIFY `relationshipStatus` ENUM('FRIEND', 'SENT_FRIEND_REQUEST', 'AWAITING_FRIEND_REQUEST') NOT NULL;
