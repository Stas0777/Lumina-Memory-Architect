import { GoogleGenAI } from "@google/genai";

// Local Expert Knowledge Base for offline use
const LOCAL_KNOWLEDGE: Record<string, string> = {
  "health": "For health values, search for '4-byte' or 'Float'. If it's a percentage bar, use 'Unknown Initial Value' followed by 'Decreased Value' when you take damage. Most modern engines (Unity/Unreal) use 4-byte integers for simple stats and Floats for precise ones.",
  "ammo": "Ammo is almost always a '4-byte' integer. Search for your current count, fire a shot, then use 'Next Scan' with the new value. If it's 'infinite' ammo but still counts down, check for '2-byte' or 'Byte' values.",
  "money": "Currency is typically a '4-byte' or '8-byte' (Int64) integer. Search for the exact amount. If no results, try searching for the value multiplied by 10 or 100 (some games store 10.50 as 1050).",
  "coordinates": "Coordinates (X, Y, Z) are nearly always 'Float' or 'Double'. Use 'Changed Value' while moving to narrow down the memory range.",
  "speed": "Movement speed is usually a 'Float'. Search for 'Unknown Initial Value', then move faster (sprint) and search 'Increased Value', then stop and search 'Decreased Value'."
};

export const getCheatAdvice = async (gameContext: string, goal: string) => {
  const goalLower = goal.toLowerCase();
  
  // Try to find a local match first for instant response
  const localMatch = Object.keys(LOCAL_KNOWLEDGE).find(key => goalLower.includes(key));
  const localAdvice = localMatch ? LOCAL_KNOWLEDGE[localMatch] : null;

  // Check for API Key to determine if we can use the Cloud Engine
  const apiKey = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : null;

  if (apiKey && apiKey !== "undefined") {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Context: ${gameContext}. Goal: ${goal}. Provide technical memory scanning advice.`,
        config: { temperature: 0.5 }
      });
      return response.text || (localAdvice || "No specific local pattern found. Try searching for 4-byte integers.");
    } catch (e) {
      console.warn("Cloud AI failed, falling back to local heuristics.");
    }
  }

  // Return local advice or a generic expert fallback
  return localAdvice || "Lumina Expert System (Local Mode): For this scenario, I recommend an 'Initial Scan' with 'Unknown Initial Value' using '4-byte' data type. Narrow it down by searching for 'Changed/Unchanged' values while interacting with the game element.";
};