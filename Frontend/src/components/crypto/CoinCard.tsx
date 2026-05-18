import type { Coin } from "../../services/crypto.service";

type Props = {
  coin: Coin;
  currencySymbol: string;
};

const CoinCard = ({ coin, currencySymbol }: Props) => {
  const change = coin.price_change_percentage_24h ?? 0;
  const positive = change >= 0;

  return (
    <article
      className="
        group relative overflow-hidden rounded-[30px]
        border border-white/10 bg-white/4 p-6
        backdrop-blur-xl transition-all duration-300
        hover:-translate-y-2 hover:border-blue-500/40 hover:shadow-xl
      "
    >
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={coin.image} alt={coin.name} className="h-10 w-10" />
          <div>
            <h3 className="text-lg font-bold">{coin.name}</h3>
            <p className="text-sm text-white/50 uppercase">{coin.symbol}</p>
          </div>
        </div>

        <div
          className={`px-3 py-1 rounded-full text-sm font-bold ${
            positive
              ? "text-green-400 bg-green-500/10"
              : "text-red-400 bg-red-500/10"
          }`}
        >
          {positive ? "+" : ""}
          {change.toFixed(2)}%
        </div>
      </div>

      {/* PRICE */}
      <div>
        <p className="text-sm text-white/40">Price</p>
        <h2 className="text-3xl font-bold">
          {currencySymbol}
          {coin.current_price.toLocaleString()}
        </h2>
      </div>
    </article>
  );
};

export default CoinCard;
