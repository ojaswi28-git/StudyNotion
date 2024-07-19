import React, { useState } from 'react'
import SidebarLink from './SidebarLink'

import {sidebarLinks} from '../../../data/dashboard-links'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../../services/operations/authAPI'
import ConfirmationModal from './ConfirmationModal'

import {VscSignOut} from 'react-icons/vsc'
import './Sidebar.css'

const Sidebar = ({showSidebar}) => {

    const [confirmationModal, setConfirmationModal] = useState(null);

    const {user, loading: profileLoading} = useSelector((state)=>state.profile)
    const {loading: authLoading} = useSelector((state)=>state.auth)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    if(profileLoading || authLoading){
        return(
            <div>
                Loading...
            </div>
        )
    }

  return (

    <div className={`sidebar-main h-[calc(100vh-60px)] ${showSidebar? "active" : ""}`}>
        <div className='py-6 flex flex-col relative'>
            {
                sidebarLinks.map((link)=>{
                    if( link.type && user?.accountType !== link.type) return null                   
                    return <SidebarLink key={link.id} link={link} iconName={link.icon}/>
                })
            }

            <div className='absolute w-[85%] left-[50%] -translate-x-[50%] h-[1px] bg-richblack-600 bottom-0'></div>

        </div>
        <div className='w-full flex flex-col relative mt-4'>
            <SidebarLink name='Settings' path='/dashboard/settings' iconName="VscGear"/>

            <button
                onClick={()=>{
                    setConfirmationModal({
                        Text1 : "Are You Sure?",
                        Text2 : "You will be logged out of your account.",
                        btnText1 : "Logout",
                        btnText2 : "Cancle",
                        btnHandler1 : () => dispatch(logout(navigate)),
                        btnHandler2 : () => setConfirmationModal(null),
                    })
                }}
                className='px-6 py2 text-[16px] text-richblack-200'
            >
                <div className='flex gap-2 items-center'>
                    <VscSignOut className='text-lg'/>
                    <span>Logout</span>
                </div>
            </button>
        </div>
        {
            confirmationModal &&
            <ConfirmationModal modalData={confirmationModal}/>
        }
    </div>

  )
}

export default Sidebar