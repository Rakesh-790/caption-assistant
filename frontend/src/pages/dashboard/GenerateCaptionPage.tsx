import { useState } from "react";
import { useCaptionGeneration } from "../../hooks/useCaptionGeneration";
import { captionSchema } from "../../schema/caption.schema";
import type z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LANGUAGE_OPTIONS, PLATFORM_OPTIONS, TONE_OPTIONS } from "../../constant/caption.constant";

type CaptionFormValues = z.infer<typeof captionSchema>;

function GenerateCaptionPage() {

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    captions,
    loading,
    error,
    generateCaption,
  } = useCaptionGeneration();


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CaptionFormValues>({
    resolver: zodResolver(captionSchema),
  });


  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = event.target.files?.[0];

    if (!file) return;

    setValue("image", file);

    const imageUrl = URL.createObjectURL(file);

    setPreviewUrl(imageUrl);
  };


  const onSubmit = async (
    data: CaptionFormValues
  ) => {

    try {

      await generateCaption({
        platform: data.platform,
        tone: data.tone,
        language: data.language,
        prompt: data.prompt,
        image: data.image,
      });

    } catch (error) {

      console.error(error);
    }
  };


  return (
    <div
      className={`
    max-w-7xl mx-auto grid gap-8 transition-all duration-500 mt-27
    ${captions.length > 0 || loading
          ? "grid-cols-1 lg:grid-cols-2"
          : "grid-cols-1 place-items-center"
        }
  `}
    >
      {/* FORM SECTION */}
      <div
        className={`
      bg-zinc-900 p-3 rounded-2xl border border-zinc-800
      transition-all duration-500 w-full
      ${captions.length > 0 || loading
            ? "max-w-full"
            : "max-w-2xl"
          }
    `}
      >

        <h1 className="text-3xl font-bold mb-6">
          Generate AI Caption
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >

          {/* PLATFORM */}
          <div>

            <label className="block mb-2 font-medium">
              Platform
            </label>

            <select
              {...register("platform")}
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
            >

              <option value="">
                Select Platform
              </option>

              {PLATFORM_OPTIONS.map((platform) => (
                <option
                  key={platform}
                  value={platform}
                >
                  {platform}
                </option>
              ))}

            </select>

            {errors.platform && (
              <p className="text-red-500 text-sm mt-1">
                {errors.platform.message}
              </p>
            )}

          </div>


          {/* TONE */}
          <div>

            <label className="block mb-2 font-medium">
              Tone
            </label>

            <select
              {...register("tone")}
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
            >

              <option value="">
                Select Tone
              </option>

              {TONE_OPTIONS.map((tone) => (
                <option
                  key={tone}
                  value={tone}
                >
                  {tone}
                </option>
              ))}

            </select>

            {errors.tone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.tone.message}
              </p>
            )}

          </div>

          {/* LANGUAGE */}
          <div>

            <label className="block mb-2 font-medium">
              Language
            </label>

            <select
              {...register("language")}
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
            >

              <option value="">
                Select Language
              </option>

              {LANGUAGE_OPTIONS.map((language) => (
                <option
                  key={language}
                  value={language}
                >
                  {language}
                </option>
              ))}

            </select>

            {errors.language && (
              <p className="text-red-500 text-sm mt-1">
                {errors.language.message}
              </p>
            )}

          </div>

          {/* PROMPT */}
          <div>

            <label className="block mb-2 font-medium">
              Prompt
            </label>

            <textarea
              {...register("prompt")}
              rows={5}
              placeholder="Describe your post..."
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 resize-none"
            />

            {errors.prompt && (
              <p className="text-red-500 text-sm mt-1">
                {errors.prompt.message}
              </p>
            )}

          </div>

          {/* IMAGE */}
          <div>

            <label className="block mb-2 font-medium">
              Upload Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
            />

            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {String(errors.image.message)}
              </p>
            )}

          </div>

          {/* IMAGE PREVIEW */}
          {previewUrl && (

            <div className="rounded-xl overflow-hidden border border-zinc-700">

              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-72 object-cover"
              />

            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-zinc-200 transition disabled:opacity-50"
          >

            {loading
              ? "Generating..."
              : "Generate Caption"}

          </button>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

        </form>

      </div>

      {/* RESULT SECTION */}
      {(captions.length > 0 || loading) && (

        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 transition-all duration-500">

          <h2 className="text-2xl font-bold mb-6">
            Generated Captions
          </h2>

          {/* LOADING STATE */}
          {loading && (

            <div className="space-y-4">

              <div className="animate-pulse bg-zinc-800 h-32 rounded-xl" />

              <div className="animate-pulse bg-zinc-800 h-32 rounded-xl" />

            </div>
          )}

          {/* RESULTS */}
          {!loading && (

            <div className="space-y-4">

              {captions.map((caption) => (

                <div
                  key={caption.id}
                  className="bg-zinc-800 border border-zinc-700 p-4 rounded-xl"
                >

                  <div className="flex justify-between items-center mb-3">

                    <span className="text-xs uppercase text-zinc-400">
                      {caption.type}
                    </span>

                    <button
                      className="text-sm text-blue-400 hover:underline"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          caption.content
                        )
                      }
                    >
                      Copy
                    </button>

                  </div>

                  <p className="whitespace-pre-wrap leading-relaxed">
                    {caption.content}
                  </p>

                </div>
              ))}

            </div>
          )}

        </div>
      )}

    </div>
  );
}

export default GenerateCaptionPage;