import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");

const Login = () => {
  const [id, setid] = useState("");
  const [mobileNumber, setmobileNumber] = useState("");
  const [showScreen, setshowScreen] = useState(true);
  const [users, setusers] = useState([]);

  const generateId = () => {
    setid(nanoid(4));
  };

  const join = () => {
    socket.emit("join", { id });
    setshowScreen(false);
    console.log("hello");
  };

  useEffect(() => {
    socket.on("joined", (payload) => {
      setusers([...payload]);
    });
  });

  return (
    <>
      {showScreen && (
        <div>
          <label>Choose Username</label>
          <input
            value={mobileNumber}
            onChange={(e) => setmobileNumber(e.target.value)}
            placeholder="enter mobile number"
          />
          <button onClick={() => setid(mobileNumber)}>submit</button>
          <button onClick={generateId}>create random id</button>
          {id}
          <button onClick={join}>join</button>
        </div>
      )}
      {users.map((element) => {
        if (element.id !== id) {
          return <p>{element.id}</p>;
        }
      })}
    </>
  );
};

export default Login;
