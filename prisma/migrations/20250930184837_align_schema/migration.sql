-- CreateTable
CREATE TABLE "Referral" (
    "id" SERIAL NOT NULL,
    "clientName" TEXT NOT NULL,
    "notes" TEXT,
    "createdByClerkUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("id")
);
