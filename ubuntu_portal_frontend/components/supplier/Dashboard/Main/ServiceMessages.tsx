import React from "react";
import { Button } from "../../../ui/button";
import { FaUserCircle } from "react-icons/fa"; // Example profile icon

const messages = [
  {
    sender: "Hezekiahs",
    date: "Sep 21",
    unreadCount: 2,
    message: "Hi there, This is Hezek...",
  },
  {
    sender: "Jukunye",
    date: "Sep 20",
    unreadCount: 0,
    message: "Hi there, This is Jukunye...",
  },
  {
    sender: "Hezekiahs",
    date: "Sep 20",
    unreadCount: 0,
    message: "Hi there, This is Hezek...",
  },
  {
    sender: "Mayowa",
    date: "Sep 19",
    unreadCount: 0,
    message: "Hi there, This is Mayowa...",
  },
];

const ServiceMessages = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg text-white">Service Messages</h2>
        <a
          href="/rfq-page"
          className="text-white hover:underline hover:text-amber-800"
        >
          View All
        </a>
      </div>
      <div className="space-y-8">
        {messages.map((msg, index) => (
          <div key={index} className="flex items-center justify-between">
            {/* Profile icon */}
            <div className="flex items-center space-x-4">
              <FaUserCircle className="text-gray-500 h-8 w-8" />
              <div>
                <div className="font-semibold">{msg.sender}</div>
                <div className="text-sm">{msg.message}</div>
              </div>
            </div>

            {/* Date and Unread Count Badge */}
            <div className="flex items-center space-x-2">
              <div className="text-sm text-gray-500">{msg.date}</div>
              {msg.unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                  {msg.unreadCount}
                </span>
              )}
            </div>
          </div>
        ))}
        <div className="flex justify-center items-center">
          <Button className="bg-white text-[#00B074] mx-8 px-4 py-2 rounded-lg w-full text-sm font-semibold">
            View all messages
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceMessages;
