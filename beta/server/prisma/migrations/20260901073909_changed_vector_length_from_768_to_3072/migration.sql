-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "contentType" TEXT NOT NULL DEFAULT 'text';

CREATE EXTENSION IF NOT EXISTS vector;

-- CreateTable
CREATE TABLE "ComponentKnowledge" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "example" TEXT NOT NULL,
    "embedding" vector(3072) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ComponentKnowledge_pkey" PRIMARY KEY ("id")
);
