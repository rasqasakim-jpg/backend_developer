/*
  Warnings:

  - You are about to drop the column `profile_picture_url` on the `profiles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "profile_picture_url",
ADD COLUMN     "deletedAt" TIMESTAMPTZ,
ADD COLUMN     "image" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_name_key" ON "users"("name");
