import React from 'react'
import Button from './Button'
import {HiArrowRight} from 'react-icons/hi'
import { TypeAnimation } from 'react-type-animation'

const CodeBlock = ({btn1, btn2, position, heading, subHeading, codeblock, color}) => {
  return (
    <div className={`w-full my-12 lg:my-24 flex gap-5 flex-wrap justify-around items-center ${position} `}>

        {/* Section 1 */}

        <div className='flex flex-col gap-4 max-w-[500px]'>
            <div className='font-[600] text-[36px] leading-[44px] text-richblack-5'>
                {heading}
            </div>
            
            <div className='font-[500] text-[16px] text-richblack-50'>    
                {subHeading}
            </div>

            <div className='flex gap-2 lg:gap-4 mt-12'>
                <Button active={btn1.active} linkto="/signup">
                    <div>{btn1.text}</div>
                    <HiArrowRight/>
                </Button>

                <Button active={btn2.active} linkto="/login">{btn2.text}</Button>
            </div>
        </div>

        {/* Section 2 */}

        <div className='flex flex-row w-full max-w-[500px] relative h-fit py-[14px] px-[0px] border border-richblack-5
            codeblockBackground  
        '>
            {/* Background Animation */}
            <div className='w-[80%] max-w-[370px] h-[250px] absolute left-[4px] -top-[5px]
                bg-gradient-to-t from-[#8A2BE2] via-[#FFA500] to-[#F8F8FF] opacity-30 z-[20] rounded-[50%] blur-[20px]
            '>4</div>

            {/* for blur */}
            {/* <div className='w-full left-0 top-0 z-0 h-full absolute blur-[10px]
                    bg-gradient-to-t from-[#0E1A2D] to-[#111E32] 
            '></div> */}

            <div className='w-[10%] text-center text-richblack-100 z-50'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
                {/* <p>10</p> */}
            </div>

            {/* Type Animation */}

            <div className={`w-[85%] flex flex-col ${color}  z-50`}>
                <TypeAnimation
                    sequence={[codeblock, 1000, ""]}
                    
                    repeat={Infinity}
                    cursor={true}
                    style={
                        { whiteSpace:"pre-line"}
                    }
                    omitDeletionAnimation={true}

                />
            </div>

        </div>

    </div>
  )
}

export default CodeBlock