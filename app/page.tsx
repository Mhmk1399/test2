// pages/index.js
"use client";
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  
  const [responseJson, setResponseJson] = useState<object | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('/api/updateJson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }

      const data = await res.json();
      setResponseJson(data.updatedJson);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Website JSON Generator</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your prompt:
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            cols={50}
            style={{ display: 'block', marginTop: '10px', marginBottom: '10px' }}
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {responseJson && (
        <div style={{ marginTop: '20px' }}>
          <h2>Updated JSON</h2>
          <pre>{JSON.stringify(responseJson, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
