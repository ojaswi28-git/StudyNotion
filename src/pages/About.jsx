import React from 'react'
import Highlighted from '../components/cores/HomePage/Highlighted'

import BannerImage1 from '../assets/Images/aboutus1.webp'
import BannerImage2 from '../assets/Images/aboutus2.webp'
import BannerImage3 from '../assets/Images/aboutus3.webp'

import FoundingStory from '../assets/Images/FoundingStory.png'
import Footer from '../components/cores/common/Footer'
import ContactForm from '../components/cores/About/ContactForm'
import LearningGrid from '../components/cores/About/LearningGrid'
import Stats from '../components/cores/About/Stats'
import ReviewSlider from '../components/cores/common/ReviewSlider'

const About = () => {
  return (
    <div className='relative flex flex-col gap-5 lg:gap-12'>
         <div className='absolute top-0  left-0 w-full h-[550px] bg-richblack-700 z-0'></div>


        {/* Section - 1 */}
        <section className='relative pt-12 flex flex-col gap-2 w-11/12 max-w-[1260px] mx-auto z-50'>
            <h2 className='text-[36px] font-[600] text-richblack-5 leading-[44px] max-w-[809px] text-center p-4 capitalize mx-auto'>
                driving innovation in online eduction for a                
                <Highlighted text=" Brighter future"/>
            </h2>
            <p className='text-[16px] font-[500] text-richblack-300 leading-[24px] max-w-[825px] text-center capitalize mx-auto'>
                Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
            </p>

            <div className='flex flex-col lg:flex-row mt-10 lg:mt-14 justify-between gap-5 w-full'>
                <div className='flex-1'>
                    <img src={BannerImage1} alt="" />
                </div>
                <div className='flex-1'>
                    <img src={BannerImage2} alt="" />
                </div>
                <div className='flex-1'>
                    <img src={BannerImage3} alt="" />
                </div>
            </div>

        </section>

        {/* Section 2 */}
        <section className='w-full py-14 border-b border-richblack-400'>
            <h2 className='w-11/12 max-w-[1260px] mx-auto text-[36px] font-[600] text-richblack-5 text-center leading-[44px]'>
                We are passionate about revolutionizing the way we learn. Our innovative platform
                <Highlighted text=' combines technology'/>, {" "}
                <span className='text-transparent bg-clip-text bg-gradient-to-b from-[#E65C00]  to-[#F9D423]'>expertise</span>, and community to create an {" "}
                <span className='text-transparent bg-clip-text bg-gradient-to-b from-[#E65C00]  to-[#F9D423]'>unparalleled educational experience.</span>
            </h2>
        </section>

        {/* Section 3 */}
        <section className='mt-12 flex flex-col gap-2 w-11/12 max-w-[1260px] mx-auto'>
            <div className='flex flex-wrap justify-between items-center gap-8'>
                <div className='flex-1 max-w-[486px] min-w-[250px] flex flex-col gap-5'>
                    <h2 className='text-[36px] font-[600] text-transparent bg-clip-text bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] leading-[44px]'>
                        Our Founding Story 
                    </h2>
                    <p className='text-[16px] font-[500] text-richblack-300 leading-[24px]'>
                        Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                    </p>
                    <p className='text-[16px] font-[500] text-richblack-300 leading-[24px]'>
                        As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                    </p>
                </div>
                <div className='flex-1 min-w-[300px] max-w-[500px] p-6 relative '>
                    <div className='w-[80%] h-[80%] rounded-full bg-gradient-to-r from-[#EC008C] to-[#FC6767] absolute top-[-5px] left-[4px] opacity-20 blur-[34px] z-1'></div>
                    <img src={FoundingStory} alt="" className='relative z-50'/>
                </div>
            </div>

            <div className='flex flex-wrap justify-between gap-8 items-start mt-10 lg:mt-32'>
                <div className='flex flex-1 min-w-[250px] flex-col gap-5 max-w-[486px]'>
                    <h2 className='text-[36px] font-[600] text-transparent bg-clip-text bg-gradient-to-r from-[#E65C00]  to-[#F9D423] leading-[44px]'>
                        Our Vision
                    </h2>
                    <p className='text-[16px] font-[500] text-richblack-300 leading-[24px]'>
                        With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                    </p>
                </div>
                <div className='flex flex-1 min-w-[250px] flex-col gap-5 max-w-[486px]'>
                    <h2 className='text-[36px] font-[600] leading-[44px]'>
                        <Highlighted text='Our Mission'/>
                    </h2>
                    <p className='text-[16px] font-[500] text-richblack-300 leading-[24px]'>
                        our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                    </p>
                </div>
            </div>
        </section>

        <section>
            <Stats/>
        </section>
        
        <section className='w-11/12 max-w-[1260px] mx-auto flex flex-col items-center mt-8'>
            <LearningGrid/>
        </section>

        {/* Form Section */}
        <section className='w-11/12 max-w-[1260px] mx-auto flex flex-col items-center'>
            <h2 className='text-[36px] font-[600] text-richblack-5 leading-[44px] '>
                Get In Touch
            </h2>
            <p className='text-[16px] font-[500] text-richblack-300 leading-[24px]'>
                We’d love to here for you, Please fill out this form.
            </p>
            <div className='w-full max-w-[600px]'>
                <ContactForm/>
            </div>
        </section>

        <section className='w-11/12 max-w-[1260px] mx-auto mt-4'>
            <ReviewSlider heading="Reviews from other learners"/>
        </section>

        <Footer/>
    </div>
  )
}

export default About