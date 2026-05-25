import { z } from "zod";

export const captionSchema = z.object({

    images: z.instanceof(File, {
        message: "Image is required",
    }),

    platform: z
        .string()
        .min(1, "Platform is required"),

    tone: z
        .string()
        .min(1, "Tone is required"),

    language: z
        .string()
        .min(1, "Language is required"),

    prompt: z
        .string()
        .min(5, "Prompt must be at least 5 characters"),

});

export type CaptionFormData =
    z.infer<typeof captionSchema>;