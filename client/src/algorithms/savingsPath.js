// Savings Path Algorithm - Dijkstra-like implementation for goal planning
export class SavingsPath {
  static findOptimalPath(currentWealth, goals, monthlySavings) {
    if (!goals || goals.length === 0) return [];

    // Calculate time to achieve each goal independently
    const goalMetrics = goals.map((goal, index) => {
      const monthsNeeded = Math.max(
        1,
        Math.ceil((goal.amount - currentWealth) / monthlySavings)
      );
      const urgency = goal.priority / monthsNeeded;

      return {
        ...goal,
        id: index,
        monthsNeeded,
        urgency,
        completionTime: monthsNeeded,
      };
    });

    // Sort by urgency (priority per month)
    goalMetrics.sort((a, b) => b.urgency - a.urgency);

    // Calculate cumulative timeline
    let currentTime = 0;
    const path = goalMetrics.map((goal) => {
      const startMonth = currentTime;
      currentTime += goal.monthsNeeded;

      return {
        ...goal,
        startMonth,
        endMonth: currentTime,
        timeline: `${startMonth + 1}-${currentTime} months`,
      };
    });

    return path;
  }

  // Alternative: Resource-constrained scheduling
  static resourceConstrainedSchedule(goals, monthlySavings, currentWealth) {
    const sortedGoals = [...goals].sort((a, b) => {
      // Sort by priority first, then by amount
      if (b.priority !== a.priority) {
        return b.priority - a.priority;
      }
      return a.amount - b.amount;
    });

    let remainingWealth = currentWealth;
    const schedule = [];
    let timeline = 0;

    for (const goal of sortedGoals) {
      const monthsRequired = Math.ceil(
        (goal.amount - remainingWealth) / monthlySavings
      );
      if (monthsRequired > 0) {
        schedule.push({
          ...goal,
          startMonth: timeline,
          monthsRequired,
          endMonth: timeline + monthsRequired,
        });
        timeline += monthsRequired;
        remainingWealth += monthsRequired * monthlySavings - goal.amount;
      }
    }

    return schedule;
  }
}
