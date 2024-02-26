import { useEffect, useRef, useState } from "react";
import "./App.css";

import Navbar from "./components/navbar/navbar";

import { PageProvider } from "./context/pageContext";
import { Power3, gsap } from "gsap";
import { Outlet } from "react-router-dom";

gsap.registerPlugin(Power3);

function App() {
  const [preloader, setPreloader] = useState("active");
  const [timer, setTimer] = useState(3);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setTimer((timer) => timer - 1), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      clearInterval(timerRef.current);
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
          ease: Power3.easeOut,
        }
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
          <div className={`preloader ${preloader} z-50 bg-black`}>
            <p className="text-white text-[5em] logo">N</p>
            <span className="text-orange-400 text-[5em] logo-dot">.</span>
          </div>
          <Navbar />
          <Outlet />
        </main>
      </PageProvider>
    </>
  );
}

export default App;
