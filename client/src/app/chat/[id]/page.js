"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import styles from "./page.module.css";
import Image from "next/image";
import logo from "../../../images/user.png";

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
    <div className={styles.chatRoom}>
      <div>Chat Room - {params?.id}</div>
      {newChats?.length === 0 ? (
        <div>No chats...</div>
      ) : (
        <div className={styles.background1}>
          {newChats?.map((item) => {
            return (
              <div>
                <div>
                  {Object.keys(item) == "otherSide" && (
                    <div className={styles.profile1}>
                      <div>
                        <Image src={logo} width={30} height={30} />
                      </div>
                      {item.otherSide}
                    </div>
                  )}
                </div>
                <div>
                  <div>
                    {Object.keys(item) == "mySide" && (
                      <div className={styles.profile2}>
                        
                        {item.mySide}
                        <div>
                          <Image src={logo} width={30} height={30} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default page;
