import { useEffect, useMemo, useState, type JSX } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Article = {
  id?: string;
  title: string;
  url?: string;
  source?: string;
  summary?: string;
  publishedAt?: string;
  image?: string;
};

const sampleArticles: Article[] = [
  {
    id: "1",
    title: "Bitcoin dépasse les 60k USD — Analyse du marché",
    url: "#",
    source: "CryptoNews",
    summary:
      "Le cours du Bitcoin a franchi un nouveau palier après des volumes d'échange en hausse. Les analystes évoquent une possible consolidation.",
    publishedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Ethereum : mise à jour du réseau et implications",
    url: "#",
    source: "EtherTimes",
    summary:
      "La dernière mise à jour du réseau Ethereum réduit les frais moyens et prépare le terrain pour de nouvelles dApps.",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: "3",
    title: "DeFi : les protocoles renforcent leurs outils de risk management",
    url: "#",
    source: "DeFi Brief",
    summary:
      "Les plateformes de lending et de staking multiplient les alertes de liquidation et les dashboards de transparence.",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
  },
];

function timeAgo(iso?: string) {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  if (minutes < 1) return "à l'instant";
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} h`;
  const days = Math.floor(hours / 24);
  return `${days} j`;
}

export default function News(): JSX.Element {
  const [articles, setArticles] = useState<Article[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiUrl =
    typeof process !== "undefined"
      ? process.env.NEXT_PUBLIC_NEWS_API_URL ||
        process.env.REACT_APP_NEWS_API_URL ||
        ""
      : "";

  useEffect(() => {
    let mounted = true;

    async function fetchNews() {
      setLoading(true);
      setError(null);

      if (!apiUrl) {
        window.setTimeout(() => {
          if (!mounted) return;
          setArticles(sampleArticles);
          setLoading(false);
        }, 300);
        return;
      }

      try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const items: Article[] = Array.isArray(data)
          ? data
          : data.articles || data.results || [];

        if (mounted) setArticles(items);
      } catch (err: unknown) {
        if (mounted) {
          const message =
            err instanceof Error
              ? err.message
              : String(err ?? "Erreur lors de la récupération des news");
          setError(message);
          setArticles(sampleArticles);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchNews();
    return () => {
      mounted = false;
    };
  }, [apiUrl]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();

    return articles.filter((article) =>
      [article.title, article.summary, article.source]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [articles, query]);

  const featured = filtered[0];
  const secondaryArticles = filtered.slice(1);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070A12] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#6366F1_0%,transparent_40%)] opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#22D3EE_0%,transparent_45%)] opacity-10" />

      <div className="relative mx-auto max-w-7xl px-6 py-10">
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-300">
              Market news
            </p>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">
              Actualités crypto
            </h1>
            <p className="mt-4 max-w-2xl text-white/50">
              Suivez les mouvements de marché, les mises à jour protocoles et
              les signaux utiles avant de prendre une décision.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.16em] text-white/40">
              Source
            </p>
            <p className="mt-1 max-w-xs truncate text-sm font-semibold">
              {apiUrl || "Articles locaux"}
            </p>
          </div>
        </motion.header>

        <section className="mt-10 flex flex-col gap-3 md:flex-row">
          <input
            aria-label="Rechercher"
            placeholder="Rechercher Bitcoin, Ethereum, DeFi..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="
              w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4
              text-white outline-none backdrop-blur-xl
              placeholder:text-white/30
              focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/30
            "
          />
          <button
            onClick={() => setQuery("")}
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-white/70 transition hover:text-white md:w-auto"
          >
            Effacer
          </button>
        </section>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-300"
            >
              Erreur : {error} — affichage des articles d'exemple.
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="h-80 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-28 animate-pulse rounded-2xl border border-white/10 bg-white/5"
                />
              ))}
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <p className="mt-10 text-center text-white/40">
            Aucun article trouvé.
          </p>
        ) : (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
          >
            {featured && (
              <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
                <div className="aspect-video bg-white/5">
                  {featured.image ? (
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_center,#6366F1_0%,transparent_65%)] text-6xl font-black text-white/20">
                      NEWS
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-white/45">
                    <span className="rounded-full bg-indigo-500/15 px-3 py-1 font-bold text-indigo-200">
                      Featured
                    </span>
                    <span>{featured.source ?? "Source inconnue"}</span>
                    <span>• {timeAgo(featured.publishedAt)}</span>
                  </div>
                  <a
                    href={featured.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl font-black leading-tight transition hover:text-indigo-200"
                  >
                    {featured.title}
                  </a>
                  {featured.summary && (
                    <p className="mt-4 leading-7 text-white/55">
                      {featured.summary}
                    </p>
                  )}
                </div>
              </article>
            )}

            <div className="space-y-4">
              {secondaryArticles.map((article) => (
                <article
                  key={article.id ?? article.title}
                  className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition hover:border-indigo-400/60 hover:bg-white/10"
                >
                  <div className="h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-white/5">
                    {article.image ? (
                      <img
                        src={article.image}
                        alt={article.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-indigo-500/10 text-xs font-black text-indigo-200">
                        NEWS
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <a
                      href={article.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold leading-snug transition hover:text-indigo-200"
                    >
                      {article.title}
                    </a>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs text-white/40">
                      <span>{article.source ?? "Source inconnue"}</span>
                      <span>• {timeAgo(article.publishedAt)}</span>
                    </div>
                    {article.summary && (
                      <p className="mt-2 line-clamp-2 text-sm text-white/50">
                        {article.summary}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </main>
  );
}
