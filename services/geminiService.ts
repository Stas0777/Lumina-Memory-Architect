
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const getCheatAdvice = async (gameContext: string, goal: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User is using a memory editor like Cheat Engine on Linux. 
      Context: ${gameContext}
      Goal: ${goal}
      
      Provide a concise, technical explanation of how to find the relevant memory address using memory scanning techniques (Initial Scan, Next Scan). Mention data types (e.g., 4-byte for integers, Float for health bars). 
      Format the output as professional technical advice for a reverse engineer.`,
      config: {
        temperature: 0.7,
        topP: 0.95,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The AI consultant is currently offline. Please check your system logs.";
  }
};
