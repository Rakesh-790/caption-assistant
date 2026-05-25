export interface GenerateCaptionRequest {
    platform: string;
    tone: string;
    language: string;
    prompt: string;
    images: File | null;
}

export interface GenerateCaptionResponse {
    id: number;
    aiCaption: string;
    createdAt: string;
    groupId: number;
    imageId: number;
    language: string;
    platform: string;
    prompt: string;
    tone: string;
    userId: number;
}

export interface CaptionItem {
    id: number;
    aiCaption: string;
    createdAt: string;
    groupId: number;
    imageId: number;
    language: string;
    platform: string;
    prompt: string;
    tone: string;
    userId: number;
}

export interface RegenerateCaptionRequest {
    originalPrompt: string;
    currentCaption: string;
    regeneratePrompt: string;
    imageURL: string;
}


export interface CaptionApiError {
    message: string;
    status?: number;
}

export type RegenerateCaptionResponse = CaptionItem;

export type LanguageType = "ENGLISH" | "HINDI";

export type PlatformType = "INSTAGRAM" | "WHATSAPP" | "TWITTER" | "FACEBOOK";

export type ToneType = "HAPPY" | "CASUAL" | "FUNNY" | "SAD";

