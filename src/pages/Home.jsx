import React from 'react'
import {HiArrowRight} from 'react-icons/hi'
import Highlighted from '../components/cores/HomePage/Highlighted';
import Button from '../components/cores/HomePage/Button';
import CodeBlock from '../components/cores/HomePage/CodeBlock';

import HeroBanner from "../assets/Images/bghome.svg"
import BannerVideo from "../assets/Images/banner.mp4"
import Instructor from "../assets/Images/Instructor.png"
import { Link } from 'react-router-dom';
import InstructorText from '../components/cores/HomePage/InstructorText';

import Footer from '../components/cores/common/Footer';
import UnlockCodeSection from '../components/cores/HomePage/UnlockCodeSection';
import TimeLineSection from '../components/cores/HomePage/TimeLineSection';
import LearingSection from '../components/cores/HomePage/LearingSection';
import ReviewSlider from '../components/cores/common/ReviewSlider';

const Home = () => {
  return (
    <div className={`mx-auto flex flex-col items-center bg-[${HeroBanner}]`}>

        {/* Section 1 */}
        <div className='w-11/12 max-w-[1260px] flex flex-col relative'>

            {/* Top Content */}
            <div className='flex flex-col items-center gap-4 mt-[100px]'>

                <Link to="/signup">
                    <div className=' py-3 px-5 rounded-[500px] flex flex-row justify-center items-center gap-4 text-[16px] font-[500] leading-[26px] text-richblack-200 bg-richblack-800
                    '>
                        <span className=''>Become An Instructor</span>
                        <HiArrowRight className='flex items-center text-[16px]'/>
                    </div>
                </Link>

                <div className='text-[30px] lg:text-[36px] capitalize'>
                    <h1 className='text-richblack-5 text-center'>Empower your future with 
                    <Highlighted text=' coding skills'/>
                    </h1>
                </div>

                <p className='text-richblack-200 text-[16px] max-w-[913px] font-[500] text-center'>
                    With our online coding courses, you can learn at your own place, from anywhere in the world, and get access to a wealth of resources, including hands-on-projects, quizzes, and personalized feddback from instructors.
                </p>

                <div className='flex flex-row gap-[8px]'>
                    <Button linkto="/signup" active={true}>Learn More</Button>
                    <Button linkto="/login" active={false}>Book a Demo</Button>
                </div>

            </div>

            {/* Video Section */}
            <div className='my-12 max-w-[1260px] mx-auto shadow-[10px_-5px_50px_-5px] shadow-blue-200'>
                <video muted loop autoPlay className='w-full object-cover shadow-[20px_20px_0px_#f5f5f5] '>
                    <source src={BannerVideo}/>
                </video>
            </div>

            {/* code block Section */}
            <div className=''>
                <CodeBlock
                    position="flex-row"
                    heading={
                        <div>Unlock your
                            <Highlighted text=" coding potential "/>
                            with our online courses.
                        </div>
                    }
                    subHeading = {
                        <p>
                            Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.
                        </p>
                    }

                    btn1 = {
                        {
                            active : true,
                            text : "Try It Yourself"
                        }
                    }
                    btn2 = {
                        {
                            active : false,
                            text : "Learn More"
                        }
                    }

                    codeblock={`<!DOCTYPE html>
                    <html>
                    head><title>Example</title><linkrel="stylesheet"href="styles.css">
                    /head>
                    body>
                    h1><ahref="/">Header</a>
                    /h1>
                    nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>
                    /nav>`}

                    color="text-yellow-25"
                />

                <CodeBlock
                    position="flex-row-reverse"
                    heading={
                        <div>Start
                            <Highlighted text=" coding"/>
                            <br/>
                            <Highlighted text="in seconds"/>
                        </div>
                    }
                    subHeading = {
                        <p>
                            Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.
                        </p>
                    }

                    btn1 = {
                        {
                            active : true,
                            text : "Continue Lesson"
                        }
                    }
                    btn2 = {
                        {
                            active : false,
                            text : "Learn More"
                        }
                    }

                    codeblock={`import React from "react";
                    import CTAButton from "./Button";
                    import TypeAnimation from "react-type";
                    import { FaArrowRight } from "react-icons/fa";
                    
                    const Home = () => {
                    return (
                    <div>Home</div>
                    )
                    }
                    export default Home;`}
    
                    color="text-white"
                />

            </div>

            {/* Bottom Block of Section 1 */}
            <UnlockCodeSection/>


        </div>

        {/* Section 2 */}

        <div className='w-full bg-pure-greys-5 pb-10 lg:pb-20 overflow-hidden flex flex-col items-center gap-[52px]'>

            <div className='bg-frame w-full h-[320px] flex justify-center items-end lg:items-center'>
                <div className='w-[95%] max-w-[1260px] flex justify-center gap-4 mb-14 lg:mb-0'>
                    <Button active={true} linkto='/signup'>
                        Explore Full Catalog
                        <HiArrowRight/>
                    </Button>
                    <Button active={false} linkto='/login'>
                        Learn More
                    </Button>
                </div>
            </div>

            {/* Top */}
            <div className='w-11/12 max-w-[1260px] mx-auto flex flex-col gap-[52px]'>

                <div className='flex flex-wrap justify-between gap-4'>
                    <h1 className='w-[95%] max-w-[580px] text-[30px] lg:text-[36px] font-[600] leading-[38px] lg:leading-[44px] text-richblack-900'>
                        Get the skills you need for a 
                        <Highlighted text=' job that is in demand.'/>
                    </h1>
                    <div className='flex flex-col items-start'>
                        <p className='w-[95%] max-w-[580px] text-[16px] font-[500] leading-[24px] text-richblack-700 mb-10'>
                            The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </p>
                        <Button active={true} linkto='/login'>Learn More</Button>
                    </div>
                </div>
                
                {/* Time line Section */}
                <TimeLineSection/>

                {/* Bottom */}
                <LearingSection/>

            </div>
        </div>

        {/* Section 3 */}
        <div className='w-11/12 mt-[30px] mb-10 lg:mt-[80px] max-w-[1260px] mx-auto flex flex-col-reverse lg:flex-row gap-10 justify-around items-center'>
            {/* Image Section */}
            <div className='relative w-[95%] max-w-[600px]'>
                {/* Background Effect */}
                <div className='absolute w-full h-full -top-[15px] -left-[15px] bg-white z-[0]'></div>

                {/* Instructor Image */}
                <img src={Instructor} alt="" className='relative z-[50] w-full'/>
                
            </div>

            {/* Instructor Section */}
            <InstructorText
                heading={
                    <div>
                        Become an <br/>
                        <Highlighted text=' instructor'/>
                    </div>
                }
                subHeading = {
                    <p>
                        Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                    </p>
                }
            />
            
        </div>

        <div className='w-11/12 max-w-[1260px] mx-auto'>
            <ReviewSlider heading="Reviews from other learners"/>
        </div>

        {/* Footer */}
        <Footer/>

    </div>
  )
}

export default Home;