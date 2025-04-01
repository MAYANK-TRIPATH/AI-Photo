import { useState } from "react";
import ImagePreview from "./ImagePreview"
import ImageUpload from "./ImageUpload"
import { enhanchedImageAPI } from "../utils/enhancedImageApi";


const Home = () => {

  const [uploadImage, setUploadImage] = useState(null);
  const [enhanchedImage, setenhanchedImage] = useState(null);
  const [loading, setloading] = useState(false);

  const UploadImageHandler = async (file: any) => {
    setUploadImage(URL.createObjectURL(file));
    setloading(true);
    try {
      const enhancedURL = await enhanchedImageAPI(file);
      setenhanchedImage(enhancedURL);
      setloading(false);
    } catch (error) {
      console.log(error);
      alert("Error occured while processing image");
    }
  }


  return (
    <div>
      <ImageUpload UploadImageHandler={UploadImageHandler} />
      <ImagePreview
        loading={loading}
        uploaded={uploadImage}
        enhanced={enhanchedImage}
      />
    </div>
  )
}

export default Home
