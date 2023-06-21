-- CreateTable
CREATE TABLE `PlanBrainstorm` (
    `id` VARCHAR(191) NOT NULL,
    `planMembershipID` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `item` VARCHAR(191) NOT NULL,
    `itemLink` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PlanBrainstorm` ADD CONSTRAINT `PlanBrainstorm_planMembershipID_fkey` FOREIGN KEY (`planMembershipID`) REFERENCES `PlanMembership`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
