"use client";
import React, { useState } from "react";
import {
  Search,
  MoreVertical,
  Paperclip,
  Send,
  Image,
  Smile,
  Phone,
  Video,
  Info,
} from "lucide-react";
import ChatWidget from "./chat2/page";

const ChatApp = () => {
  const [message, setMessage] = useState("");
  const [activeChat, setActiveChat] = useState("1");

  // Sample chat list data
  const chats = [
    {
      id: "1",
      name: "Emma Thompson",
      lastMessage: "Thank you for the quick response!",
      time: "12:45 PM",
      unread: 2,
      online: true,
      avatar: "https://api.multiavatar.com/emma.svg",
    },
    {
      id: "2",
      name: "James Wilson",
      lastMessage: "When will my order arrive?",
      time: "11:30 AM",
      unread: 0,
      online: true,
      avatar: "https://api.multiavatar.com/james.svg",
    },
    {
      id: "3",
      name: "Sarah Chen",
      lastMessage: "Is this available in red?",
      time: "9:15 AM",
      unread: 1,
      online: false,
      avatar: "https://api.multiavatar.com/sarah.svg",
    },
  ];

  // Sample messages for the active chat
  const messages = [
    {
      id: 1,
      sender: "them",
      message: "Hi! I have a question about my recent order",
      time: "12:30 PM",
    },
    {
      id: 2,
      sender: "me",
      message:
        "Hello! Of course, I'd be happy to help. What would you like to know?",
      time: "12:32 PM",
    },
    {
      id: 3,
      sender: "them",
      message:
        "I ordered the blue jacket yesterday, but I'm wondering if I can change the size",
      time: "12:35 PM",
    },
    {
      id: 4,
      sender: "me",
      message:
        "I can help you with that! What size would you like to change it to?",
      time: "12:36 PM",
    },
    {
      id: 5,
      sender: "them",
      message: "Thank you for the quick response!",
      time: "12:45 PM",
    },
  ];

  const activeUser = chats.find((chat) => chat.id === activeChat);

  return (
    <div className="flex h-full bg-gray-100 w-full">
      {/* Chat List Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Search Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`p-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer ${
                activeChat === chat.id ? "bg-blue-50" : ""
              }`}
            >
              {/* Avatar with online indicator */}
              <div className="relative">
                <img
                  src="/api/placeholder/40/40"
                  alt={chat.name}
                  className="w-12 h-12 rounded-full"
                />
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>

              {/* Chat preview */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900 truncate">
                    {chat.name}
                  </h3>
                  <span className="text-xs text-gray-500">{chat.time}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {chat.lastMessage}
                </p>
              </div>

              {/* Unread indicator */}
              {chat.unread > 0 && (
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white">{chat.unread}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        {activeUser && (
          <div className="h-16 border-b border-gray-200 bg-white px-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="/api/placeholder/40/40"
                  alt={activeUser.name}
                  className="w-10 h-10 rounded-full"
                />
                {activeUser.online && (
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div>
                <h2 className="font-medium text-gray-900">{activeUser.name}</h2>
                <p className="text-xs text-gray-500">
                  {activeUser.online ? "Online" : "Offline"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Phone className="h-5 w-5 text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Video className="h-5 w-5 text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Info className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
        )}

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] ${
                  msg.sender === "me"
                    ? "bg-blue-500 text-white rounded-l-lg rounded-tr-lg"
                    : "bg-white text-gray-800 rounded-r-lg rounded-tl-lg"
                } px-4 py-2 shadow-sm`}
              >
                <p>{msg.message}</p>
                <p
                  className={`text-xs mt-1 ${
                    msg.sender === "me" ? "text-blue-100" : "text-gray-500"
                  }`}
                >
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="h-20 border-t border-gray-200 bg-white px-4 flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Paperclip className="h-5 w-5 text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Image className="h-5 w-5 text-gray-500" />
          </button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-2 top-2 p-1 hover:bg-gray-200 rounded-full">
              <Smile className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          <button
            className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full"
            onClick={() => {
              if (message.trim()) {
                // Handle send message
                setMessage("");
              }
            }}
          >
            <Send className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>

      {/* demo ChatWidget */}
      <ChatWidget />
    </div>
  );
};

export default ChatApp;
