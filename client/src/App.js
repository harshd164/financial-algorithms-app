import React, { useState, useEffect } from "react";
import axios from "axios";
import BudgetOptimizer from "./components/BudgetOptimizer";
import TaxPlanner from "./components/TaxPlanner";
import SavingsPlanner from "./components/SavingsPlanner";
import ResultsDashboard from "./components/ResultsDashboard";
import AlgorithmVisualizer from "./components/AlgorithmVisualizer";
import "./App.css";

const API_BASE = "http://localhost:5000/api";

function App() {
  const [activeTab, setActiveTab] = useState("budget");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const handleBudgetOptimization = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE}/optimize-budget`, data);
      setResults({ type: "budget", data: response.data.data });
    } catch (error) {
      console.error("Optimization failed:", error);
      alert("Optimization failed. Please check your inputs.");
    }
    setLoading(false);
  };

  const handleTaxOptimization = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE}/optimize-tax`, data);
      setResults({ type: "tax", data: response.data.data });
    } catch (error) {
      console.error("Tax optimization failed:", error);
      alert("Tax optimization failed. Please check your inputs.");
    }
    setLoading(false);
  };

  const handleSavingsPlanning = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE}/plan-savings`, data);
      setResults({ type: "savings", data: response.data.data });
    } catch (error) {
      console.error("Savings planning failed:", error);
      alert("Savings planning failed. Please check your inputs.");
    }
    setLoading(false);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900"
          : "bg-gradient-to-br from-blue-50 to-indigo-100"
      }`}
    >
      {/* Header */}
      <header className="glass border-b border-gray-700 shadow-2xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center float-animation">
                <span className="text-white font-bold text-lg">₹</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  QuantumFin Algorithms
                </h1>
                <p className="text-gray-400 text-sm">
                  Advanced Algorithmic Finance Platform
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                {darkMode ? "🌙" : "☀️"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700">
        <div className="container mx-auto px-6">
          <div className="flex space-x-1 py-3">
            {[
              { id: "budget", name: "Budget Optimizer", icon: "💰" },
              { id: "tax", name: "Tax Strategist", icon: "📊" },
              { id: "savings", name: "Wealth Pathfinder", icon: "🎯" },
              { id: "visualize", name: "Algorithm Lab", icon: "🔬" },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "primary-gradient text-white shadow-lg glow-effect"
                    : "text-gray-400 hover:text-white hover:bg-gray-700/50"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Input Section */}
          <div className="xl:col-span-3">
            <div className="glass rounded-2xl shadow-2xl p-8 border border-gray-700">
              {activeTab === "budget" && (
                <BudgetOptimizer
                  onSubmit={handleBudgetOptimization}
                  loading={loading}
                  darkMode={darkMode}
                />
              )}
              {activeTab === "tax" && (
                <TaxPlanner
                  onSubmit={handleTaxOptimization}
                  loading={loading}
                  darkMode={darkMode}
                />
              )}
              {activeTab === "savings" && (
                <SavingsPlanner
                  onSubmit={handleSavingsPlanning}
                  loading={loading}
                  darkMode={darkMode}
                />
              )}
              {activeTab === "visualize" && (
                <AlgorithmVisualizer darkMode={darkMode} />
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="xl:col-span-1">
            <ResultsDashboard
              results={results}
              loading={loading}
              darkMode={darkMode}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="glass border-t border-gray-700 mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div className="text-gray-400">
              <p>QuantumFin Algorithms v2.0</p>
              <p className="text-sm">Advanced Financial Computing Platform</p>
            </div>
            <div className="flex space-x-4 text-gray-400">
              <span>🔒 Secure</span>
              <span>⚡ Real-time</span>
              <span>🎯 Precise</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
