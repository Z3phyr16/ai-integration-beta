import "dotenv/config";
import { createEmbedding } from "../services/embedding.service.js";
import prisma from "../prisma/client.js";
const components = [
  {
    name: "CustomInput",
    category: "input",
    hasInternalLabel: true,
    description: "...",
    example: `
<CustomInput
 Label="{{label}}"
 Placeholder="{{placeholder}}"
/>
`,
  },

  {
    name: "AtomDate",
    category: "date",
    hasInternalLabel: false,
    description: "...",
    example: `
<AtomDate
 Label="{{label}}"
/>
`,
  },

  {
    name: "AtomComboBox",
    category: "dropdown",
    hasInternalLabel: false,
    description: "...",
    example: `
<AtomComboBox
 Placeholder="{{placeholder}}"
/>
`,
  },
];

async function main() {
  for (const component of components) {
    const embedding = await createEmbedding(`
${component.name}

${component.description}

${component.example}
`);

    await prisma.$executeRawUnsafe(`
  INSERT INTO "ComponentKnowledge"
  (
    name,
    category,
    description,
    example,
    "hasInternalLabel",
    embedding
  )
  VALUES
  (
    '${component.name}',
    '${component.category}',
    '${component.description.replace(/'/g, "''")}',
    '${component.example.replace(/'/g, "''")}',
    ${component.hasInternalLabel},
    '[${embedding.join(",")}]'
  )
`);

    console.log(`Inserted ${component.name}`);
  }
}

main()
  .then(() => {
    console.log("Done");
    process.exit(0);
  })
  .catch(console.error);
