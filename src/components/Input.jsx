function Input({ text, setText }) {
  return (
    <div>
      <h3 className="text-center text-2xl mb-4">Input</h3>
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
  );
}

export default Input;

