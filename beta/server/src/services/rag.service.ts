import prisma from "../prisma/client.js";
import { createEmbedding } from "./embedding.service.js";

export type ComponentKnowledgeResult = {
  id: number;
  name: string;
  category: string;
  description: string;
  example: string;
};

export const findBestComponent = async (
  query: string,
): Promise<ComponentKnowledgeResult | null> => {
  const embedding = await createEmbedding(query);
  console.log(embedding.length);
  const result = await prisma.$queryRawUnsafe<ComponentKnowledgeResult[]>(`
      SELECT
        id,
        name,
        category,
        description,
        example
      FROM "ComponentKnowledge"
      ORDER BY embedding <=> '[${embedding.join(",")}]'
      LIMIT 1
    `);

  return result[0] ?? null;
};
