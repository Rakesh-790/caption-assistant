import { useState } from "react";
import type { CaptionItem, GenerateCaptionRequest, RegenerateCaptionRequest } from "../types/caption.type";


export const useCaptionGeneration = () => {

    const [captions, setCaptions] = useState<CaptionItem[]>([]);

    const [loading, setLoading] = useState(false);

    const [regenerating, setRegenerating] = useState(false);

    const [error, setError] = useState<string | null>(null);



    const generateCaption = async (
        data: GenerateCaptionRequest
    ) => {

        try {

            setLoading(true);

            setError(null);

            const response = await generateCaption(data);

            const newCaption: CaptionItem = {
                id: crypto.randomUUID(),

                content: response.caption,

                type: "original",

                createdAt: new Date().toISOString(),
            };

            setCaptions([newCaption]);

            return response;

        } catch (err: any) {

            setError(
                err?.response?.data?.message ||
                "Failed to generate caption"
            );

            throw err;

        } finally {

            setLoading(false);
        }
    };


    const regenerateCaption = async (
        data: RegenerateCaptionRequest
    ) => {

        try {

            setRegenerating(true);

            setError(null);

            const response = await regenerateCaption(data);

            const regeneratedCaption: CaptionItem = {
                id: crypto.randomUUID(),

                content: response.caption,

                type: "regenerated",

                createdAt: new Date().toISOString(),
            };

            setCaptions((prev) => [
                regeneratedCaption,
                ...prev,
            ]);

            return response;

        } catch (err: any) {

            setError(
                err?.response?.data?.message ||
                "Failed to regenerate caption"
            );

            throw err;

        } finally {

            setRegenerating(false);
        }
    };

    const clearCaptions = () => {
        setCaptions([]);
    };

    return {
        captions,

        loading,

        regenerating,

        error,

        generateCaption,

        regenerateCaption,

        clearCaptions,
    };
};