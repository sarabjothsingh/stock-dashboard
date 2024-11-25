import React from 'react'
import Search from "./Search.js";
import { mockCompanyDetails } from "../Constants/mock.js";

const Header = () => {
  return (
    <>
     <div className="xl:px-32">
     <h1 className="text-5xl">{mockCompanyDetails.name}</h1> 
     <Search />  {/* {*calling the search.js module here */} 
     </div>
     {/* <ThemeIcon /> */}
    </>
   
  )
}

export default Header;