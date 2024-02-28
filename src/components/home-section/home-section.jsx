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
    const tl = gsap.timeline({defaults: {duration: 1, delay: 3}})

    tl.fromTo(
      img,
      {
        backgroundPositionY: '100px',
      },
      {
        backgroundPositionY: '50%',
        duration: 1.5,
        ease: Power3.easeOut
      },
    )
    
    titles.forEach((title, index) => {
      const greeting = title.querySelectorAll('div .greeting')
      const h1 = title.querySelectorAll('div h1')
      const cta = title.querySelectorAll('.cta')
      

      tl.fromTo(
        greeting,
        {
          y: '100px',
          opacity: 0
        },
        {
          y:0,
          opacity: 1,
          duration: 1,
          ease: Power3.easeOut
        },
        0.5
      )
      .fromTo(
        h1,
        {
          y: '100px',
          opacity: 0
        },
        {
          y:0,
          opacity: 1,
          duration: 1,
          ease: Power3.easeOut
        },
        0.5
      )
      .fromTo(
        cta,
        {
          y: '50px',
          opacity: 0
        },
        {
          y:0,
          opacity: 1,
          duration: 1,
          ease: Power3.easeOut
        },
       0.5
      )
    })
    
    return () => {}
  },[])

  
  const viewCv = () => {
    const url = `https://drive.google.com/file/d/1ytoPymznl9FUwYM2hYP64UjrK3S150g0/view?usp=drive_link`
    window.open(url, '_blank')
  }
  return (
    <section id="home smooth-content" className="bg-black text-white h-[100vh] md:px-16 md:py-16 lg:px-16 px-8 py-16 mx-auto relative overflow-hidden"  ref={containerRef} data-scroll-section>

      <div className="hero-image-container absolute flex justify-center items-start bg-transparent left-0 top-0 z-0">
          
      </div>
      <div className="title cursor-normal relative h-full flex flex-col md:flex-col-reverse gap-16 md:gap-0 justify-end md:justify-start items-center text-center">
        <div>
          <p className="greeting text-[1em] lg:text-[2em]  md:leading-[0] leading-8">Hey there! I am</p>
          <h1 className="text-[6em] md:text-[6em] lg:text-[10em] leading-[6rem] md:leading-[12rem] font-[NeueMontrealMedium]">Nishant Jain</h1>
        </div>
        <div className="w-full flex  justify-between items-center text-[1em] lg:text-[2em] cursor-default">
          <HomeCTA line1={"Fullstack"} line1alt={"View"} line2={"Developer"} line2alt={"CV"} buttonText={"Download CV"}  onClick={viewCv}/>
          {/* <HomeCTA line1={"I'm also a"} line1alt={"View"} line2={"Photographer!"} line2alt={"Portfolio"} buttonText={"View Portfolio"} /> */}
        </div>
      </div>
      
    </section>
  );
};

export default HomeSection;
