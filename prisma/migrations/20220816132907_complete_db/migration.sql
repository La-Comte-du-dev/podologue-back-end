-- CreateTable
CREATE TABLE `CareType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `caretypeprice` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Care` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `careprice` INTEGER NULL,
    `caretypeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Appointment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME NOT NULL,
    `facture` VARCHAR(255) NOT NULL,
    `isquotation` BOOLEAN NOT NULL DEFAULT false,
    `patientId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CaresOnAppointments` (
    `appointmentId` INTEGER NOT NULL,
    `careId` INTEGER NOT NULL,

    PRIMARY KEY (`appointmentId`, `careId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Care` ADD CONSTRAINT `Care_caretypeId_fkey` FOREIGN KEY (`caretypeId`) REFERENCES `CareType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `Patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CaresOnAppointments` ADD CONSTRAINT `CaresOnAppointments_appointmentId_fkey` FOREIGN KEY (`appointmentId`) REFERENCES `Appointment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CaresOnAppointments` ADD CONSTRAINT `CaresOnAppointments_careId_fkey` FOREIGN KEY (`careId`) REFERENCES `Care`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
