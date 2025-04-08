import React, { useState } from 'react';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim()) {
      // Simulate sending message to backend
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');
      // Simulate receiving a response
      setTimeout(() => {
        setMessages(prev => [...prev, { text: 'Generated roadmap from backend', sender: 'bot' }]);
      }, 1000);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Handle file upload
      console.log('File uploaded:', file.name);
    }
  };

  return (
    <div className="flex h-screen bg-[#0A0A0A] text-white">
      {/* Left Panel: Chat History */}
      <div className="w-1/4 bg-[#1A1A1A] p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Chat History</h2>
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-[#7AA2F7] text-white' : 'bg-[#2A2A2A] text-white'}`}>{msg.text}</span>
          </div>
        ))}
      </div>

      {/* Main Panel: Chat Interface */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="text-center mb-8">
            <img src="/path/to/logo.png" alt="Pathfinder Research Logo" className="mx-auto mb-4" />
            <h1 className="text-2xl font-bold">Kickstart your journey with Pathfinder!</h1>
          </div>
          {messages.map((msg, index) => (
            <div key={index} className={`p-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-[#7AA2F7] text-white' : 'bg-[#2A2A2A] text-white'}`}>{msg.text}</span>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Type Bar and Actions */}
        <div className="flex items-center p-4 bg-[#1A1A1A]">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-600 rounded-lg focus:outline-none bg-[#2A2A2A] text-white"
          />
          <button onClick={handleSendMessage} className="ml-2 px-4 py-2 bg-[#7AA2F7] text-white rounded-lg">Send</button>
          <input type="file" onChange={handleFileUpload} className="ml-2" />
          <button className="ml-2 px-4 py-2 bg-[#50C878] text-white rounded-lg">Share to Gmail</button>
          <button className="ml-2 px-4 py-2 bg-[#50C878] text-white rounded-lg">Share to WhatsApp</button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface; 