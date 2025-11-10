import React, { useState } from "react";

const SavingsPlanner = ({ onSubmit, loading, darkMode }) => {
  const [currentWealth, setCurrentWealth] = useState("");
  const [monthlySavings, setMonthlySavings] = useState("");
  const [goals, setGoals] = useState([{ name: "", amount: "", priority: 5 }]);

  const addGoal = () => {
    setGoals([...goals, { name: "", amount: "", priority: 5 }]);
  };

  const updateGoal = (index, field, value) => {
    const updated = [...goals];
    updated[index][field] = value;
    setGoals(updated);
  };

  const removeGoal = (index) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      currentWealth: parseInt(currentWealth),
      monthlySavings: parseInt(monthlySavings),
      goals: goals.map((goal) => ({
        ...goal,
        amount: parseInt(goal.amount),
        priority: parseInt(goal.priority),
      })),
    };
    onSubmit(data);
  };

  return (
    <div className="space-y-6">
      <h2
        className={`text-2xl font-bold ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
        Savings Pathfinder
      </h2>
      <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
        Advanced Shortest Path Algorithm for goal achievement sequencing
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Current Wealth (₹)
            </label>
            <input
              type="number"
              value={currentWealth}
              onChange={(e) => setCurrentWealth(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300"
              }`}
              placeholder="Current savings"
              required
            />
          </div>
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Monthly Savings (₹)
            </label>
            <input
              type="number"
              value={monthlySavings}
              onChange={(e) => setMonthlySavings(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300"
              }`}
              placeholder="Monthly savings capacity"
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3
              className={`text-lg font-semibold ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Financial Goals
            </h3>
            <button
              type="button"
              onClick={addGoal}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Add Goal
            </button>
          </div>

          {goals.map((goal, index) => (
            <div
              key={index}
              className={`grid grid-cols-12 gap-4 items-center p-4 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-gray-50"
              }`}
            >
              <div className="col-span-4">
                <input
                  type="text"
                  value={goal.name}
                  onChange={(e) => updateGoal(index, "name", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    darkMode
                      ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                      : "bg-white border-gray-300"
                  }`}
                  placeholder="Goal name"
                  required
                />
              </div>
              <div className="col-span-3">
                <input
                  type="number"
                  value={goal.amount}
                  onChange={(e) => updateGoal(index, "amount", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    darkMode
                      ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                      : "bg-white border-gray-300"
                  }`}
                  placeholder="Target amount"
                  required
                />
              </div>
              <div className="col-span-3">
                <select
                  value={goal.priority}
                  onChange={(e) =>
                    updateGoal(index, "priority", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg ${
                    darkMode
                      ? "bg-gray-600 border-gray-500 text-white"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <option
                    value="10"
                    className={darkMode ? "bg-gray-700" : "bg-white"}
                  >
                    Critical (10)
                  </option>
                  <option
                    value="8"
                    className={darkMode ? "bg-gray-700" : "bg-white"}
                  >
                    High (8)
                  </option>
                  <option
                    value="5"
                    className={darkMode ? "bg-gray-700" : "bg-white"}
                  >
                    Medium (5)
                  </option>
                  <option
                    value="3"
                    className={darkMode ? "bg-gray-700" : "bg-white"}
                  >
                    Low (3)
                  </option>
                </select>
              </div>
              <div className="col-span-2">
                <button
                  type="button"
                  onClick={() => removeGoal(index)}
                  className="w-full px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 font-semibold transition-colors"
        >
          {loading ? "🔄 Planning..." : "🎯 Find Optimal Path"}
        </button>
      </form>
    </div>
  );
};

export default SavingsPlanner;
