import express from "express";
import { FinancialAlgorithms } from "../algorithms/financialAlgorithms.js";

const router = express.Router();

// Budget optimization route
router.post("/optimize-budget", (req, res) => {
  try {
    const { income, expenses, priorities } = req.body;

    // Validate input
    if (!income || !expenses || !priorities) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: income, expenses, priorities",
      });
    }

    if (expenses.length !== priorities.length) {
      return res.status(400).json({
        success: false,
        error: "Expenses and priorities arrays must have the same length",
      });
    }

    const result = FinancialAlgorithms.budgetOptimization(
      income,
      expenses,
      priorities
    );
    res.json({ success: true, data: result });
  } catch (error) {
    console.error("Budget optimization error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error during budget optimization",
      details: error.message,
    });
  }
});

// Tax optimization route
router.post("/optimize-tax", (req, res) => {
  try {
    const { capital, investments, taxSlab } = req.body;

    // Validate input
    if (!capital || !investments || !taxSlab) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: capital, investments, taxSlab",
      });
    }

    const result = FinancialAlgorithms.taxSavingOptimization(
      capital,
      investments,
      taxSlab
    );
    res.json({ success: true, data: result });
  } catch (error) {
    console.error("Tax optimization error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error during tax optimization",
      details: error.message,
    });
  }
});

// Savings planning route
router.post("/plan-savings", (req, res) => {
  try {
    const { currentWealth, goals, monthlySavings } = req.body;

    // Validate input
    if (!currentWealth || !goals || !monthlySavings) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: currentWealth, goals, monthlySavings",
      });
    }

    const result = FinancialAlgorithms.savingsPathOptimization(
      currentWealth,
      goals,
      monthlySavings
    );
    res.json({ success: true, data: result });
  } catch (error) {
    console.error("Savings planning error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error during savings planning",
      details: error.message,
    });
  }
});

// EMI calculation route
router.post("/calculate-emi", (req, res) => {
  try {
    const { principal, rate, tenure } = req.body;

    // Validate input
    if (!principal || !rate || !tenure) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: principal, rate, tenure",
      });
    }

    const result = FinancialAlgorithms.calculateEMI(principal, rate, tenure);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error("EMI calculation error:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error during EMI calculation",
      details: error.message,
    });
  }
});

// Health check route
router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Financial Algorithms API is running",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// Algorithm info route
router.get("/algorithms", (req, res) => {
  const algorithms = {
    budgetOptimization: {
      name: "0-1 Knapsack Algorithm",
      description:
        "Optimizes budget allocation by selecting highest priority expenses within income constraints",
      complexity: "O(n*W) where n is number of expenses, W is income",
      useCase: "Monthly budget planning",
    },
    taxSavingOptimization: {
      name: "Fractional Knapsack Algorithm",
      description:
        "Optimizes tax savings by allocating capital to most efficient investments",
      complexity: "O(n log n) for sorting investments by efficiency",
      useCase: "Tax planning and investment allocation",
    },
    savingsPathOptimization: {
      name: "Shortest Path Algorithm (Dijkstra-inspired)",
      description:
        "Finds optimal sequence to achieve financial goals based on priority and resources",
      complexity: "O(n log n) for goal prioritization",
      useCase: "Long-term financial goal planning",
    },
    calculateEMI: {
      name: "Amortization Algorithm",
      description:
        "Calculates EMI and loan repayment schedule using compound interest formulas",
      complexity: "O(1) for basic calculation, O(n) for full schedule",
      useCase: "Loan planning and debt management",
    },
  };

  res.json({ success: true, data: algorithms });
});

export default router;
