import React, { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");

const ChatScreen = (props) => {
  const id = props.id;
  const [users, setusers] = useState([]);

  useEffect(() => {
    socket.on("joined", (payload) => {
      setusers([...payload]);
    });
  });
  return (
    <div>
      {users.map((element) => {
        if (element.id !== id) {
          return <p>{element.id}</p>;
        }
      })}
    </div>
  );
};

export default ChatScreen;
