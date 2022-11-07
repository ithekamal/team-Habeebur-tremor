import React from "react";
import { useState,useRef } from "react";
import dynamic from "next/dynamic";


export default () => {
  const Charts = dynamic(() => import('../charts'))
    return (
  <>
 <Charts />
  </>
    )
}



 
 
