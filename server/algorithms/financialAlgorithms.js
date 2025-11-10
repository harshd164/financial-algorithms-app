export class FinancialAlgorithms {
  // 0-1 Knapsack for Budget Optimization
  static budgetOptimization(income, expenses, priorities) {
    const n = expenses.length;
    const dp = Array(n + 1)
      .fill()
      .map(() => Array(income + 1).fill(0));

    for (let i = 1; i <= n; i++) {
      for (let w = 0; w <= income; w++) {
        if (expenses[i - 1].amount <= w) {
          dp[i][w] = Math.max(
            dp[i - 1][w],
            dp[i - 1][w - expenses[i - 1].amount] + priorities[i - 1]
          );
        } else {
          dp[i][w] = dp[i - 1][w];
        }
      }
    }

    // Backtrack to find optimal allocation
    let w = income;
    const allocation = [];
    const remainingExpenses = [];

    for (let i = n; i > 0; i--) {
      if (dp[i][w] !== dp[i - 1][w]) {
        allocation.push({ ...expenses[i - 1], allocated: true });
        w -= expenses[i - 1].amount;
      } else {
        remainingExpenses.push({ ...expenses[i - 1], allocated: false });
      }
    }

    return {
      allocation,
      remainingExpenses,
      totalUtilized: income - w,
      efficiency: (((income - w) / income) * 100).toFixed(2),
      remainingBudget: w,
    };
  }

  // Fractional Knapsack for Tax Saving Investments
  static taxSavingOptimization(capital, investments, taxSlab) {
    const calculateTaxSaving = (investment, slab) => {
      const baseSaving =
        investment.deduction * investment.amount * (slab / 100);
      const additionalReturns = investment.returns * investment.amount;
      return baseSaving + additionalReturns;
    };

    const enhancedInvestments = investments.map((inv) => ({
      ...inv,
      ratio: calculateTaxSaving(inv, taxSlab) / inv.amount,
    }));

    // Sort by efficiency ratio
    enhancedInvestments.sort((a, b) => b.ratio - a.ratio);

    let remainingCapital = capital;
    const portfolio = [];
    let totalTaxSaving = 0;

    for (const inv of enhancedInvestments) {
      if (inv.amount <= remainingCapital) {
        portfolio.push({ ...inv, allocated: inv.amount });
        remainingCapital -= inv.amount;
        totalTaxSaving += calculateTaxSaving(inv, taxSlab);
      } else if (remainingCapital > 0) {
        const fraction = remainingCapital / inv.amount;
        const allocatedAmount = remainingCapital;
        portfolio.push({
          ...inv,
          allocated: allocatedAmount,
          ratio: inv.ratio * fraction,
        });
        totalTaxSaving += calculateTaxSaving(inv, taxSlab) * fraction;
        remainingCapital = 0;
      }
    }

    return {
      portfolio,
      totalTaxSaving: Math.round(totalTaxSaving),
      capitalUtilized: capital - remainingCapital,
      recommendation: this.getTaxRecommendation(taxSlab, totalTaxSaving),
    };
  }

  // Dijkstra-like algorithm for Savings Goal Planning
  static savingsPathOptimization(currentWealth, goals, monthlySavings) {
    if (!goals || goals.length === 0) return [];

    // Calculate months to achieve each goal
    const goalCalculations = goals.map((goal, index) => ({
      ...goal,
      id: `goal_${index}`,
      months: Math.ceil((goal.amount - currentWealth) / monthlySavings),
      weight: (goal.priority * goal.amount) / monthlySavings,
    }));

    // Sort by weight (priority/amount ratio)
    goalCalculations.sort((a, b) => a.weight - b.weight);

    return goalCalculations;
  }

  // EMI Calculator
  static calculateEMI(principal, rate, tenure) {
    const monthlyRate = rate / 12 / 100;
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1);

    const totalPayment = emi * tenure;
    const totalInterest = totalPayment - principal;

    return {
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      breakdown: Array.from({ length: tenure }, (_, i) => ({
        month: i + 1,
        principal: Math.round(
          (principal * monthlyRate * Math.pow(1 + monthlyRate, i)) /
            (Math.pow(1 + monthlyRate, tenure) - 1)
        ),
        interest: Math.round(
          emi -
            (principal * monthlyRate * Math.pow(1 + monthlyRate, i)) /
              (Math.pow(1 + monthlyRate, tenure) - 1)
        ),
      })),
    };
  }

  static getTaxRecommendation(taxSlab, totalSaving) {
    const recommendations = {
      5: "Consider ELSS and PPF for long-term growth with tax benefits under Section 80C",
      20: "Maximize 80C benefits with ELSS, PPF, and consider NPS for additional 50K deduction",
      30: "Aggressive tax planning recommended: Utilize all 80C, 80D, HRA, and NPS benefits",
    };
    return (
      recommendations[taxSlab] ||
      "Consult tax advisor for personalized planning"
    );
  }
}
