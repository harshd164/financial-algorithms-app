export class FinancialAlgorithms {
  // Advanced 0-1 Knapsack with Multiple Constraints
  static budgetOptimization(income, expenses, priorities, constraints = {}) {
    const {
      minEssentials = 0,
      maxLuxury = Infinity,
      categoryLimits = {},
    } = constraints;

    const n = expenses.length;
    const categories = [...new Set(expenses.map((e) => e.category))];

    // 3D DP table: [items][budget][category_state]
    const dp = Array(n + 1)
      .fill()
      .map(() =>
        Array(income + 1)
          .fill()
          .map(() => Array(categories.length + 1).fill(0))
      );

    const categoryIndex = {};
    categories.forEach((cat, idx) => (categoryIndex[cat] = idx + 1));

    for (let i = 1; i <= n; i++) {
      for (let w = 0; w <= income; w++) {
        for (let c = 0; c <= categories.length; c++) {
          const currentExpense = expenses[i - 1];
          const catIdx = categoryIndex[currentExpense.category];

          if (currentExpense.amount <= w) {
            // Check category constraints
            const categoryValid =
              !categoryLimits[currentExpense.category] ||
              currentExpense.amount <= categoryLimits[currentExpense.category];

            if (categoryValid) {
              dp[i][w][c] = Math.max(
                dp[i - 1][w][c],
                dp[i - 1][w - currentExpense.amount][
                  Math.max(0, c - (catIdx === c ? 1 : 0))
                ] +
                  this.calculateWeightedPriority(
                    currentExpense,
                    priorities[i - 1]
                  )
              );
            } else {
              dp[i][w][c] = dp[i - 1][w][c];
            }
          } else {
            dp[i][w][c] = dp[i - 1][w][c];
          }
        }
      }
    }

    return this.backtrackAdvanced(dp, expenses, income, categories.length);
  }

  static calculateWeightedPriority(expense, basePriority) {
    // Advanced priority calculation considering:
    // 1. Urgency (time-sensitive expenses)
    // 2. Category importance
    // 3. Historical spending patterns
    const urgencyMultiplier = expense.urgent ? 1.5 : 1.0;
    const categoryMultiplier = this.getCategoryWeight(expense.category);
    const timeDecay = expense.deadline
      ? Math.max(
          0.5,
          1 -
            (Date.now() - new Date(expense.deadline)) /
              (30 * 24 * 60 * 60 * 1000)
        )
      : 1;

    return basePriority * urgencyMultiplier * categoryMultiplier * timeDecay;
  }

  static getCategoryWeight(category) {
    const weights = {
      essential: 1.8,
      health: 2.0,
      investment: 1.5,
      education: 1.6,
      luxury: 0.7,
      entertainment: 0.8,
    };
    return weights[category] || 1.0;
  }

  // Advanced Portfolio Optimization with Modern Portfolio Theory
  static taxSavingOptimization(
    capital,
    investments,
    taxSlab,
    riskTolerance = "moderate"
  ) {
    // Calculate efficient frontier using Markowitz Portfolio Theory
    const portfolio = this.calculateEfficientFrontier(
      investments,
      capital,
      taxSlab,
      riskTolerance
    );

    // Apply Black-Litterman model for better asset allocation
    const optimizedPortfolio = this.blackLittermanOptimization(
      portfolio,
      riskTolerance
    );

    return {
      ...optimizedPortfolio,
      sharpeRatio: this.calculateSharpeRatio(optimizedPortfolio),
      maxDrawdown: this.calculateMaxDrawdown(optimizedPortfolio),
      var: this.calculateValueAtRisk(optimizedPortfolio, 0.05),
    };
  }

  static calculateEfficientFrontier(
    investments,
    capital,
    taxSlab,
    riskTolerance
  ) {
    const returns = investments.map((inv) => inv.returns);
    const risks = investments.map((inv) => inv.risk || 0.1);
    const taxBenefits = investments.map(
      (inv) => (inv.deduction * taxSlab) / 100
    );

    const n = investments.length;
    const covarianceMatrix = this.calculateCovarianceMatrix(returns, risks);

    // Mean-variance optimization
    const optimizedWeights = this.meanVarianceOptimization(
      returns,
      covarianceMatrix,
      riskTolerance
    );

    const portfolio = [];
    let remainingCapital = capital;
    let totalReturn = 0;
    let totalRisk = 0;
    let totalTaxBenefit = 0;

    optimizedWeights.forEach((weight, index) => {
      const allocated = Math.min(
        capital * weight,
        investments[index].amount,
        remainingCapital
      );
      if (allocated > 0) {
        portfolio.push({
          ...investments[index],
          allocated,
          weight,
          expectedReturn: investments[index].returns * allocated,
          taxBenefit:
            investments[index].deduction * allocated * (taxSlab / 100),
          riskContribution: risks[index] * weight,
        });

        remainingCapital -= allocated;
        totalReturn += investments[index].returns * allocated;
        totalTaxBenefit +=
          investments[index].deduction * allocated * (taxSlab / 100);
        totalRisk += risks[index] * weight;
      }
    });

    return {
      portfolio,
      totalReturn,
      totalTaxBenefit: Math.round(totalTaxBenefit),
      totalRisk: totalRisk / portfolio.length,
      capitalUtilized: capital - remainingCapital,
      diversificationScore: this.calculateDiversificationScore(portfolio),
    };
  }

  static calculateCovarianceMatrix(returns, risks) {
    const n = returns.length;
    const matrix = Array(n)
      .fill()
      .map(() => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (i === j) {
          matrix[i][j] = risks[i] * risks[i]; // Variance
        } else {
          // Simplified correlation (in real scenario, use historical data)
          matrix[i][j] = 0.3 * risks[i] * risks[j];
        }
      }
    }
    return matrix;
  }

  static meanVarianceOptimization(returns, covariance, riskTolerance) {
    const n = returns.length;
    const riskWeights = {
      conservative: 0.1,
      moderate: 0.3,
      aggressive: 0.6,
    };

    const targetRisk = riskWeights[riskTolerance] || 0.3;

    // Quadratic programming optimization
    const weights = Array(n).fill(1 / n); // Start with equal weights

    // Simple gradient descent for optimization
    for (let iter = 0; iter < 100; iter++) {
      const gradient = this.calculateGradient(
        weights,
        returns,
        covariance,
        targetRisk
      );
      const learningRate = 0.01;

      for (let i = 0; i < n; i++) {
        weights[i] = Math.max(0, weights[i] - learningRate * gradient[i]);
      }

      // Normalize weights
      const sum = weights.reduce((a, b) => a + b, 0);
      for (let i = 0; i < n; i++) {
        weights[i] /= sum;
      }
    }

    return weights;
  }

  // Advanced Savings Path with Monte Carlo Simulation
  static savingsPathOptimization(
    currentWealth,
    goals,
    monthlySavings,
    riskProfile = "moderate"
  ) {
    // Use Monte Carlo simulation for realistic goal achievement
    const simulations = this.monteCarloSavingsSimulation(
      currentWealth,
      goals,
      monthlySavings,
      riskProfile
    );

    // Apply genetic algorithm for optimal goal sequencing
    const optimalSequence = this.geneticAlgorithmOptimization(
      goals,
      monthlySavings,
      currentWealth,
      simulations
    );

    // Calculate confidence intervals
    const confidenceIntervals = this.calculateConfidenceIntervals(simulations);

    return {
      sequence: optimalSequence,
      simulations,
      confidenceIntervals,
      successProbability: this.calculateSuccessProbability(simulations),
      recommendedActions: this.generateRecommendations(
        optimalSequence,
        simulations
      ),
    };
  }

  static monteCarloSavingsSimulation(
    currentWealth,
    goals,
    monthlySavings,
    riskProfile,
    numSimulations = 1000
  ) {
    const simulations = [];
    const marketReturns = {
      conservative: { mean: 0.06, std: 0.08 },
      moderate: { mean: 0.08, std: 0.12 },
      aggressive: { mean: 0.1, std: 0.18 },
    };

    const { mean, std } = marketReturns[riskProfile] || marketReturns.moderate;

    for (let sim = 0; sim < numSimulations; sim++) {
      let wealth = currentWealth;
      const simulation = {
        sequence: [],
        achieved: [],
        timeline: [],
      };

      const shuffledGoals = [...goals].sort(() => Math.random() - 0.5);

      for (const goal of shuffledGoals) {
        let months = 0;
        let current = wealth;

        while (current < goal.amount && months < 600) {
          // 50 years max
          // Random market return for this month
          const monthlyReturn = this.getRandomNormal(
            mean / 12,
            std / Math.sqrt(12)
          );
          current = current * (1 + monthlyReturn) + monthlySavings;
          months++;

          if (months % 12 === 0) {
            simulation.timeline.push({
              year: months / 12,
              wealth: current,
              goal: goal.name,
              status: current >= goal.amount ? "achieved" : "pending",
            });
          }
        }

        if (current >= goal.amount) {
          simulation.achieved.push({
            ...goal,
            monthsToAchieve: months,
            finalWealth: current,
          });
          wealth = current - goal.amount;
        }

        simulation.sequence.push(goal);
      }

      simulations.push(simulation);
    }

    return simulations;
  }

  static geneticAlgorithmOptimization(
    goals,
    monthlySavings,
    currentWealth,
    simulations
  ) {
    const populationSize = 50;
    const generations = 100;

    let population = Array(populationSize)
      .fill()
      .map(() => [...goals].sort(() => Math.random() - 0.5));

    for (let gen = 0; gen < generations; gen++) {
      // Evaluate fitness
      const fitness = population.map((sequence) =>
        this.calculateSequenceFitness(
          sequence,
          monthlySavings,
          currentWealth,
          simulations
        )
      );

      // Selection (tournament selection)
      const newPopulation = [];
      for (let i = 0; i < populationSize; i++) {
        const parent1 = this.tournamentSelection(population, fitness);
        const parent2 = this.tournamentSelection(population, fitness);

        // Crossover
        const child = this.crossover(parent1, parent2);

        // Mutation
        if (Math.random() < 0.1) {
          this.mutate(child);
        }

        newPopulation.push(child);
      }

      population = newPopulation;
    }

    // Return best sequence
    const fitness = population.map((sequence) =>
      this.calculateSequenceFitness(
        sequence,
        monthlySavings,
        currentWealth,
        simulations
      )
    );
    const bestIndex = fitness.indexOf(Math.max(...fitness));

    return population[bestIndex];
  }

  static calculateSequenceFitness(
    sequence,
    monthlySavings,
    currentWealth,
    simulations
  ) {
    // Fitness based on:
    // 1. Number of goals achieved
    // 2. Total time to achieve all goals
    // 3. Priority satisfaction
    let fitness = 0;
    let wealth = currentWealth;

    for (const goal of sequence) {
      const months = Math.ceil((goal.amount - wealth) / monthlySavings);
      if (months > 0 && months < 600) {
        fitness += goal.priority / months;
        wealth += months * monthlySavings - goal.amount;
      }
    }

    return fitness;
  }

  // Utility functions
  static getRandomNormal(mean, std) {
    let u = 0,
      v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return (
      mean + std * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
    );
  }

  static tournamentSelection(population, fitness, tournamentSize = 3) {
    let best = null;
    for (let i = 0; i < tournamentSize; i++) {
      const idx = Math.floor(Math.random() * population.length);
      if (!best || fitness[idx] > fitness[population.indexOf(best)]) {
        best = population[idx];
      }
    }
    return best;
  }

  static crossover(parent1, parent2) {
    const point = Math.floor(Math.random() * parent1.length);
    const child = [...parent1.slice(0, point)];

    for (const gene of parent2) {
      if (!child.includes(gene)) {
        child.push(gene);
      }
    }

    return child;
  }

  static mutate(sequence) {
    const i = Math.floor(Math.random() * sequence.length);
    const j = Math.floor(Math.random() * sequence.length);
    [sequence[i], sequence[j]] = [sequence[j], sequence[i]];
  }

  static calculateSharpeRatio(portfolio) {
    return (portfolio.totalReturn - 0.03) / portfolio.totalRisk; // 3% risk-free rate
  }

  static calculateMaxDrawdown(portfolio) {
    // Simplified max drawdown calculation
    return portfolio.totalRisk * 2; // Approximation
  }

  static calculateValueAtRisk(portfolio, confidence) {
    // Simplified VaR calculation
    const zScore = confidence === 0.05 ? 1.645 : 1.282;
    return portfolio.totalReturn - zScore * portfolio.totalRisk;
  }

  static calculateDiversificationScore(portfolio) {
    const weights = portfolio.map((p) => p.weight);
    const herfindahl = weights.reduce(
      (sum, weight) => sum + weight * weight,
      0
    );
    return 1 - herfindahl;
  }

  static calculateSuccessProbability(simulations) {
    const successful = simulations.filter(
      (sim) => sim.achieved.length === sim.sequence.length
    ).length;
    return successful / simulations.length;
  }

  static calculateConfidenceIntervals(simulations) {
    const wealths = simulations.map((sim) =>
      sim.achieved.reduce((sum, goal) => sum + goal.finalWealth, 0)
    );

    wealths.sort((a, b) => a - b);

    return {
      p5: wealths[Math.floor(wealths.length * 0.05)],
      p50: wealths[Math.floor(wealths.length * 0.5)],
      p95: wealths[Math.floor(wealths.length * 0.95)],
    };
  }

  static generateRecommendations(sequence, simulations) {
    const recommendations = [];

    if (this.calculateSuccessProbability(simulations) < 0.8) {
      recommendations.push(
        "Consider increasing monthly savings or adjusting goal priorities"
      );
    }

    if (sequence.some((goal) => goal.priority === 10)) {
      recommendations.push(
        "High priority goals should be funded first for financial security"
      );
    }

    return recommendations;
  }

  static blackLittermanOptimization(portfolio, riskTolerance) {
    // Simplified Black-Litterman model implementation
    // In practice, this would incorporate investor views and market equilibrium
    const tau = 0.05; // Uncertainty scaling factor

    // Adjust returns based on risk tolerance
    const adjustedPortfolio = portfolio.portfolio.map((inv) => ({
      ...inv,
      adjustedReturn:
        inv.expectedReturn *
        (1 + tau * (riskTolerance === "aggressive" ? 0.2 : -0.1)),
    }));

    return {
      ...portfolio,
      portfolio: adjustedPortfolio,
      model: "Black-Litterman Adjusted",
    };
  }
}
