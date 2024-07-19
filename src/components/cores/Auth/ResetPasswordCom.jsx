import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import {BsArrowLeft} from 'react-icons/bs'
import { getPasswordResetToken } from '../../../services/operations/authAPI';

const ResetPasswordCom = ({heading, description, btn, sentEmail, setEmailSent}) => {

    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const {loading} = useSelector((state)=>state.auth);

    const [formData, setFormData] = useState({
        email:''
    })

    const { email } = formData;
    const tempEmail = email;

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setFormData((prev)=>({
            ...prev, [name] : value
        }))
    }

    const handleOnSubmit = (e) =>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent))
    }

  return (
    <div className='w-[90%] max-w-[508px] p-[32px] '>
        {
            loading ?
            <div>
                Loading...
            </div>

            :

            <div className='w-full flex flex-col gap-2'>
                <h2 className='text-richblack-5 text-[30px] font-[600]'>
                    {heading}
                </h2>
                {
                        sentEmail ? 
                    <p className='text-[18px] text-richblack-100 font-[400]'>
                        {description + " " + tempEmail}
                    </p>
                        :
                    <p className='text-[18px] text-richblack-100 font-[400]'>
                        {description}
                    </p>
                }
                <form action="">    
                    {
                        !sentEmail && 
                        <div className='flex flex-col gap-3 mt-4 mb-8 text-richblack-5'>
                            <label htmlFor="" className='text-[14px] font-[400]'>
                                Email Address <sup>*</sup></label>
                            <input type="email" 
                                placeholder='Enter your email address'
                                name="email"
                                value={formData.email}
                                onChange={changeHandler}
                                className='text-[16px] font-[500]'
                            />
                        </div>
                    }
                    
                    <button value='submit' onClick={handleOnSubmit}
                            className='font-[500] text-[16px] leading-[24px] w-full text-center  py-[12px] px-[18px] lg:px-[24px] rounded-[8px] hover:scale-95 hover:shadow-none transition-all duration-200 flex items-center gap-2 justify-center text-richblack-900 bg-yellow-50 shadow-[inset_-2px_-2px_0px_rgba(255,255,255,0.51)'    
                    >
                            {btn}
                    </button>

                </form>

                <div>
                    <Link to='/login' className='flex items-center w-fit gap-2 text-[16px] text-richblack-5 font-[500]'>
                        <span>
                            <BsArrowLeft/>
                        </span>
                        <p>Back To Login</p>

                    </Link>
                </div>
            </div>
        }
    </div>
  )
}

export default ResetPasswordCom