-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'team_leader', 'support_worker', 'patient');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "clerk_user_id" TEXT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "last_login" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerk_user_id_key" ON "User"("clerk_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
