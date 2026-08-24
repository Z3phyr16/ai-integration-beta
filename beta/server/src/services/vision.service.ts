// src/services/vision.service.ts

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

// export const analyzeUiImage = async (imageBase64: string, mimeType: string) => {
//   const response = await ai.models.generateContent({
//     model: "gemini-3.6-flash",
//     contents: [
//       {
//         parts: [
//           {
//             text: `
// Analyze this UI screenshot.

// Detect:

// - input
// - dropdown
// - date
// - button
// - checkbox

// Return JSON only.

// Example:

// {
//   "controls": [
//     {
//       "type": "input",
//       "label": "First Name"
//     }
//   ]
// }
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

export const analyzeUiImage = async (imageBase64: string, mimeType: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: [
      {
        parts: [
          {
            text: `
Describe everything you see in this image.
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

  console.log("GEMINI RESPONSE:");
  console.log(response.text);

  return response.text;
};
