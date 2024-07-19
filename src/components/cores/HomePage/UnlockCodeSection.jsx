import React, { useState } from 'react'
import {MdPeople} from 'react-icons/md'
import {FaUserTie} from 'react-icons/fa'
import Highlighted from './Highlighted'
import {HomePageExplore} from '../../../data/homepage-explore'

const tabName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]


const UnlockCodeSection = () => {

    const [currentTab, setCurrentTab] = useState(tabName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) =>{
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

  return (
    <div className='relative min-h-[400px] max-h-[1100px]'>
                <div className='mb-[50px] flex flex-col gap-4'>
                    
                    <div>
                        <div className='text-center text-[30px] lg:text-[36px] font-[600] leading-[38px] lg:leading-[44px] lg:text-center text-richblack-5'>
                            Unlock the 
                            <Highlighted text=" Power of code"/>
                        </div>
                        <p className='text-center text-[16px] leading-[24px] text-richblack-50 lg:text-center mt-2'>
                            Learn to Build Anything You Can Imagine
                        </p>
                    </div>

                    <div className='flex flex-wrap w-fit mx-auto justify-center text-white gap-2 py-2 px-3 bg-richblack-800 rounded-full'>
                        {
                            tabName.map((element, index)=>{
                                return (
                                    <div className={`cursor-pointer text-[16px] font-[400] leading-[24px] py-1 px-4 rounded-full hover:bg-richblack-900 hover:text-richblack-5
                                        ${currentTab === element ? "bg-richblack-900 text-richblack-5 " : "text-richblack-200"} `} 
                                        key={index} onClick={()=>setMyCards(element)}
                                    >
                                        {element}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                    {/* <div className='h-[200px]'></div> */}

                {/* Card Div */}
                <div className='w-full flex flex-col items-center lg:flex-row gap-8 justify-center lg:absolute lg:-bottom-20 lg:left-[50%] lg:-translate-x-[50%]'>
                    {
                        courses.map((course, index)=>{
                            return (
                                <div className={`text-white min-h-[300px] pt-8 pb-4 px-6 max-w-[340px] flex flex-col justify-between
                                    ${currentCard === course.heading ? "bg-white shadow-[12px_12px_0px_#ffd60a]" : "bg-richblack-800"}
                                `} key={index} onClick={()=>setCurrentCard(course.heading)}>

                                    <div className='flex flex-col gap-3'>
                                        <h2 className={`text-[20px] font-[600] ${currentCard === course.heading? "text-richblack-900":"text-richblack-25"}`}>
                                            {course.heading}
                                        </h2>
                                        <p className={`${currentCard === course.heading  ? "text-richblack-500" : "text-richblack-400"}`}>
                                            {course.description}
                                        </p>
                                    </div>
                                    
                                    <div className={`flex justify-between text-[16px] font-[500] ${currentCard === course.heading? "text-blue-500" : "text-richblack-300"}`}>
                                        <div className='flex gap-3 items-center'>
                                            <MdPeople className='text-[24px]'/>
                                            <span>{course.level}</span>
                                        </div>
                                        <div className='flex gap-3 items-center'>
                                            <FaUserTie/>
                                            <div>
                                                {course.lessionNumber} Lessons
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
    </div>
  )
}

export default UnlockCodeSection