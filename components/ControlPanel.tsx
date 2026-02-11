'use client'

interface ControlPanelProps {
  onClear: () => void
  onGuess: () => void
  onReset: () => void
  isGuessing: boolean
  disabled?: boolean
}

export default function ControlPanel({
  onClear,
  onGuess,
  onReset,
  isGuessing,
  disabled = false,
}: ControlPanelProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
      <button
        onClick={onClear}
        disabled={disabled || isGuessing}
        className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors shadow-md text-sm sm:text-base active:scale-95"
      >
        🗑️ 清空画布
      </button>
      <button
        onClick={onGuess}
        disabled={disabled || isGuessing}
        className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors shadow-md text-sm sm:text-base active:scale-95"
      >
        {isGuessing ? '🤔 AI 正在思考...' : '🎯 让 AI 猜'}
      </button>
      <button
        onClick={onReset}
        disabled={isGuessing}
        className="px-4 sm:px-6 py-2 sm:py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed transition-colors shadow-md text-sm sm:text-base active:scale-95"
      >
        🔄 重新开始
      </button>
    </div>
  )
}
