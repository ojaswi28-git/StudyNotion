import React from 'react'

import PlanYourLesson from '../../../assets/Images/Plan_your_lessons.png'
import KnowYourProgress from '../../../assets/Images/Know_your_progress.svg'
import CompareWithOthers from '../../../assets/Images/Compare_with_others.svg'
import Button from './Button'
import Highlighted from './Highlighted'


const LearingSection = () => {
  return (
    <div className='flex flex-col items-center gap-[20px] lg:gap-[40px] mt-[50px]'>
            <div className='w-[95%] lg:max-w-[760px] mx-auto '>
                <h1 className='w-full font-[600] text-[30px] lg:text-[36px] text-richblack-900 lg:text-center'>Your swiss knife for 
                    <Highlighted text=' learning any language'/>
                </h1>
                <p className='text-[16px] font-[500] text-richblack-700 lg:text-center leading-[24px]'>
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </p>
            </div>

            <div className='flex relative flex-col items-center lg:flex-row w-full mx-auto'>
                <img src={KnowYourProgress} alt="" className='w-fit relative top-8 lg:absolute lg:left-[5%] lg:top-8 z-[1] '/>
                <img src={CompareWithOthers} alt="" className='w-fit relative z-20 mx-auto' />
                <img src={PlanYourLesson} alt="" className='w-fit relative bottom-12 lg:absolute lg:right-[2%] z-30' />
            </div>

            <div className='w-fit mx-auto -mt-6'>
                <Button active={true} linkto="/login" >Learn More</Button>
            </div>
    </div>
  )
}

export default LearingSection