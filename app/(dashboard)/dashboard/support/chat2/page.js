"use client";
import React, { useState } from "react";
import {
  MessageSquare,
  X,
  Send,
  Paperclip,
  Image as ImageIcon,
  Minimize2,
  ChevronDown,
  Circle,
} from "lucide-react";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "agent",
      name: "Sarah",
      message: "Hi there! 👋 How can I help you today?",
      time: "12:30 PM",
    },
  ]);

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          type: "user",
          message: message.trim(),
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-24 right-4 z-50 flex flex-col items-end">
      {/* Main Chat Window */}
      {isOpen && (
        <div
          className={`mb-4 w-[360px] bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ease-in-out ${
            isMinimized ? "h-20" : "h-[600px]"
          }`}
        >
          {/* Chat Header */}
          <div className="p-4 bg-blue-500 rounded-t-2xl flex items-center justify-between text-white">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <img
                  src="/api/placeholder/40/40"
                  alt="Agent"
                  className="w-10 h-10 rounded-full"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
              </div>
              <div>
                <h3 className="font-medium">Customer Support</h3>
                <div className="flex items-center text-xs text-blue-100">
                  <Circle className="w-2 h-2 mr-1 fill-green-400 text-green-400" />
                  Online
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-blue-600 rounded-full transition-colors"
              >
                {isMinimized ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <Minimize2 className="w-5 h-5" />
                )}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-blue-600 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.type === "agent" && (
                      <img
                        src="/api/placeholder/32/32"
                        alt={msg.name}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                    )}
                    <div
                      className={`max-w-[80%] px-4 py-2 rounded-2xl shadow-sm ${
                        msg.type === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-white text-gray-800"
                      }`}
                    >
                      {msg.type === "agent" && (
                        <p className="text-xs text-gray-500 mb-1">{msg.name}</p>
                      )}
                      <p className="text-sm">{msg.message}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.type === "user"
                            ? "text-blue-100"
                            : "text-gray-400"
                        }`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t bg-white rounded-b-2xl">
                <div className="flex items-end space-x-2">
                  <div className="flex-1 relative">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      className="w-full px-4 py-2 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-32 resize-none"
                      rows="1"
                    />
                    <div className="absolute right-2 bottom-2 flex space-x-1">
                      <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                        <Paperclip className="w-5 h-5 text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                        <ImageIcon className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={handleSend}
                    className="p-3 bg-blue-500 hover:bg-blue-600 rounded-full text-white transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-colors"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
