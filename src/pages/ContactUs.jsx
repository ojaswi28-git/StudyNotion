import React from 'react'
import ContactForm from '../components/cores/About/ContactForm'
import Footer from '../components/cores/common/Footer'

import {BiChat} from 'react-icons/bi'
import {RiEarthFill} from 'react-icons/ri'
import {MdCall} from 'react-icons/md'
import ReviewSlider from '../components/cores/common/ReviewSlider'

const contactData = [
    {
        icon: <BiChat/>,
        heading: "Chat on us",
        desc: "Our friendly team is here to help.",
        contact: "info@studynotion.com",
        // address: "",
    },
    {
        icon: <RiEarthFill/>,
        heading: "Visit us",
        desc: "Come and say hello at our office HQ.",
        // contact: "",
        contact: "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
    },
    {
        icon: <MdCall/>,
        heading: "Call us",
        desc: "Mon - Fri From 8am to 5pm",
        contact: "+123 456 7869",
        // address: "",
    }
]

const ContactUs = () => {
  return (
    <div>
        <div className='my-[50px] lg:mt-[80px] flex flex-col items-center lg:items-start gap-8 lg:flex-row lg:justify-between w-11/12 max-w-[1260px] mx-auto'>
            <div className='flex-1 max-w-[450px] flex flex-col gap-10 p-8 rounded-[20px] bg-richblack-800 h-fit'>
                
                {
                    contactData.map((data, index) => (
                        <div className='text-white flex flex-col gap-2' key={index}>
                            <div className='flex gap-4 items-center text-[24px] font-[600]'>
                                <span className='text-richblack-300 '>{data.icon}</span>
                                <span className='text-richblack-5'>{data.heading}</span>
                            </div>
                            <div className='flex flex-col text-richblack-300 text-[15px] font-[500]'>
                                <div>{data.desc}</div>
                                <div>{data.contact}</div>
                            </div>
                        </div>
                    ))
                }

            </div>
            <div className='flex flex-col gap-5 flex-1 max-w-[700px] border border-richblack-600 p-4 lg:p-12 rounded-[20px]'>
                <h2 className='text-[36px] font-[600] text-richblack-5 leading-[44px] '>
                    Got a Idea? We've got the skills. Let's team up
                </h2>
                <p className='text-[16px] font-[500] text-richblack-300 leading-[24px]'>
                    Tell us more about yourself and what you're got in mind.
                </p>
                <ContactForm/>
            </div>
        </div>

        <section className='w-11/12 max-w-[1260px] mx-auto mt-4'>
            <ReviewSlider heading="Reviews from other learners"/>
        </section>

        <Footer/>
    </div>
    
  )
}

export default ContactUs