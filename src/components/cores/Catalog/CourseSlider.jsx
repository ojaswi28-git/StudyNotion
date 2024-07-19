import React from 'react'


import { Navigation, Pagination, Autoplay, Scrollbar, A11y } from 'swiper/modules';
import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
// import "swiper/css/free-mode"
// import "swiper/css/pagination"
// import "react-multi-carousel/lib/styles.css";
// import "react-multi-carousel/lib/styles.css"
// import { Carousel } from 'react-responsive-carousel'
// import Carousel from 'react-multi-carousel'
// import { Autoplay, FreeMode ,Navigation, Pagination}  from 'swiper'

import Course_Card from './Course_Card'





// const responsive = {
//   superLargeDesktop: {
//     // the naming can be any, depends on you.
//     breakpoint: { max: 4000, min: 3000 },
//     items: 5
//   },
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 3
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 464 },
//     items: 2
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 1
//   }
// };





const CourseSlider = ({Courses}) => {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          modules={[Navigation, Pagination, Autoplay, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView= {1}
          autoplay = {true}
          pagination= {{
            el: '.swiper-pagination'
          }}
          loop ={true}
          
          breakpoints={{
            700: {
              slidesPerView: 2,
              loop: true
            },
            1024: {
              slidesPerView: 3,
              loop: true
            }
          }}
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}
              className='pb-10 '

            >
              <Course_Card course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  )
}

export default CourseSlider
