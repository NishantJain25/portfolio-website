import React, { useRef, useState } from 'react'
import './button.css'

const Button = ({label, type, icon, onClick}) => {
    const [hover, setHover] = useState(false)
    const shapeRef = useRef(null)
    const containerRef = useRef(null)
    const handleMouseEnter = (e) => {
        setHover(true)
        shapeRef.current.style.left = `${e.clientX - containerRef.current.getClientRects()[0].x }px`
        shapeRef.current.style.top = `${e.clientY - containerRef.current.getClientRects()[0].y }px`
    }

    const handleMouseLeave = (e) => {
        shapeRef.current.style.left = `${e.clientX - containerRef.current.getClientRects()[0].x }px`
        shapeRef.current.style.top = `${e.clientY - containerRef.current.getClientRects()[0].y }px`
        setHover(false)
    }
    const handleMouseMove = (e) => {
        shapeRef.current.style.left = `${e.clientX - containerRef.current.getClientRects()[0].x }px`
        shapeRef.current.style.top = `${e.clientY - containerRef.current.getClientRects()[0].y }px`
    }
  return (
    <div ref={containerRef} className={`button bg-black text-white rounded-full flex justify-center items-center p-4 overflow-hidden relative ${type === 'primary' ? 'h-[150px] md:h-[200px] w-[150px]  md:w-[200px]' : type === 'social' ? "h-[50px] w-[50px] border-black hover:border-orange-400 border-[1px] bg-transparent" : ' h-[50px] w-fit border-0'}  `} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove} onClick={onClick} data-u-speed='1.2'>
      <p className={`button-text flex items-center gap-1 ${type === "navbar" ? 'text-[0.8em]' : 'text-[1.15em]'}`}>{label}<span className={`${type === 'social' && 'text-black'}`}>{icon}</span></p>
      <div ref={shapeRef} className={`hover-shape absolute rounded-full bg-orange-400 border-orange-400 ${hover ? 'h-[400px] w-[400px]': 'h-0 w-0'} z-0`}></div>
    </div>
  )
}

export default Button
