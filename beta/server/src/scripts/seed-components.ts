import "dotenv/config";
import { createEmbedding } from "../services/embedding.service.js";
import prisma from "../prisma/client.js";
const components = [
  {
    name: "CustomInput",
    category: "input",
    description:
      "Standard text input component used for names, titles and free text values.",
    example: `
<CustomInput
 Label="Employee Name"
/>
`,
  },

  {
    name: "AtomDate",
    category: "date picker",
    description:
      "Standard date selection component used for capturing specific dates like birthdays, deadlines, or historical events.",
    example: `
<AtomDate
 Label="Date of Birth"
/>
`,
  },

  {
    name: "AtomComboBox",
    category: "dropdown",
    description: "Dropdown selection component.",
    example: `
<AtomComboBox />
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
        embedding
      )
      VALUES
      (
        '${component.name}',
        '${component.category}',
        '${component.description.replace(/'/g, "''")}',
        '${component.example.replace(/'/g, "''")}',
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
