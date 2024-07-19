import React from 'react'

import TimeLineImage from '../../../assets/Images/TimelineImage.png'

import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'

const data = [
    {
        icon : Logo1,
        heading : "Leadership",
        description : "Fully committed to the success company",
    },
    {
        icon : Logo2,
        heading : "Responsibility",
        description : "Students will always be our top priority",
    },
    {
        icon : Logo3,
        heading : "Flexibility",
        description : "The ability to switch is an important skills",
    },
    {
        icon : Logo4,
        heading : "Solve the problem",
        description : "Code your way to a solution",
    },
]

const TimeLineSection = () => {
  return (
    <div className='flex lg:justify-center lg:items-center flex-col gap-8 items-center lg:flex-row'>
        <div className='relative w-full max-w-[500px]  flex flex-col gap-[52px] justify-center h-[100%]'>
            {/* 3 dotted lines */}
            {
                data.map((element, index)=>{
                    return (
                        <div key={index}
                            className='flex items-center gap-4 lg:px-10'
                        >
                            <div className='relative p-[4px] w-[52px] aspect-square flex justify-center items-center bg-white rounded-full shadow-[0px_0px_62px_rgba(0,0,0,0.22)] '>
                                <img src={element.icon} alt="" className='w-[24px]'/>
                            </div>
                            <div>
                                <div className='text-[18px] font-[600] leading-[26px] text-richblack-800'>
                                    {element.heading}
                                </div>
                                <div className='text-[14px] font-[400] leading-[22px] text-richblack-700'>
                                    {element.description}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        <div className='relative w-[95%] shadow-[20px_20px_0px_#ffffff]'>
            {/* Background Shadow */}
            <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[100%] h-[70%] rounded-full bg-gradient-to-r from-[#9CECFB] via-[#65C7F7] to-[#0052D4] opacity-60 shadow-[0px_0px_50px_#65C7F7] z-0'></div>
            <img src={TimeLineImage} alt="" className='relative z-50' />
        </div>
    </div>
  )
}

export default TimeLineSection