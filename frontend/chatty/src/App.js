import { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";
import { nanoid } from "nanoid";

const socket = io.connect("http://localhost:5000");
function App() {
  const [message, setmessage] = useState("");
  const [chat, setchat] = useState([]);
  const [users, setusers] = useState([]);
  const [user, setuser] = useState("");
  const [id, setid] = useState("");
  const [mobileNumber, setmobileNumber] = useState("");
  const [showScreen, setshowScreen] = useState(true);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, id, user });
    setmessage("");
  };
  const join = () => {
    socket.emit("join", { id });
    setshowScreen(false);
  };

  const generateId = () => {
    setid(nanoid(4));
  };

  useEffect(() => {
    // socket.on("chat", (payload) => {
    //   setchat([...chat, payload]);
    // });
    socket.on("joined", (payload) => {
      setusers([...payload]);
    });
    socket.on(id, (payload) => {
      console.log(payload);
      setchat([...chat, payload]);
    });
  });

  return (
    <div className="App">
      <h1>chatty app</h1>
      {id}
      {showScreen && (
        <div>
          <label>Choose id</label>
          <button onClick={generateId}>create random id</button>
          {id}
          <button onClick={join}>join</button>
        </div>
      )}
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
          .map((element, index) => {
            return (
              <div
                className={element[0] === id ? "messageRight" : "messageLeft"}
                key={index}
              >
                <span>{element[0]}:-</span> <br />
                <div className="message">{element[1]}</div>
              </div>
            );
          })}
      </div>
      <input value={user} onChange={(e) => setuser(e.target.value)} />
      <button onClick={sendChat}>message to person</button>
      {users.map((element) => {
        if (element.id !== id) {
          return <p>{element.id}</p>;
        }
      })}
    </div>
  );
}

export default App;
