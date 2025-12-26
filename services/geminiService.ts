import { GoogleGenAI } from "@google/genai";

export const getCheatAdvice = async (gameContext: string, goal: string) => {
  try {
    // Defensively check for the API key in the process environment
    const apiKey = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : null;
    
    if (!apiKey) {
      console.warn("Lumina AI: API_KEY not found in process.env");
      return "AI Consultant Error: No API Key detected. Please set the API_KEY environment variable before starting the app.";
    }

    const ai = new GoogleGenAI({ apiKey });
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
    
    return response.text || "The AI provided an empty response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The AI consultant encountered an error: " + (error instanceof Error ? error.message : String(error));
  }
};