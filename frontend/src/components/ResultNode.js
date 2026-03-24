import React from "react";
import { Handle, Position } from "reactflow";

const ResultNode = ({ data }) => {
  return (
    <div style={{ padding: 10, background: "#e6f7ff", border: "1px solid #ddd" }}>
      <strong>Result</strong>
      <div style={{ marginTop: 5, minWidth: 200 }}>
        {data.response || "AI response will appear here..."}
      </div>
      <Handle type="target" position={Position.Left} />
    </div>
  );
};

export default ResultNode;