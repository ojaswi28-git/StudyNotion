import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from './IconBtn'
import {RiEditBoxLine} from 'react-icons/ri'
import { Link } from 'react-router-dom'


const MyProfile = () => {

    const {user} = useSelector((state)=>state.profile)

  return (
    <>
        <h1 className='text-[30px] capitalize font-semibold text-richblack-5 mb-8'>my profile</h1>

        {/* First Section */}
        <div className='flex flex-col gap-6'>
            <div className='flex flex-wrap gap-4 justify-between p-4 py-6 md:py-8 md:px-12 bg-richblack-800 rounded-xl border border-richblack-600'>
                <div className='flex flex-wrap gap-4'>
                    <div className='w-[80px] aspect-square rounded-full overflow-hidden'>
                        <img src={user?.image} alt="" />
                    </div>
                    <div className='flex flex-col justify-center gap-2'>
                        <span className='text-xl font-bold text-richblack-5'>{user?.firstName} {user?.lastName}</span>
                        <span className='text-md text-richblack-200'>{user?.email}</span>
                    </div>
                </div>
            
                {/* Button */}
                <Link to='/dashboard/settings'>
                    <IconBtn>
                        Edit
                        <RiEditBoxLine/>
                    </IconBtn>
                </Link>
            </div>

            {/* Second Section */}
            <div className='flex flex-col gap-2 p-4 py-6 md:py-8 md:px-12 bg-richblack-800 rounded-xl border border-richblack-600'>
                <div className='flex gap-4 items-center justify-between'>
                    <h2 className='text-xl font-bold text-richblack-5'>About</h2>
                    <Link to='/dashboard/settings'>
                        <IconBtn>
                            Edit
                            <RiEditBoxLine/>
                        </IconBtn>
                    </Link>
                </div>
                <p className='text-richblack-200'>{user?.additionalDetails?.about}</p>
            </div>

            {/* Third Section */}
            <div className='flex flex-col gap-2 p-4 py-6 md:py-8 md:px-12 bg-richblack-800 rounded-xl border border-richblack-600'>
                <div className='flex gap-4 justify-between items-center mb-6'>
                    <h2 className='text-xl font-bold text-richblack-5'>Personal Details</h2>
                    <Link to='/dashboard/settings'>
                        <IconBtn>
                            Edit
                            <RiEditBoxLine/>
                        </IconBtn>
                    </Link>
                </div>
                
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='flex flex-col gap-1'>
                        <h3 className='text-[16px] text-richblack-200'>First Name : </h3>
                        <span className='text-[16px] text-richblack-5'>{user?.firstName}</span>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h3 className='text-[16px] text-richblack-200'>Last Name : </h3>
                        <span className='text-[16px] text-richblack-5'>{user?.lastName}</span>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h3 className='text-[16px] text-richblack-200'>Email Address : </h3>
                        <span className='text-[16px] text-richblack-5'>{user?.email}</span>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h3 className='text-[16px] text-richblack-200'>Phone Number : </h3>
                        <span className='text-[16px] text-richblack-5'>{user?.additionalDetails?.contactNumber ? user?.additionalDetails?.contactNumber : "Add Your Mobile Number"}</span>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h3 className='text-[16px] text-richblack-200'>Gender : </h3>
                        <span className='text-[16px] text-richblack-5'>{user?.additionalDetails?.gender ? user?.additionalDetails?.gender : "Add Your Gender"}</span>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h3 className='text-[16px] text-richblack-200'>Date Of Birth : </h3>
                        <span className='text-[16px] text-richblack-5'>{user?.additionalDetails?.dateOfBirth ? user?.additionalDetails?.dateOfBirth : "Add Your DOB"}</span>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default MyProfile