"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

async function getData(){
  const res = await fetch('http://localhost:5000/messages')
  return res.json()
}

export default async function Home() {
  const router = useRouter();
  const [chatID, setChatID] = useState("");
  const submitData = async (obj) => {
    const response = await axios.post("http://localhost:5000", obj);
    if (response) {
      router.push(`/chat/${response.data.chatID}`);
    }
  };


  const data = await getData()
  console.log(data);

  return (
    <div>
      <div
        onClick={() => {
          submitData({ type_of_user: "main", user_id: "" });
        }}
      >
        create new chat
      </div>
      <div>
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
          Join
        </div>
      </div>
    </div>
  );
}
