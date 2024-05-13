import "./Chat.css";

import React, { useEffect, useState } from "react";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window w-300 h-420 ">
      <div className="w-300 h-420 bg-green-900 rounded-t-xl flex items-center justify-center h-45 cursor-pointer">
        <p className="text-white font-bold p-4">Live Chat</p>
      </div>
      <div className="chat-body border border-blue-900 rounded-b-xl bg-white overflow-hidden">
        <div className="message-container h-full overflow-y-scroll">
          {messageList.map((messageContent, index) => (
            <div
              key={index}
              className={`message flex ${
                username === messageContent.author ? "justify-start" : "justify-end"
              }`}
            >
              <div>
                <div
                  className={`message-content ${
                    username === messageContent.author ? "bg-green-600" : "bg-red-500 important"
                  }`}
                >
                  <p className="text-white">{messageContent.message}</p>
                </div>
                <div className="message-meta flex justify-between text-sm text-gray-600">
                  <p id="time">{messageContent.time}</p>
                  <p id="author">{messageContent.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="chat-footer border border-blue-900 border-t-0 rounded-b-xl flex items-center">
        <input
          type="text"
          value={currentMessage}
          placeholder="Type message..."
          onChange={(event) => setCurrentMessage(event.target.value)}
          onKeyPress={(event) => event.key === "Enter" && sendMessage()}
          className="flex-1 h-full px-2 text-base border-none outline-none"
        />
        <button
          onClick={sendMessage}
          className="flex items-center justify-center w-12 h-full text-2xl text-gray-500 hover:text-green-600 focus:outline-none"
        >
           👆
        </button>
      </div>
    </div>
  );
}

export default Chat;
