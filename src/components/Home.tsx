import { useState } from "react";
import ImagePreview from "./ImagePreview";
import ImageUpload from "./ImageUpload";
import { enhanchedImageAPI } from "../utils/enhancedImageApi";

interface EnhancedImage {
  image: string;
}

const Home: React.FC = () => {
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [enhanchedImage, setEnhanchedImage] = useState<EnhancedImage | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const UploadImageHandler = async (file: File) => {
    setUploadImage(URL.createObjectURL(file));
    setLoading(true);

    try {
      const enhancedURL: EnhancedImage = await enhanchedImageAPI(file);
      setEnhanchedImage(enhancedURL);
    } catch (error) {
      console.error(error);
      alert("Error occurred while processing image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ImageUpload UploadImageHandler={UploadImageHandler} />
      <ImagePreview
        loading={loading}
        uploaded={uploadImage}
        enhanced={enhanchedImage?.image}
      />
    </div>
  );
};

export default Home;
