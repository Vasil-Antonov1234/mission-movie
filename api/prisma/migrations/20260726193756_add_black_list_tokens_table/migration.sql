-- CreateTable
CREATE TABLE "black_list_tokens" (
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "black_list_tokens_token_key" ON "black_list_tokens"("token");
