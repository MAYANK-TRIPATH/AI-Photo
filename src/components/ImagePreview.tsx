import Loading from "./Loading";
import { Download } from "lucide-react";

const ImagePreview = (props: any) => {
    return (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Original Image */}
            <div className="shadow-lg rounded-xl overflow-hidden relative">
                <h2 className="text-xl font-semibold text-center bg-gray-800 text-white py-2">
                    Original Image
                </h2>

                {props.uploaded ? (
                    <img
                        src={props.uploaded}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="flex items-center justify-center h-80 md:w-60 bg-gray-200">
                        No Image Selected
                    </div>
                )}
            </div>

            {/* Enhanced Image */}
            <div className="bg-white shadow-lg rounded-xl overflow-hidden relative">
                <h2 className="text-xl font-semibold text-center bg-blue-800 text-white py-2">
                    Enhanced Image
                </h2>
                
                {props.enhanced && !props.loading && (
                    <>
                        <img
                            src={props.enhanced}
                            alt="Enhanced"
                            className="w-full h-full object-cover"
                        />
                        <a 
                            href={props.enhanced} 
                            download="enhanced_image.jpg" 
                            className="absolute top-2 right-2 bg-green-500 text-white p-2 rounded-full hover:bg-green-700 transition"
                        >
                            <Download size={20} />
                        </a>
                    </>
                )}

                {props.loading ? (
                    <Loading />
                ) : (
                    <div className="flex items-center justify-center h-80 bg-gray-200">
                        No Enhanced Image
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImagePreview;
