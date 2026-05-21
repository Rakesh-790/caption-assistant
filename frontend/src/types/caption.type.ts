export interface GenerateCaptionRequest {
    platform: string;
    tone: string;
    language: string;
    prompt: string;
    image: File | null;
}

export interface GenerateCaptionResponse {
    caption: string;
    imageURL: string;
    originalPrompt: string;
}

export interface CaptionItem {
    id: string;
    content: string;
    type: "original" | "regenerated";
    createdAt: string;
}

export interface RegenerateCaptionRequest {
    originalPrompt: string;
    currentCaption: string;
    regeneratePrompt: string;
    imageURL: string;
}

export interface RegenerateCaptionResponse {
    caption: string;
}

export interface CaptionApiError {
    message: string;
    status?: number;
}

export type LanguageType = "ENGLISH" | "HINDI";

export type PlatformType = "INSTAGRAM" | "WHATSAPP" | "TWITTER" | "FACEBOOK";

export type ToneType = "HAPPY" | "CASUAL" | "FUNNY" | "SAD";

