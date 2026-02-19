
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getEventAdvice = async (userMessage: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: "You are an expert event planner for KTS Event Planning & Management based in Rawalpindi, Pakistan. Be polite, professional, and knowledgeable about Pakistani weddings and corporate events. Suggest services from our catalog (Decor, Rentals, Catering, Tents). Always mention that we offer custom quotes.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having a bit of trouble connecting to my creative brain right now. Please message us on WhatsApp at 03205719979 for immediate assistance!";
  }
};

export const getQuoteEstimation = async (items: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, professional quote estimate for these items: ${items.join(', ')}. Include a brief note about setup time and quality assurance.`,
      config: {
        systemInstruction: "You are a professional quote estimator for KTS Events. Keep it concise and professional.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            estimate: { type: Type.STRING },
            notes: { type: Type.STRING },
            suggestedAddOns: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["estimate", "notes"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    return { estimate: "Quote pending review.", notes: "Our team will contact you shortly." };
  }
};
