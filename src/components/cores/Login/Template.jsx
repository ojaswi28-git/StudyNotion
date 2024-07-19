import React, { useState } from 'react'

import './Template.css'

import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import Button from '../HomePage/Button';

import LoginImage from '../../../assets/Images/login.webp'
import SignupImage from '../../../assets/Images/signup.webp'
import Signup from './Signup';
import Login from './Login';

// import frame from '../../../assets/Images/frame.png'
// import Signup from '../../../pages/Signup';

const Template = ({login, heading, description, blueText}) => {



  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center text-white'>
        <div className='w-11/12 max-w-[1260px] flex items-center flex-col-reverse md:items-start md:flex-row justify-between gap-10 my-10'>
            <div className='max-w-[480px] flex-1 flex flex-col gap-[36px] text-richblack-5'>
                <div className='flex flex-col gap-2'>
                    <h2 className='text-3xl font-[600] leading-12'>{heading}</h2>
                    <p>
                        <span className='font-[400] text-[18px]'>{description}</span>
                        <p className='text-blue-100 italic font-edu-sa font-[700] text-[16px]'>{blueText}</p>
                    </p>
                    
                </div>
                {
                    !login ? 
                    (<> <Signup/> </>) 
                    : 
                    (<> <Login/> </>)
                }
            </div>
            <div className='relative max-w-[500px] flex-1 h-fit'>
                {/* Frame */}
                <div className='bgframe absolute w-full h-full top-[15px] left-[15px] bg-white z-0'>

                </div>
                <div className='relative z-[50]'>
                    {
                        login ? 
                        <img src={LoginImage} alt="" />
                        :
                        <img src={SignupImage} alt="" />
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Template;