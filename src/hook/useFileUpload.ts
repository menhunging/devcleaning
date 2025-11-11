import { useState } from "react";

import api from "@/api/api";

interface UploadResult {
  success: boolean;
  message?: any;
  error?: any;
}

export const useFileUpload = () => {
  const [fileLoad, setFileLoad] = useState(false);

  const uploadFiles = async (files: FileList | null): Promise<UploadResult> => {
    if (!files || files.length === 0) return { success: false };

    setFileLoad(true);

    const formDataUpload = new FormData();

    Array.from(files).forEach((file) => {
      formDataUpload.append("files[]", file);
    });

    try {
      const response = await api.post("/add_photos/", formDataUpload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return { success: true, message: response.data };
    } catch (error) {
      console.error("Ошибка загрузки фото", error);
      return { success: false, error };
    } finally {
      setFileLoad(false);
    }
  };

  return { uploadFiles, fileLoad };
};
