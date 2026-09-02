import prisma from "../prisma/client.js";
import { createEmbedding } from "./embedding.service.js";

export interface ComponentSearchResult {
  id: number;
  name: string;
  category: string;
  description: string;
  example: string;

  hasInternalLabel: boolean;

  distance: number;
}

export const findBestComponent = async (
  query: string,
): Promise<ComponentSearchResult[]> => {
  const embedding = await createEmbedding(query);

  const vector = `[${embedding.join(",")}]`;

  const result = await prisma.$queryRawUnsafe<ComponentSearchResult[]>(`
    SELECT
      id,
      name,
      category,
      description,
      example,
      "hasInternalLabel",
      embedding <=> '${vector}'::vector AS distance
    FROM "ComponentKnowledge"
    ORDER BY embedding <=> '${vector}'::vector
    LIMIT 3
  `);

  return result;
};
