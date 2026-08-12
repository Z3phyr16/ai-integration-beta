import { MessageRole } from "@prisma/client";

export interface CreateConversationDto {
  title?: string;
}

export interface CreateMessageDto {
  role: MessageRole;
  content: string;
}
