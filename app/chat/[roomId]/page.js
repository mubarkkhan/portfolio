// "use client";

// import { useEffect, useState } from "react";
// import socket from "../../Lib/socket";
// import { v4 as uuidv4 } from "uuid";

// export default function ChatPage() {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [clientId] = useState(uuidv4());
//   const [roomId] = useState(uuidv4());
//   const [user, setUser] = useState({ name: "", email: "" });
//   const [isChatStarted, setIsChatStarted] = useState(false);

//   useEffect(() => {
//     if (isChatStarted) {
//       socket.emit("joinRoom", { room: roomId, clientId, name: user.name, email: user.email });
//       socket.on("joinmsg", (msg) => {
//         console.log('send msg',msg)
//         setMessages((prev) => [...prev, msg]);
//       });
//       socket.on("recieveRoomMsg", (msg) => {
//         console.log('rec msg',msg)
//         setMessages((prev) => [...prev, msg]);
//       });

//       return () => {
//         socket.off("joinmsg");
//         socket.off("recieveRoomMsg");
//       };
//     }
//   }, [clientId, isChatStarted]);

//   const handleSend = () => {
//     if (!message.trim()) return;
//     const now = new Date();
//     const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

//     const data = {
//       message,
//       time,
//       clientId,
//       name: user.name,
//       room: roomId,
//     };

//     socket.emit("sendRoomMsg", data);
//     setMessages([...messages, { ...data }]);
//     setMessage("");
//   };

//   const handleStartChat = (e) => {
//     e.preventDefault();
//     if (user.name && user.email) {
//       socket.emit("registerClient", { clientId, name: user.name, email: user.email });
//       setIsChatStarted(true);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
//       <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6 space-y-4">
//         {!isChatStarted ? (
//           <form onSubmit={handleStartChat} className="space-y-4">
//             <h1 className="text-2xl font-bold text-center text-indigo-600">Create your chat room</h1>
//             <p className="text-sm text-center text-gray-500">
//           Enter your name & email to create a private chat room. Share the link with friends to start chatting together!
//         </p>
//             <input
//               type="text"
//               placeholder="Your Name"
//               value={user.name}
//               onChange={(e) => setUser({ ...user, name: e.target.value })}
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               required
//             />
//             <input
//               type="email"
//               placeholder="Your Email"
//               value={user.email}
//               onChange={(e) => setUser({ ...user, email: e.target.value })}
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               required
//             />
//             <button
//               type="submit"
//               className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//             >
//               Create & Start Chat
//             </button>
//           </form>
//         ) : (
//           <>
//             <h1 className="text-2xl font-bold text-center text-indigo-600">Group Chat Room</h1>
// <p className="text-xs text-center text-gray-500">
//           Share this link with friends to join:
//               </p>
//                <div className="text-center text-indigo-600 text-xs break-all bg-indigo-50 rounded p-2">
//           {/* Replace roomId with actual variable */}
//           {`${typeof window !== "undefined" ? window.location.origin : ""}/chat/${roomId}`}
//         </div>
//             <div className="h-80 overflow-y-auto border p-2 rounded-md bg-gray-50">
//               {messages.length === 0 ? (
//                 <p className="text-gray-400 text-center mt-10">No messages yet. Start the conversation!</p>
//               ) : (
//                 messages.map((msg, idx) => (
//                   <div
//                     key={idx}
//                     className={`mb-2 p-2 rounded text-sm flex justify-between items-center ${
//                       msg.clientId === clientId ? "bg-indigo-100" : "bg-gray-200"
//                     }`}
//                   >
//                     <span>
//                       {msg.clientId === clientId ? `You: ` : `${msg.name || "User"}: `} {msg.message}
//                     </span>
//                     <span className="text-xs text-gray-500 ml-4">{msg.time}</span>
//                   </div>
//                 ))
//               )}
//             </div>

