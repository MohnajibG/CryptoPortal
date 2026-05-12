import CoinCardSkeleton from "./CoinCardSkeleton";

const CoinGridSkeleton = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <CoinCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default CoinGridSkeleton;
