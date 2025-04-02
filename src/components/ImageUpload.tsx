const ImageUpload = (props: any) => {
    const showImageHandler = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        props.UploadImageHandler(file);
      }
    };
  
    return (
      <div className="w-full flex justify-center mt-6">
        <div className="bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-6 w-full max-w-lg transition-all duration-300">
          <label
            htmlFor="fileInput"
            className="block w-full cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-500 transition-all"
          >
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={showImageHandler}
            />
            <span className="text-lg font-medium text-gray-200 ">
              Click or Drag to Upload Image
            </span>
          </label>
        </div>
      </div>
    );
  };
  
  export default ImageUpload;
  