import express from "express";
import cors from "cors";
import apiRoutes from "./routes/api.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Use API routes
app.use("/api", apiRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Financial Algorithms API Server",
    endpoints: {
      "/api/optimize-budget": "POST - Budget optimization using 0-1 Knapsack",
      "/api/optimize-tax": "POST - Tax optimization using Fractional Knapsack",
      "/api/plan-savings": "POST - Savings path planning using Shortest Path",
      "/api/calculate-emi": "POST - EMI calculation",
      "/api/health": "GET - API health check",
      "/api/algorithms": "GET - List of available algorithms",
    },
    documentation: "See /api/algorithms for detailed algorithm information",
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found",
    availableEndpoints: [
      "GET /",
      "GET /api/health",
      "GET /api/algorithms",
      "POST /api/optimize-budget",
      "POST /api/optimize-tax",
      "POST /api/plan-savings",
      "POST /api/calculate-emi",
    ],
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error("Server error:", error);
  res.status(500).json({
    success: false,
    error: "Internal server error",
    message: error.message,
  });
});

app.listen(PORT, () => {
  console.log(
    `🚀 Financial Algorithms Server running at http://localhost:${PORT}`
  );
  console.log(
    `📚 API Documentation available at http://localhost:${PORT}/api/algorithms`
  );
});
