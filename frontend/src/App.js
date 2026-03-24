import React, { useState, useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import axios from "axios";

import InputNode from "./components/InputNode";
import ResultNode from "./components/ResultNode";

import "./components/styles.css";

const nodeTypes = {
  inputNode: InputNode,
  resultNode: ResultNode,
};

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const nodes = [
    {
      id: "1",
      type: "inputNode",
      position: { x: 100, y: 100 },
      data: { prompt, setPrompt },
    },
    {
      id: "2",
      type: "resultNode",
      position: { x: 400, y: 100 },
      data: { response },
    },
  ];

  const edges = [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      animated: true,
    },
  ];

  // 🔹 Call Backend AI
  const runFlow = async () => {
    try {
      const res = await axios.post("https://chatbot1212-1.onrender.com/api/ask-ai", {
        prompt,
      });

      setResponse(res.data.response);
    } catch (err) {
      console.error(err);
      alert("Error calling AI");
    }
  };

  // 🔹 Save to DB
  const saveData = async () => {
    try {
      await axios.post("https://chatbot1212-1.onrender.com/api/save", {
        prompt,
        response,
      });

      alert("Saved to DB ✅");
    } catch (err) {
      console.error(err);
      alert("Save failed ❌");
    }
  };

  return (
    <div className="app">
      <div style={{ position: "absolute", zIndex: 10 }}>
        <button onClick={runFlow}>Run Flow</button>
        <button onClick={saveData}>Save</button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}