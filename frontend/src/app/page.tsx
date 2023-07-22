"use client";

import axios from "axios";

export default function Home() {
  const handleClick = async () => {
    const response = await axios.get("http://localhost:8083/");
    console.log(response);
  };

  return (
    <>
      <button onClick={handleClick}>ボタン</button>
    </>
  );
}
