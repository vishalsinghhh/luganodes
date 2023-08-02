"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

const page = () => {
  const params = useParams();
  const [newChats, setNewChats] = useState();
  const submitData = async () => {
    const response = await axios.get("http://localhost:5000/messages");
    setNewChats(response.data.messages);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      submitData();
    }, 1000);
  }, []);
  console.log(newChats);

  return (
    <div>
      <div>Chat Room - {params?.id}</div>
      <div>
        {newChats?.map((item) => {
          return (
            <div>
              <div>
                {Object.keys(item) == "otherSide" && (
                  <div>{item.otherSide}</div>
                )}
              </div>
              <div>
                {Object.keys(item) == "mySide" && <div>{item.mySide}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;
