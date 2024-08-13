-- CreateTable
CREATE TABLE "Produto" (
    "id" SERIAL NOT NULL,
    "estoque" BOOLEAN NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "descrition" TEXT NOT NULL,
    "descount" INTEGER NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);
