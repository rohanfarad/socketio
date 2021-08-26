import { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";
import { nanoid } from "nanoid";
import { element } from "prop-types";

const socket = io.connect("http://localhost:5000");
const userName = nanoid(4);
function App() {
  const [message, setmessage] = useState("");
  const [chat, setchat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, userName });
    setmessage("");
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setchat([...chat, payload]);
    });
  });

  return (
    <div className="App">
      <h1>chatty app</h1>

      <form onSubmit={sendChat}>
        <input
          type="text"
          name="chat"
          placeholder="write your message"
          value={message}
          onChange={(e) => setmessage(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>
      <div className="messageBox">
        {chat
          .slice(0)
          .reverse()
          .map((element, id) => {
            return (
              <div
                className={
                  element.userName === userName ? "messageRight" : "messageLeft"
                }
                key={id}
              >
                <span>{element.userName}:-</span> <br />
                <div className="message">{element.message}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
