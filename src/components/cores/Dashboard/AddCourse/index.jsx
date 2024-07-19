import RenderSteps from "./RenderSteps"
import { MdOutlineElectricBolt } from 'react-icons/md'

export default function AddCourse() {
    return (
        <>
            <div className="text-white flex justify-between gap-5">
                <div className='flex-1'>
                    <h1 className="mb-8 text-3xl font-medium text-richblack-5">Add Course</h1>
                    <div>
                        <RenderSteps />
                    </div>
                </div>
                <div className='flex-1 sticky top-12 xl:flex flex-col gap-4 hidden lg:max-w-[380px] bg-richblack-800 p-5 h-fit rounded-2xl'>
                    <div className="text-2xl flex gap-2 items-center">
                        <MdOutlineElectricBolt className="text-yellow-50"/>
                        <p >Code Upload Tips</p>
                    </div>
                    <ul className="text-sm list-disc pl-5 flex flex-col gap-3">
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                        <li>Video section controls the course overview video.</li>
                        <li>Course Builder is where you create & organize a course.</li>
                        <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                        <li>Information from the Additional Data section shows up on the course single page.</li>
                        <li>Make Announcements to notify any important.</li>
                        <li>Notes to all enrolled students at once.</li>
                    </ul>
                </div>
            </div>
        </>
    )
}