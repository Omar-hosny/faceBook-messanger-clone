import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import { FormControl, Input } from "@material-ui/core";
import Message from "./components/Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    setUsername(prompt("Please enter your name"));
    // eslint-disable-next-line
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("messages").add({
      message: input,
      username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  // console.log(messages);

  return (
    <div className="App">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Facebook_Messenger_logo.svg/476px-Facebook_Messenger_logo.svg.png"
        alt=""
        className="app__img"
      />
      <h1>Messanger App</h1>
      <h2>Welcome {username}</h2>

      {/* messages */}
      <div className="app__messgagesContainer">
        <FlipMove>
          {messages.map(({ id, message }) => (
            <Message key={id} username={username} message={message} />
          ))}
          {/* <div ref={messagesEndRef} /> */}
        </FlipMove>
      </div>

      <form className="app__form">
        <FormControl className="app__formControl">
          {/* <InputLabel>Enter a message</InputLabel> */}
          <Input
            className="app__input"
            placeholder="Enter a message..."
            value={input}
            type="text"
            onChange={(e) => setInput(e.target.value)}
          />
          <IconButton
            className="app__iconButton"
            variant="contained"
            color="primary"
            type="submit"
            disabled={!input}
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <div ref={messagesEndRef} />
    </div>
  );
}

export default App;
