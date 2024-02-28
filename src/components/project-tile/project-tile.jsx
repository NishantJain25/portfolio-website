import { Power3, gsap } from "gsap";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IoMdArrowForward } from "react-icons/io";
import './project-tile.css'
import Divider from "../divider/divider";

gsap.registerPlugin(ScrollTrigger, Power3);

const ProjectTile = ({ img, title, description, trigger, shapeRef, link }) => {
    const targetItem = useRef();
    const tl = useRef(null);
  useEffect(() => {
    const ctx = gsap.context((self) => {
      tl.current = gsap.timeline({
        scrollTrigger: {
          trigger: trigger.current,
          start: "top center",
          end: "bottom center",
          toggleActions: "play none play reverse",
        },
      });
    }); 
      tl.current.fromTo(
        targetItem.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          ease: Power3.easeOut,
          duration: 0.5,
        },
        `+=0.05`
      );
    

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)

    return () => window.removeEventListener('mousemove', handleMouseMove)
  },[])

  const handleMouseEnter = (e) => {
   
    gsap.to(shapeRef.current,{
        scale: 1,
        ease: Power3.easeOut
    })
    // setScale(1)
    // shapeRef.current.style.left = `${
    //   e.clientX - targetItem.current.getClientRects()[0].x - 75
    // }px`;
    // shapeRef.current.style.top = `${
    //   e.clientY - targetItem.current.getClientRects()[0].y - 75
    // }px`;

    console.log(shapeRef.current.style.left);
  };

  const handleMouseLeave = (e) => {
    console.log("Mouse leave");
    // setScale(0)
    gsap.to(shapeRef.current,{
        scale: 0,
    })
 
  };
  const handleMouseMove = (e) => {
    gsap.to(shapeRef.current,{
        top: e.clientY - 60,
        left: e.clientX - 60,
        duration: 1.25,
        ease: Power3.easeOut,
    })
//     shapeRef.current.style.left = `${
//       e.clientX - 75
//     }px`;
//     shapeRef.current.style.top = `${
//       e.clientY - 100
//     }px`;
  };

  return (
        <a href={link}>
    <div className={`work-item gap-2 relative`} ref={targetItem} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
      <div
        className={`work-item-img  bg-slate-400 hover:scale-[0.95] duration-[800ms]`}
      >
        <img src={img} />
      </div>
      <div className="work-item-title relative flex flex-col gap-2 sm:gap-0 md:py-4 mt-2 sm:mt-0">
        <span className="text-[1.85em] lg:text-[3em] p-0">{title}</span>
        <Divider />
        <span className="work-item-description text-[#838383] text-[0.8em] sm:text-[1em] sm:text-black ">{description}</span>
        <div className="work-item-visit text-[1.85em] lg:text-[3em]">
          <IoMdArrowForward />
        </div>
      </div>
    </div>
      </a>
  );
};

export default ProjectTile;
