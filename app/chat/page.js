"use client";

import { useEffect, useState } from "react";
import socket from "@/lib/socket";
import { v4 as uuidv4 } from "uuid";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [clientId] = useState(uuidv4);
  const [user, setUser] = useState({ name: "", email: "" });
  const [isChatStarted, setIsChatStarted] = useState(false);

  useEffect(() => {
    if (isChatStarted) {
      socket.emit("joinRoom", { room: "support", clientId });
      socket.on("joinmsg", (msg) => {
        setMessages((prev) => [...prev, msg]);
      });
      socket.on("recieveRoomMsg", (msg) => {
        setMessages((prev) => [...prev, msg]);
      });

      return () => {
        socket.off("joinmsg");
        socket.off("recieveRoomMsg");
      };
    }
  }, [clientId, isChatStarted]);

  const handleSend = () => {
    if (!message.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const data = {
      message,
      time,
      clientId,
      name: user.name,
      room: "support",
    };

    socket.emit("sendRoomMsg", data);
    setMessages([...messages, { ...data }]);
    setMessage("");
  };

  const handleStartChat = (e) => {
    e.preventDefault();
    if (user.name && user.email) {
      setIsChatStarted(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6 space-y-4">
        {!isChatStarted ? (
          <form onSubmit={handleStartChat} className="space-y-4">
            <h1 className="text-2xl font-bold text-center text-indigo-600">Start Chat</h1>
            <input
              type="text"
              placeholder="Your Name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Start Chat
            </button>
          </form>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-center text-indigo-600">Chat with Support</h1>

            <div className="h-80 overflow-y-auto border p-2 rounded-md bg-gray-50">
              {messages.length === 0 ? (
                <p className="text-gray-400 text-center mt-10">No messages yet</p>
              ) : (
                messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`mb-2 p-2 rounded text-sm flex justify-between items-center ${
                      msg.clientId === clientId ? "bg-indigo-100" : "bg-gray-200"
                    }`}
                  >
                    <span>
                      {msg.clientId === clientId ? "You: " : `${msg.name || "User"}: `} {msg.message}
                    </span>
                    <span className="text-xs text-gray-500 ml-4">{msg.time}</span>
                  </div>
                ))
              )}
            </div>

            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
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