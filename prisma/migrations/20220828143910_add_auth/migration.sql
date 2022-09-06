/*
  Warnings:

  - You are about to drop the column `avatar` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `avatar`,
    MODIFY `role` VARCHAR(191) NOT NULL DEFAULT 'Admin';
