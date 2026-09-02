import "dotenv/config";

import { findBestComponent } from "../services/rag.service.js";

const result = await findBestComponent(`
Input field for employee name
Allows user to type text
`);

console.log(JSON.stringify(result, null, 2));
