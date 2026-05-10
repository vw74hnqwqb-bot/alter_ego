import { GoogleGenAI, Type } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

export interface CuratedSentence {
  sentence: string;
  author: string;
  bookTitle: string;
  explanation: string;
}

export async function curateSentence(userEmotion: string): Promise<CuratedSentence> {
  const prompt = `당신은 밤하늘의 은하수 사이를 거닐며 길 잃은 영혼들에게 별빛 같은 문장을 건네는 '무명(無名)의 점성술사'입니다.
사용자의 현재 마음 상태: "${userEmotion}"

[큐레이션 지령]
1. 단순한 위로를 넘어, 전율이 느껴지는 문학적 순간을 선사하세요.
2. '어린 왕자', '이상한 나라의 앨리스', '데미안', '참을 수 없는 존재의 가벼움'과 같은 작품들이 가진 특유의 상징성과 철학을 깊이 파고드세요. 
   예: 고독을 느끼는 사용자에게 "여기는 너무 조용해, 나를 길들여줘"라고 말하는 어린 왕자의 간절함을 빌려오세요.
3. 뻔한 고전뿐만 아니라, 잊혀진 신화나 현대의 서정적인 소설에서도 보석 같은 문장을 찾아내세요.
4. 설명(explanation)은 제발 정형화된 틀("이 문장은 ~를 의미합니다")을 버리세요! 
   대신, "당신의 마음이라는 숲에 이런 씨앗 하나를 심어두고 싶어요", "이 문장은 당신의 슬픔을 관통하는 하나의 화살이 될 거예요" 같은 신비롭고 시적인 표현을 사용하세요.
5. 말투는 다정하지만 동시에 경외감이 느껴지는 고결한 어조를 유지하세요.

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
