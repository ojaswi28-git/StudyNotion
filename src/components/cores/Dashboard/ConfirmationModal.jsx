import React from 'react'
// import IconBtn from './IconBtn'

const ConfirmationModal = ({modalData}) => {
  return (
    <div className='text-white fixed top-0 left-0 w-full h-full grid place-items-center'>
        <div className='relative max-w-[280px] sm:max-w-[400px] z-50 flex flex-col gap-1 bg-richblack-800 border p-5 rounded-xl'>
            <h1 className='text-richblack-5 text-2xl font-semibold'>{modalData?.Text1}</h1>
            <p className='text-richblack-200 text-[16px]'>{modalData?.Text2}</p>
            <div className='flex gap-2 items-center mt-4'>
                <button onClick={modalData?.btnHandler1}
                    className='py-2 px-5 font-semibold text-[18px] bg-yellow-50 text-richblack-900 rounded-md'
                >
                    {modalData?.btnText1}
                </button>
                <button onClick={modalData?.btnHandler2}
                    className='py-2 px-5 font-semibold text-[18px] bg-richblack-200 text-black rounded-md'
                >
                    {modalData?.btnText2}
                </button>
            </div>
        </div>
        <div className='absolute top-0 left-0 w-full h-full backdrop-blur-[5px] z-10'></div>
    </div>
  )
}

export default ConfirmationModal