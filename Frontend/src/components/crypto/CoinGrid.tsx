import type { Coin } from "../../services/crypto.service";
import CoinCard from "./CoinCard";

type Props = {
  coins: Coin[];
  currencySymbol: string;
};

const CoinGrid = ({ coins, currencySymbol }: Props) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {coins.map((coin) => (
        <CoinCard key={coin.id} coin={coin} currencySymbol={currencySymbol} />
      ))}
    </div>
  );
};

export default CoinGrid;
