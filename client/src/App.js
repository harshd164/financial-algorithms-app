import React, { useState } from "react";
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            🇮🇳 Advanced Financial Algorithms Suite
          </h1>
          <p className="text-gray-600 text-center mt-2">
            Algorithmic Solutions for Indian Personal Finance
          </p>
        </div>
      </header>

      <nav className="bg-indigo-600 text-white">
        <div className="container mx-auto px-6">
          <div className="flex space-x-8 justify-center py-4">
            {["budget", "tax", "savings", "visualize"].map((tab) => (
              <button
                key={tab}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === tab
                    ? "bg-white text-indigo-600 shadow-lg"
                    : "hover:bg-indigo-500"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "budget" && "Budget Optimizer"}
                {tab === "tax" && "Tax Planning"}
                {tab === "savings" && "Savings Pathfinder"}
                {tab === "visualize" && "Algorithm Visualizer"}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              {activeTab === "budget" && (
                <BudgetOptimizer
                  onSubmit={handleBudgetOptimization}
                  loading={loading}
                />
              )}
              {activeTab === "tax" && (
                <TaxPlanner
                  onSubmit={handleTaxOptimization}
                  loading={loading}
                />
              )}
              {activeTab === "savings" && (
                <SavingsPlanner
                  onSubmit={handleSavingsPlanning}
                  loading={loading}
                />
              )}
              {activeTab === "visualize" && <AlgorithmVisualizer />}
            </div>
          </div>

          <div className="lg:col-span-1">
            <ResultsDashboard results={results} loading={loading} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
