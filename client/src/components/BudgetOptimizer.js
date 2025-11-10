import React, { useState } from "react";

const BudgetOptimizer = ({ onSubmit, loading, darkMode }) => {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState([
    { name: "", amount: "", priority: 5, category: "essential" },
  ]);

  const addExpense = () => {
    setExpenses([
      ...expenses,
      { name: "", amount: "", priority: 5, category: "essential" },
    ]);
  };

  const updateExpense = (index, field, value) => {
    const updated = [...expenses];
    updated[index][field] = value;
    setExpenses(updated);
  };

  const removeExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      income: parseInt(income),
      expenses: expenses.map((exp) => ({
        ...exp,
        amount: parseInt(exp.amount),
        priority: parseInt(exp.priority),
      })),
      priorities: expenses.map((exp) => parseInt(exp.priority)),
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
        Budget Optimization
      </h2>
      <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
        Advanced 0-1 Knapsack Algorithm for optimal expense allocation
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Monthly Income (₹)
          </label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-800"
            } border`}
            placeholder="Enter your monthly income"
            required
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3
              className={`text-lg font-semibold ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Expenses
            </h3>
            <button
              type="button"
              onClick={addExpense}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Add Expense
            </button>
          </div>

          {expenses.map((expense, index) => (
            <div
              key={index}
              className={`grid grid-cols-12 gap-4 items-center p-4 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-gray-50"
              }`}
            >
              <div className="col-span-3">
                <input
                  type="text"
                  value={expense.name}
                  onChange={(e) => updateExpense(index, "name", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    darkMode
                      ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                      : "bg-white border-gray-300"
                  }`}
                  placeholder="Expense name"
                  required
                />
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  value={expense.amount}
                  onChange={(e) =>
                    updateExpense(index, "amount", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg ${
                    darkMode
                      ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                      : "bg-white border-gray-300"
                  }`}
                  placeholder="Amount"
                  required
                />
              </div>
              <div className="col-span-3">
                <select
                  value={expense.priority}
                  onChange={(e) =>
                    updateExpense(index, "priority", e.target.value)
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
                  <option
                    value="1"
                    className={darkMode ? "bg-gray-700" : "bg-white"}
                  >
                    Optional (1)
                  </option>
                </select>
              </div>
              <div className="col-span-2">
                <select
                  value={expense.category}
                  onChange={(e) =>
                    updateExpense(index, "category", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg ${
                    darkMode
                      ? "bg-gray-600 border-gray-500 text-white"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <option
                    value="essential"
                    className={darkMode ? "bg-gray-700" : "bg-white"}
                  >
                    Essential
                  </option>
                  <option
                    value="investment"
                    className={darkMode ? "bg-gray-700" : "bg-white"}
                  >
                    Investment
                  </option>
                  <option
                    value="luxury"
                    className={darkMode ? "bg-gray-700" : "bg-white"}
                  >
                    Luxury
                  </option>
                </select>
              </div>
              <div className="col-span-2">
                <button
                  type="button"
                  onClick={() => removeExpense(index)}
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
          {loading ? "🔄 Optimizing..." : "🚀 Optimize Budget"}
        </button>
      </form>
    </div>
  );
};

export default BudgetOptimizer;
