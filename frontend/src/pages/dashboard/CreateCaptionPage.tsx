import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateCaption } from "../../service/captionService";


const captionSchema = z.object({
    platform: z.string().min(1, "Platform is required"),

    tone: z.string().min(1, "Tone is required"),

    language: z.string().min(1, "Language is required"),

    prompt: z
        .string()
        .min(5, "Prompt must be at least 5 characters"),

    image: z.any().optional(),
});

type CaptionFormData = z.infer<typeof captionSchema>;

function CreateCaptionPage() {
    const [loading, setLoading] = useState(false);

    const [captions, setCaptions] = useState<string[]>([]);

    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<CaptionFormData>({
        resolver: zodResolver(captionSchema),

        defaultValues: {
            platform: "Instagram",
            tone: "Professional",
            language: "English",
            prompt: "",
        },
    });

    const imageFile = watch("image");

    const onSubmit = async (
        data: CaptionFormData
    ) => {
        try {
            setLoading(true);
            setServerError("");

            const formData = new FormData();

            formData.append(
                "platform",
                data.platform
            );

            formData.append(
                "tone",
                data.tone
            );

            formData.append(
                "language",
                data.language
            );

            formData.append(
                "prompt",
                data.prompt
            );

            if (
                data.image &&
                data.image.length > 0
            ) {
                formData.append(
                    "image",
                    data.image[0]
                );
            }

            const response =
                await generateCaption(formData);

            setCaptions(response.captions);
        } catch (err: any) {
            setServerError(
                err.response?.data?.message ||
                "Caption generation failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-white">
                AI Caption Generator
            </h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm mb-2 text-zinc-300">
                            Platform
                        </label>

                        <select
                            {...register("platform")}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white outline-none focus:border-blue-500"
                        >
                            <option>
                                Instagram
                            </option>

                            <option>
                                LinkedIn
                            </option>

                            <option>
                                Twitter
                            </option>

                            <option>
                                Facebook
                            </option>
                        </select>

                        {errors.platform && (
                            <p className="text-red-400 text-sm mt-1">
                                {
                                    errors.platform
                                        .message
                                }
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm mb-2 text-zinc-300">
                            Tone
                        </label>

                        <select
                            {...register("tone")}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white outline-none focus:border-blue-500"
                        >
                            <option>
                                Professional
                            </option>

                            <option>
                                Casual
                            </option>

                            <option>
                                Funny
                            </option>

                            <option>
                                Motivational
                            </option>
                        </select>

                        {errors.tone && (
                            <p className="text-red-400 text-sm mt-1">
                                {
                                    errors.tone
                                        .message
                                }
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm mb-2 text-zinc-300">
                            Language
                        </label>

                        <select
                            {...register("language")}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white outline-none focus:border-blue-500"
                        >
                            <option>
                                English
                            </option>

                            <option>
                                Hindi
                            </option>

                            <option>
                                Japanese
                            </option>

                            <option>
                                Spanish
                            </option>
                        </select>

                        {errors.language && (
                            <p className="text-red-400 text-sm mt-1">
                                {
                                    errors.language
                                        .message
                                }
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-sm mb-2 text-zinc-300">
                        Prompt
                    </label>

                    <textarea
                        rows={6}
                        placeholder="Describe your post..."
                        {...register("prompt")}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-4 text-white outline-none focus:border-blue-500 resize-none"
                    />

                    {errors.prompt && (
                        <p className="text-red-400 text-sm mt-1">
                            {errors.prompt.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm mb-2 text-zinc-300">
                        Upload Image
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        {...register("image")}
                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-blue-600 file:text-white file:rounded-lg"
                    />

                    {imageFile &&
                        imageFile.length > 0 && (
                            <div className="mt-3">
                                <img
                                    src={URL.createObjectURL(
                                        imageFile[0]
                                    )}
                                    alt="Preview"
                                    className="w-40 h-40 object-cover rounded-lg border border-zinc-700"
                                />
                            </div>
                        )}
                </div>

                {serverError && (
                    <div className="bg-red-500/10 border border-red-500 text-red-400 text-sm p-3 rounded-lg">
                        {serverError}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50"
                >
                    {loading
                        ? "Generating..."
                        : "Generate Caption"}
                </button>
            </form>

            {captions.length > 0 && (
                <div className="mt-8 space-y-4">
                    {captions.map(
                        (caption, index) => (
                            <div
                                key={index}
                                className="bg-zinc-900 border border-zinc-800 rounded-xl p-5"
                            >
                                <div className="flex justify-between items-start gap-4">
                                    <p className="whitespace-pre-wrap text-zinc-200 flex-1">
                                        {caption}
                                    </p>

                                    <button
                                        onClick={() =>
                                            navigator.clipboard.writeText(
                                                caption
                                            )
                                        }
                                        className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg text-sm"
                                    >
                                        Copy
                                    </button>
                                </div>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
}

export default CreateCaptionPage;