//             <div className="flex space-x-2">
//               <input
//                 type="text"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleSend()}
//                 placeholder="Type your message..."
//                 className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               />
//               <button
//                 onClick={handleSend}
//                 className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//               >
//                 Send
//               </button>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import socket from "../../../Lib/socket";
import { v4 as uuidv4 } from "uuid";

export default function ChatRoomPage() {
  const { roomId } = useParams();
  const [clientId, setClientId] = useState(null);
  const [user, setUser] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isJoined, setIsJoined] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    // Try to load user from localStorage
    const stored = sessionStorage.getItem('chatUser');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser({ name: parsed.name, email: parsed.email });
      setClientId(parsed.clientId || uuidv4());
      setIsJoined(true); // skip form
    } else {
      setClientId(uuidv4());
    }
  }, []);

  useEffect(() => {
    if (isJoined && roomId && clientId) {
      socket.emit("registerClient", { clientId, name: user.name, email: user.email });
      socket.emit("joinRoom", {
        room: roomId,
        clientId,
        name: user.name,
        email: user.email,
      });

      socket.on("joinmsg", (msg) => setMessages((prev) => [...prev, msg]));
      socket.on("recieveRoomMsg", (msg) => setMessages((prev) => [...prev, msg]));
socket.on('updateOnlineUsers', (users) => {
   const others = users.filter(u => u.clientId !== clientId);
   setOnlineUsers(others);
});
      return () => {
        socket.off("joinmsg");
        socket.off("recieveRoomMsg");
      };
    }
  }, [isJoined, roomId, clientId, user]);

  const handleSend = () => {
    if (!message.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const data = {
      message,
      time,
      clientId,
      name: user.name,
      room: roomId,
    };

    socket.emit("sendRoomMsg", data);
    setMessages((prev) => [...prev, data]);
    setMessage("");
  };

  const handleJoin = (e) => {
    e.preventDefault();
    if (user.name && user.email) {
      sessionStorage.setItem('chatUser', JSON.stringify({ name: user.name, email: user.email, clientId }));
      setIsJoined(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-4 space-y-4">
        {!isJoined ? (
          <form onSubmit={handleJoin} className="space-y-4">
            <h1 className="text-2xl font-semibold text-center text-indigo-600">Join Chat Room</h1>
            <p className="text-xs text-center text-gray-500">Enter your name & email to join this group chat.</p>
            <input
              type="text"
              placeholder="Your Name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Join Chat
            </button>
          </form>
        ) : (
          <>
              <h1 className="text-xl font-semibold text-center text-indigo-600">Room: {roomId}</h1>
              <div className="text-xs text-center text-indigo-600 bg-indigo-50 p-2 rounded break-all">
  Share this link with friends to join: <br/>
  {`${typeof window !== 'undefined' ? window.location.origin : ''}/chat/${roomId}`}
</div>
<div className="flex flex-wrap gap-2 mb-2">
  {onlineUsers.map((user, idx) => (
    <span key={idx} className="px-2 py-1 bg-green-100 text-xs rounded">
      {user.name}
    </span>
  ))}
</div>
<p className="text-xs text-gray-400">Online friends</p>

            <div className="h-80 overflow-y-auto border p-2 rounded-md bg-gray-50">
              {messages.length === 0 ? (
                <p className="text-gray-400 text-center mt-10">No messages yet. Start chatting!</p>
              ) : (
                messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`mb-2 p-2 rounded text-sm flex justify-between items-center ${
                      msg.clientId === clientId ? "bg-indigo-100" : "bg-gray-200"
                    }`}
                  >
                    <span>{msg.clientId === clientId ? "You: " : `${msg.name || "User"}: `} {msg.message}</span>
                    <span className="text-xs text-gray-500 ml-4">{msg.time}</span>
                  </div>
                ))
              )}
            </div>
            <div className="flex space-x-2">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
              />
              <button
                onClick={handleSend}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
