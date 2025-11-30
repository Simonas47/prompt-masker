import './App.scss'
import { useState } from 'react'

function App() {
  const [text, setText] = useState('')
  const [convertedText, setConvertedText] = useState('')
  const [showConverted, setShowConverted] = useState(false)
  const [maskValues, setMaskValues] = useState([''])

  const handleAddMaskValue = () => {
    setMaskValues([...maskValues, ''])
  }

  const handleRemoveMaskValue = (index) => {
    setMaskValues(maskValues.filter((_, i) => i !== index))
  }

  const handleMaskValueChange = (index, value) => {
    const newValues = [...maskValues]
    newValues[index] = value
    setMaskValues(newValues)
  }

  const handleConvert = () => {
    let result = text
    const valuesToMask = maskValues.filter(v => v.trim() !== '')
    
    valuesToMask.forEach(value => {
      const regex = new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
      result = result.replace(regex, 'default')
    })
    
    setConvertedText(result)
    setShowConverted(true)
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl text-center mb-10">Prompt masker</h1>
      { false &&
      <>
        <div className='w-2/4 bg-custom-pink'>custom-pink</div>
        <div className='w-2/4 bg-custom-peach-light'>custom-peach-white</div>
        <div className='w-2/4 bg-custom-peach'>custom-peach</div>
        <div className='w-2/4 bg-custom-peach-dark'>custom-peach-dark</div>
      </> 
      }
      
      <div className="max-w-4xl mx-auto mb-6 p-4 bg-gray-50 rounded-lg border border-gray-300">
        <h3 className="text-lg font-semibold mb-3">Values to mask (will be replaced with "default"):</h3>
        <div className="space-y-2">
          {maskValues.map((value, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                value={value}
                onChange={(e) => handleMaskValueChange(index, e.target.value)}
                placeholder="Enter value to mask..."
                className="flex-1 px-3 py-2 rounded-md border border-gray-400
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           bg-white text-gray-700"
              />
              {maskValues.length > 1 && (
                <button
                  onClick={() => handleRemoveMaskValue(index)}
                  className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md
                             transition-colors duration-200 font-medium"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            onClick={handleAddMaskValue}
            className="mt-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md
                       transition-colors duration-200 font-medium"
          >
            + Add Value
          </button>
        </div>
      </div>

      <button 
        onClick={handleConvert}
        className="block mx-auto mb-6 px-8 py-3 bg-blue-600 hover:bg-blue-300
                   text-white font-semibold rounded-lg shadow-md hover:shadow-lg
                   transition-all duration-200 transform hover:scale-105
                   focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
        Convert
      </button>

      <div className="grid grid-cols-2 gap-6 max-w-6xl mx-auto">
        <div>
          <h3 className="text-center text-2xl mb-4">Input:</h3>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your prompt..."
            className="w-full px-4 py-3 rounded-lg border border-gray-500
                       focus:outline-none focus:ring-2 focus:ring-custom-peach-light focus:border-transparent
                       resize-y min-h-[120px] bg-white shadow-sm
                       placeholder:text-gray-400 text-gray-700
                       transition-all duration-200"
          />
        </div>
        
        <div>
          <h3 className="text-center text-2xl mb-4">Output:</h3>
          <textarea
            value={convertedText}
            readOnly
            placeholder="Converted text will appear here..."
            className="w-full px-4 py-3 rounded-lg border border-gray-500
                       focus:outline-none focus:ring-2 focus:ring-custom-peach-light focus:border-transparent
                       resize-y min-h-[120px] bg-white shadow-sm
                       placeholder:text-gray-400 text-gray-700
                       transition-all duration-200"
          />
        </div>
      </div>
    </div>
  )
}

export default App
