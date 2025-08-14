import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import createSocketConnection  from '../utils/socket.js';
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((state) => state.user.user);  
  const userId = user?._id;
 
  useEffect(() => {
    if(!userId) {return;}
    const socket = createSocketConnection();
   // console.log("user details");
   // console.log(JSON.stringify(user));
    socket.emit("joinChat",{firstName:user.firstname,userId,targetUserId});
    socket.on("messageReceived",({firstName,newMessageText}) => {
        //console.log("messageReceived::"+firstName+'---'+newMessageText);
        setMessages((prevMessages) => [
        ...prevMessages,
        { firstName, newMessageText },
      ]);
    });
    return () => {
      socket.disconnect();
    };
  },[userId,targetUserId]);
  const sendMessage = () => {
    if(!userId) {return;}
   // console.log("called"+userId+'---'+targetUserId+'^^^'+newMessage);
   // setMessages.text = newMessage;
    const socket = createSocketConnection();
    socket.emit("sendMessage",{firstName:user.firstname,userId,targetUserId,newMessageText:newMessage});
    setNewMessage("");
  }
  
  return (
    <div className="w-full max-w-xl mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-4 border-b border-gray-600 text-xl font-semibold bg-gray-100">Chat</h1>

      <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-white">
        {messages.map((message, index) => (
          <div key={index} className="chat chat-start">
            <div className="chat-bubble">
              <strong>{message.firstName}: </strong>
              {message.newMessageText}
            </div>
          </div>
        ))}
      </div>

      <div className="flex border-t border-gray-600 p-4 bg-gray-50">
        <input
          value={newMessage}
          onChange={(e)=> setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // stop new line
              sendMessage();
              setNewMessage(""); // clear text after sending
            }
          }}
          type="text"
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={sendMessage} className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;