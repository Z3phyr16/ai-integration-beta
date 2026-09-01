import "dotenv/config";
import { createEmbedding } from "../services/embedding.service.js";

const embedding = await createEmbedding("Salary Amount Input Field");

console.log("Vector length:", embedding.length);
