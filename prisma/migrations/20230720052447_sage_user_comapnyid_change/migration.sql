/*
  Warnings:

  - You are about to drop the column `company` on the `SageUSer` table. All the data in the column will be lost.
  - Added the required column `companyId` to the `SageUSer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SageUSer" DROP COLUMN "company",
ADD COLUMN     "companyId" TEXT NOT NULL;
