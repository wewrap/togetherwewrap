-- CreateTable
CREATE TABLE `User` (
    `UserID` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `birthDate` DATETIME(3) NULL,
    `googleID` VARCHAR(191) NULL,
    `salt` VARCHAR(191) NULL,
    `facebookID` VARCHAR(191) NULL,
    `venmoUrl` VARCHAR(191) NULL,
    `cashappUrl` VARCHAR(191) NULL,
    `paypalUrl` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_googleID_key`(`googleID`),
    UNIQUE INDEX `User_facebookID_key`(`facebookID`),
    PRIMARY KEY (`UserID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserRelationship` (
    `UserRealtionshipID` VARCHAR(191) NOT NULL,
    `userID` VARCHAR(191) NOT NULL,
    `friendsWithID` VARCHAR(191) NOT NULL,
    `relationshipStatus` ENUM('FRIEND', 'PENDING_REQUEST', 'NOT_FRIEND') NOT NULL DEFAULT 'NOT_FRIEND',

    PRIMARY KEY (`UserRealtionshipID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sid` VARCHAR(191) NOT NULL,
    `data` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sid_key`(`sid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `profileID` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `photoUrl` VARCHAR(191) NULL,

    UNIQUE INDEX `Profile_userId_key`(`userId`),
    PRIMARY KEY (`profileID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Plan` (
    `PlanID` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `createdDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `specialEventType` ENUM('BIRTHDAY', 'ANNIVERSARY', 'GRADUATION', 'WEDDING', 'BABYSHOWER', 'ACHIEVEMENT', 'HOLIDAY', 'OTHER') NOT NULL,
    `contactID` VARCHAR(191) NULL,

    UNIQUE INDEX `Plan_contactID_key`(`contactID`),
    PRIMARY KEY (`PlanID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pledge` (
    `PledgeID` VARCHAR(191) NOT NULL,
    `planID` VARCHAR(191) NOT NULL,
    `userID` VARCHAR(191) NOT NULL,
    `inviteStatus` ENUM('INVITED', 'RESENT_INVITE', 'ACCEPTED', 'DENY', 'NOT_APPLICABLE') NULL,
    `role` ENUM('PLAN_LEADER', 'FRIEND') NOT NULL,

    PRIMARY KEY (`PledgeID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Contact` (
    `ContactID` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NULL,
    `phoneNumber` VARCHAR(191) NULL,
    `address` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `source` VARCHAR(191) NOT NULL,
    `ownerID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ContactID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImportantDateEvent` (
    `ConImportEventID` VARCHAR(191) NOT NULL,
    `contactID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ConImportEventID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserContactRelationship` (
    `UserContactRelationshipID` VARCHAR(191) NOT NULL,
    `contactID` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`UserContactRelationshipID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GiftChoice` (
    `GiftChoiceID` VARCHAR(191) NOT NULL,
    `pledgeID` VARCHAR(191) NOT NULL,
    `giftUrl` VARCHAR(191) NOT NULL,
    `giftName` VARCHAR(191) NOT NULL,
    `dateCreated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `price` INTEGER NOT NULL,

    PRIMARY KEY (`GiftChoiceID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FinalGift` (
    `FinalGiftID` VARCHAR(191) NOT NULL,
    `planID` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `FinalGift_planID_key`(`planID`),
    PRIMARY KEY (`FinalGiftID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserRelationship` ADD CONSTRAINT `UserRelationship_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRelationship` ADD CONSTRAINT `UserRelationship_friendsWithID_fkey` FOREIGN KEY (`friendsWithID`) REFERENCES `User`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plan` ADD CONSTRAINT `Plan_contactID_fkey` FOREIGN KEY (`contactID`) REFERENCES `Contact`(`ContactID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pledge` ADD CONSTRAINT `Pledge_planID_fkey` FOREIGN KEY (`planID`) REFERENCES `Plan`(`PlanID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pledge` ADD CONSTRAINT `Pledge_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contact` ADD CONSTRAINT `Contact_ownerID_fkey` FOREIGN KEY (`ownerID`) REFERENCES `User`(`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImportantDateEvent` ADD CONSTRAINT `ImportantDateEvent_contactID_fkey` FOREIGN KEY (`contactID`) REFERENCES `Contact`(`ContactID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserContactRelationship` ADD CONSTRAINT `UserContactRelationship_contactID_fkey` FOREIGN KEY (`contactID`) REFERENCES `Contact`(`ContactID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GiftChoice` ADD CONSTRAINT `GiftChoice_pledgeID_fkey` FOREIGN KEY (`pledgeID`) REFERENCES `Pledge`(`PledgeID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FinalGift` ADD CONSTRAINT `FinalGift_planID_fkey` FOREIGN KEY (`planID`) REFERENCES `Plan`(`PlanID`) ON DELETE RESTRICT ON UPDATE CASCADE;
