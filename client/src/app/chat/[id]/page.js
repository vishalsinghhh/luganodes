"use client"
import React, { useEffect } from "react";
import axios from "axios";

const page = () => {
  const submitData = async () => {
    const response = await axios.get("http://localhost:5000/messages")
  }
  useEffect(()=>{
    submitData()
  },[])
  
  return (
    <div>
      <div>chats</div>
    </div>
  );
};

export default page;
