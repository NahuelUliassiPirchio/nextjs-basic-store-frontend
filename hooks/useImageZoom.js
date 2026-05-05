import { useState, useRef, useCallback } from 'react'

export function useImageZoom () {
  const [isZoomed, setIsZoomed] = useState(false)
  const containerRef = useRef(null)
  const overlayRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const container = containerRef.current
    const overlay = overlayRef.current
    if (!container || !overlay) return

    const { left, top, width, height } = container.getBoundingClientRect()
    const xPct = Math.min(100, Math.max(0, ((e.clientX - left) / width) * 100))
    const yPct = Math.min(100, Math.max(0, ((e.clientY - top) / height) * 100))

    overlay.style.backgroundPosition = `${xPct}% ${yPct}%`
  }, [])

  return {
    isZoomed,
    containerProps: {
      ref: containerRef,
      onMouseEnter: () => setIsZoomed(true),
      onMouseLeave: () => setIsZoomed(false),
      onMouseMove: handleMouseMove,
    },
    overlayRef,
  }
}
