import './App.scss'
import { useState, useEffect } from 'react'
import Settings from './components/Settings'
import Input from './components/Input'
import Output from './components/Output'
import Header from './components/Header'

function App() {
  const [text, setText] = useState('')
  const [convertedText, setConvertedText] = useState('')
  const [showConverted, setShowConverted] = useState(false)
  const [maskValues, setMaskValues] = useState([{ keyword: '', replacement: '' }])

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('promptMaskerPreferences')
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMaskValues(parsed)
        }
      } catch (error) {
        console.error('Error loading preferences:', error)
      }
    }
  }, [])

  const handleSavePreferences = () => {
    try {
      localStorage.setItem('promptMaskerPreferences', JSON.stringify(maskValues))
      alert('Preferences saved successfully!')
    } catch (error) {
      console.error('Error saving preferences:', error)
      alert('Error saving preferences')
    }
  }

  const handleAddMaskValue = () => {
    setMaskValues([...maskValues, { keyword: '', replacement: '' }])
  }

  const handleRemoveMaskValue = (index) => {
    setMaskValues(maskValues.filter((_, i) => i !== index))
  }

  const handleKeywordChange = (index, keyword) => {
    const newValues = [...maskValues]
    newValues[index] = { ...newValues[index], keyword }
    setMaskValues(newValues)
  }

  const handleReplacementChange = (index, replacement) => {
    const newValues = [...maskValues]
    newValues[index] = { ...newValues[index], replacement }
    setMaskValues(newValues)
  }

  const handleConvert = () => {
    let result = text
    const valuesToMask = maskValues.filter(v => v.keyword.trim() !== '')
    
    valuesToMask.forEach(({ keyword, replacement }) => {
      const regex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
      const replacementValue = replacement.trim() !== '' ? replacement : 'maskedValue'
      result = result.replace(regex, replacementValue)
    })
    
    setConvertedText(result)
    setShowConverted(true)
  }

  return (
    <div className="min-h-screen p-8">
      <Header />
      { false &&
      <>
        <div className='w-2/4 bg-custom-pink'>custom-pink</div>
        <div className='w-2/4 bg-custom-peach-light'>custom-peach-white</div>
        <div className='w-2/4 bg-custom-peach'>custom-peach</div>
        <div className='w-2/4 bg-custom-peach-dark'>custom-peach-dark</div>
      </> 
      }
      
      <Settings 
        maskValues={maskValues}
        handleAddMaskValue={handleAddMaskValue}
        handleRemoveMaskValue={handleRemoveMaskValue}
        handleKeywordChange={handleKeywordChange}
        handleReplacementChange={handleReplacementChange}
        handleSavePreferences={handleSavePreferences}
      />

      <button 
        onClick={handleConvert}
        className="block mx-auto mb-6 px-8 py-3 bg-blue-600 hover:bg-blue-300
                   text-white font-semibold rounded-lg shadow-md hover:shadow-lg
                   transition-all duration-200 transform hover:scale-105
                   focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
        Convert
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-6xl mx-auto">
        <Input text={text} setText={setText} />
        <Output convertedText={convertedText} />
      </div>
    </div>
  )
}

export default App
