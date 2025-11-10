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

const ResultsDashboard = ({ results, loading, darkMode }) => {
  if (loading) {
    return (
      <div
        className={`rounded-xl shadow-lg p-6 ${
          darkMode ? "bg-gray-800 border border-gray-700" : "bg-white"
        }`}
      >
        <div className="animate-pulse">
          <div
            className={`h-4 rounded w-3/4 mb-4 ${
              darkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`h-32 rounded mb-4 ${
              darkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`h-4 rounded w-1/2 ${
              darkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
          ></div>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div
        className={`rounded-xl shadow-lg p-6 ${
          darkMode ? "bg-gray-800 border border-gray-700" : "bg-white"
        }`}
      >
        <h3
          className={`text-xl font-semibold mb-4 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Optimization Results
        </h3>
        <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
          Submit your financial data to see optimized results
        </p>
      </div>
    );
  }

  const renderBudgetResults = () => {
    const { allocation, remainingExpenses, totalUtilized, efficiency } =
      results.data;

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
          borderColor: darkMode ? "#1f2937" : "#ffffff",
          borderWidth: 2,
        },
      ],
    };

    const chartOptions = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: darkMode ? "#f3f4f6" : "#374151",
          },
        },
      },
    };

    return (
      <div className="space-y-6">
        <h3
          className={`text-xl font-semibold ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Budget Allocation
        </h3>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div
            className={`p-4 rounded-lg border ${
              darkMode
                ? "bg-green-900/30 border-green-800"
                : "bg-green-50 border-green-200"
            }`}
          >
            <p
              className={`text-sm ${
                darkMode ? "text-green-400" : "text-green-600"
              }`}
            >
              Utilized
            </p>
            <p
              className={`text-2xl font-bold ${
                darkMode ? "text-green-300" : "text-green-700"
              }`}
            >
              ₹{totalUtilized}
            </p>
          </div>
          <div
            className={`p-4 rounded-lg border ${
              darkMode
                ? "bg-blue-900/30 border-blue-800"
                : "bg-blue-50 border-blue-200"
            }`}
          >
            <p
              className={`text-sm ${
                darkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              Efficiency
            </p>
            <p
              className={`text-2xl font-bold ${
                darkMode ? "text-blue-300" : "text-blue-700"
              }`}
            >
              {efficiency}%
            </p>
          </div>
        </div>

        <div className="h-64">
          <Doughnut data={chartData} options={chartOptions} />
        </div>

        <div className="space-y-3">
          <h4
            className={`font-semibold ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Allocated Expenses
          </h4>
          {allocation.map((item, index) => (
            <div
              key={index}
              className={`flex justify-between items-center p-3 rounded-lg border ${
                darkMode
                  ? "bg-green-900/20 border-green-800"
                  : "bg-green-50 border-green-200"
              }`}
            >
              <span
                className={`font-medium ${
                  darkMode ? "text-green-300" : "text-green-800"
                }`}
              >
                {item.name}
              </span>
              <span
                className={`font-bold ${
                  darkMode ? "text-green-400" : "text-green-700"
                }`}
              >
                ₹{item.amount}
              </span>
            </div>
          ))}
        </div>

        {remainingExpenses.length > 0 && (
          <div className="space-y-3">
            <h4
              className={`font-semibold ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Deferred Expenses
            </h4>
            {remainingExpenses.map((item, index) => (
              <div
                key={index}
                className={`flex justify-between items-center p-3 rounded-lg border ${
                  darkMode
                    ? "bg-red-900/20 border-red-800"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <span
                  className={`font-medium ${
                    darkMode ? "text-red-300" : "text-red-800"
                  }`}
                >
                  {item.name}
                </span>
                <span
                  className={`font-bold ${
                    darkMode ? "text-red-400" : "text-red-700"
                  }`}
                >
                  ₹{item.amount}
                </span>
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
        <h3
          className={`text-xl font-semibold ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Tax Optimization
        </h3>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div
            className={`p-4 rounded-lg border ${
              darkMode
                ? "bg-purple-900/30 border-purple-800"
                : "bg-purple-50 border-purple-200"
            }`}
          >
            <p
              className={`text-sm ${
                darkMode ? "text-purple-400" : "text-purple-600"
              }`}
            >
              Tax Savings
            </p>
            <p
              className={`text-2xl font-bold ${
                darkMode ? "text-purple-300" : "text-purple-700"
              }`}
            >
              ₹{totalTaxSaving}
            </p>
          </div>
          <div
            className={`p-4 rounded-lg border ${
              darkMode
                ? "bg-indigo-900/30 border-indigo-800"
                : "bg-indigo-50 border-indigo-200"
            }`}
          >
            <p
              className={`text-sm ${
                darkMode ? "text-indigo-400" : "text-indigo-600"
              }`}
            >
              Capital Used
            </p>
            <p
              className={`text-2xl font-bold ${
                darkMode ? "text-indigo-300" : "text-indigo-700"
              }`}
            >
              ₹{capitalUtilized}
            </p>
          </div>
        </div>

        <div
          className={`p-4 rounded-lg border ${
            darkMode
              ? "bg-yellow-900/30 border-yellow-800"
              : "bg-yellow-50 border-yellow-200"
          }`}
        >
          <p
            className={`text-sm font-semibold ${
              darkMode ? "text-yellow-400" : "text-yellow-800"
            }`}
          >
            Recommendation
          </p>
          <p className={darkMode ? "text-yellow-300" : "text-yellow-700"}>
            {recommendation}
          </p>
        </div>

        <div className="space-y-3">
          <h4
            className={`font-semibold ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Investment Portfolio
          </h4>
          {portfolio.map((item, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border ${
                darkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span
                  className={`font-medium ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {item.name}
                </span>
                <span
                  className={`font-bold ${
                    darkMode ? "text-green-400" : "text-green-700"
                  }`}
                >
                  ₹{item.allocated}
                </span>
              </div>
              <div
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
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
        <h3
          className={`text-xl font-semibold ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Optimal Savings Path
        </h3>

        <div
          className={`p-4 rounded-lg border mb-6 ${
            darkMode
              ? "bg-green-900/30 border-green-800"
              : "bg-green-50 border-green-200"
          }`}
        >
          <p
            className={`text-sm font-semibold ${
              darkMode ? "text-green-400" : "text-green-600"
            }`}
          >
            Recommended Achievement Sequence
          </p>
        </div>

        <div className="space-y-4">
          {path.map((goal, index) => (
            <div
              key={index}
              className={`flex items-center space-x-4 p-4 rounded-lg border ${
                darkMode
                  ? "bg-gray-700 border-gray-600"
                  : "bg-white border-gray-200"
              }`}
            >
              <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <div className="flex-1">
                <h4
                  className={`font-semibold ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {goal.name}
                </h4>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Target: ₹{goal.amount}
                </p>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-500" : "text-gray-500"
                  }`}
                >
                  Months to achieve: {goal.months}
                </p>
              </div>
              <div className="text-right">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    goal.priority >= 8
                      ? darkMode
                        ? "bg-red-900/50 text-red-300"
                        : "bg-red-100 text-red-800"
                      : goal.priority >= 5
                      ? darkMode
                        ? "bg-yellow-900/50 text-yellow-300"
                        : "bg-yellow-100 text-yellow-800"
                      : darkMode
                      ? "bg-green-900/50 text-green-300"
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
    <div
      className={`rounded-xl shadow-lg p-6 h-full ${
        darkMode ? "bg-gray-800 border border-gray-700" : "bg-white"
      }`}
    >
      {results.type === "budget" && renderBudgetResults()}
      {results.type === "tax" && renderTaxResults()}
      {results.type === "savings" && renderSavingsResults()}
    </div>
  );
};

export default ResultsDashboard;
