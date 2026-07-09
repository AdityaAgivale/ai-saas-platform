"use client";
import { useState } from "react";

export default function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    if (res.ok) {
      setResponse(data.response);
    } else {
      setResponse("Error: " + data.error);
    }
    setLoading(false);
  };

  const handleUpgrade = async () => {
    const res = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">AI Dashboard</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Kuch bhi puchho..."
        className="w-full p-3 rounded bg-gray-900 mb-4"
        rows={4}
      />
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-blue-600 px-6 py-2 rounded"
      >
        {loading ? "Generating..." : "Generate"}
      </button>
      <button onClick={handleUpgrade} className="bg-green-600 px-6 py-2 rounded ml-4">
        Upgrade to Pro
      </button>
      {response && (
        <div className="mt-6 bg-gray-900 p-4 rounded">
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}