-- CreateTable
CREATE TABLE `PlanInvite` (
    `id` VARCHAR(191) NOT NULL,
    `planID` VARCHAR(191) NOT NULL,
    `inviteeEmail` VARCHAR(191) NOT NULL,
    `expiration` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PlanInvite` ADD CONSTRAINT `PlanInvite_planID_fkey` FOREIGN KEY (`planID`) REFERENCES `Plan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
