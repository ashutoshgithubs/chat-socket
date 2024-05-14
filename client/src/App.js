import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";
import {toast} from "react-hot-toast";

const socket = io.connect("https://chat-socket-63ub.onrender.com");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
    else{
      toast.error("please enter the require credentials")
    }
  };

  return (
    <div className="w-screen h-screen bg-white text-gray-800 font-sans grid place-items-center">
      {!showChat ? (
        <div className="p-6 flex flex-col items-center border rounded-r-md border-spacing-80 border-zinc-700 bg-gray-200">
          <h3 className="text-2xl mb-4 font-serif">Let's chat 💻📲</h3>
          <input
            type="text"
            placeholder="Your name..."
            className="w-52 h-10 m-2 border-2 border-yellow-600 rounded-md p-2 text-base"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID..."
            className="w-52 h-10 m-2 border-2 border-green-600 rounded-md p-2 text-bases"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom} className="w-52 h-12 m-2 border-none rounded-md p-2 text-base bg-green-600 text-white cursor-pointer hover:bg-green-700">Join 👆</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
      <div className="text-md font-serif ">
        <p>Designed & Developed by Ashutosh Kumar</p>
      </div>
    </div>
  );
}

export default App;
