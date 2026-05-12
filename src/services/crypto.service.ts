export type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number | null;
};

export const fetchCoins = async (currency: string): Promise<Coin[]> => {
  const res = await fetch(
    `/api/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=1&sparkline=false`,
  );

  if (!res.ok) {
    throw new Error(`API Error ${res.status}`);
  }

  return res.json();
};
