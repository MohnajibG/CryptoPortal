import { useEffect, useState, type JSX } from "react";

type Article = {
  id?: string;
  title: string;
  url?: string;
  source?: string;
  summary?: string;
  publishedAt?: string;
  image?: string;
};

const SAMPLE_ARTICLES: Article[] = [
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

  // Configure your public API endpoint in env:
  // NEXT_PUBLIC_NEWS_API_URL or REACT_APP_NEWS_API_URL
  const API_URL =
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

      if (!API_URL) {
        // Pas d'API configurée : utiliser des articles d'exemple
        setTimeout(() => {
          if (!mounted) return;
          setArticles(SAMPLE_ARTICLES);
          setLoading(false);
        }, 300);
        return;
      }

      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        // Attendez-vous à un tableau d'articles, sinon adaptatez cette extraction
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
          setArticles(SAMPLE_ARTICLES);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchNews();
    return () => {
      mounted = false;
    };
  }, [API_URL]);

  const filtered = articles.filter((a) =>
    [a.title, a.summary, a.source]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  return (
    <div
      style={{
        padding: 20,
        fontFamily: "Inter, Roboto, sans-serif",
        maxWidth: 1000,
        margin: "0 auto",
      }}
    >
      <header style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0 }}>Actualités crypto</h1>
        <p style={{ color: "#666", marginTop: 6 }}>
          Dernières nouvelles du marché crypto. Source :{" "}
          {API_URL ? API_URL : "exemples locaux"}
        </p>
      </header>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          aria-label="Rechercher"
          placeholder="Rechercher un mot-clé..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #ddd",
            outline: "none",
          }}
        />
        <button
          onClick={() => {
            setQuery("");
          }}
          style={{
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #ddd",
            background: "#fff",
            cursor: "pointer",
          }}
        >
          Effacer
        </button>
      </div>

      {loading && <p>Chargement…</p>}
      {error && (
        <p style={{ color: "crimson" }}>
          Erreur : {error} — affichage des articles d'exemple.
        </p>
      )}

      <main>
        {filtered.length === 0 && !loading ? (
          <p>Aucun article trouvé.</p>
        ) : (
          filtered.map((a) => (
            <article
              key={a.id ?? a.title}
              style={{
                display: "flex",
                gap: 12,
                padding: 12,
                border: "1px solid #eee",
                borderRadius: 8,
                marginBottom: 12,
                alignItems: "flex-start",
                background: "#fff",
              }}
            >
              <div
                style={{
                  width: 96,
                  height: 64,
                  background: "#f5f5f7",
                  borderRadius: 6,
                  flexShrink: 0,
                }}
              >
                {a.image ? (
                  <img
                    src={a.image}
                    alt={a.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: 6,
                    }}
                  />
                ) : null}
              </div>

              <div style={{ flex: 1 }}>
                <a
                  href={a.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#0b5fff",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  {a.title}
                </a>
                <div style={{ color: "#666", fontSize: 13, marginTop: 6 }}>
                  <span>{a.source ?? "Source inconnue"}</span>
                  <span style={{ marginLeft: 8 }}>
                    • {timeAgo(a.publishedAt)}
                  </span>
                </div>
                {a.summary ? <p style={{ marginTop: 8 }}>{a.summary}</p> : null}
              </div>
            </article>
          ))
        )}
      </main>
    </div>
  );
}
