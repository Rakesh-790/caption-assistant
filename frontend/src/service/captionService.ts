import axiosInstance from "../api/axios";

export const generateCaption = async (formData: FormData) => {
    const response = await axiosInstance.post(
        "/captions/generate",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};