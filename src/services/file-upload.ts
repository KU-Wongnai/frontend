import { httpClient } from "@/lib/http-client";

interface FileUpload {
  file: File;
  file_name: string;
}

export const uploadFile = async (file: File, file_name: string) => {
  try {
    console.log(file, file_name);
    const fileUpload: FileUpload = {
      file,
      file_name: file_name,
    };
    console.log(fileUpload);
    // send file via form-data
    const formData = new FormData();
    formData.append("file", fileUpload.file);
    formData.append("file_name", fileUpload.file_name);
    console.log(formData);
    
    const { data: url } = await httpClient.post("file/api/upload", formData)
    return url;
  } catch (error) {
    console.error("Failed to upload file", error);
    throw error;
  }
}