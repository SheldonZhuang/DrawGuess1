'use client'

interface GuessResultProps {
  result: string | null
  error: string | null
}

export default function GuessResult({ result, error }: GuessResultProps) {
  if (error) {
    return (
      <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-red-50 border-2 border-red-200 rounded-lg">
        <h3 className="text-lg sm:text-xl font-bold text-red-700 mb-2">❌ 出错了</h3>
        <p className="text-sm sm:text-base text-red-600">{error}</p>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-gray-50 border-2 border-gray-200 rounded-lg">
        <h3 className="text-lg sm:text-xl font-bold text-gray-700 mb-2">💭 AI 的猜测</h3>
        <p className="text-sm sm:text-base text-gray-500">画点什么，然后点击"让 AI 猜"按钮吧！</p>
      </div>
    )
  }

  return (
    <div className="mt-4 sm:mt-6 p-4 sm:p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg">
      <h3 className="text-lg sm:text-xl font-bold text-purple-700 mb-2">🎨 AI 的猜测</h3>
      <p className="text-xl sm:text-2xl font-bold text-purple-900 break-words">{result}</p>
    </div>
  )
}
