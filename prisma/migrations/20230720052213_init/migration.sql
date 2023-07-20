-- CreateTable
CREATE TABLE "SageUSer" (
    "id" SERIAL NOT NULL,
    "comapnyId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "senderPassword" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userPassword" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SageUSer_pkey" PRIMARY KEY ("id")
);
