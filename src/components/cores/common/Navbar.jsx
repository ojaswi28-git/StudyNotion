import React, { useEffect, useState } from 'react'
import { Link,  matchPath } from 'react-router-dom'
import { NavbarLinks } from '../../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import Logo from '../../../assets/Logo/Logo-Full-Light.png'
import { useSelector } from 'react-redux'
import { apiConnector } from '../../../services/apiconnector'
import { categories } from '../../../services/apis'
// import Button from '../HomePage/Button'
import { ACCOUNT_TYPE } from '../../../utils/constants'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import ProfileDropdown from '../Auth/ProfileDropDown'
import {AiOutlineClose, AiOutlineMenu, AiOutlineShoppingCart} from 'react-icons/ai'
import "./Navbar.css"

const Navbar = () => {

    // const {token} = useSelector((state)=> state.auth);


    const location = useLocation();
    const matchRoute = (route)=>{
        return matchPath({path:route}, location.pathname)
    }

    const {token} = useSelector((state)=> state.auth)
    const {user} = useSelector((state)=> state.profile);
    const {totalItems} = useSelector((state)=> state.cart);


    const [subLinks, setSubLinks] = useState([]);

    const [showNav, setShowNav] = useState(false);


    const fetchSubLinks = async()=>{
        try{
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("Fetched Data ", result);
            setSubLinks(result.data.data);
        }
        catch(error){
            console.log("Could not fetch category List");
        }
    }

    useEffect(()=>{
        fetchSubLinks();
        console.log("Start")
    },[])


    // window.addEventListener(onscroll, ()=>{
    //     setShowNav(false);
    // })

    window.onscroll = function() {
        setShowNav(false);
    }

  return (
    <div className='h-[60px] flex items-center justify-center border border-richblack-700 relative'>
        <div id='nav' className='w-11/12 max-w-[1260px] flex justify-between gap-10 items-center'>

            <div onClick={()=>setShowNav(false)}>
                <Link to="/">
                    <img src={Logo} alt="" className='w-[160px]' />
                </Link>
            </div>


            <nav className={`${showNav? "active" : ""}`}
             onClick={()=> setShowNav(false)}
            >

                <ul className=' text-richblack-5'>
                    {
                        NavbarLinks.map((item, index) => (
                            item.title === "Catalog" ? 
                            (
                                <li className='flex items-center gap-1 relative group cursor-pointer' 
                                    onClick={(e)=> e.stopPropagation()}
                                    key={index}
                                >
                                    <p>{item.title}</p>
                                    <MdOutlineKeyboardArrowDown className='text-2xl font-bold'/>

                                    {/* div */}
                                    <div className='invisible opacity-0 h-6 w-6 rotate-45 top-[210%] rounded-[4px] right-0 bg-richblack-5 absolute group-hover:visible group-hover:top-[120%] group-hover:opacity-100 transition-all duration-200'></div>
                                    <div className='invisible flex opacity-0 flex-col absolute top-[250%] left-[-100%] w-fit lg:w-[300px] p-4 rounded-lg text-richblack-900 transition-all duration-200  bg-richblack-5  z-[100] group-hover:visible group-hover:opacity-100 group-hover:top-[160%]'>
                                        {
                                            subLinks.map((category, index)=>(
                                                <Link
                                                    to={`/catalog/${category.name.split(" ").join("-").toLowerCase()}`}
                                                    key={index} className='p-4 text-[18px] hover:bg-richblack-50 rounded-lg'
                                                    // onClick={`${window.innerWidth <= 1020? ()=>setShowNav(false) : () =>{} }`}
                                                >
                                                    {category.name}
                                                </Link>
                                                
                                            ))
                                        }
                                    </div>
                                </li>
                            ) 
                            : (
                                <li key={index}>
                                    <Link to={item?.path}
                                      // onClick={`${window.innerWidth <= 1020? ()=>setShowNav(false) : () =>{} }`}
                                    >
                                        <p className={`${matchRoute(item?.path) ? "text-yellow-25" : ""}`}>
                                            {item.title}
                                        </p>
                                    </Link>
                                </li>
                            )
                        ))
                    }
                </ul>
                

                <div className='nav-login'>
                    {
                        !token && 
                        <Link to='/login'>
                            <button className='font-[500] text-[16px] leading-[24px] text-center  py-[8px] px-[18px] lg:px-[20px] rounded-[8px] border border-richblack-500 text-richblack-50 bg-richblack-800 hover:scale-95 transition-all duration-200 
                            hover:text-richblack-900 hover:bg-yellow-50'>
                                Login
                            </button>
                        </Link>
                    }
                    {
                        !token && 
                        <Link to='/signup'>
                            <button className='font-[500] text-[16px] leading-[24px] text-center  py-[8px] px-[18px] lg:px-[20px] rounded-[8px] border border-richblack-500 text-richblack-50 bg-richblack-800 hover:scale-95 transition-all duration-200 
                            hover:text-richblack-900 hover:bg-yellow-50'>
                                Sign Up
                            </button>
                        </Link>
                    }
                </div>

            </nav>

            <div className='button-large'>

                {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                    <Link to="/dashboard/cart" className="relative">
                    <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                    {totalItems > 0 && (
                        <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                        {totalItems}
                        </span>
                    )}
                    </Link>
                )}

                {
                    !token && 
                    <Link to='/login'>
                        <button className='font-[500] text-[16px] leading-[24px] text-center  py-[8px] px-[18px] lg:px-[20px] rounded-[8px] border border-richblack-500 text-richblack-50 bg-richblack-800 hover:scale-95 transition-all duration-200 
                        hover:text-richblack-900 hover:bg-yellow-50'>
                            Login
                        </button>
                    </Link>
                }
                {
                    !token && 
                    <Link to='/signup'>
                        <button className='font-[500] text-[16px] leading-[24px] text-center  py-[8px] px-[18px] lg:px-[20px] rounded-[8px] border border-richblack-500 text-richblack-50 bg-richblack-800 hover:scale-95 transition-all duration-200 
                        hover:text-richblack-900 hover:bg-yellow-50'>
                            Sign Up
                        </button>
                    </Link>
                }
                {
                    token && <ProfileDropdown/>
                }
            </div>

            <div className='menu-div flex items-center gap-3'>

                <div onClick={()=>setShowNav(false)}>
                    {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                        <Link to="/dashboard/cart" className="relative">
                        <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                        {totalItems > 0 && (
                            <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                            {totalItems}
                            </span>
                        )}
                        </Link>
                    )}
                </div>

              <div onClick={()=>setShowNav(false)}>
                {
                    token && <ProfileDropdown/>
                }
              </div>
              <button className="mr-4 "
                  onClick={()=>setShowNav(!showNav)}
              >
                  

                  {
                    showNav ? 
                        <AiOutlineClose fontSize={24} fill="#AFB2BF"/> 
                    : 
                        <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
                  }
              </button>
            </div>

        </div>
    </div>
  )
}

export default Navbar
