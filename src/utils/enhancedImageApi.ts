import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY || ""; 
const BASE_URL = "https://techhk.aoscdn.com";
const MAXIMUM_RETRIES = 20;

interface EnhancedImageData {
  image: string;
  state: number;
}

// Function to upload an image and return a task ID
const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image_file", file);

  const { data } = await axios.post(
    `${BASE_URL}/api/tasks/visual/scale`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-API-KEY": API_KEY,
      },
    }
  );

  if (!data?.data?.task_id) {
    throw new Error("Error Uploading Image");
  }
  return data.data.task_id;
};

// Function to fetch enhanced image data
const fetchEnhancedImage = async (taskId: string): Promise<EnhancedImageData> => {
  const { data } = await axios.get(`${BASE_URL}/api/tasks/visual/scale/${taskId}`, {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-API-KEY": API_KEY,
    },
  });

  if (!data?.data) {
    throw new Error("Error Enhancing Image");
  }
  return data.data;
};

// Function to poll for the enhanced image
const PollForEnhnaced = async (taskId: string, retries = 0): Promise<EnhancedImageData> => {
  const result = await fetchEnhancedImage(taskId);

  if (result.state === 4) {
    console.log("Processing...");

    if (retries >= MAXIMUM_RETRIES) {
      throw new Error("Image Processing Timed Out");
    }

    // Wait for 2 seconds before retrying
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return PollForEnhnaced(taskId, retries + 1);
  }

  console.log("Enhanced Image Data: ", result);
  return result;
};

// Main function to enhance an image
export const enhanchedImageAPI = async (file: File): Promise<EnhancedImageData> => {
  try {
    const taskId = await uploadImage(file);
    console.log("Image Uploaded Successfully, Task Id:", taskId);

    const enhancedImageData = await PollForEnhnaced(taskId);
    console.log("Enhanced Image Data:", enhancedImageData);
    return enhancedImageData;
  } catch (error) {
    console.error("Error Enhancing Image:", error);
    throw error;
  }
};
