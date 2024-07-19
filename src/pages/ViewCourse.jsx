import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'
import { Outlet, useParams } from "react-router-dom"

import CourseReviewModal from "../components/cores/ViewCourse/CourseReviewModal"
import VideoDetailsSidebar from "../components/cores/ViewCourse/VideoDetailsSidebar"
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI"
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice"

import './ViewCourse.css'

export default function ViewCourse() {
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [reviewModal, setReviewModal] = useState(false)

  // const { courseEntireData } = useSelector((state) => state.ViewCourse);
  // const {user} = useSelector((state) => state.auth)

  const [showSidebar, SetShowSidebar] = useState(false);

  useEffect(() => {
    ;(async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token)
      console.log("Course Data here... ", courseData.courseDetails)
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
      dispatch(setEntireCourseData(courseData.courseDetails))
      dispatch(setCompletedLectures(courseData.completedVideos))
      let lectures = 0
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length
      })
      dispatch(setTotalNoOfLectures(lectures))
    })()

    SetShowSidebar(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-60px)]">
        <div className={`viewSideBar bg-richblack-700  rounded-lg ${showSidebar ? "active" : ""}`}>
            <div className="p-2 ml-3 w-fit"
              onClick={()=>(SetShowSidebar(!showSidebar))}
            >
              {
                showSidebar ?<AiOutlineArrowLeft size={24} fill="#fff"/> : 
                              <AiOutlineArrowRight size={24} fill="#fff"/>
              }
            </div>
        </div>
          <VideoDetailsSidebar showSidebar={showSidebar} SetShowSidebar={SetShowSidebar} setReviewModal={setReviewModal} />
        <div className="h-[calc(100vh-60px)] flex-1 overflow-x-hidden pt-[50px]"
          onClick={()=>SetShowSidebar(false)}
        >
          <div className="mx-6 ">
            <Outlet />
          </div>
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  )
}