import { Power3, gsap } from "gsap";
import React, { forwardRef, useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import "./work-section.css";
import dopamineImg from '../../assets/images/D (2).png'
import CollabinatorImg from '../../assets/images/Collabinator.png'
import CandlelitImg from '../../assets/images/Screenshot 2024-02-27 162700.png'
import MyweathernowImg from '../../assets/images/Myweathernow.png'
import Divider from "../divider/divider";
import ProjectTile from "../project-tile/project-tile";


gsap.registerPlugin(ScrollTrigger, Power3);
const WorkSection = forwardRef(({setCurrentSection}, trigger) => {

  const itemList = [
    { title: "CandleLit", img: CandlelitImg, description: "An E-commerce website for a homemade candles business.", link: 'https://candleslit.netlify.app/' },
    { title: "Collabinator", img: CollabinatorImg, description: "A Real-Time Collaborative Code Editor for seamless collaboration with peers and pair programming.", link: 'https://collabinator.vercel.app'},
    { title: "MyWeatherNow", img: MyweathernowImg, description: "A weather app - every developer's dream project :p", link: 'https://myweathernow.vercel.app'},
  ];
  const targetheading = useRef();
  const targetItem = useRef([]);
  const tl = useRef(null);
  const gallery = useRef(null);
  const shapeRef = useRef(null);



  useEffect(() => {
    const ctx = gsap.context((self) => {

      ScrollTrigger.create({
        trigger: trigger.current,
        start: "top center",
        onEnter: () => {console.log("Enter work") ; setCurrentSection('work')},
        onLeaveBack: () => {console.log("Enter about") ; setCurrentSection('about')}
      })

      tl.current = gsap.timeline({
        scrollTrigger: {
          trigger: trigger.current,
          start: "top center",
          end: "bottom center",
          toggleActions: "play none play reverse",
        },
      }).fromTo(
        targetheading.current,
        {
          y:50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: Power3.easeOut
        },
      )
    });
    targetItem.current.forEach((item, index) => {
      tl.current.fromTo(
        item,
         {
          y: 50,
          opacity: 0
        }, 
        {
          y: 0,
          opacity: 1,
          ease: Power3.easeOut,
          duration: 0.5,
        },
        `${index * 0.05}`
      )
    })

    return () => ctx.revert()
  },[]);


  const handleMouseLeave = (e) => {
    console.log("Mouse leave");
    // setScale(0)
    gsap.to(shapeRef.current,{
        scale: 0,
        duration: 0.3,
        ease: Power3.easeOut
    })
 
  };

  return (
    <section id="work" className="pt-32 pb-0" ref={trigger} onMouseLeave={handleMouseLeave}>
      <div
        ref={shapeRef}
        className={`hover-button scale-0 hidden fixed rounded-full bg-orange-400  border-orange-400 text-[1.25em] text-center h-[120px] w-[120px]  z-0 overflow-hidden lg:flex justify-center items-center pointer-events-none`}
      >
        Visit Website
      </div>
      <div className="flex justify-between items-center md:px-16 lg:px-32 px-8">
        <h2 className="text-[3em] md:text-[5em] md:w-fit" ref={targetheading}>
          Recent Work
        </h2>
      </div>
      <div className={`my-8 md:my-16 md:px-16 lg:px-32 px-8 overflow-hidden`}>
        <div
          className={`work-gallery`}
          ref={gallery}
          onMouseLeave={handleMouseLeave}
        >
          {itemList.map(({img, title, description, link}, index) => (
            <ProjectTile img={img} title={title} description={description} trigger={trigger} shapeRef={shapeRef} link={link}/>
          ))}
        </div>
      </div>
    </section>
  );
});

export default WorkSection;
