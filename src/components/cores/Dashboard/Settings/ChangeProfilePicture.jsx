// import React from 'react'
// import {  useSelector } from 'react-redux'
// import IconBtn from '../IconBtn';
// import {BsUpload} from 'react-icons/bs'
// import {  updateDisplayPicture } from '../../../../services/operations/settingAPI';
// import { useForm } from 'react-hook-form';


// const ChangeProfilePicture = () => {

//     const {register, handleSubmit, formState: {errors}} = useForm();

//     const {user} = useSelector((state)=>state.profile);
//     const {token} = useSelector((state)=>state.auth);

//     // const dispatch = useDispatch();

//     const updateProfileHandler = async (data) =>{
//         console.log("Update Profile Image")
//         const result = await updateDisplayPicture(token, data);
//         console.log(result)
//     }
    

//   return (
//     <div className='flex justify-between py-6 px-10 bg-richblack-800 rounded-xl border border-richblack-600'>
//         <div className='flex gap-4'>
//             <div className='w-[80px] aspect-square rounded-full overflow-hidden'>
//                 <img src={user?.image} alt="" />
//             </div>
//             <div className='flex flex-col justify-center gap-2'>
//                 <span className='text-[16px] font-bold text-richblack-5'>Change Profile Picture</span>
//                 <form className='flex' onSubmit={handleSubmit(updateProfileHandler)}>
//                     <input type="file" className=''
//                         {...register("displayPicture", {required: true})}
//                     />
//                     {
//                         errors.displayProfile && 
//                         <span>Profile Image is require**</span>
//                     }
//                     <button type='submit'>
//                         <IconBtn>
//                             Upload
//                             <BsUpload className='font-bold'/>
//                         </IconBtn>
//                     </button>
//                 </form>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default ChangeProfilePicture



import { useEffect, useRef, useState } from "react"
import { FiUpload } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"

import { updateDisplayPicture } from "../../../../services/operations/settingAPI"
import IconBtn from "../IconBtn"

export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [previewSource, setPreviewSource] = useState(null)

  const fileInputRef = useRef(null)

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    // console.log(file)
    if (file) {
      setImageFile(file)
      previewFile(file)
    }
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleFileUpload = () => {
    try {
      console.log("uploading...")
      setLoading(true)
      const formData = new FormData()
      formData.append("displayPicture", imageFile)
      // console.log("formdata", formData)
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false)
      })
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile)
    }
  }, [imageFile])
  return (
    <>
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-4 py-6 md:py-8 md:px-12 text-richblack-5">
        <div className="flex flex-col sm:flex-row md:items-center gap-x-4">
          <img
            src={previewSource || user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-2">
            <p>Change Profile Picture</p>
            <div className="flex flex-row flex-wrap gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />
              <button
                onClick={handleClick}
                disabled={loading}
                className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
              >
                Select
              </button>
              <button
                // text={loading ? "Uploading..." : "Upload"}
                className='py-2 px-5 text-[18px] text-richblue-900 font-bold rounded-md flex items-center justify-center gap-2 bg-yellow-50 h-fit'
                onClick={handleFileUpload}
              >
                {!loading && (
                    <>
                        {loading ? "Uploading..." : "Upload"}
                        <FiUpload className="text-lg text-richblack-900" />
                    </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}