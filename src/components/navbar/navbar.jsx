import React, {  useRef, useState } from "react";
import Divider from "../divider/divider";
import { IoMdArrowForward } from "react-icons/io";
import "./navbar.css";
import gsap, { Power3 } from 'gsap'
import { useEffect } from "react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(Power3, ScrollToPlugin)

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [mouseY, setMouseY] = useState(0);
  const navlinkRef = useRef([])
  const tl = useRef(null)
  document.addEventListener('mousemove',(e) => {
    setMouseY(e.clientY)
  })
  useEffect(() => {
    if(mouseY < 50){
      document.body.classList.remove('hide-header')
    }

    return () => document.removeEventListener('mousemove', (e) => {
      setMouseY(e.clientY)
    })
  },[mouseY])

  const scroll = (e) => {
    e.preventDefault()
    gsap.to(window, {scrollTo: '#about', duration: 1})
  }

  const addLinkToRef = (el) => {
    if (el && !navlinkRef.current.includes(el)) {
      navlinkRef.current.push(el);
    }
  }
  const handleMenuToggle = () => {
      setIsNavOpen((current) => !current);
      tl.current = gsap.timeline()
      const ctx = gsap.context((self) => {
        if(!isNavOpen){
        navlinkRef.current.forEach((link,index) => {
          tl.current.fromTo(
            link,
            {
              x: 100
            },
            {
              x: 0,
              duration: 0.5,
              ease: 'cubic-bezier(.7, 0, .3, 1)',
            },
            `${0.1 + (0.05 * index)}`)
        })
      }else{
        navlinkRef.current.forEach((link, index) => {
          tl.current.fromTo(
            link,
            {x:0},
            {
              x:150,
              duration: 0.75,
              ease: 'cubic-bezier(.7, 0, .3, 1)',
            },
            0.25)
        })
      }
      })
    return () => ctx.revert()
  }
  return (
    <>
      <div
        className="hamburger-btn fixed right-4 top-4 h-[64px] w-[64px] rounded-[1000px] bg-orange-400 md:hidden z-[15] p-[20px] flex flex-col gap-1 justify-center"
        onClick={handleMenuToggle}
        
      >
        <div
          className={`hamburger-menu-line h-[1px] bg-black ${
            isNavOpen ? "back" : "menu"
          }`}
          id="line1"
        ></div>
        <div
          className={`hamburger-menu-line h-[1px] bg-black ${
            isNavOpen ? "back" : "menu"
          }`}
          id="line2"
        ></div>
        <div
          className={`hamburger-menu-line h-[1px] bg-black ${
            isNavOpen ? "back" : "menu"
          }`}
          id="line3"
        ></div>
      </div>
      <div className="navbar absolute md:fixed left-0 top-0 z-10 w-full md:px-16 lg:px-32 py-4">
        <div className="navbar-container flex relative justify-between w-full font-[NeueMontrealBold] text-black px-8 py-4 rounded-full">
          <a
            id="/"
            
            className="font-[NeueMontrealMedium] text-[1.5em] md:text-[1em]"
          >
            Nishant
            <span className="text-orange-400 font-[NeueMontrealBold]"> .</span>
          </a>
          <nav className="nav">
            <ul className="navlinks flex gap-6">
              <li className="navlink relative">
                <div id="home" onClick={scroll}>
                  Home <IoMdArrowForward id="arrow" />
                </div>
              </li>
              <li className="navlink relative">
                <div id="about" onClick={scroll}>
                  About <IoMdArrowForward id="arrow" />
                </div>
              </li>
              <li className="navlink relative">
                <div id="work" onClick={scroll}>
                  Work <IoMdArrowForward id="arrow" />
                </div>
              </li>
              <li className="navlink relative">
                <div id="skills" onClick={scroll}>
                  Skills <IoMdArrowForward id="arrow" />
                </div>
              </li>
              <li className="navlink relative">
                <div id="contact"  onClick={scroll}>
                  Contact <IoMdArrowForward id="arrow" />
                </div>
              </li>
            </ul>
          </nav>
        </div>

      </div>
        <div
          className={`sidenav w-[50vw] md:hidden ${
            isNavOpen ? "open" : "closed"
          }`}
        >
          <p className="md:hidden text-[0.85em] text-[#838383]" ref={addLinkToRef}>
            NAVIGATION
          </p>
          <Divider className="md:hidden" />
          <ul className="navlinks flex gap-6">
            <li className="sidenav-links navlink relative" ref={addLinkToRef}>
              <div id="home" onClick={scroll}>
                Home <IoMdArrowForward id="arrow" />
              </div>
            </li>
            <li className="sidenav-links navlink relative" ref={addLinkToRef}>
              <div id="about" onClick={scroll}>
                About <IoMdArrowForward id="arrow" />
              </div>
            </li>
            <li className="sidenav-links navlink relative" ref={addLinkToRef}>
              <div id="work" onClick={scroll}>
                Work <IoMdArrowForward id="arrow" />
              </div>
            </li>
            <li className="sidenav-links navlink relative" ref={addLinkToRef}>
              <div id="skills" onClick={scroll}>
                Skills <IoMdArrowForward id="arrow" />
              </div>
            </li>
            <li className="sidenav-links navlink relative" ref={addLinkToRef}>
              <div id="contact" onClick={scroll}>
                Contact <IoMdArrowForward id="arrow" />
              </div>
            </li>
          </ul>
        </div>
    </>
  );
};

export default Navbar;
