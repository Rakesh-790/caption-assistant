import { create } from "zustand";
import type { CaptionItem } from "../caption.type";

interface CaptionStore {
    captions: CaptionItem[];

    originalPrompt: string;

    imageUrl: string;

    loading: boolean;

    setInitialCaption: (
        caption: string,
        originalPrompt: string,
        imageUrl: string
    ) => void;

    addRegeneratedCaption: (
        caption: string
    ) => void;

    setLoading: (
        loading: boolean
    ) => void;

    clearCaptions: () => void;
}

export const useCaptionStore =
    create<CaptionStore>((set) => ({
        captions: [],

        originalPrompt: "",

        imageUrl: "",

        loading: false,

        setInitialCaption: (
            caption,
            originalPrompt,
            imageUrl
        ) =>
            set({
                captions: [
                    {
                        id: crypto.randomUUID(),
                        content: caption,
                        type: "original",
                        createdAt:
                            new Date().toISOString(),
                    },
                ],

                originalPrompt,

                imageUrl,
            }),

        addRegeneratedCaption: (
            caption
        ) =>
            set((state) => ({
                captions: [
                    ...state.captions,
                    {
                        id: crypto.randomUUID(),
                        content: caption,
                        type: "regenerated",
                        createdAt:
                            new Date().toISOString(),
                    },
                ],
            })),

        setLoading: (loading) =>
            set({
                loading,
            }),

        clearCaptions: () =>
            set({
                captions: [],
                originalPrompt: "",
                imageUrl: "",
                loading: false,
            }),
    }));