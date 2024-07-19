import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateProfile } from '../../../../services/operations/settingAPI'

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

const ProfileInfo = () => {

    const {register, handleSubmit, formState:{errors}} = useForm();
    const {user} = useSelector((state)=>state.profile)
    const {token} = useSelector((state)=>state.auth)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitProfileForm = async(data) => {
        try{
            dispatch(updateProfile(token, data))
        }
        catch(err){
            console.log("Error message : ", err.message)
        }
    }

  return (
    <form onSubmit={handleSubmit(submitProfileForm)} className='flex flex-col gap-4'>
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
                <label htmlFor="firstName" className="lable-style">
                    First Name
                </label>
                <input 
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Enter first name"
                    className="form-style"
                    {...register("firstName", { required: true })}
                    defaultValue={user?.firstName}
                />
                {errors.firstName && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your first name.
                    </span>
                )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
                <label htmlFor="lastName" className="lable-style">
                    Last Name
                </label>
                <input 
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Enter last name"
                    className="form-style"
                    {...register("lastName", { required: true })}
                    defaultValue={user?.lastName}
                />
                {errors.firstName && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                    Please enter your last name.
                    </span>
                )}
            </div>
        </div>

        <div className="flex gap-6 flex-col lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="dateOfBirth" className="lable-style">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="form-style"
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="gender" className="lable-style">
                Gender
              </label>
              <select
                type="text"
                name="gender"
                id="gender"
                className="form-style"
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                {genders.map((ele, i) => {
                  return (
                    <option key={i} value={ele}>
                      {ele}
                    </option>
                  )
                })}
              </select>
              {errors.gender && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Date of Birth.
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="contactNumber" className="lable-style">
                Contact Number
              </label>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder="Enter Contact Number"
                className="form-style"
                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Please enter your Contact Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
                defaultValue={user?.additionalDetails?.contactNumber}
              />
              {errors.contactNumber && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="about" className="lable-style">
                About
              </label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                className="form-style"
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetails?.about}
              />
              {errors.about && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your About.
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
            Save
          </button>
    </div>

    </form>
  )
}

export default ProfileInfo