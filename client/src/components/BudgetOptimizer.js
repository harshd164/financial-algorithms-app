import React, { useState } from "react";

const BudgetOptimizer = ({ onSubmit, loading }) => {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState([
    { name: "", amount: "", priority: 5 },
  ]);

  const addExpense = () => {
    setExpenses([...expenses, { name: "", amount: "", priority: 5 }]);
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
      <h2 className="text-2xl font-bold text-gray-800">Budget Optimization</h2>
      <p className="text-gray-600">
        0-1 Knapsack Algorithm for optimal expense allocation
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Income (₹)
          </label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your monthly income"
            required
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Expenses</h3>
            <button
              type="button"
              onClick={addExpense}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Add Expense
            </button>
          </div>

          {expenses.map((expense, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-4 items-center p-4 bg-gray-50 rounded-lg"
            >
              <div className="col-span-4">
                <input
                  type="text"
                  value={expense.name}
                  onChange={(e) => updateExpense(index, "name", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Expense name"
                  required
                />
              </div>
              <div className="col-span-3">
                <input
                  type="number"
                  value={expense.amount}
                  onChange={(e) =>
                    updateExpense(index, "amount", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="10">Critical (10)</option>
                  <option value="8">High (8)</option>
                  <option value="5">Medium (5)</option>
                  <option value="3">Low (3)</option>
                  <option value="1">Optional (1)</option>
                </select>
              </div>
              <div className="col-span-2">
                <button
                  type="button"
                  onClick={() => removeExpense(index)}
                  className="w-full px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
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
          className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 font-semibold"
        >
          {loading ? "Optimizing..." : "Optimize Budget"}
        </button>
      </form>
    </div>
  );
};

export default BudgetOptimizer;
