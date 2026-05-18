export const analyzeNews = (coins) => {
  const gainers = coins.filter((c) => c.price_change_percentage_24h > 0);
  const losers = coins.filter((c) => c.price_change_percentage_24h < 0);

  let sentiment = "Neutral";

  if (gainers.length > losers.length) sentiment = "Bullish";
  if (losers.length > gainers.length) sentiment = "Bearish";

  const summary = `
Top market movement:
- Gainers: ${gainers
    .map((c) => c.name)
    .slice(0, 3)
    .join(", ")}
- Losers: ${losers
    .map((c) => c.name)
    .slice(0, 3)
    .join(", ")}
  `.trim();

  return {
    sentiment,
    score: Math.min(10, Math.max(0, 5 + (gainers.length - losers.length))),
    summary,
  };
};
