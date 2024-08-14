-- CreateTable
CREATE TABLE "Promotions" (
    "id" SERIAL NOT NULL,
    "estoque" BOOLEAN NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "descrition" TEXT NOT NULL,
    "descount" INTEGER NOT NULL,
    "img" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Promotions_pkey" PRIMARY KEY ("id")
);
