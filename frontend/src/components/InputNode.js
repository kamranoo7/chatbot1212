import React from "react";
import { Handle, Position } from "reactflow";

const InputNode = ({ data }) => {
  return (
    <div style={{ padding: 10, background: "#fff", border: "1px solid #ddd" }}>
      <strong>Input</strong>
      <textarea
        style={{ width: "100%", marginTop: 5 }}
        rows={4}
        placeholder="Type your prompt..."
        value={data.prompt}
        onChange={(e) => data.setPrompt(e.target.value)}
      />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default InputNode;