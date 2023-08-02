"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import styles from "./page.module.css"


export default function Home() {
  const router = useRouter();
  const [chatID, setChatID] = useState("");
  const submitData = async (obj) => {
    const response = await axios.post("http://localhost:5000", obj);
    if (response) {
      router.push(`/chat/${response.data.chatID}`);
    }
  };

  return (
    <div className={styles.homeMain}>
      <div
        onClick={() => {
          submitData({ type_of_user: "main", user_id: "" });
        }}
      >
      <button className={styles.btn}>create new chat</button>
        
      </div>
      <div className={styles.background}>
        <input
          type="text"
          placeholder="Enter Chat ID"
          onChange={(e) => {
            setChatID(e.target.value);
          }}
        />
        <div
          onClick={() => {
            submitData({ type_of_user: "client", user_id: chatID });
          }}
        >
          <button>Join</button>
        </div>
      </div>
    </div>
  );
}
