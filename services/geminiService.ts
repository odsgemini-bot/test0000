
import { GoogleGenAI } from "@google/genai";

export const generateSmartIdea = async (topic: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a creative and modern web application idea based on this theme: ${topic}. Provide a catchy name, a one-sentence value proposition, and three key features.`,
      config: {
        temperature: 0.8,
        topP: 0.9,
      }
    });

    return response.text || "No response from AI.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Failed to generate idea. Please ensure your API_KEY is configured in the environment.";
  }
};
