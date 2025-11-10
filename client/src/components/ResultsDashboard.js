import React from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const ResultsDashboard = ({ results, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-32 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Optimization Results
        </h3>
        <p className="text-gray-600">
          Submit your financial data to see optimized results
        </p>
      </div>
    );
  }

  const renderBudgetResults = () => {
    const {
      allocation,
      remainingExpenses,
      totalUtilized,
      efficiency,
      remainingBudget,
    } = results.data;

    const chartData = {
      labels: allocation.map((item) => item.name),
      datasets: [
        {
          data: allocation.map((item) => item.amount),
          backgroundColor: [
            "#4F46E5",
            "#10B981",
            "#F59E0B",
            "#EF4444",
            "#8B5CF6",
          ],
        },
      ],
    };

    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">
          Budget Allocation
        </h3>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600">Utilized</p>
            <p className="text-2xl font-bold text-green-700">
              ₹{totalUtilized}
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600">Efficiency</p>
            <p className="text-2xl font-bold text-blue-700">{efficiency}%</p>
          </div>
        </div>

        <div className="h-64">
          <Doughnut data={chartData} options={{ maintainAspectRatio: false }} />
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-gray-700">Allocated Expenses</h4>
          {allocation.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 bg-green-50 rounded-lg"
            >
              <span className="font-medium">{item.name}</span>
              <span className="font-bold text-green-700">₹{item.amount}</span>
            </div>
          ))}
        </div>

        {remainingExpenses.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-700">Deferred Expenses</h4>
            {remainingExpenses.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-red-50 rounded-lg"
              >
                <span className="font-medium text-gray-600">{item.name}</span>
                <span className="font-bold text-red-700">₹{item.amount}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderTaxResults = () => {
    const { portfolio, totalTaxSaving, capitalUtilized, recommendation } =
      results.data;

    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">
          Tax Optimization
        </h3>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-600">Tax Savings</p>
            <p className="text-2xl font-bold text-purple-700">
              ₹{totalTaxSaving}
            </p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg">
            <p className="text-sm text-indigo-600">Capital Used</p>
            <p className="text-2xl font-bold text-indigo-700">
              ₹{capitalUtilized}
            </p>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-yellow-800 font-semibold">
            Recommendation
          </p>
          <p className="text-yellow-700">{recommendation}</p>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-gray-700">Investment Portfolio</h4>
          {portfolio.map((item, index) => (
            <div
              key={index}
              className="p-3 bg-white border border-gray-200 rounded-lg"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{item.name}</span>
                <span className="font-bold text-green-700">
                  ₹{item.allocated}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                Efficiency Ratio: {item.ratio.toFixed(3)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSavingsResults = () => {
    const path = results.data;

    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-800">
          Optimal Savings Path
        </h3>

        <div className="bg-green-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-green-600 font-semibold">
            Recommended Achievement Sequence
          </p>
        </div>

        <div className="space-y-4">
          {path.map((goal, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-4 bg-white border border-gray-200 rounded-lg"
            >
              <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{goal.name}</h4>
                <p className="text-sm text-gray-600">Target: ₹{goal.amount}</p>
                <p className="text-sm text-gray-500">
                  Months to achieve: {goal.months}
                </p>
              </div>
              <div className="text-right">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    goal.priority >= 8
                      ? "bg-red-100 text-red-800"
                      : goal.priority >= 5
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  Priority {goal.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-full">
      {results.type === "budget" && renderBudgetResults()}
      {results.type === "tax" && renderTaxResults()}
      {results.type === "savings" && renderSavingsResults()}
    </div>
  );
};

export default ResultsDashboard;
