import Home from "./components/Home"

const App = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-200 py-8 px-4'>
      <div className="text-center mb-8">
        <h1 className="text-6xl font-bold text-gray-800">
          <span className="relative">
            AI-Photo{" "}
            <span className="absolute left-0 bottom-0 w-full h-[4px] bg-red-600 rounded-full"></span>
          </span><span className="bg-green-400 rounded-3xl p-1">Enhancer</span>
        </h1>
      <p className="mt-4 text-lg text-gray-600">
        Upload your Image and let AI make it better for you!
      </p>
      </div>
      <Home />
    </div>
  )
}

export default App