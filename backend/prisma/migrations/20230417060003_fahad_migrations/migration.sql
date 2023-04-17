-- CreateTable
CREATE TABLE `Contact` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NULL,
    `phoneNumber` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `source` VARCHAR(191) NULL,
    `ownerID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImportantDateEvent` (
    `id` VARCHAR(191) NOT NULL,
    `contactID` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `eventType` ENUM('BIRTHDAY', 'ANNIVERSARY', 'GRADUATION', 'WEDDING', 'BABY_SHOWER', 'ACHIEVEMENT', 'HOLIDAY', 'OTHER') NOT NULL DEFAULT 'OTHER',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserContactRelationship` (
    `id` VARCHAR(191) NOT NULL,
    `contactID` VARCHAR(191) NOT NULL,
    `relationshipType` ENUM('FRIEND', 'FAMILY', 'SPOUSE', 'COWORKER', 'CHILD', 'PARENT', 'OTHER', 'SIGNIFICANT_OTHER') NOT NULL DEFAULT 'OTHER',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GiftChoice` (
    `id` VARCHAR(191) NOT NULL,
    `pledgeID` VARCHAR(191) NOT NULL,
    `giftUrl` VARCHAR(191) NOT NULL,
    `giftName` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `price` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FinalGift` (
    `id` VARCHAR(191) NOT NULL,
    `planID` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `FinalGift_planID_key`(`planID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ContactToPlan` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ContactToPlan_AB_unique`(`A`, `B`),
    INDEX `_ContactToPlan_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Contact` ADD CONSTRAINT `Contact_ownerID_fkey` FOREIGN KEY (`ownerID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImportantDateEvent` ADD CONSTRAINT `ImportantDateEvent_contactID_fkey` FOREIGN KEY (`contactID`) REFERENCES `Contact`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserContactRelationship` ADD CONSTRAINT `UserContactRelationship_contactID_fkey` FOREIGN KEY (`contactID`) REFERENCES `Contact`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GiftChoice` ADD CONSTRAINT `GiftChoice_pledgeID_fkey` FOREIGN KEY (`pledgeID`) REFERENCES `Pledge`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinalGift` ADD CONSTRAINT `FinalGift_planID_fkey` FOREIGN KEY (`planID`) REFERENCES `Plan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContactToPlan` ADD CONSTRAINT `_ContactToPlan_A_fkey` FOREIGN KEY (`A`) REFERENCES `Contact`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ContactToPlan` ADD CONSTRAINT `_ContactToPlan_B_fkey` FOREIGN KEY (`B`) REFERENCES `Plan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
