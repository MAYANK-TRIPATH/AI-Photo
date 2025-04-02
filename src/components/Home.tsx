import { useState } from "react";
import ImagePreview from "./ImagePreview";
import ImageUpload from "./ImageUpload";
import { enhancedImageAPI } from "../utils/enhancedImageApi";

interface EnhancedImage {
  image: string;
}

const Home: React.FC = () => {
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<EnhancedImage | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const UploadImageHandler = async (file: File) => {
    setUploadImage(URL.createObjectURL(file));
    setLoading(true);
  
    try {
      const enhancedURL = await enhancedImageAPI(file);
  
      if (enhancedURL?.image) { 
        setEnhancedImage({ image: enhancedURL.image });
      } else {
        alert("Failed to enhance image.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error occurred while processing image.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <ImageUpload UploadImageHandler={UploadImageHandler} />
      <ImagePreview loading={loading} uploaded={uploadImage} enhanced={enhancedImage?.image} />
    </div>
  );
};

export default Home;
