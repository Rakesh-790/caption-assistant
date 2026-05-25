import { useState } from "react";
import type { CaptionItem, GenerateCaptionRequest, RegenerateCaptionRequest } from "../types/caption.type";
import { generateCaption as generateCaptionapi, regenerateCaption as regenerateCaptionapi } from "../api/caption.api";


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

            const response = await generateCaptionapi(data);

            setCaptions((prev) => [
                response,
                ...prev,
            ]);

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

            const response = await regenerateCaptionapi(data);

            setCaptions((prev) => [
                response,
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