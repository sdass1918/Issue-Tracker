/*
  Warnings:

  - Made the column `userId` on table `Issue` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Issue` DROP FOREIGN KEY `Issue_userId_fkey`;

-- DropIndex
DROP INDEX `Issue_userId_fkey` ON `Issue`;

-- AlterTable
ALTER TABLE `Issue` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `email` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
