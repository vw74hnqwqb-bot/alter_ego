import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface CuratedSentence {
  sentence: string;
  author: string;
  bookTitle: string;
  explanation: string;
}

export async function curateSentence(userEmotion: string): Promise<CuratedSentence> {
  const prompt = `당신은 밤하늘의 별을 보며 사람들의 마음을 달래주는 신비로운 문학 큐레이터입니다.
사용자의 현재 고민이나 감정: "${userEmotion}"

[큐레이션 가이드라인]
1. 단순한 답변이 아닌, 깊은 통찰과 감성을 담은 문장을 추천하세요.
2. 매번 비슷한 답변을 하지 않도록 고전부터 현대 북까지 아주 넓은 범위의 문학을 다루세요.
3. 특히 '어린 왕자', '이상한 나라의 앨리스', '데미안', '참을 수 없는 존재의 가벼움'과 같은 철학적이고 상상력이 풍부한 작품들을 적극 활용하세요.
4. 문장은 반드시 한국어로 제공되어야 합니다.
5. 설명(explanation)은 정형화된 틀을 벗어나, 마치 밤하늘 아래에서 도란도란 이야기를 나누는 듯한 다정하고도 신비로운 말투를 사용하세요. 사용자의 감정에 진심으로 공감하면서도, 문학적인 비유를 섞어 흥미롭게 전달하세요.

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
