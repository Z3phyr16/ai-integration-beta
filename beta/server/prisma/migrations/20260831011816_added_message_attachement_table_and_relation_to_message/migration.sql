-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "imagePath" TEXT;

-- CreateTable
CREATE TABLE "MessageAttachment" (
    "id" SERIAL NOT NULL,
    "messageId" INTEGER NOT NULL,
    "filePath" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,

    CONSTRAINT "MessageAttachment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MessageAttachment" ADD CONSTRAINT "MessageAttachment_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
