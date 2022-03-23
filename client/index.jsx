import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onLogin(username);
  }

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <button>Login</button>
      </form>
    </div>
  );
}

function ChatMessage({ chat: { author, message } }) {
  return (
    <div>
      <strong>{author}: </strong>
      {message}
    </div>
  );
}

function ChatApplication({ username }) {
  const [ws, setWs] = useState();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");
    setWs(ws);

  }, []);

  const [chatLog, setChatLog] = useState([
    {
      author: "Petter",
      message: "Yo!",
    },
    {
      author: "Kjartan",
      message: "Hei!",
    },
    {
      author: "Sigrid",
      message: "Halla!",
    },
  ]);

  const [message, setMessage] = useState("");

  function handleNewMessage(event) {
    event.preventDefault();
    setChatLog([...chatLog, { author: username, message }]);
    setMessage("");
  }

  return (
    <div className={"app"}>
      <header>Chat application {username}</header>
      <main>
        {chatLog.map((chat, index) => (
          <ChatMessage key={index} chat={chat} />
        ))}
      </main>
      <footer>
        <form onSubmit={handleNewMessage}>
          <input value={message} onChange={(e) => setMessage(e.target.value)} />
          <button>Submit</button>
        </form>
      </footer>
    </div>
  );
}

function Application() {
  const [username, setUsername] = useState("Petter");

  if (!username) {
    return <Login onLogin={(username) => setUsername(username)} />;
  }

  return <ChatApplication username={username} />;
}

ReactDOM.render(<Application />, document.getElementById("app"));
