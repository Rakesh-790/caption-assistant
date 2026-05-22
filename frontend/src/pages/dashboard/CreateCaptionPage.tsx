// import { useNavigate } from "react-router-dom";
// import { useCaptionStore } from "../../types/store/caption.store";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useState } from "react";
// import { generateCaption } from "../../service/captionService";
// import { captionSchema, type CaptionFormData } from "../../schema/caption.schema";

// function CaptionGenerationPage() {

//     const navigate = useNavigate();

//     const setInitialCaption =
//         useCaptionStore(
//             (state) => state.setInitialCaption
//         );

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         watch,
//     } = useForm<CaptionFormData>({
//         resolver: zodResolver(captionSchema),
//     });

//     const [loading, setLoading] =
//         useState(false);

//     const [serverError, setServerError] =
//         useState("");

//     const imageFile = watch("image");

//     const imagePreview =
//         imageFile &&
//             imageFile.length > 0
//             ? URL.createObjectURL(imageFile[0])
//             : null;

//     const onSubmit = async (
//         data: CaptionFormData
//     ) => {
//         try {

//             setLoading(true);

//             setServerError("");

//             const response =
//                 await generateCaption({
//                     platform: data.platform,
//                     tone: data.tone,
//                     language: data.language,
//                     prompt: data.prompt,
//                     image:
//                         data.image &&
//                             data.image.length > 0
//                             ? data.image[0]
//                             : null,
//                 });

//             setInitialCaption(
//                 response.caption,
//                 response.originalPrompt,
//                 response.imageURL
//             );

//             navigate("/generated-caption");

//         } catch (err: any) {

//             setServerError(
//                 err.response?.data?.message ||
//                 "Caption generation failed"
//             );

//         } finally {

//             setLoading(false);

//         }
//     };

//     return (
//         <div className="min-h-screen bg-black text-white px-6 py-10">

//             <div className="max-w-3xl mx-auto">

//                 <div className="mb-10">

//                     <h1 className="text-4xl font-bold">
//                         Generate AI Caption
//                     </h1>

//                     <p className="text-zinc-400 mt-3">
//                         Upload an image and generate
//                         social media captions using AI.
//                     </p>

//                 </div>

//                 <form
//                     onSubmit={handleSubmit(onSubmit)}
//                     className="space-y-6"
//                 >

//                     <div>

//                         <label className="block mb-2 font-medium">
//                             Upload Image
//                         </label>

//                         <input
//                             type="file"
//                             accept="image/*"
//                             {...register("image")}
//                             className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3"
//                         />

//                         {errors.image && (
//                             <p className="text-red-500 text-sm mt-2">
//                                 {String(errors.image.message)}
//                             </p>
//                         )}

//                     </div>

//                     {imagePreview && (

//                         <div className="rounded-2xl overflow-hidden border border-zinc-800">

//                             <img
//                                 src={imagePreview}
//                                 alt="Preview"
//                                 className="w-full h-96 object-cover"
//                             />

//                         </div>
//                     )}

//                     <div>

//                         <label className="block mb-2 font-medium">
//                             Platform
//                         </label>

//                         <select
//                             {...register("platform")}
//                             className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3"
//                         >

//                             <option value="">
//                                 Select Platform
//                             </option>

//                             <option value="instagram">
//                                 Instagram
//                             </option>

//                             <option value="whatsapp">
//                                 LinkedIn
//                             </option>

//                             <option value="facebook">
//                                 Twitter
//                             </option>

//                         </select>

//                         {errors.platform && (
//                             <p className="text-red-500 text-sm mt-2">
//                                 {errors.platform.message}
//                             </p>
//                         )}

//                     </div>

//                     <div>

//                         <label className="block mb-2 font-medium">
//                             Tone
//                         </label>

//                         <select
//                             {...register("tone")}
//                             className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3"
//                         >

//                             <option value="">
//                                 Select Tone
//                             </option>

//                             <option value="professional">
//                                 Professional
//                             </option>

//                             <option value="funny">
//                                 Funny
//                             </option>

//                             <option value="luxury">
//                                 Luxury
//                             </option>

//                             <option value="minimal">
//                                 Minimal
//                             </option>

//                         </select>

//                         {errors.tone && (
//                             <p className="text-red-500 text-sm mt-2">
//                                 {errors.tone.message}
//                             </p>
//                         )}

//                     </div>

//                     <div>

//                         <label className="block mb-2 font-medium">
//                             Language
//                         </label>

//                         <select
//                             {...register("language")}
//                             className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3"
//                         >

//                             <option value="">
//                                 Select Language
//                             </option>

//                             <option value="english">
//                                 English
//                             </option>

//                             <option value="hindi">
//                                 Hindi
//                             </option>

//                             <option value="japanese">
//                                 Japanese
//                             </option>

//                         </select>

//                         {errors.language && (
//                             <p className="text-red-500 text-sm mt-2">
//                                 {errors.language.message}
//                             </p>
//                         )}

//                     </div>

//                     <div>

//                         <label className="block mb-2 font-medium">
//                             Prompt
//                         </label>

//                         <textarea
//                             {...register("prompt")}
//                             placeholder="Describe your post..."
//                             className="w-full h-36 bg-zinc-900 border border-zinc-800 rounded-xl p-4 resize-none"
//                         />

//                         {errors.prompt && (
//                             <p className="text-red-500 text-sm mt-2">
//                                 {errors.prompt.message}
//                             </p>
//                         )}

//                     </div>

//                     {serverError && (
//                         <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl">
//                             {serverError}
//                         </div>
//                     )}

//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full bg-white text-black py-4 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
//                     >

//                         {loading
//                             ? "Generating..."
//                             : "Generate Caption"}

//                     </button>

//                 </form>

//             </div>

//         </div>
//     );
// }

// export default CaptionGenerationPage;