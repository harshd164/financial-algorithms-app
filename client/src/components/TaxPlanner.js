import React, { useState } from "react";

const TaxPlanner = ({ onSubmit, loading, darkMode }) => {
  const [capital, setCapital] = useState("");
  const [taxSlab, setTaxSlab] = useState("30");
  const [riskTolerance, setRiskTolerance] = useState("moderate");
  const [investments, setInvestments] = useState([
    {
      name: "ELSS Mutual Funds",
      amount: "150000",
      deduction: 0.3,
      returns: 0.12,
      risk: 0.15,
    },
    {
      name: "PPF",
      amount: "150000",
      deduction: 0.3,
      returns: 0.07,
      risk: 0.05,
    },
    { name: "NPS", amount: "50000", deduction: 0.1, returns: 0.09, risk: 0.08 },
    {
      name: "Life Insurance",
      amount: "100000",
      deduction: 0.3,
      returns: 0.06,
      risk: 0.03,
    },
    {
      name: "ULIP",
      amount: "100000",
      deduction: 0.3,
      returns: 0.1,
      risk: 0.12,
    },
  ]);

  const updateInvestment = (index, field, value) => {
    const updated = [...investments];
    if (field === "amount") {
      updated[index].amount = value;
    } else if (field === "deduction") {
      updated[index].deduction = parseFloat(value);
    } else if (field === "returns") {
      updated[index].returns = parseFloat(value);
    } else if (field === "risk") {
      updated[index].risk = parseFloat(value);
    }
    setInvestments(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      capital: parseInt(capital),
      taxSlab: parseInt(taxSlab),
      riskTolerance,
      investments: investments.map((inv) => ({
        ...inv,
        amount: parseInt(inv.amount) || 0,
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
        Advanced Tax Strategist
      </h2>
      <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
        Modern Portfolio Theory with Fractional Knapsack for optimal tax savings
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Available Capital (₹)
            </label>
            <input
              type="number"
              value={capital}
              onChange={(e) => setCapital(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300"
              }`}
              placeholder="Investment capital"
              required
            />
          </div>
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Income Tax Slab (%)
            </label>
            <select
              value={taxSlab}
              onChange={(e) => setTaxSlab(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
                darkMode
                  ? "bg-gray-600 border-gray-500 text-white"
                  : "bg-white border-gray-300"
              }`}
            >
              <option
                value="5"
                className={darkMode ? "bg-gray-700" : "bg-white"}
              >
                5% (Up to 3L)
              </option>
              <option
                value="20"
                className={darkMode ? "bg-gray-700" : "bg-white"}
              >
                20% (3L-7L)
              </option>
              <option
                value="30"
                className={darkMode ? "bg-gray-700" : "bg-white"}
              >
                30% (Above 7L)
              </option>
            </select>
          </div>
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Risk Tolerance
            </label>
            <select
              value={riskTolerance}
              onChange={(e) => setRiskTolerance(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
                darkMode
                  ? "bg-gray-600 border-gray-500 text-white"
                  : "bg-white border-gray-300"
              }`}
            >
              <option
                value="conservative"
                className={darkMode ? "bg-gray-700" : "bg-white"}
              >
                Conservative
              </option>
              <option
                value="moderate"
                className={darkMode ? "bg-gray-700" : "bg-white"}
              >
                Moderate
              </option>
              <option
                value="aggressive"
                className={darkMode ? "bg-gray-700" : "bg-white"}
              >
                Aggressive
              </option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h3
            className={`text-lg font-semibold ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Investment Portfolio Options
          </h3>
          {investments.map((investment, index) => (
            <div
              key={index}
              className={`grid grid-cols-12 gap-4 items-center p-4 rounded-lg ${
                darkMode ? "bg-gray-700" : "bg-gray-50"
              }`}
            >
              <div className="col-span-2">
                <input
                  type="text"
                  value={investment.name}
                  className={`w-full px-3 py-2 border rounded-lg ${
                    darkMode
                      ? "bg-gray-600 border-gray-500 text-white"
                      : "bg-white border-gray-300"
                  }`}
                  readOnly
                />
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  value={investment.amount}
                  onChange={(e) =>
                    updateInvestment(index, "amount", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg ${
                    darkMode
                      ? "bg-gray-600 border-gray-500 text-white placeholder-gray-400"
                      : "bg-white border-gray-300"
                  }`}
                  placeholder="Max amount"
                />
              </div>
              <div className="col-span-2">
                <select
                  value={investment.deduction}
                  onChange={(e) =>
                    updateInvestment(index, "deduction", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg ${
                    darkMode
                      ? "bg-gray-600 border-gray-500 text-white"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <option
                    value="0.1"
                    className={darkMode ? "bg-gray-700" : "bg-white"}
                  >
                    10% Deduction
                  </option>
                  <option
                    value="0.3"
                    className={darkMode ? "bg-gray-700" : "bg-white"}
                  >
                    30% Deduction
                  </option>
                  <option
                    value="0.5"
                    className={darkMode ? "bg-gray-700" : "bg-white"}
                  >
                    50% Deduction
                  </option>
                </select>
              </div>
              <div className="col-span-2">
                <select
                  value={investment.returns}
                  onChange={(e) =>
                    updateInvestment(index, "returns", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg ${
                    darkMode
                      ? "bg-gray-600 border-gray-500 text-white"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <option
                    value="0.06"
                    className={darkMode ? "bg-gray-700" : "bg-white"}
                  >
                    6% Returns
                  </option>
                  <option
                    value="0.08"
                    className={darkMode ? "bg-gray-700" : "bg-white"}
                  >
                    8% Returns
                  </option>
                  <option
                    value="0.10"
                    className={darkMode ? "bg-gray-700" : "bg-white"}
                  >
                    10% Returns
                  </option>
                  <option
                    value="0.12"
                    className={darkMode ? "bg-gray-700" : "bg-white"}
                  >
                    12% Returns
                  </option>
                </select>
              </div>
              <div className="col-span-2">
                <select
                  value={investment.risk}
                  onChange={(e) =>
                    updateInvestment(index, "risk", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-lg ${
                    darkMode
                      ? "bg-gray-600 border-gray-500 text-white"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <option
                    value="0.03"
                    className={darkMode ? "bg-gray-700" : "bg-white"}
                  >
                    Low Risk
                  </option>
                  <option
                    value="0.08"
                    className={darkMode ? "bg-gray-700" : "bg-white"}
                  >
                    Medium Risk
                  </option>
                  <option
                    value="0.15"
                    className={darkMode ? "bg-gray-700" : "bg-white"}
                  >
                    High Risk
                  </option>
                </select>
              </div>
              <div className="col-span-2 text-center">
                <span
                  className={`text-sm font-medium ${
                    investment.risk < 0.06
                      ? "text-green-500"
                      : investment.risk < 0.12
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  Risk: {(investment.risk * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 font-semibold transition-colors"
        >
          {loading ? "🔄 Optimizing..." : "📊 Optimize Tax Savings"}
        </button>
      </form>
    </div>
  );
};

export default TaxPlanner;
