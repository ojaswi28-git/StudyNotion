import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm';
import CourseInformationForm from './CourseInformation/CourseInformationForm';
import PublishCourse from './PublishCourse/PublishCourse';

const RenderSteps = () => {

    const {step} = useSelector((state)=> state.course);
    // const step = 1;

    const steps = [
        {
            id:1,
            title: "Course Information",
        },
        {
            id:2,
            title: "Course Builder",
        },
        {
            id:3,
            title: "Publish",
        },
    ]

  return (
    <div>

        <div  className='hidden justify-between gap-4 sm:flex relative text-white'>

                        <div className={`absolute border-t-2 border-dashed border-yellow-25 w-[45%] z-10 top-[25%] translate-y-[-50%] left-14
                            ${step > 1? "visible" : "invisible"} hidden sm:block
                        `}></div>
                        <div className={`absolute border-t-2 border-dashed border-yellow-25 xl:w-[35%] w-[40%] z-10 top-[25%] translate-y-[-50%] right-14
                            ${step > 2? "visible" : "invisible"} hidden sm:block
                        `}></div>

            {steps.map( (item, index) => (
                <>
                    <div className='flex flex-col items-center min-w-[70px] mb-6 ' key={index}>
                        <div className={`w-10 p-2 aspect-square rounded-full grid place-items-center z-50 ${step === item.id 
                        ? "bg-yellow-900 border-yellow-50 text-yellow-50" 
                        : "border-richblack-700 bg-richblack-800 text-richblack-300"}`}>
                            
                        {
                            step > item.id ? (<FaCheck/>) :(item.id)
                                    
                        }


                        </div>
                        <div>
                            <p>{item.title}</p>    
                        </div>

                    </div>
                   {/* Add COde for dashes between the labels */}
                </>
            ) )}
        </div>
        {/* <div>
            {steps.map((item) => (
                <>
                    <div>
                        <p>{item.title}</p>
                    </div>
                </>
            ))}
        </div> */}

        {step === 1 ?  <CourseInformationForm /> : <></>}
        {/* <CourseInformationForm/>  */}
        {step === 2 && <CourseBuilderForm/>}
        {step===3 && <PublishCourse/>}
    </div>
  )
}

export default RenderSteps
