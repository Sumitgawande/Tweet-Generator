import React, { useState } from "react";
import axios from "axios";
import {
  Bar, Line, Pie, Doughnut, Radar, Scatter
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadarController,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadarController,
  Tooltip,
  Legend
);

function Agent() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const chartMap = {
    bar: Bar,
    line: Line,
    pie: Pie,
    doughnut: Doughnut,
    radar: Radar,
    scatter: Scatter
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/ask", {
        question
      });

      setResponse(res.data);
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert("Failed to get response from backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h2>LLM-Powered SQL + Chart Generator</h2>
      <textarea
        rows={3}
        style={{ width: "100%", marginBottom: "1rem" }}
        placeholder="Ask a question about the database..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Thinking..." : "Submit"}
      </button>

      {response && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Generated SQL:</h3>
          <pre>{response.sql}</pre>

          <h3>SQL Result:</h3>
          <table border="1" cellPadding="6" style={{ borderCollapse: "collapse", marginBottom: "2rem" }}>
            <thead>
              <tr>
                {response.result.columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {response.result.rows.map((row, idx) => (
                <tr key={idx}>
                  {row.map((cell, i) => (
                    <td key={i}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {response.chartType !== "null" && response.chartConfig && (
            <>
              <h3>Suggested Chart: {response.chartType}</h3>
              {(() => {
                const ChartComponent = chartMap[response.chartType];
                return (
                  <ChartComponent
                    data={response.chartConfig.data}
                    options={response.chartConfig.options}
                  />
                );
              })()}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Agent;
