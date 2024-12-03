/*
  Warnings:

  - You are about to drop the column `description` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `subcategories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "categories" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "subcategories" DROP COLUMN "description";
