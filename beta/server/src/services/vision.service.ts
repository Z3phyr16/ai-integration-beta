// src/services/vision.service.ts

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export const analyzeUiImage = async (imageBase64: string, mimeType: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: [
      {
        parts: [
          {
            text: `
You are a UI analyzer.
Analyze this UI screenshot.
Detect all controls.

Allowed types only:
- input
- dropdown
- date
- checkbox
- button

Convert:
textbox -> input
textfield -> input
combobox -> dropdown
select -> dropdown

For each control return:

{
  "type": "",
  "label": "",
  "placeholder": "",
  "row": 1,
  "column": 1
}

Rules:

- Controls on the same horizontal line belong to the same row.
- Controls further left have smaller column numbers.
- Controls further right have larger column numbers.

Return JSON only.
`,
          },
          {
            inlineData: {
              data: imageBase64,
              mimeType,
            },
          },
        ],
      },
    ],
  });

  // return response.text;
  const text = response.text ?? "";

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
};

//--------------------------FOR DEBUGGING PURPOSES ONLY-----------------------------
// export const analyzeUiImage = async (imageBase64: string, mimeType: string) => {
//   const response = await ai.models.generateContent({
//     model: "gemini-3.6-flash",
//     contents: [
//       {
//         parts: [
//           {
//             text: `
// Describe everything you see in this image.
// `,
//           },
//           {
//             inlineData: {
//               data: imageBase64,
//               mimeType,
//             },
//           },
//         ],
//       },
//     ],
//   });

//   return response.text;
// };
