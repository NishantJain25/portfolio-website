import React, { useRef } from 'react'
import Button from '../button/button'
import gsap, { Power3 } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'

gsap.registerPlugin(Power3, ScrollTrigger)

const AboutSection = () => {

    const trigger = useRef(null)
    const targetMain = useRef([])
    const targetSecondary = useRef()
    const targetButton = useRef()
    const tl = useRef(null)
    const tl2 = useRef(null)
    const addToRef = (el) => {
      if(el && !targetMain.current.includes(el)){
        targetMain.current.push(el)
      }
    }
    const aboutText = "Recently graduated as an MBA Tech. in Computer Engineering, I am a Web and Software developer. I like to develop innovative and human centric designs, and I constantly strive to learn."
    console.log(aboutText.split(" "))
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

          tl2.current = gsap.timeline({
            scrollTrigger: {
              trigger: trigger.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
              toggleActions: 'play reverse play reverse'
            }
          })
            .fromTo(
              targetButton.current,
              {
                y: 100
              },
              {
                y: -50,
              },
              0
            )

          
      }, trigger.current);

      targetMain.current.forEach((el, index) => {
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
        ` ${0.01 *index}`
        )
      })
      return () => ctx.revert();
    }, []);
    
  
  return (
    <section id="about" className='md:px-16 lg:p-32 px-8 py-32 relative' ref={trigger} data-scroll-section>
        <div className="flex flex-col items-start lg:flex-row gap-16 ">
        <div className="flex flex-wrap gap-[6px] md:gap-2">
        {aboutText.split(" ").map((word, index) => <span className='word text-[1.5em] md:text-[2em]' key={index} ref={addToRef}>{word}</span>)}
        </div>
        <div className='subtext md:w-[50%]  lg:w-[80%] md:text-[1.15em] lg:text-[1.15em] text-[#8d8e8f]' ref={targetSecondary}>
            MBA Tech. is a 5 years integrated program (B.Tech + MBA) offered
              by Mukesh Patel School of Technology Management and Engineering.
        </div>
        </div>
        <div className="absolute right-[20px]  md:right-[50px] bottom-[-20px] lg:right-[8rem]" ref={targetButton}>
            <Button label={"About Me"} type="primary"/>
        </div>
    </section>
  )
}

export default AboutSection
