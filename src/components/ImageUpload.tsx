const ImageUpload = (props: any) => {

    const showImageHandler = (e: any) => {
        const file = e.target.files[0];
        if(file) {  
            props.UploadImageHandler(file);
        }
        console.log(e.target.files);
    }

    return (
        <div className="bg-white font-bold shadow-lg rounded-2xl p-4 w-full max-w-2xl">
            <label htmlFor="fileInput"
                className="block w-full cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-all">
                <input type="file" id="fileInput" className="hidden" 
                onChange={showImageHandler} />
                <span className="text-lg font-medium text-gray-600">
                Click and Drag to upload your image
                </span>
            </label>
        </div>
    )
}

export default ImageUpload