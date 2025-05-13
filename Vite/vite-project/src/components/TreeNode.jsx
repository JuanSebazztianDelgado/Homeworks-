import React from "react";

const TreeNode = ({ node }) => {
  return (
    <li>
      <a href={node.link}>{node.title}</a>
      {node.children && node.children.length > 0 && (
        <ul>
          {node.children.map((child, index) => (
            <TreeNode key={index} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TreeNode;