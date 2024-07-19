import React from 'react'
import {HiArrowRight} from 'react-icons/hi'
import Button from './Button'

const InstructorText = ({heading, subHeading}) => {
  return (
    <div className='flex flex-col max-w-[500px] gap-4'>
        <div className='font-[600] text-[36px] leading-[44px] text-richblack-5'>
            {heading}
        </div>
        <div className='font-[500] text-[16px] leading-[24px] text-richblack-50'>
            {subHeading}
        </div>

        <div className='mt-4 lg:mt-12 w-fit'>
          <Button active={true} linkto="/signup">
            Start Teaching Today
            <HiArrowRight/>
          </Button>
          
        </div>
    </div>
  )
}

export default InstructorText