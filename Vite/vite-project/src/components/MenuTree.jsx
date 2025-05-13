import React from "react";
import TreeNode from "./TreeNode";

const MenuTree = ({ data }) => {
  return (
    <ul>
      {data.map((node, index) => (
        <TreeNode key={index} node={node} />
      ))}
    </ul>
  );
};

export default MenuTree;