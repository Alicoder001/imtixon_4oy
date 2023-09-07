-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "linkAdress" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LinkType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "iconUrl" TEXT NOT NULL,
    "color" TEXT NOT NULL,

    CONSTRAINT "LinkType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(255),
    "lastName" TEXT,
    "userName" VARCHAR(255),
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "imgUrl" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "LinkType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
