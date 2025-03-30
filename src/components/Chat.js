import React, { useState, useRef, useEffect } from 'react';
import { Send, X, Loader2 } from 'lucide-react';

const Chat = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // Add user message
    setMessages(prev => [...prev, {
      id: Date.now(),
      text: userMessage,
      sender: 'user',
      timestamp: new Date()
    }]);

    try {
      // Make API call to your AI endpoint
      const response = await fetch('your-ai-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await response.json();

      // Add AI response
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: data.response,
        sender: 'ai',
        timestamp: new Date()
      }]);
    } catch (error) {
      // Handle error
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: "I apologize, but I'm having trouble responding right now. Please try again.",
        sender: 'ai',
        timestamp: new Date(),
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      {/* Chat Header */}
      <div className="chat-header">
        <h3 className="text-lg font-heading" style={{ color: '#E6EEFF' }}>
          Research Assistant
        </h3>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
        >
          <X size={20} color="#E6EEFF" />
        </button>
      </div>

      {/* Messages Container */}
      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat-message ${message.sender} ${message.isError ? 'error' : ''}`}
          >
            <div className="message-content">
              {message.text}
            </div>
            <div className="message-timestamp">
              {new Date(message.timestamp).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="chat-message ai loading">
            <Loader2 className="animate-spin" size={20} />
            <span>Thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
          className="input-field"
          style={{
            backgroundColor: 'rgba(26, 27, 38, 0.6)',
            border: '1px solid rgba(122, 162, 247, 0.2)',
            color: '#E6EEFF'
          }}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="send-button"
          style={{
            background: 'linear-gradient(135deg, #7AA2F7, #FF79C6)',
            opacity: (isLoading || !input.trim()) ? 0.5 : 1
          }}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default Chat;
