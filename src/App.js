import { useEffect, useRef, useState } from "react";
import "./App.css";
import AboutSection from "./components/about-section/about-section";
import ContactSection from "./components/contact-section/contact-section";
import HomeSection from "./components/home-section/home-section";
import Navbar from "./components/navbar/navbar";
import SkillsSection from "./components/skills-section/skills-section";
import WorkSection from "./components/work-section/work-section";
import { PageProvider } from "./context/pageContext";

function App() {
  const [preloader, setPreloader] = useState(true);
  const [timer, setTimer] = useState(4)
  const timerRef = useRef(null)
    const getQuote = () => {
    const quotes = ['Challenge Yourself', 'Keep Learning']
    const max = quotes.length - 1
    const min = 0
    const idx = Math.floor(Math.random() * (max - min +1)) + min
    console.log(idx)
    return quotes[idx]
  }
  const [quote,setQuote] = useState(getQuote)
  
  useEffect(() => {
    timerRef.current = setInterval(() => setTimer((timer) => timer - 1),1000)
    return () => clearInterval(timerRef.current)
  },[])

  useEffect(() => {
    if(timer === 0){
      clearInterval(timerRef.current)
      setPreloader(false)
    }
  },[timer])



 
  return (
    <>
      {preloader ? (
        <div className="h-[100vh] w-[100vw] bg-black absolute flex justify-center items-center">
          <div className="preloader flex items-end">
          <h1 className="preloader-text text-white font-[NeueMontrealRegular] text-[5em]">Nishant</h1><span className="text-orange-400 dot ">.</span>
          </div>
        </div>
      ) : (
        <PageProvider>
        <main className="hero main-container" id="main-container" data-scroll-container>
          <Navbar />
          <HomeSection />
          <AboutSection />
          <WorkSection />
          <SkillsSection />
          <ContactSection />
        </main>
        </PageProvider>
      )}
    </>
  );
}

export default App;
