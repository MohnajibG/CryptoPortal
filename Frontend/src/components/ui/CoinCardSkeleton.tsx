const CoinCardSkeleton = () => {
  return (
    <div
      className="
        animate-pulse
        rounded-[30px]
        border border-white/10
        bg-white/5
        p-6
        backdrop-blur-xl
      "
    >
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-white/10" />

          <div className="space-y-2">
            <div className="h-4 w-24 rounded bg-white/10" />
            <div className="h-3 w-16 rounded bg-white/10" />
          </div>
        </div>

        <div className="h-6 w-14 rounded-full bg-white/10" />
      </div>

      {/* PRICE */}
      <div className="space-y-3">
        <div className="h-3 w-20 rounded bg-white/10" />
        <div className="h-8 w-32 rounded bg-white/10" />
      </div>
    </div>
  );
};

export default CoinCardSkeleton;
