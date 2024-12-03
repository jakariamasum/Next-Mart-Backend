-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('USER', 'VENDOR', 'ADMIN');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "RoleType" NOT NULL DEFAULT 'USER';
