import "./App.css";
import { Routes, Route } from "react-router-dom";

import OpenRoute from "./components/cores/Auth/OpenRoute";
import PrivateRoute from "./components/cores/Auth/PrivateRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/cores/common/Navbar";
// import ResetPassword from "./pages/ResetPassword";
// import ResetPasswordInput from "./pages/ResetPasswordInput";
import About from "./pages/About";
import Catalog from "./pages/Catalog";
import Error from "./pages/Error"
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/cores/Dashboard/MyProfile";
import Settings from "./components/cores/Dashboard/Settings/Settings";
import DashboardCart from "./components/cores/Dashboard/Cart/DashboardCart";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./components/cores/Dashboard/AddCourse";
import MyCourses from "./components/cores/Dashboard/MyCourses";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/cores/ViewCourse/VideoDetails";
import { useSelector } from "react-redux";
import EnrolledCourses from "./components/cores/Dashboard/EnrolledCourses";
import EditCourse from "./components/cores/Dashboard/EditCourse";
import Instructor from "./components/cores/Dashboard/InstructorDashboard/Instructor";

function App() {

  const {user} = useSelector((state)=> state.profile)

  return (
    <div className="app min-h-screen w-full overflow-x-hidden bg-richblack-900">

      {/* NavBar */}
      <Navbar/>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/catalog/:catalogName" element={<Catalog/>} />
        <Route path="/courses/:courseId" element={<CourseDetails/>} />
        {/* <Route path="/catalog/:catalogName" element={<Catalog/>} /> */}
        {/* <Route path="/courses/:courseId" element={<CourseDetails/>} /> */}
        {/* <Route path="/courses/:courseId" element={<CourseDetails/>} /> */}
        <Route 
              path="/login" 
              element={
                <OpenRoute>
                  <Login/>
                </OpenRoute>
        }/>

        <Route
            path="verify-email"
            element={
              <OpenRoute>
                <VerifyEmail/>
              </OpenRoute>
            }
        /> 

        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword/>
            </OpenRoute>
          }
        />

        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />  

        <Route 
              path="/signup" 
              element={
                <OpenRoute>
                  <Signup/>
                </OpenRoute>
              }/>

        {/* <Route 
              path="/resetpassword" 
              element={
                <OpenRoute>
                  <ResetPassword/>
                </OpenRoute>
              }/>
        <Route 
              path="/resetpassword/:id" 
              element={
                <OpenRoute>
                  <ResetPasswordInput/>
                </OpenRoute>
              }/> */}
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<ContactUs/>}/>


        {/* Dashboard Protected Routes */}
        <Route
            element={
              <PrivateRoute>
                <Dashboard/>
              </PrivateRoute>
            }
        >
            <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
            <Route path="/dashboard/settings" element={<Settings/>}/>
            {/* <Route path="/dashboard/cart" element={<DashboardCart/>}/> */}

                  
            {
              user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <>
                <Route path="dashboard/cart" element={<DashboardCart />} />
                <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
                </>
              )
            }

            {
              ACCOUNT_TYPE.INSTRUCTOR && 
              <>
                <Route path="dashboard/instructor" element={<Instructor />} />
                <Route path="dashboard/my-courses" element={<MyCourses/>} />
                <Route path="/dashboard/add-course" element={<AddCourse/>}/>
                <Route path="/dashboard/edit-course/:courseId" element={<EditCourse />} />
              </>

            }

        </Route>


        <Route element={
          <PrivateRoute>
            <ViewCourse/>
          </PrivateRoute>
        }>

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
              <Route 
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails/>}
              />
              </>
            )
          }

        </Route>

        <Route path="*" element={<Error/>} />

      </Routes>


    </div>
  );
}

export default App;



