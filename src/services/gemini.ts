import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface CuratedSentence {
  sentence: string;
  author: string;
  bookTitle: string;
  explanation: string;
}

export async function curateSentence(userEmotion: string): Promise<CuratedSentence> {
  const prompt = `당신은 청소년들을 위로하는 따뜻한 문학 큐레이터입니다.
사용자의 현재 고민이나 감정: "${userEmotion}"

이 감정에 가장 적합한 고전 혹은 현대 문학의 한 문장을 추천해주세요. 
문장은 한국어로 제공되어야 하며, 해당 문장이 왜 이 사용자에게 위로가 되는지 다정한 말투로 설명해주세요.

출력은 반드시 JSON 형식이어야 합니다.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentence: { type: Type.STRING, description: "선정된 문학의 한 문장" },
            author: { type: Type.STRING, description: "작가 이름" },
            bookTitle: { type: Type.STRING, description: "책 제목" },
            explanation: { type: Type.STRING, description: "문장에 대한 다정한 위로의 설명" },
          },
          required: ["sentence", "author", "bookTitle", "explanation"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI model.");
    }

    return JSON.parse(text) as CuratedSentence;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "문장을 가져오는 데 실패했습니다.");
  }
}
