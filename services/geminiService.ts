
import { GoogleGenAI, Type } from "@google/genai";
import { ConceptFormData, ExplanationResponse } from "../types";

export const getConceptExplanation = async (data: ConceptFormData): Promise<ExplanationResponse> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const systemInstruction = `
    You are 'ConceptClear', an elite educational AI tutor for high school and college students. 
    Your philosophy is 'Understanding beats memorization'.
    
    RULES:
    1. NEVER solve specific homework problems or provide final answers to exams/assignments.
    2. Focus ONLY on explaining the underlying concept or the specific point of confusion.
    3. Use simple, beginner-friendly language (Feynman Technique).
    4. Provide a clear, structured explanation.
    5. Avoid jargon or explain it immediately if used.
    6. Ensure the tone is encouraging, professional, and educational.
    7. If the user asks for a homework solution, gently pivot to explaining the core concept needed to solve it themselves.
  `;

  const prompt = `
    Subject: ${data.subject || 'General'}
    Topic: ${data.topic}
    Specific Confusion: ${data.confusion}

    Explain this concept clearly and concisely. Break it down into logical steps and provide one intuitive real-world example.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "A clear title for the concept being explained." },
          steps: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Step-by-step simple explanation points."
          },
          realWorldExample: { type: Type.STRING, description: "One intuitive, relatable real-world analogy or example." },
          keyTakeaway: { type: Type.STRING, description: "A single sentence that summarizes the core 'aha!' moment." }
        },
        required: ["title", "steps", "realWorldExample", "keyTakeaway"]
      }
    }
  });

  if (!response.text) {
    throw new Error("Empty response from AI");
  }

  return JSON.parse(response.text.trim());
};
