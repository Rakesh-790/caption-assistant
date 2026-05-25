import type { GenerateCaptionRequest, GenerateCaptionResponse, RegenerateCaptionRequest, RegenerateCaptionResponse } from "../types/caption.type";
import axiosInstance from "./axiosinstance.api";

export const generateCaption = async (
    data: GenerateCaptionRequest
  ): Promise<GenerateCaptionResponse> => {
    
    const formData = new FormData();
  
    formData.append("platform", data.platform);
    formData.append("tone", data.tone);
    formData.append("language", data.language);
    formData.append("prompt", data.prompt);
  
    if (data.images) {
      formData.append("images", data.images);
    }
  
    const response = await axiosInstance.post(
      "/api/caption/generate",
      formData,
      {
        withCredentials: true
      }
    ); 
  
    return response.data;
  };
  
  
  
  export const regenerateCaption = async (
    data: RegenerateCaptionRequest
  ): Promise<RegenerateCaptionResponse> => {
  
    const response = await axiosInstance.post(
      "/api/caption/regenerate",
      data
    );
  
    return response.data;
  };