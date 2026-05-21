import type { GenerateCaptionRequest, GenerateCaptionResponse, RegenerateCaptionRequest, RegenerateCaptionResponse } from "../types/caption.type";
import axiosInstance from "./axios";

export const generateCaption = async (
    data: GenerateCaptionRequest
  ): Promise<GenerateCaptionResponse> => {
    
    const formData = new FormData();
  
    formData.append("platform", data.platform);
    formData.append("tone", data.tone);
    formData.append("language", data.language);
    formData.append("prompt", data.prompt);
  
    if (data.image) {
      formData.append("image", data.image);
    }
  
    const response = await axiosInstance.post(
      "/api/captions/generate",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  
    return response.data;
  };
  
  
  
  export const regenerateCaption = async (
    data: RegenerateCaptionRequest
  ): Promise<RegenerateCaptionResponse> => {
  
    const response = await axiosInstance.post(
      "/api/captions/regenerate",
      data
    );
  
    return response.data;
  };