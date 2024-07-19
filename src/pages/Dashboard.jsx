import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/cores/Dashboard/Sidebar'
import {AiOutlineClose, AiOutlineMenuUnfold} from 'react-icons/ai'
import './Dashboard.css'


const Dashboard = () => {

    const [showSidebar, SetShowSidebar] = useState(false);

    // window.onscroll = function() {SetShowSidebar(false)}

  return (
    
      <div className='dashboard-main relative flex min-h-[calc(100vh-60px)]' 
            onClick={()=>SetShowSidebar(false)}
      >
            <Sidebar showSidebar={showSidebar}/>    
            <div className={`dashboard-toggle text-white text-3xl p-2 rounded-md bg-richblack-700 ${showSidebar? "active" : ""} `}
                onClick={(e)=>e.stopPropagation()}         
            >
                <div 
                    onClick={()=>SetShowSidebar(!showSidebar)}
                    className='w-fit'
                >
                    {
                        showSidebar ? <AiOutlineClose size={30}/> : <AiOutlineMenuUnfold size={30}/>
                    }
                </div>
            </div>
        <div className='h-[calc(100vh-60px)] flex-1 overflow-auto'>
            <div className='mx-auto w-11/12 max-w-[1000px] py-14'>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard