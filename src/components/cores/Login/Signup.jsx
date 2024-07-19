import React, {useState} from 'react'

import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import Button from '../HomePage/Button';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setSignupData } from '../../../slices/authSlice';
import { sendOtp } from '../../../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';


const Signup = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmPassword] = useState(false);

    const [formdata, SetFormData] = useState({
        firstName:"", lastName:"", email:"",accountType:"Student", password:"", confirmPassword:""
    })

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
            ...prev, [name]:value
        }))        
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if(formdata.password != formdata.confirmPassword){
            toast.error("Password Do Not Match");
            return;
        }

        dispatch(setSignupData(formdata));

        dispatch(sendOtp(formdata.email, navigate));

        // reset form data
        setSignupData({
            firstName:"",
            lastName:"",
            email:"",
            // contactNumber:"",
            password:"",
            confirmPassword:"",
            accountType:"Student"
        })


        console.log("User is ", formdata);
    }

  return (
    <form action="" className='flex flex-col gap-[12px] ' onSubmit={handleOnSubmit}>
                    <div className='flex  items-center  p-[4px] w-[230px] bg-richblack-800 rounded-full mb-4'>
                        <div className={`flex flex-1  py-[6px] px-[18px] rounded-full ${formdata.accountType === 'Student' ? "bg-richblack-900 ":"text-richblack-200"}`}>
                            <input type="radio"  value='Student' name='accountType' id='student' onChange={changeHandler}/>
                            <label htmlFor="student" className='text-[16px] cursor-pointer'>Student</label>
                        </div>
                        <div className={`flex flex-1  py-[6px] px-[18px] rounded-full ${formdata.accountType === 'Instructor' ? "bg-richblack-900 ":"text-richblack-200"} `}>
                            <input type="radio" value='Instructor' name='accountType' id='instructor' onChange={changeHandler}/>
                            <label htmlFor="instructor" className='text-[16px] cursor-pointer'>Instructor</label>
                        </div>
                        
                    </div>


                        <div className='flex gap-4'>
                            <div className='flexcolgap'>
                                <span>First Name <sup>*</sup> </span>
                                <input type="text" 
                                    placeholder='Enter first name' 
                                    name='firstName'
                                    value={formdata.firstName}
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className='flexcolgap'>
                                <span>Last Name <sup>*</sup> </span>
                                <input type="text" 
                                    placeholder='Enter last name' 
                                    name='lastName'
                                    value={formdata.lastName}
                                    onChange={changeHandler}
                                />
                            </div>
                        </div>


                    <div className='flexcolgap'>
                        <span>Email Address <sup>*</sup> </span>
                        <input type="email" 
                            placeholder='Enter email address' 
                            name='email'
                            value={formdata.email}
                            onChange={changeHandler}    
                        />
                    </div>


                        {/* <div className='flexcolgap'>
                            <span>Phone Number <sup>*</sup> <span>(optional)</span> </span>
                            <div>
                                <div></div>
                                <input type="number" 
                                    placeholder='91XXXXXXXX' 
                                    name='contactNumber'
                                    value={formdata.contactNumber}
                                    onChange={changeHandler}
                                />
                            </div>
                        </div> */}


                        <div className='flex gap-4'>
                            <div className='flexcolgap'>
                                <span>Create Password <sup>*</sup> </span>
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
                            </div>
                            <div className='flexcolgap'>
                                <span>Confirm Password <sup>*</sup> </span>
                                <div className='relative'>
                                    <span className='eyebutton' onClick={()=>(setConfirmPassword(prev => !prev))}>
                                        {
                                            showConfirmPassword?
                                            <AiOutlineEye/>
                                            :
                                            <AiOutlineEyeInvisible/>
                                        }
                                    </span>
                                    <input type={`${showConfirmPassword? "text" : "password"}`} 
                                        placeholder='Enter password' 
                                        name='confirmPassword'
                                        value={formdata.confirmPassword}
                                        onChange={changeHandler}
                                    />
                                </div>
                            </div>
                        </div> 
                       

                    <div className='mt-8' >
                        
                        <button  value='submit' 
                            className='font-[500] text-[16px] w-full leading-[24px] text-center  py-[12px] px-[18px] lg:px-[24px] rounded-[8px] hover:scale-95 hover:shadow-none transition-all duration-200 flex items-center gap-2 justify-center text-richblack-900 bg-yellow-50 shadow-[inset_-2px_-2px_0px_rgba(255,255,255,0.51)'     
                        >Sign Up</button>
                        
                    </div>

                </form>
  )
}

export default Signup