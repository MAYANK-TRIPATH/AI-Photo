import Home from "./components/Home"

const App = () => {
  return (
    <div className='bg-gradient-to-r from-gray-900 via-purple-700 to-red-900 flex flex-col items-center justify-center min-h-screen bg-gray-200 py-8 px-4'>
      <div className="text-center mb-8">
        <h1 className="text-6xl font-bold text-gray-800">
          <span className="relative text-black underline">
            AI-Photo{" "}
            </span>
           
          <span className="bg-green-500 rounded-3xl p-2">Enhancer</span>
          
        </h1>
      <p className="mt-4 text-lg text-gray-300">
        Upload your Image and let AI make it better for you!
      </p>
      </div>
      <Home />
    </div>
  )
}

export default App