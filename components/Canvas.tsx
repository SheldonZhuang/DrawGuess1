'use client'

import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react'

export interface CanvasRef {
  clear: () => void
  getImageData: () => string
  isEmpty: () => boolean
}

interface CanvasProps {
  width?: number
  height?: number
}

const Canvas = forwardRef<CanvasRef, CanvasProps>(({ width = 512, height = 512 }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasDrawn, setHasDrawn] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 设置画布背景为白色
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, width, height)

    // 设置绘画样式
    ctx.strokeStyle = '#000000'
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
  }, [width, height])

  // 获取坐标的通用函数（支持鼠标和触摸）
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return null

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    if ('touches' in e) {
      // 触摸事件
      if (e.touches.length > 0) {
        const touch = e.touches[0]
        return {
          x: (touch.clientX - rect.left) * scaleX,
          y: (touch.clientY - rect.top) * scaleY,
        }
      }
    } else {
      // 鼠标事件
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      }
    }
    return null
  }

  // 开始绘画（鼠标）
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const coords = getCoordinates(e)
    if (!coords) return

    ctx.beginPath()
    ctx.moveTo(coords.x, coords.y)
    setIsDrawing(true)
  }

  // 开始绘画（触摸）
  const startDrawingTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault() // 防止页面滚动
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const coords = getCoordinates(e)
    if (!coords) return

    ctx.beginPath()
    ctx.moveTo(coords.x, coords.y)
    setIsDrawing(true)
  }

  // 绘画中（鼠标）
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const coords = getCoordinates(e)
    if (!coords) return

    ctx.lineTo(coords.x, coords.y)
    ctx.stroke()
    setHasDrawn(true)
  }

  // 绘画中（触摸）
  const drawTouch = (e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault() // 防止页面滚动
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const coords = getCoordinates(e)
    if (!coords) return

    ctx.lineTo(coords.x, coords.y)
    ctx.stroke()
    setHasDrawn(true)
  }

  // 停止绘画
  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clear = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, width, height)
    setHasDrawn(false)
  }

  const getImageData = () => {
    const canvas = canvasRef.current
    if (!canvas) return ''

    // 使用 JPEG 格式并压缩质量，减小数据大小
    return canvas.toDataURL('image/jpeg', 0.8)
  }

  const isEmpty = () => {
    return !hasDrawn
  }

  // 暴露方法给父组件
  useImperativeHandle(ref, () => ({
    clear,
    getImageData,
    isEmpty,
  }))

  return (
    <div className="flex justify-center w-full">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawingTouch}
        onTouchMove={drawTouch}
        onTouchEnd={stopDrawing}
        onTouchCancel={stopDrawing}
        className="border-4 border-gray-300 rounded-lg cursor-crosshair shadow-lg bg-white max-w-full h-auto"
        style={{ touchAction: 'none' }}
      />
    </div>
  )
})

Canvas.displayName = 'Canvas'

export default Canvas
