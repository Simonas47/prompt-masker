function Settings({ maskValues, handleAddMaskValue, handleRemoveMaskValue, handleKeywordChange, handleReplacementChange, handleSavePreferences }) {
    return (
        <div className="max-w-4xl mx-auto mb-6 p-4 bg-gray-50 rounded-lg border border-gray-300">
            <h3 className="text-lg font-semibold mb-3">Values to mask</h3>
            
            <div className="space-y-2">
              {maskValues.map((value, index) => (
                <div key={index} className="flex gap-2 items-end flex-wrap">
                  <div className="flex-1 min-w-[150px]">
                    <label className="block text-sm text-gray-600 mb-1">Keyword:</label>
                    <input
                      type="text"
                      value={value.keyword}
                      onChange={(e) => handleKeywordChange(index, e.target.value)}
                      placeholder="Enter keyword to mask..."
                      className="w-full px-3 py-2 rounded-md border border-gray-400
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                 bg-white text-gray-700"
                    />
                  </div>
                  <span className="text-gray-600 font-medium self-end mb-2">→</span>
                  <div className="flex-1 min-w-[150px]">
                    <label className="block text-sm text-gray-600 mb-1">Replace value with:</label>
                    <input
                      type="text"
                      value={value.replacement}
                      onChange={(e) => handleReplacementChange(index, e.target.value)}
                      placeholder="Replacement (default: 'maskedValue')"
                      className="w-full px-3 py-2 rounded-md border border-gray-400
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                 bg-white text-gray-700"
                    />
                  </div>
                  {maskValues.length > 1 && (
                    <div className="flex items-end">
                      <button
                        onClick={() => handleRemoveMaskValue(index)}
                        className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md
                                   transition-colors duration-200 font-medium h-[42px]"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ))}
              <div className="flex gap-2 flex-wrap mt-2">
                <button
                  onClick={handleAddMaskValue}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md
                             transition-colors duration-200 font-medium"
                >
                  + Add Value
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md
                             transition-colors duration-200 font-medium"
                >
                  Save preferences
                </button>
              </div>
            </div>
          </div>
    );
}


export default Settings