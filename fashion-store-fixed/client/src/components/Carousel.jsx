import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { Link } from 'react-router-dom'

export default function Carousel({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const goTo = (index) => {
    setCurrentSlide((index + slides.length) % slides.length)
  }

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(c => (c + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <div className="relative overflow-hidden h-[85vh]">
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={clsx(
            "absolute inset-0 transition-all duration-700 ease-in-out",
            idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 max-w-2xl">
            <p className="text-white/70 text-sm font-medium tracking-widest uppercase mb-3">New Collection</p>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">{slide.title}</h2>
            <p className="text-white/80 text-base md:text-lg mb-8 max-w-md">{slide.desc}</p>
            <div className="flex gap-3">
              <Link to="/products">
                <button className="px-8 py-3 bg-white text-gray-900 font-bold text-sm rounded-full hover:bg-gray-100 transition-colors">
                  Shop Now
                </button>
              </Link>
              <Link to="/virtual-try-on">
                <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold text-sm rounded-full hover:bg-white hover:text-gray-900 transition-colors">
                  Try On
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button
        onClick={() => goTo(currentSlide - 1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
      >
        <ChevronLeft width={22} height={22} />
      </button>
      <button
        onClick={() => goTo(currentSlide + 1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
      >
        <ChevronRight width={22} height={22} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={clsx(
              "rounded-full transition-all duration-300 h-2",
              idx === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
            )}
          />
        ))}
      </div>
    </div>
  )
}
