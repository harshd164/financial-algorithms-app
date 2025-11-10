// Client-side 0-1 Knapsack implementation for demonstration
export const knapsack = (capacity, items) => {
  const n = items.length;
  const dp = Array(n + 1)
    .fill()
    .map(() => Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (items[i - 1].amount <= w) {
        dp[i][w] = Math.max(
          dp[i - 1][w],
          dp[i - 1][w - items[i - 1].amount] + items[i - 1].priority
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  return dp[n][capacity];
};
