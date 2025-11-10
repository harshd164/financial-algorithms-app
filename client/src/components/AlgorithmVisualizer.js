import React, { useState } from "react";

const AlgorithmVisualizer = ({ darkMode }) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("knapsack");

  return (
    <div className="space-y-6">
      <h2
        className={`text-2xl font-bold ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        Algorithm Visualizer
      </h2>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <button
          onClick={() => setSelectedAlgorithm("knapsack")}
          className={`p-4 rounded-lg font-semibold transition-all ${
            selectedAlgorithm === "knapsack"
              ? "bg-indigo-600 text-white shadow-lg glow-effect"
              : `${
                  darkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`
          }`}
        >
          0-1 Knapsack
        </button>
        <button
          onClick={() => setSelectedAlgorithm("fractional")}
          className={`p-4 rounded-lg font-semibold transition-all ${
            selectedAlgorithm === "fractional"
              ? "bg-indigo-600 text-white shadow-lg glow-effect"
              : `${
                  darkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`
          }`}
        >
          Fractional Knapsack
        </button>
        <button
          onClick={() => setSelectedAlgorithm("dijkstra")}
          className={`p-4 rounded-lg font-semibold transition-all ${
            selectedAlgorithm === "dijkstra"
              ? "bg-indigo-600 text-white shadow-lg glow-effect"
              : `${
                  darkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`
          }`}
        >
          Shortest Path
        </button>
        <button
          onClick={() => setSelectedAlgorithm("dp")}
          className={`p-4 rounded-lg font-semibold transition-all ${
            selectedAlgorithm === "dp"
              ? "bg-indigo-600 text-white shadow-lg glow-effect"
              : `${
                  darkMode
                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`
          }`}
        >
          Dynamic Programming
        </button>
      </div>

      <div
        className={`p-6 rounded-lg border ${
          darkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-gray-50 border-gray-200"
        }`}
      >
        {selectedAlgorithm === "knapsack" && (
          <div>
            <h3
              className={`text-lg font-semibold mb-4 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              0-1 Knapsack Algorithm
            </h3>
            <p
              className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Used for budget optimization. Selects expenses to maximize
              priority within income constraints.
            </p>
            <div
              className={`p-4 rounded border ${
                darkMode
                  ? "bg-gray-900 border-gray-600"
                  : "bg-white border-gray-300"
              }`}
            >
              <pre
                className={`text-sm ${
                  darkMode ? "text-green-400" : "text-gray-800"
                }`}
              >{`function knapsack(income, expenses, priorities) {
  // DP table initialization
  for each expense:
    for each possible budget:
      if expense fits in budget:
        dp[i][w] = max(dp[i-1][w], 
                      dp[i-1][w-amount] + priority)
  // Backtrack to find optimal selection
}`}</pre>
            </div>
          </div>
        )}

        {selectedAlgorithm === "fractional" && (
          <div>
            <h3
              className={`text-lg font-semibold mb-4 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Fractional Knapsack Algorithm
            </h3>
            <p
              className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Used for tax optimization. Allows partial investments based on
              efficiency ratios.
            </p>
            <div
              className={`p-4 rounded border ${
                darkMode
                  ? "bg-gray-900 border-gray-600"
                  : "bg-white border-gray-300"
              }`}
            >
              <pre
                className={`text-sm ${
                  darkMode ? "text-green-400" : "text-gray-800"
                }`}
              >{`function fractionalKnapsack(capital, investments) {
  // Sort by return/cost ratio
  investments.sort((a,b) => b.ratio - a.ratio)
  
  for each investment:
    if investment fits entirely:
      allocate full amount
    else:
      allocate remaining capital fractionally
}`}</pre>
            </div>
          </div>
        )}

        {selectedAlgorithm === "dijkstra" && (
          <div>
            <h3
              className={`text-lg font-semibold mb-4 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Shortest Path Algorithm
            </h3>
            <p
              className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Used for savings planning. Finds optimal sequence to achieve
              financial goals.
            </p>
            <div
              className={`p-4 rounded border ${
                darkMode
                  ? "bg-gray-900 border-gray-600"
                  : "bg-white border-gray-300"
              }`}
            >
              <pre
                className={`text-sm ${
                  darkMode ? "text-green-400" : "text-gray-800"
                }`}
              >{`function shortestPath(goals, savings) {
  // Calculate weight for each goal
  weight = priority * amount / monthlySavings
  // Sort goals by weight
  return sortedGoalsByEfficiency
}`}</pre>
            </div>
          </div>
        )}

        {selectedAlgorithm === "dp" && (
          <div>
            <h3
              className={`text-lg font-semibold mb-4 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Dynamic Programming
            </h3>
            <p
              className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Used for compound interest and multi-period financial planning.
            </p>
            <div
              className={`p-4 rounded border ${
                darkMode
                  ? "bg-gray-900 border-gray-600"
                  : "bg-white border-gray-300"
              }`}
            >
              <pre
                className={`text-sm ${
                  darkMode ? "text-green-400" : "text-gray-800"
                }`}
              >{`function compoundInterest(principal, rate, time) {
  // Recursive relationship
  dp[t] = dp[t-1] * (1 + rate) + monthlyContribution
  // Build solution bottom-up
}`}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;
