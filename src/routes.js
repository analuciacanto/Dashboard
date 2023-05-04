import React from "react";
import { Route, Routes } from "react-router-dom"
import Monitor from "./pages/Monitor";


const RoutesConfig = () => {
   return(
    <Routes>
        <Route path="/" element={<Monitor />} />
    </Routes> 
   )
}

export default RoutesConfig;