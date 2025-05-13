import React from "react";
import MenuTree from "./MenuTree";
import menuData from "../data/MenuData";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <MenuTree data={menuData} />
    </div>
  );
};

export default Sidebar;