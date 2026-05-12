import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchDapps, type Dapp } from "../services/defillama";
import WalletButton from "../components/ui/Button";

type Sort = "tvl" | "name";

export default function BlockchainApps() {
  const [apps, setApps] = useState<Dapp[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("tvl");
  const [favorites, setFavorites] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem("fav_dapps") || "[]"),
  );

  // 🔥 Load API
  useEffect(() => {
    fetchDapps()
      .then(setApps)
      .finally(() => setLoading(false));
  }, []);

  // ⭐ toggle favoris
  const toggleFav = (id: string) => {
    const updated = favorites.includes(id)
      ? favorites.filter((f) => f !== id)
      : [...favorites, id];

    setFavorites(updated);
    localStorage.setItem("fav_dapps", JSON.stringify(updated));
  };

  // 🧠 filter + sort
  const filtered = useMemo(() => {
    const q = query.toLowerCase();

    return [...apps]
      .filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.category?.toLowerCase().includes(q),
      )
      .sort((a, b) => {
        if (sort === "tvl") return (b.tvl ?? 0) - (a.tvl ?? 0);
        return a.name.localeCompare(b.name);
      });
  }, [apps, query, sort]);

  return (
    <main className="min-h-screen bg-linear-to-b from-black via-gray-950 to-black text-white px-6 py-10">
      {/* HEADER */}
      <header className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold">Blockchain Apps</h1>
          <p className="text-gray-400 text-sm">
            Explore DeFi protocols & dApps
          </p>
        </div>

        {/* 🔗 wallet */}
        <WalletButton />
      </header>

      {/* CONTROLS */}
      <div className="flex flex-col md:flex-row gap-3 mb-8">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search dApps..."
          className="flex-1 bg-gray-900 border border-gray-800 px-4 py-2 rounded-lg"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as Sort)}
          className="bg-gray-900 border border-gray-800 px-4 py-2 rounded-lg"
        >
          <option value="tvl">Top TVL</option>
          <option value="name">Name</option>
        </select>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-32 rounded-xl bg-gray-900 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* GRID */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filtered.map((app) => {
            const isFav = favorites.includes(app.id);

            return (
              <div
                key={app.id}
                className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-indigo-500 transition"
              >
                {/* HEADER */}
                <div className="flex justify-between items-start">
                  <Link
                    to={`/dapp/${app.id}`}
                    className="text-lg font-bold hover:text-indigo-400"
                  >
                    {app.name}
                  </Link>

                  <button onClick={() => toggleFav(app.id)} className="text-xl">
                    {isFav ? "⭐" : "☆"}
                  </button>
                </div>

                {/* CATEGORY */}
                <p className="text-xs text-gray-500 mt-1">
                  {app.category || "Unknown"}
                </p>

                {/* TVL */}
                <p className="mt-3 text-sm text-gray-300">
                  TVL:{" "}
                  <span className="text-white font-semibold">
                    ${(app.tvl ?? 0).toLocaleString()}
                  </span>
                </p>

                {/* LINK */}
                {app.url && (
                  <a
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-indigo-400 text-sm"
                  >
                    Visit →
                  </a>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* EMPTY */}
      {!loading && filtered.length === 0 && (
        <p className="text-gray-500 mt-10">No apps found.</p>
      )}
    </main>
  );
}
