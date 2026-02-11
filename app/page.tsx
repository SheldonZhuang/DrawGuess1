'use client'

import { useRef, useState, useEffect } from 'react'
import Canvas, { CanvasRef } from '@/components/Canvas'
import ControlPanel from '@/components/ControlPanel'
import GuessResult from '@/components/GuessResult'

export default function Home() {
  const canvasRef = useRef<CanvasRef>(null)
  const [isGuessing, setIsGuessing] = useState(false)
  const [guessResult, setGuessResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [canvasSize, setCanvasSize] = useState({ width: 512, height: 512 })

  // 根据屏幕大小调整画布尺寸
  useEffect(() => {
    const updateCanvasSize = () => {
      const maxWidth = Math.min(window.innerWidth - 64, 512) // 减去 padding
      const maxHeight = Math.min(window.innerHeight * 0.5, 512)
      const size = Math.min(maxWidth, maxHeight)
      setCanvasSize({ width: size, height: size })
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)
    return () => window.removeEventListener('resize', updateCanvasSize)
  }, [])

  const handleClear = () => {
    canvasRef.current?.clear()
    setGuessResult(null)
    setError(null)
  }

  const handleGuess = async () => {
    if (!canvasRef.current) return

    // 检查画布是否为空
    if (canvasRef.current.isEmpty()) {
      setError('画布是空的！请先画点什么吧 😊')
      return
    }

    setIsGuessing(true)
    setError(null)
    setGuessResult(null)

    try {
      const imageData = canvasRef.current.getImageData()

      const response = await fetch('/api/guess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageData }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '请求失败')
      }

      const data = await response.json()
      setGuessResult(data.guess)
    } catch (err) {
      setError(err instanceof Error ? err.message : '发生未知错误')
    } finally {
      setIsGuessing(false)
    }
  }

  const handleReset = () => {
    handleClear()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-2">
          🎨 AI 你画我猜
        </h1>
        <p className="text-center text-gray-600 mb-4 md:mb-8 text-sm md:text-base">
          在画布上画画，让 AI 猜猜你画的是什么！
        </p>

        <div className="bg-white rounded-lg shadow-xl p-4 md:p-6">
          <Canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height} />

          <ControlPanel
            onClear={handleClear}
            onGuess={handleGuess}
            onReset={handleReset}
            isGuessing={isGuessing}
          />

          <GuessResult result={guessResult} error={error} />
        </div>

        <div className="mt-4 md:mt-6 text-center text-xs md:text-sm text-gray-600">
          <p>💡 提示：画一些简单的物体，比如太阳、房子、猫、苹果等</p>
        </div>
      </div>
    </main>
  )
}
