import { useRef, useState, useEffect } from "react";
import Button from "../button/button";
import CustomInput from "../custom-input/custom-input";
import { BsTwitterX, BsLinkedin, BsGithub } from "react-icons/bs";
import { IoMdArrowForward } from "react-icons/io";
import { Power3, gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger)

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleFormData = (e) => {
    setFormData((currentData) => ({
      ...currentData,
      [e.target.name]: e.target.value,
    }));
  };

  const trigger = useRef(null)
  const targetheading = useRef()
  const targetTitle = useRef([])
  const targetSocialBtns = useRef([])
  const tl = useRef(null)
  const addTitleToRef = (el) => {
    if(el && !targetTitle.current.includes(el)){
      targetTitle.current.push(el)
    }
  }
  const addButtonToRef = (el) => {
    if(el && !targetSocialBtns.current.includes(el)){
      targetSocialBtns.current.push(el)
    }
  }

  useEffect(() => {
    const ctx = gsap.context((self) => {
      tl.current = gsap
        .timeline({
          scrollTrigger: {
            trigger: trigger.current,
            start: "top center",
            end: "bottom center",
            toggleActions: "play none play reverse",
          },
        })
        .fromTo(
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

    }, trigger.current);


    targetSocialBtns.current.forEach((el, index) => {
      tl.current.fromTo(
        el,
      {
        y: '100%',
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: Power3.easeOut,
      },
      `${0.5 + (0.05 *index)}`
      )
    })
   
    return () => ctx.revert();
  }, []);
  return (
    <section
      id="contact"
      className="contact md:p-16 lg:p-32 px-8 py-32 bg-[#d3d3d3]"
      data-scroll-section
      data-scroll-speed="1.5"
      ref={trigger}
    >
      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-2 h-full" data-scroll data-scroll-speed='1.5' >
        <div className="h-full w-full flex justify-start lg:items-center items-start">
        <h1 className="text-[3em] md:text-[5em]" ref={targetheading}>Let's get in touch</h1>
        </div>
        <div className="right flex flex-col gap-2 lg:items-end justify-center ">
          <div id="form" className="lg:w-[75%]">
            <form className="w-[100%] flex flex-col gap-4 items-end mb-4">
              <h2
                className="text-[1.5em] md:text-[3em] pb-4 w-full"
                id="form-title"
                ref={addTitleToRef}
              >
                Send an Email
              </h2>
              <CustomInput
                name="name"
                type="text"
                label={"Name"}
                value={formData.name}
                placeholder="Enter your name..."
                onChange={handleFormData}
              />
              <CustomInput
                name="email"
                type="text"
                label={"Email"}
                value={formData.email}
                placeholder="Enter your email..."
                onChange={handleFormData}
              />
              <CustomInput
                name="message"
                type="textarea"
                label={"Message"}
                value={formData.message}
                placeholder="Write your message..."
                onChange={handleFormData}
              />
              <Button
                label={"Send Email"}
                icon={<IoMdArrowForward style={{rotate: '-45deg'}}/>}
                type="secondary"
                onClick={() => {}}
              />
            </form>
          </div>
          <div className="lg:w-[75%] h-[1px] bg-gray-500 my-4"></div>
          <div id="cta" className="flex flex-row gap-4 lg:w-[75%] justify-between items-center lg:items-center">
            <span className="text-[1.5em] md:text-[3em]" id="social-title" ref={addTitleToRef}>Socials</span>
            <div className="flex flex-wrap gap-2 w-full justify-end items-center lg:justify-end">
              <div ref={addButtonToRef}>
                <Button icon={<BsTwitterX />} type="social"/>
              </div>
              <div ref={addButtonToRef}>
                <Button icon={<BsLinkedin />} type={"social"}/>
              </div>
              <div ref={addButtonToRef}>
                <Button icon={<BsGithub />} type={"social"}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;