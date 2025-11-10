import React, { useState } from "react";

const TaxPlanner = ({ onSubmit, loading }) => {
  const [capital, setCapital] = useState("");
  const [taxSlab, setTaxSlab] = useState("30");
  const [investments, setInvestments] = useState([
    {
      name: "ELSS Mutual Funds",
      amount: "150000",
      deduction: 0.3,
      returns: 0.12,
    },
    { name: "PPF", amount: "150000", deduction: 0.3, returns: 0.07 },
    { name: "NPS", amount: "50000", deduction: 0.1, returns: 0.09 },
    { name: "Life Insurance", amount: "100000", deduction: 0.3, returns: 0.06 },
    { name: "ULIP", amount: "100000", deduction: 0.3, returns: 0.1 },
  ]);

  const updateInvestment = (index, field, value) => {
    const updated = [...investments];
    if (field === "amount") {
      updated[index].amount = value;
    } else if (field === "deduction") {
      updated[index].deduction = parseFloat(value);
    } else if (field === "returns") {
      updated[index].returns = parseFloat(value);
    }
    setInvestments(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      capital: parseInt(capital),
      taxSlab: parseInt(taxSlab),
      investments: investments.map((inv) => ({
        ...inv,
        amount: parseInt(inv.amount) || 0,
      })),
    };
    onSubmit(data);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Tax Saving Investment Planner
      </h2>
      <p className="text-gray-600">
        Fractional Knapsack Algorithm for optimal tax savings
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available Capital (₹)
            </label>
            <input
              type="number"
              value={capital}
              onChange={(e) => setCapital(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Investment capital"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Income Tax Slab (%)
            </label>
            <select
              value={taxSlab}
              onChange={(e) => setTaxSlab(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="5">5% (Up to 3L)</option>
              <option value="20">20% (3L-7L)</option>
              <option value="30">30% (Above 7L)</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Investment Options
          </h3>
          {investments.map((investment, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-4 items-center p-4 bg-gray-50 rounded-lg"
            >
              <div className="col-span-3">
                <input
                  type="text"
                  value={investment.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                  readOnly
                />
              </div>
              <div className="col-span-3">
                <input
                  type="number"
                  value={investment.amount}
                  onChange={(e) =>
                    updateInvestment(index, "amount", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Max amount"
                />
              </div>
              <div className="col-span-3">
                <select
                  value={investment.deduction}
                  onChange={(e) =>
                    updateInvestment(index, "deduction", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="0.1">10% Deduction</option>
                  <option value="0.3">30% Deduction</option>
                  <option value="0.5">50% Deduction</option>
                </select>
              </div>
              <div className="col-span-3">
                <select
                  value={investment.returns}
                  onChange={(e) =>
                    updateInvestment(index, "returns", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="0.06">6% Returns</option>
                  <option value="0.08">8% Returns</option>
                  <option value="0.10">10% Returns</option>
                  <option value="0.12">12% Returns</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 font-semibold"
        >
          {loading ? "Optimizing..." : "Optimize Tax Savings"}
        </button>
      </form>
    </div>
  );
};

export default TaxPlanner;
