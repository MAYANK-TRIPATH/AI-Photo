import Home from "./components/Home"

const App = () => {
  return (
    <div className='bg-gradient-to-r from-gray-900 via-purple-700 to-red-900 flex flex-col items-center justify-center min-h-screen bg-gray-200 py-8 px-4'>
      <div className="text-center mb-8">
        <h1 className="text-6xl font-bold text-gray-800">
          <span className="relative text-black">
            AI-Photo{" "}
            <span className="absolute left-0 bottom-0 w-full h-[4px] bg-red-600 rounded-full"></span>
          </span><span className="bg-green-500 rounded-3xl p-1 sm:gap-4">Enhancer</span>
        </h1>
      <p className="mt-4 text-lg text-gray-200">
        Upload your Image and let AI make it better for you!
      </p>
      </div>
      <Home />
    </div>
  )
}

export default App