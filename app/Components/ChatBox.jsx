'use client';

import { useEffect, useState } from 'react';
import { Send, X } from 'lucide-react';
import socket from '../../Lib/socket';
import { v4 as uuidv4 } from 'uuid';

export default function ChatBox() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [clientId] = useState(uuidv4());
  const [user, setUser] = useState({ name: '', email: '' });
  const [isChatStarted, setIsChatStarted] = useState(false);

  useEffect(() => {
    if (isChatStarted) {
      socket.on('adminmsgrecieve', (msg) => {
        console.log(msg,'msg admin')
        setMessages((prev) => [...prev, msg]);
      });

      return () => {
        socket.off('adminmsgrecieve');
      };
    }
  }, [isChatStarted, clientId, user]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const msgData = {
      message,
      sender: clientId
    };

    socket.emit('send', msgData);
    setMessages((prev) => [...prev, msgData]);
    setMessage('');
  };

  const handleStartChat = (e) => {
    e.preventDefault();
    if (user.name.trim() && user.email.trim()) {
      setIsChatStarted(true);
      const data = {
        clientId: clientId,
        name: user.name,
        email: user.email,
      }
      socket.emit('registerClient', data);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        <div className="w-80 h-[400px] bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 flex justify-between items-center">
            <span className="font-semibold">Live Chat</span>
            <button onClick={() => { setOpen(false); }}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form to Start Chat */}
          {!isChatStarted ? (
            <form onSubmit={handleStartChat} className="p-4 space-y-3 bg-gray-50">
              <input
                type="text"
                placeholder="Your Name"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
              >
                Start Chat
              </button>
            </form>
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === clientId ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-2 rounded-xl text-sm max-w-[75%] ${msg.sender === clientId ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                      {msg.message}
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
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage} className="bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
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
