-- CreateTable
CREATE TABLE `Patient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(255) NOT NULL,
    `lastname` VARCHAR(255) NOT NULL,
    `adress1` VARCHAR(255) NOT NULL,
    `adress2` VARCHAR(255) NOT NULL,
    `zipcode` INTEGER NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NULL,
    `phone` INTEGER NULL,

    UNIQUE INDEX `Patient_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
