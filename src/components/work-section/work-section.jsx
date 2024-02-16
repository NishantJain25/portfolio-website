import { Power3, gsap } from "gsap";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IoMdArrowBack } from "react-icons/io";
import "./work-section.css";
import dopamineImg from '../../assets/images/D (2).png'
// import Button from "../button/button";
// import { useState } from "react";

gsap.registerPlugin(ScrollTrigger, Power3);
const WorkSection = () => {
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // const [currentItem, setCurrentItem] = useState(0);
  // const [translate, setTranslate] = useState(0);
  const itemList = [
    { title: "CandleLit" },
    { title: "Collabinator" },
    { title: "Dopamine" },
  ];
  const trigger = useRef(null);
  const targetheading = useRef();
  const targetItem = useRef([]);
  const tl = useRef(null);
  const gallery = useRef(null);

  // const scrollGalleryForward = () => {
  //   if (currentItem === 2) {
  //     setCurrentItem(0);
  //   } else setCurrentItem((currentItem) => currentItem + 1);
  // };
  // const scrollGalleryBackward = () => {
  //   if (currentItem === 0) setCurrentItem(2);
  //   else setCurrentItem((currentItem) => currentItem - 1);
  // };

  const addItemToRef = (el) => {
    if (el && !targetItem.current.includes(el)) {
      targetItem.current.push(el);
    }
  };

  // useEffect(() => {
  //   window.addEventListener("resize", (e) => {
  //     setWindowWidth(window.innerWidth);
  //   });

  //   return () =>
  //     window.removeEventListener("resize", (e) => {
  //       setWindowWidth(window.innerWidth);
  //     });
  // }, []);

  useEffect(() => {
    const ctx = gsap.context((self) => {
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


  const handleProjectClick = (e) => {
    e.target.parentNode.classList.toggle('active')
  }
  const handleProjectExit = (e) => {
    e.target.parentNode.parentNode.classList.remove('active')
  }

  return (
    <section id="work" className="pt-32 pb-0" ref={trigger}>
      <div className="flex justify-between items-center md:px-16 lg:px-32 px-8">
        <h2 className="text-[3em] md:text-[5em] md:w-fit" ref={targetheading}>
          Recent Work
        </h2>
        {/* <div className="hidden md:flex justify-between gap-4">
          <Button
            icon={<IoMdArrowBack />}
            type="social"
            onClick={scrollGalleryBackward}
          />
          <Button
            icon={<IoMdArrowForward />}
            type="social"
            onClick={scrollGalleryForward}
          />
        </div> */}
      </div>
      <div className={`my-8 md:my-16 md:px-16 lg:px-32 px-8 overflow-hidden`}>
        <div
          className={`work-gallery`}
          ref={gallery}
          // style={{
          //   transform:
          //     windowWidth > 768
          //       ? `translateX(-${currentItem * 33.33}%)`
          //       : `translateX(0%)`,
          // }}
        >
          {itemList.map((item, index) => (
            <div
              className={`work-item gap-2 relative`}
              ref={addItemToRef}
            >
              <div className="work-item-exit hidden" onClick={handleProjectExit}><IoMdArrowBack  /></div>
              <div
                className={`work-item-img  bg-slate-400 hover:scale-95 duration-[800ms]`} onClick={handleProjectClick}
              >
                <img src={dopamineImg} />
              </div>
              <div className="work-item-title flex flex-col md:py-4 transition-[cubic-bezier(.33,.15,.02,1)] ">
                <span className="text-[2em] lg:text-[3em] p-0">
                  {item.title}
                </span>
              <div className="work-item-desc hidden">
                Some description for the project.
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
