const ImagePreview = () => {
    return (
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto px-4">
        {/* Original Image */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <h2 className="text-xl font-semibold text-center bg-gray-800 text-white py-3 px-16">
            Original Image
          </h2>
          <div className="relative h-80 bg-gray-100">
            <img src="" alt="Original" className="absolute w-full h-full object-contain hidden" />
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-medium">
              No Image Selected
            </div>
          </div>
        </div>
  
        {/* Enhanced Image */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <h2 className="text-xl font-semibold text-center bg-blue-800 text-white py-3">
            Enhanced Image
          </h2>
          <div className="relative h-80 bg-gray-100">
            <img src="" alt="Enhanced" className="absolute w-full h-full object-contain hidden" />
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-medium">
              No Enhanced Image
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ImagePreview;