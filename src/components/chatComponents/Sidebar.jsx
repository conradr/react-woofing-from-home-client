import React from "react";
import Search from "./Search"
import Chats from "./Chats"
import ChatNavbar from "./ChatNavbar";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ChatNavbar />
      <Search/>
      <Chats/>
    </div>
  );
};

export default Sidebar;
