import React, { useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import axios from "axios";

import InputNode from "./components/InputNode";
import ResultNode from "./components/ResultNode";

import "./components/styles.css";

const nodeTypes = {
  inputNode: InputNode,
  resultNode: ResultNode,
};

// 🔥 Use ENV variable instead of hardcoding
const API_BASE =
  process.env.REACT_APP_API_URL ||
  "https://chatbot1212-y4o8.vercel.app";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

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
      data: { response: loading ? "Loading... ⏳" : response },
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

  /* ================= RUN FLOW ================= */
  const runFlow = async () => {
    if (!prompt) {
      alert("Please enter a prompt");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/api/ask-ai`, {
        prompt,
      });

      setResponse(res.data.response);
    } catch (err) {
      console.error("AI ERROR:", err);

      // 🔥 Retry once (important for Render/Vercel cold start)
      try {
        const retry = await axios.post(`${API_BASE}/api/ask-ai`, {
          prompt,
        });
        setResponse(retry.data.response);
      } catch {
        setResponse("Server busy or failed. Try again 🚀");
      }
    } finally {
      setLoading(false);
    }
  };

  /* ================= SAVE DATA ================= */
  const saveData = async () => {
    if (!prompt || !response) {
      alert("Nothing to save");
      return;
    }

    try {
      await axios.post(`${API_BASE}/api/save`, {
        prompt,
        response,
      });

      alert("Saved to DB ✅");
    } catch (err) {
      console.error("SAVE ERROR:", err);
      alert("Save failed ❌");
    }
  };

  return (
    <div className="app">
      {/* 🔥 Buttons */}
      <div style={{ position: "absolute", zIndex: 10 }}>
        <button onClick={runFlow} disabled={loading}>
          {loading ? "Running..." : "Run Flow"}
        </button>

        <button onClick={saveData}>
          Save
        </button>
      </div>

      {/* 🔥 Flow UI */}
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