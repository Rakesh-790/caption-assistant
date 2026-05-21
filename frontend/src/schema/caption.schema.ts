import { z } from "zod";

export const captionSchema = z.object({

    image: z
        .any()
        .refine(
            (files) => files?.length > 0,
            "Image is required"
        ),

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
        .min(5, "Prompt must be at least 30 characters"),

});

export type CaptionFormData =
    z.infer<typeof captionSchema>;