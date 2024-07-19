import React, { useState } from 'react'

import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../services/operations/authAPI';
// import Button from '../HomePage/Button';

const Login = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    // const [showConfirmPassword, setConfirmPassword] = useState(false);

    const [formdata, SetFormData] = useState({
        email:"", password:"" 
    })

    const { email, password } = formdata;

    // const userLogin = async(formdata) =>{
    //     try{
    //         const userResult = await apiConnector("POST", users.FETCH_API);
    //         console.log("User is ", userResult);
    //     }
    //     catch(err){
    //         console.error(err);
    //     }
    // }

    function changeHandler(event){
        const {name, value} = event.target;
        SetFormData((prev)=>({
            ...prev, [name] : value,
        }))
    }

    function handleOnSubmit(e){
        e.preventDefault();
        dispatch(login(email,password,navigate))
    }

  return (
    <form action="" className='flex flex-col gap-[12px] ' onSubmit={handleOnSubmit}>
                    {/* <div className='flex  items-center  p-[4px] w-[230px] bg-richblack-800 rounded-full mb-4'>
                        <div className={`flex flex-1  py-[6px] px-[18px] rounded-full ${formdata.accountType === 'Student' ? "bg-richblack-900 ":"text-richblack-200"}`}>
                            <input type="radio"  value='Student' name='accountType' id='student' onChange={changeHandler}/>
                            <label htmlFor="student" className='cursor-pointer text-[16px]'>Student</label>
                        </div>
                        <div className={`flex flex-1  py-[6px] px-[18px] rounded-full ${formdata.accountType === 'Instructor' ? "bg-richblack-900 ":"text-richblack-200"} `}>
                            <input type="radio" value='Instructor' name='accountType' id='instructor' onChange={changeHandler}/>
                            <label htmlFor="instructor" className='cursor-pointer text-[16px]'>Instructor</label>
                        </div>
                        
                    </div> */}

                    <div className='flexcolgap'>
                        <span>Email Address <sup>*</sup> </span>
                        <input type="email"
                                placeholder='Enter email address' 
                                name='email'
                                value={formdata.email}
                                onChange={changeHandler}
                        />
                    </div>
                        
                        <div className='flexcolgap'>
                            <span>Password <sup>*</sup> </span>
                            <div className='relative'>
                                <span className='eyebutton' onClick={()=>(setShowPassword(prev => !prev))}>
                                    {
                                        showPassword?
                                        <AiOutlineEye/>
                                        :
                                        <AiOutlineEyeInvisible/>
                                    }
                                </span>
                                <input type={`${showPassword? "text" : "password"}`}    
                                        placeholder='Enter password' 
                                        name='password'
                                        value={formdata.password}
                                        onChange={changeHandler}
                                />
                            </div>
                            <Link to='/forgot-password'
                                className='self-end capitalize text-blue-100 text-[14px]'
                            >
                                forgot password
                            </Link>
                    </div>
                    

                    <div className='mt-6' >
                        
              
                        <button type='submit'
                            className='font-[500] text-[16px] leading-[24px] w-full text-center  py-[12px] px-[18px] lg:px-[24px] rounded-[8px] hover:scale-95 hover:shadow-none transition-all duration-200 flex items-center gap-2 justify-center text-richblack-900 bg-yellow-50 shadow-[inset_-2px_-2px_0px_rgba(255,255,255,0.51)'    
                        >
                            Submit
                        </button>
   
                        
                    </div>

                </form>
  )
}

export default Login