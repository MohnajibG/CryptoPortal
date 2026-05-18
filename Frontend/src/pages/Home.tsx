import { useEffect, useState, type JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";

import CoinGrid from "../components/crypto/CoinGrid";
import { fetchCoins } from "../services/crypto.service";
import type { Coin } from "../services/crypto.service";

type Currency = "usd" | "eur";

export default function Home(): JSX.Element {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [query, setQuery] = useState("");
  const [currency, setCurrency] = useState<Currency>("usd");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchCoins(currency);

        if (!cancelled) setCoins(data);
      } catch (err: unknown) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "API Error");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [currency]);

  const filtered = coins.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.symbol.toLowerCase().includes(query.toLowerCase()),
  );

  const symbol = currency === "eur" ? "€" : "$";

  return (
    <main className="min-h-screen bg-[#070A12] text-white relative overflow-hidden">
      {/* glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#6366F1_0%,transparent_40%)] opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#22D3EE_0%,transparent_45%)] opacity-10" />

      <div className="relative mx-auto max-w-7xl px-6 py-10">
        {/* HEADER */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h1 className="text-4xl font-black tracking-tight">
              Crypto Portal
            </h1>
            <p className="text-white/50 mt-1">Live crypto market analytics</p>
          </div>

          {/* currency switch */}
          <div className="flex rounded-2xl border border-white/10 bg-white/5 p-1 backdrop-blur-xl">
            {(["usd", "eur"] as Currency[]).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`
                  px-5 py-2 rounded-xl text-sm font-semibold transition
                  ${
                    currency === c
                      ? "bg-[#6366F1] shadow-lg shadow-indigo-500/30"
                      : "text-white/60 hover:text-white"
                  }
                `}
              >
                {c.toUpperCase()}
              </button>
            ))}
          </div>
        </motion.header>

        {/* SEARCH */}
        <div className="mt-10">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Bitcoin, Ethereum..."
            className="
              w-full md:max-w-lg
              rounded-2xl
              border border-white/10
              bg-white/5
              px-5 py-4
              text-white
              placeholder:text-white/30
              outline-none
              focus:border-[#6366F1]
              focus:ring-2 focus:ring-[#6366F1]/30
              backdrop-blur-xl
            "
          />
        </div>

        {/* ERROR */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-300"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* LOADER */}
        {loading ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-44 animate-pulse rounded-2xl bg-white/5 border border-white/10"
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10"
          >
            <CoinGrid coins={filtered} currencySymbol={symbol} />
          </motion.div>
        )}

        {!loading && filtered.length === 0 && (
          <p className="mt-10 text-center text-white/40">No results found</p>
        )}
      </div>
    </main>
  );
}
