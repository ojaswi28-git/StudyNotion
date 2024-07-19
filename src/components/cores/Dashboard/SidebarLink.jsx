import React from 'react'
import * as Icons from "react-icons/vsc"
import { Link, matchPath, useLocation } from 'react-router-dom'

const SidebarLink = ({name, path, link, iconName}) => {

  const linkName = name || link.name;
  const linkPath = path || link.path;
  const Icon = Icons[iconName];

  const location = useLocation();

  const matchRoute = (route) =>{
    return matchPath({path: route}, location.pathname)
  }

  return (
    <Link to={linkPath}
          className={`relative px-6 py-2 w-full ${matchRoute(linkPath) ? "bg-yellow-800 bg-opacity-100" : "bg-opacity-0"}`}
    >
      <div className={`flex gap-2 items-center ${matchRoute(linkPath)? "text-yellow-50 font-bold" : "text-richblack-200"}  text-md`}>
          <Icon/>
          <span>
            {linkName}
          </span>
      </div>
      <div className={`absolute bg-yellow-50 w-[2px] h-full left-0 top-0 ${matchRoute(linkPath)? "opacity-100" : "opacity-0"}`}></div>
    </Link>
  )
}

export default SidebarLink