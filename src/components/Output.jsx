import { useState } from 'react'

function Output({ convertedText }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(convertedText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy text:', error)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = convertedText
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div>
      <div className="relative mb-4">
        <h3 className="text-center text-2xl">Output</h3>
        {convertedText && (
          <button
            onClick={handleCopy}
            className="absolute right-0 top-1/2 -translate-y-1/2 px-4 py-2 bg-gray-600 hover:bg-gray-700
                       text-white rounded-md transition-colors duration-200 font-medium text-sm"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>
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
  );
}

export default Output;

