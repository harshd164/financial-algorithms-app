// Tax Optimization Algorithm - Fractional Knapsack implementation
export class TaxOptimizer {
  static optimizeTaxSavings(capital, investments, taxSlab) {
    // Calculate efficiency for each investment
    const investmentsWithEfficiency = investments.map((inv) => {
      const taxSaving = inv.amount * inv.deduction * (taxSlab / 100);
      const futureValue = inv.amount * (1 + inv.returns);
      const totalBenefit = taxSaving + futureValue;
      const efficiency = totalBenefit / inv.amount;

      return {
        ...inv,
        taxSaving,
        futureValue,
        totalBenefit,
        efficiency,
      };
    });

    // Sort by efficiency (descending)
    investmentsWithEfficiency.sort((a, b) => b.efficiency - a.efficiency);

    let remainingCapital = capital;
    const portfolio = [];
    let totalTaxSaved = 0;
    let totalFutureValue = 0;

    // Allocate capital using fractional knapsack
    for (const inv of investmentsWithEfficiency) {
      if (remainingCapital <= 0) break;

      if (inv.amount <= remainingCapital) {
        // Take entire investment
        portfolio.push({
          ...inv,
          allocatedAmount: inv.amount,
          fraction: 1,
          actualTaxSaving: inv.taxSaving,
          actualFutureValue: inv.futureValue,
        });
        remainingCapital -= inv.amount;
        totalTaxSaved += inv.taxSaving;
        totalFutureValue += inv.futureValue;
      } else {
        // Take fractional investment
        const fraction = remainingCapital / inv.amount;
        portfolio.push({
          ...inv,
          allocatedAmount: remainingCapital,
          fraction,
          actualTaxSaving: inv.taxSaving * fraction,
          actualFutureValue: inv.futureValue * fraction,
        });
        totalTaxSaved += inv.taxSaving * fraction;
        totalFutureValue += inv.futureValue * fraction;
        remainingCapital = 0;
      }
    }

    return {
      portfolio,
      totalTaxSaved: Math.round(totalTaxSaved),
      totalFutureValue: Math.round(totalFutureValue),
      capitalUtilized: capital - remainingCapital,
      remainingCapital,
      efficiency: (((capital - remainingCapital) / capital) * 100).toFixed(2),
    };
  }

  // Get tax recommendation based on slab
  static getTaxRecommendation(taxSlab, totalSaving) {
    const recommendations = {
      5: {
        message:
          "Focus on long-term wealth building with ELSS and PPF. Consider starting early with retirement planning.",
        topInvestments: ["ELSS Mutual Funds", "PPF", "NPS"],
        tips: [
          "Utilize Section 80C fully with ₹1.5L investment",
          "Consider health insurance under Section 80D",
          "Start retirement planning early for compounding benefits",
        ],
      },
      20: {
        message:
          "Maximize 80C benefits and explore additional deductions under 80D and NPS.",
        topInvestments: ["ELSS", "PPF", "NPS", "Health Insurance"],
        tips: [
          "Utilize full ₹1.5L under Section 80C",
          "Additional ₹50,000 deduction available under NPS",
          "Health insurance premiums deductible under Section 80D",
        ],
      },
      30: {
        message:
          "Aggressive tax planning recommended. Utilize all available deductions including HRA, 80C, 80D, and NPS.",
        topInvestments: ["ELSS", "PPF", "NPS", "ULIP", "Tax-saving FDs"],
        tips: [
          "Maximize ₹1.5L under Section 80C",
          "Additional ₹50,000 under Section 80CCD(1B) for NPS",
          "Health insurance up to ₹25,000 under Section 80D",
          "Consider home loan interest deductions",
        ],
      },
    };

    return (
      recommendations[taxSlab] || {
        message:
          "Consult a tax advisor for personalized planning based on your income structure.",
        topInvestments: ["ELSS", "PPF", "NPS"],
        tips: [
          "Review all available deductions",
          "Consider long-term financial goals",
        ],
      }
    );
  }
}
