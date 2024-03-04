import { useEffect, useRef, useState } from "react";
import "./App.css";

import Navbar from "./components/navbar/navbar";

import { PageProvider } from "./context/pageContext";
import { Power3, gsap } from "gsap";
import { Outlet } from "react-router-dom";
import HomeSection from "./components/home-section/home-section";
import AboutSection from "./components/about-section/about-section";
import WorkSection from "./components/work-section/work-section";
import SkillsSection from "./components/skills-section/skills-section";
import ContactSection from "./components/contact-section/contact-section";

gsap.registerPlugin(Power3);

function App() {
  const [preloader, setPreloader] = useState("active");
  const [timer, setTimer] = useState(2);
  const [currentSection, setCurrentSection] = useState("home")
  const timerRef = useRef(null);
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const workRef = useRef(null);
  const skillsRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    document.querySelector('body').style.overflow = 'hidden'
    timerRef.current = setInterval(() => setTimer((timer) => timer - 1), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      clearInterval(timerRef.current);
      document.querySelector('body').style.overflow = 'auto'
      setPreloader("closed");
    }
  }, [timer]);

  useEffect(() => {
    const ctx = gsap.context((self) => {
      gsap.fromTo(
        ".preloader.closed",
        {
          y: 0,
        },
        {
          y: "-100%",
          duration: 1,
          delay: 1,
          ease: Power3.easeOut,
        },
      );
      
      
      gsap.fromTo(
        ".preloader.open",
        {
          y: "100%",
        },
        {
          y: 0,
          duration: 1,
          ease: Power3.easeOut,
        }
      );
      if(preloader == 'active'){

        
        gsap.fromTo(
          ".logo, .logo-dot",
          {
          scale: 0.95,
           opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: Power3.easeInOut,
          },
          );
        gsap.fromTo(
          ".logo",
          {
            width: '260px',
          },
          {
            width: '50px',
            duration: 1,
            delay: 1,
            ease: Power3.easeInOut,
          },
          );
        }else if(preloader == 'closed'){
          gsap.fromTo(
            ".logo, .logo-dot",
            {
              y: 0,
            },
            {
              y: "-200%",
              duration: 0.5,
              delay: 0.5,
              ease: Power3.easeIn,
            }
          );
        }
    });

    return () => ctx.revert();
  }, [preloader]);

  return (
    <>
      <PageProvider>
        <main
          className="hero main-container"
          id="main-container"
          data-scroll-container
        >
          <div className={`preloader ${preloader} bg-black`}>
            <div className="logo overflow-hidden w-[50px]">
            <p className="text-white text-[5em]">Nishant</p>
            </div>
            <span className="text-orange-400 text-[5em] logo-dot">.</span>
          </div>
          <Navbar currentSection={currentSection} setCurrentSection={setCurrentSection} homeRef={homeRef} aboutRef={aboutRef} workRef={workRef} skillsRef={skillsRef} contactRef={contactRef}/>
          <HomeSection setCurrentSection={setCurrentSection} ref={homeRef}/>
          <AboutSection setCurrentSection={setCurrentSection} ref={aboutRef}/>
          <WorkSection setCurrentSection={setCurrentSection} ref={workRef}/>
          <SkillsSection setCurrentSection={setCurrentSection} ref={skillsRef}/>
          <ContactSection setCurrentSection={setCurrentSection} ref={contactRef}/>
        </main>
      </PageProvider>
    </>
  );
}

export default App;
