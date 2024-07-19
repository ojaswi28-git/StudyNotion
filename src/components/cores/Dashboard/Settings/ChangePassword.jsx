import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../../../services/operations/settingAPI';

const ChangePassword = () => {

    const {token} = useSelector((state)=>state.auth)
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const updatePassword = async(data) =>{
        try{
            dispatch(changePassword(token, data, navigate))
        }
        catch(err){
            console.log("Error Message : ", err.message)
        }
        // console.log(data);
    }

  return (
    <form onSubmit={handleSubmit(updatePassword)}  className='flex flex-col gap-4'>
    <div className='flex flex-col gap-6 p-4 py-6 md:py-8 md:px-12 bg-richblack-800 rounded-xl border border-richblack-600'>
        <div className='flex justify-between items-center'>
            <h2 className='text-xl font-bold text-richblack-5'>Personal Information</h2>
            {/* <IconBtn path='/dashboard/settings'>
                Edit
                <RiEditBoxLine/>
            </IconBtn> */} 
        </div>
    
        <div className='flex gap-6 flex-col lg:flex-row'>
            <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="currentPassword" className="lable-style">
                    Current Password
                </label>
                <input 
                    type="text"
                    name="currentPassword"
                    id="currentPassword"
                    placeholder="Enter current password"
                    className="form-style"
                    {...register("oldPassword", { required: true })}
                />
                {errors.firstName && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your current password
                    </span>
                )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="newPassword" className="lable-style">
                    New Password
                </label>
                <input 
                    type="text"
                    name="newPassword"
                    id="newPassword"
                    placeholder="Enter new password"
                    className="form-style"
                    {...register("newPassword", { required: true })}
                />
                {errors.firstName && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your new password.
                    </span>
                )}
            </div>
        </div>
    </div>

    <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile")
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          <button type='submit'
            className="cursor-pointer rounded-md bg-yellow-50 py-2 px-5 font-semibold text-richblack-900"
          >
            Update
          </button>
    </div>
    </form>
  )
}

export default ChangePassword