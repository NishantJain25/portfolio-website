import React, { useEffect, useRef } from "react";
import "./home-section.css"
import HomeCTA from "../home-cta/home-cta";
import gsap, { Power3 } from 'gsap'

gsap.registerPlugin(Power3)

const HomeSection = () => {

  const containerRef = useRef(null);
  useEffect(() => {
    const titles = document.querySelectorAll('.title')
    const img = document.querySelector('.hero-image-container')
    const tl = gsap.timeline({defaults: {duration: 1}})

    tl.fromTo(
      img,
      {
        scale: 1.5,
        opacity: 0
      },
      {
       scale: 1,
        opacity:1,
        duration: 1.5,
        ease: Power3.easeInOut
      },
    )
    
    titles.forEach((title, index) => {
      const greeting = title.querySelectorAll('div .greeting')
      const h1 = title.querySelectorAll('div h1')
      const cta = title.querySelectorAll('.cta')
      

      tl.fromTo(
        greeting,
        {
          y: '50px',
          opacity: 0
        },
        {
          y:0,
          opacity: 1,
          duration: 1.5,
          ease: Power3.easeOut
        },
        1
      )
      .fromTo(
        h1,
        {
          y: '50px',
          opacity: 0
        },
        {
          y:0,
          opacity: 1,
          duration: 1.5,
          ease: Power3.easeOut
        },
        1.2
      )
      .fromTo(
        cta,
        {
          y: '30px',
          opacity: 0
        },
        {
          y:0,
          opacity: 1,
          duration: 1.5,
          ease: Power3.easeOut
        },
        1.7
      )
    })
    
    return () => {}
  },[])

  const handleMouseEnter = (e) => {
    // setHover(true);
    // setScale(1)
    // shapeRef.current.style.left = `${
    //   e.clientX - containerRef.current.getClientRects()[0].x - 75
    // }px`;
    // shapeRef.current.style.top = `${
    //   e.clientY - containerRef.current.getClientRects()[0].y - 75
    // }px`;

    // console.log(shapeRef.current.style.left);
  };

  const handleMouseLeave = (e) => {
    // console.log("Mouse leave");
    // setScale(0)
    // setHover(false);
  };
  const handleMouseMove = (e) => {
    // shapeRef.current.style.left = `${
    //   e.clientX - 75
    // }px`;
    // shapeRef.current.style.top = `${
    //   e.clientY - 100
    // }px`;
  };
  return (
    <section id="home smooth-content" className="bg-black text-white h-[100vh] md:px-16 md:py-32 lg:px-32 px-8 py-32 mx-auto relative overflow-hidden" onMouseMove={handleMouseMove} ref={containerRef} data-scroll-section>
      <div className="hero-image-container absolute flex justify-center items-start bg-transparent left-0 top-0 z-0">
          
      </div>
      <div className="title cursor-normal relative h-full flex flex-col md:flex-col-reverse gap-16 md:gap-0 justify-end md:justify-start items-center text-center">
        <div>
          <p className="greeting text-[1em] lg:text-[2em]  md:leading-[0] leading-8">Hey there! I am</p>
          <h1 className="text-[6em] md:text-[6em] lg:text-[10em] leading-[6rem] md:leading-[12rem] font-[NeueMontrealMedium]">Nishant Jain</h1>
        </div>
        <div className="w-full flex md:flex-grow justify-between items-center text-[1em] lg:text-[2em] cursor-default">
          <HomeCTA line1={"Fullstack"} line1alt={"View"} line2={"Developer"} line2alt={"CV"} buttonText={"Download CV"} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
          <HomeCTA line1={"I'm also a"} line1alt={"View"} line2={"Photographer!"} line2alt={"Portfolio"} buttonText={"View Portfolio"} handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} />
        </div>
      </div>
      
      {/* <div
        ref={shapeRef}
        className={`hover-button fixed rounded-full bg-orange-400  border-orange-400 text-[1.15em] text-center h-[150px] w-[150px] ${scale === 0 ? 'scale-0' : 'scale-[1]'}  z-0 overflow-hidden flex justify-center items-center pointer-events-none`}
      >
        {buttonText}
      </div> */}
    </section>
  );
};

export default HomeSection;
