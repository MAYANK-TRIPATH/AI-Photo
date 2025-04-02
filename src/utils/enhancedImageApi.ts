import axios from "axios";

const API_KEY = " ";
const BASE_URL = "https://techhk.aoscdn.com";

export const enhanchedImageAPI = async (file: any) => {
    try {
        const taskId = await uploadImage(file);
        console.log("Image Upload SuccesFully, Task Id : ", taskId);

        const enhancedImageData = await PollForEnhnaced(taskId);
        console.log("Enhance Image Data : ", enhancedImageData);



    } catch (error) {
        console.log("Error Enhancing Image : ", error);
    }

    const uploadImage = async (file: any) => {
        const formData = new FormData();
        formData.append("image_file", file);

        const { data } = await axios.post(`${BASE_URL}/api/tasks/visual/scale`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "X-API-KEY": API_KEY,
                },
            });

        if (!data?.data?.task_id) {
            throw new Error("Error Uploading Image");
        }
        return data.data.task_id;
    };

    const fetchEnhancedImage = async (taskId: any) => {

        const { data } = await axios.get
            (`${BASE_URL}/api/tasks/visual/scale/${taskId}`,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "X-API-KEY": API_KEY,
                    },
                });
        if (!data?.data) {
            throw new Error("Error Enhancing Image");
        }
        return data.data;
    }

    const PollForEnhnaced = async (taskId: any, retries = 0) => {
        const result = await fetchEnhancedImage(taskId);

        if (result?.status === 4) {
            console.log("Processing...");

            if (retries >= 20) {
                throw new Error("Image Processing Timed Out");
            }

            // Wait for 2 seconds before Polling

            await new Promise(resolve => setTimeout(resolve, 2000));
            return PollForEnhnaced(taskId, retries + 1);
        }
    }
}