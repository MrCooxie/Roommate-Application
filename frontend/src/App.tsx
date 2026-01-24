import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

interface BackendData {
  message: string;
  features: string[];
}

function App() {
  const [count, setCount] = useState(0)
  const [backendData, setBackendData] = useState<BackendData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:5000/api/demo')
      .then(res => res.json())
      .then(data => {
        setBackendData(data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Failed to fetch from backend:", err)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Flask</h1>
      
      <div className="card">
        <h3>Backend Status:</h3>
        {loading ? (
          <p>Loading backend data...</p>
        ) : backendData ? (
          <div>
            <p><strong>Message:</strong> {backendData.message}</p>
            <ul>
              {backendData.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p style={{ color: 'red' }}>Could not connect to backend. Make sure the Flask server is running at http://localhost:5000</p>
        )}
      </div>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className="read-the-docs">
        Check the console if the backend fetch fails.
      </p>
    </>
  )
}

export default App
