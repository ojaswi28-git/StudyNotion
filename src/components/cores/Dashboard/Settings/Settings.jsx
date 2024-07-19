import React from 'react'
// import UpdateProfile from './UpdateProfile'
import ProfileInfo from './ProfileInfo'
import ChangePassword from './ChangePassword'
import ChangeProfilePicture from './ChangeProfilePicture'
import DeleteAccount from './DeleteAccount'

const Settings = () => {

  return (
    <>
        <div>
            <h2 className='text-[30px] capitalize font-semibold text-richblack-5 mb-8'>Edit Profile</h2>
        </div>

        <div className='flex flex-col gap-6'>
            <ChangeProfilePicture/>
            <ProfileInfo/>
            <ChangePassword/>
            <DeleteAccount/>
        </div>
    </>
  )
}

export default Settings