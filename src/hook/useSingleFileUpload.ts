import { useState } from "react";
import api from "@/api/api";

interface UploadResult {
  success: boolean;
  message?: any;
  error?: any;
}

export const useSingleFileUpload = () => {
  const [fileLoad, setFileLoad] = useState(false);

  const uploadFiles = async (
    fileList: FileList | null
  ): Promise<UploadResult> => {
    if (!fileList || fileList.length === 0) return { success: false };

    setFileLoad(true);

    const formDataUpload = new FormData();
    const file = fileList[0];
    formDataUpload.append("files", file);

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
