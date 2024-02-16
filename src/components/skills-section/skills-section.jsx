import React, {useEffect, useRef} from 'react'
import Button from '../button/button';
import Divider from '../divider/divider';
import { Power3, gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, Power3)

const SkillsSection = () => {
  const trigger = useRef(null)
    const targetheading = useRef()
    const targetTitle = useRef([])
    const targetSkill = useRef([])
    const targetButton = useRef()

    const tl = useRef(null)
    const tl2 = useRef(null)

    const skills = [
        { Languages: ["JavaScript", "Python", "SQL", "Java"] },
        {
          "Frameworks / Technologies": [
            "ReactJS",
            "Redux",
            "NextJS",
            "NodeJS",
            "ExpressJS",
            "MongoDB",
            "Firebase",
            "Django",
            "Flutter",
          ],
        },
      ];

      const addTitleToRef = (el) => {
        if(el && !targetTitle.current.includes(el)){
          targetTitle.current.push(el)
        }
      }
      const addSkillToRef = (el) => {
        if(el && !targetSkill.current.includes(el)){
          targetSkill.current.push(el)
        }
      }

      const viewCv = () => {
        const url = `https://drive.google.com/file/d/1ytoPymznl9FUwYM2hYP64UjrK3S150g0/view?usp=drive_link`
        window.open(url, '_blank')
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

  
        targetTitle.current.forEach((el, index) => {
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
          ` ${0.5 + (0.05 *index)}`
          )
        })

        targetSkill.current.forEach((el, index) => {
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
          ` ${0.5 + (0.05 *index)}`
          )
        })
       
        return () => ctx.revert();
      }, []);
  return (
    <section id="skills" className='md:p-16 lg:p-32 px-8 py-32 relative' data-scroll-section ref={trigger}>
      <h2 className='text-[3em] md:text-[5em]' ref={targetheading}>My Skills</h2>
        <div className="flex flex-col gap-8 my-8 md:gap-16 md:my-16">
            <Divider />
        {skills.map((obj, key) => {
              return (
                <>
                <div key={key} className="flex flex-col gap-x-8 items-start lg:flex-row lg:items-center">
                  <h2 className="pb-2 text-[1.5em] md:text-[2em] lg:w-[30%]" ref={addTitleToRef}>{Object.keys(obj)[0]}</h2>
                  <div className="flex flex-wrap gap-x-2 gap-y-4 lg:w-[40%] md:w-[75%] flex-5">
                    {obj[Object.keys(obj)].map((skill, key) => (
                      <div
                        key={key}
                        className="skill-item py-2 px-3 border-black border-[1px] rounded-full select-none text-[1em] md:text-[1.15em]"
                        ref={addSkillToRef}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
                <Divider />
                </>
              );
            })}
        </div>
        <div className="absolute right-[20px]  md:right-[50px] md:bottom-[50px] lg:right-[8rem]" ref={targetButton}>
            <Button label={"View CV"} type="primary" onClick={viewCv}/>
        </div>
    </section>
  )
}

export default SkillsSection
