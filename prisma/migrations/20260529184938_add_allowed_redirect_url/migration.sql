-- CreateTable
CREATE TABLE "AllowedRedirectUrl" (
    "id" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AllowedRedirectUrl_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AllowedRedirectUrl_customerId_origin_key" ON "AllowedRedirectUrl"("customerId", "origin");

-- AddForeignKey
ALTER TABLE "AllowedRedirectUrl" ADD CONSTRAINT "AllowedRedirectUrl_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
