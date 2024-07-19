import React from 'react'
import { Link } from 'react-router-dom';

const Button = ({linkto, active, children}) => {

    // const commonProperties = "font-[500] text-[16px] leading-[24px] text-center py-[12px] px-[24px] rounded-[8px] ";

  return (
    <Link to={linkto}>
      <div className={`font-[500] text-[16px] leading-[24px] text-center  py-[12px] px-[18px] lg:px-[24px] rounded-[8px] hover:scale-95 hover:shadow-none transition-all duration-200 flex items-center gap-2 justify-center
      ${ active? `text-richblack-900 bg-yellow-50 shadow-[inset_-2px_-2px_0px_rgba(255,255,255,0.51)]` : `text-richblack-50 bg-richblack-800 shadow-[inset_-2px_-2px_0px_rgba(255,255,255,0.18)]`}`}>
        {children}
      </div>
      {/* <div className={ active? `text-richblack-900 bg-yellow-50 ${commonProperties}` : `text-richblack-50 bg-richblack-800 ${commonProperties}`}>
        {children}
      </div> */}
    </Link>
  )
}

export default Button