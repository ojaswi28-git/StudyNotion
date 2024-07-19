import React from 'react'
import { useForm } from 'react-hook-form'

// import usefrom from 'react-hook-form'
import countryCode from '../../../data/countrycode.json'

const ContactForm = () => {

    const {
        register, 
        reset,
        handleSubmit,
        formState:{ errors }
    } = useForm();

    const onSubmit = (data) =>{
        console.log("Contact Data is ", data);
    }

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-5'
    >

        <div className='flex flex-wrap gap-4 w-full'>
            <div className='flex flex-1 min-w-[200px] flex-col gap-2'>
                <label htmlFor="">Enter First Name <sup>*</sup></label>
                <input type="text"
                        placeholder='First Name'
                        {...register("firstName", {required: true})}
                />
                {   errors.firstName && 
                    <span>First name is required</span>
                }
            </div>
            <div className='flex flex-1 min-w-[200px] flex-col gap-2'>
                <label htmlFor="">Enter Last Name <sup>(Optional)</sup></label>
                <input type="text" 
                        placeholder='Last Name' 
                        {...register('lastName')} 
                />
            </div>
        </div>

        <div className='flex flex-col gap-2'>
            <label htmlFor="">Email Address <sup>*</sup></label>
            <input type="text" 
                        placeholder='Enter Your Email Address'
                        {...register("email", {required: true})}
            />
            { 
                errors.email &&
                <span>Email Id is required</span> 
            }
        </div>

        <div className='flex flex-col gap-2'>
            <label htmlFor="">Phone Number <sup>*</sup></label>
            <div className='flex items-center gap-5'>
                <select className='w-[56px]'
                    {...register("countryCode")}
                >
                    {
                        countryCode.map((country, index) => (
                            <option value={country.code} key={index}
                                selected={country.code === "+91"}
                                
                            >
                                {country.code} {`   `} {country.country}
                            </option>
                        ))
                    }
                </select>
                <input type="text" 
                        placeholder='12345 67890'
                        {...register("contactNumber", {required:true, maxLength:10, minLength:10})}
                />
                {
                    errors.contactNumber && 
                    <span>Phone Number is require</span>
                }
            </div>
        </div>

        <div className='flex flex-col gap-2'>
            <label htmlFor="">Message</label>
            <textarea name="" id="" cols="30" rows="8"
                placeholder='Enter Your Message Here...'
                {...register("message")}
                
            ></textarea>
        </div>

        <button value='submit'
            className='font-[500] text-[16px] leading-[24px] w-full text-center  py-[12px] px-[18px] lg:px-[24px] rounded-[8px] hover:scale-95 hover:shadow-none transition-all duration-200 flex items-center gap-2 justify-center text-richblack-900 bg-yellow-50 shadow-[inset_-2px_-2px_0px_rgba(255,255,255,0.51)'    
        >
            Send Message
        </button>

    </form>
  )
}

export default ContactForm