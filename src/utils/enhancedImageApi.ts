import axios from "axios";

const API_KEY: string = import.meta.env.VITE_API_KEY || "";
const BASE_URL: string = "https://techhk.aoscdn.com/";
const MAXIMUM_RETRIES: number = 20;


interface UploadResponse {
    data: {
        task_id: string;
    };
}

interface EnhancedImageResponse {
    created_at: number;
    processed_at?: number;
    progress: number;
    state: number;
    state_detail: string;
    task_id: string;
    image?: string; 
}


const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image_file", file);

    const { data }: { data: UploadResponse } = await axios.post(
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
        throw new Error("Failed to upload image! Task ID not found.");
    }
    return data.data.task_id;
};

const fetchEnhancedImage = async (taskId: string): Promise<EnhancedImageResponse> => {
    const { data }: { data: { data: EnhancedImageResponse } } = await axios.get(
        `${BASE_URL}/api/tasks/visual/scale/${taskId}`,
        {
            headers: {
                "X-API-KEY": API_KEY,
            },
        }
    );

    if (!data?.data) {
        throw new Error("Failed to fetch enhanced image! Image not found.");
    }

    return data.data;
};

const PollForEnhancedImage = async (taskId: string, retries: number = 0): Promise<EnhancedImageResponse> => {
    const result = await fetchEnhancedImage(taskId);

    if (result.state === 4) {
        console.log(`Processing...(${retries}/${MAXIMUM_RETRIES})`);

        if (retries >= MAXIMUM_RETRIES) {
            throw new Error("Max retries reached. Please try again later.");
        }

        await new Promise((resolve) => setTimeout(resolve, 2000));

        return PollForEnhancedImage(taskId, retries + 1);
    }

    console.log("Enhanced Image URL:", result.image);
    return result;
};


export const enhancedImageAPI = async (file: File): Promise<EnhancedImageResponse | void> => {
    try {
        const taskId: string = await uploadImage(file);
        console.log("✅ Image Uploaded Successfully, Task ID:", taskId);

        const enhancedImageData: EnhancedImageResponse = await PollForEnhancedImage(taskId);
        console.log("✅ Enhanced Image Data:", enhancedImageData);

        return enhancedImageData;
    } catch (error: any) {
        console.error("Error enhancing image:", error.message);
    }
};
