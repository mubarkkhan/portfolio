'use client';

import { useEffect, useState } from 'react';
import { Send, X } from 'lucide-react';
import socket from '../../Lib/socket';
import { v4 as uuidv4 } from 'uuid';

export default function ChatBox() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [activeClientId, setActiveClientId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [clientId] = useState(uuidv4());
  const [clients, setClients] = useState({});
  console.log(clients, 'clients')
  
  useEffect(() => {
    socket.emit('adminRegister')
    socket.on('clientmsgrecieve', (msg) => {
      setActiveClientId(msg?.sender)
      setMessages((prev) => [...prev, msg]);
    });
    socket.on("clientsList", (clients) => {
      setClients(clients)
    });
    return () => {
      socket.off('clientmsgrecieve');
    };
  }, []);
  const sendMessage = () => {
    if (!message.trim() || !activeClientId) return;

    const msgData = {
      message: message,
      sender: clientId,
      to: activeClientId
    };

      socket.emit('adminReply', {
        clientId: activeClientId,
          message: message
      });
      
    setMessages((prev) => [...prev, msgData]);
    setMessage('');
  };
  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        <div className="w-80 bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 flex justify-between items-center">
            <span className="font-semibold">Live Chat</span>
            <button onClick={() => setOpen(false)}><X className="w-5 h-5" /></button>
          </div>
          {
            Object.entries(clients).map(([clientId, info]) => (
              <li key={clientId}>
                🧑 {info?.name}
              </li>
            ))
            
}
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 max-h-[200px]">
            {messages.map((msg, i) => (
              <div key={i} className={`pointer-events-auto flex ${msg.sender === clientId ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-2 rounded-xl text-sm max-w-[75%] ${msg.sender === clientId ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                  <p onClick={() => { setActiveClientId(msg?.sender) }}>{clientId === msg?.sender ? `${clients[msg?.to]?.name}:-` : `${msg?.name}:-`} {msg.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t p-3 bg-white flex items-center gap-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 text-sm border rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault(); // 🚨 Prevent default submit behavior
                  sendMessage();
                }
              }}
            
            />
            <button onClick={sendMessage} className="bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700"
        >
          Chat
        </button>
      )}
    </div>
  );
}
