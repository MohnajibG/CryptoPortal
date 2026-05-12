import React, { useEffect, useMemo, useState, type JSX } from "react";

/**
 * Page Comparisons.tsx
 * - Récupère une liste de crypto-monnaies (CoinGecko public API)
 * - Permet de sélectionner plusieurs monnaies et de les comparer côte-à-côte
 * - Table de comparaison responsive et recherche
 *
 * Déposer ce fichier dans: /src/pages/Comparisons.tsx
 */

/* Types pour les données retournées par CoinGecko */
type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank?: number;
  total_volume: number;
  circulating_supply?: number;
  price_change_percentage_24h?: number;
  last_updated?: string;
};

const COINGECKO_MARKETS_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false";

const styles: { [k: string]: React.CSSProperties } = {
  container: {
    padding: 20,
    fontFamily: "Inter, Roboto, system-ui, -apple-system, 'Segoe UI', Arial",
    color: "#0f172a",
    maxWidth: 1200,
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  title: { fontSize: 20, fontWeight: 700 },
  controls: { display: "flex", gap: 8, alignItems: "center" },
  input: {
    padding: "8px 10px",
    borderRadius: 8,
    border: "1px solid #e5e7eb",
    minWidth: 220,
  },
  listWrapper: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    gap: 20,
  },
  coinList: {
    border: "1px solid #e6e9ef",
    borderRadius: 10,
    padding: 12,
    maxHeight: 560,
    overflow: "auto",
    background: "#fff",
  },
  coinRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 6px",
    borderRadius: 8,
    cursor: "pointer",
  },
  coinRowHover: { background: "#f8fafc" },
  coinInfo: { display: "flex", gap: 8, alignItems: "center" },
  coinImg: { width: 28, height: 28, borderRadius: 999 },
  selectNote: { fontSize: 13, color: "#64748b" },
  compareArea: {
    border: "1px solid #e6e9ef",
    borderRadius: 10,
    padding: 12,
    background: "#fff",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: 600,
  },
  th: {
    textAlign: "left",
    padding: "10px 8px",
    borderBottom: "1px solid #edf2f7",
    background: "#fafafa",
    fontSize: 13,
    color: "#111827",
  },
  td: { padding: "10px 8px", borderBottom: "1px solid #f1f5f9", fontSize: 14 },
  smallMuted: { fontSize: 12, color: "#6b7280" },
  pill: {
    padding: "6px 8px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
  },
  positive: { color: "#059669", background: "rgba(5,150,105,0.06)" },
  negative: { color: "#ef4444", background: "rgba(239,68,68,0.06)" },
  clearBtn: {
    background: "transparent",
    border: "1px solid #e5e7eb",
    padding: "8px 10px",
    borderRadius: 8,
    cursor: "pointer",
  },
};

const formatNumber = (n?: number) =>
  typeof n !== "number"
    ? "—"
    : n >= 1_000_000_000
      ? (n / 1_000_000_000).toFixed(2) + "B"
      : n >= 1_000_000
        ? (n / 1_000_000).toFixed(2) + "M"
        : n >= 1000
          ? (n / 1000).toFixed(1) + "k"
          : n.toLocaleString();

export default function Comparisons(): JSX.Element {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [highlighted, setHighlighted] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    fetch(COINGECKO_MARKETS_URL)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: Coin[]) => {
        if (!mounted) return;
        setCoins(data);
        setLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(String(err.message || err));
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return coins;
    return coins.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.symbol.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q),
    );
  }, [coins, query]);

  function toggleSelect(id: string) {
    setSelectedIds(
      (prev) =>
        prev.includes(id)
          ? prev.filter((x) => x !== id)
          : [...prev, id].slice(-6), // limit to last 6 selected
    );
  }

  function clearSelection() {
    setSelectedIds([]);
  }

  const selectedCoins = useMemo(
    () => coins.filter((c) => selectedIds.includes(c.id)),
    [coins, selectedIds],
  );

  const highlightStyle = (pct?: number) =>
    pct === undefined
      ? {}
      : pct > 0
        ? { ...styles.pill, ...styles.positive }
        : { ...styles.pill, ...styles.negative };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <div style={styles.title}>Comparaison de cryptos</div>
          <div style={styles.selectNote}>
            Sélectionnez jusqu'à 6 cryptomonnaies pour comparer
          </div>
        </div>

        <div style={styles.controls}>
          <input
            aria-label="Rechercher une crypto"
            style={styles.input}
            placeholder="Rechercher (ex: bitcoin, eth)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={clearSelection}
            title="Effacer la sélection"
            style={styles.clearBtn}
            aria-label="Effacer la sélection"
          >
            Effacer
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: 20 }}>Chargement…</div>
      ) : error ? (
        <div style={{ padding: 20, color: "#ef4444" }}>Erreur: {error}</div>
      ) : (
        <div style={styles.listWrapper}>
          <div style={styles.coinList} aria-live="polite">
            {filtered.length === 0 && (
              <div style={{ padding: 8 }}>Aucun résultat</div>
            )}
            {filtered.map((coin) => {
              const isSelected = selectedIds.includes(coin.id);
              return (
                <div
                  key={coin.id}
                  onMouseEnter={() => setHighlighted(coin.id)}
                  onMouseLeave={() => setHighlighted(null)}
                  style={{
                    ...styles.coinRow,
                    ...(highlighted === coin.id ? styles.coinRowHover : {}),
                    background: isSelected ? "#f1f5f9" : undefined,
                    marginBottom: 6,
                  }}
                  role="button"
                  onClick={() => toggleSelect(coin.id)}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelect(coin.id)}
                    aria-label={`Sélectionner ${coin.name}`}
                    style={{ marginLeft: 6 }}
                  />
                  <div style={styles.coinInfo}>
                    <img
                      src={coin.image}
                      alt={coin.name}
                      style={styles.coinImg}
                    />
                    <div>
                      <div style={{ fontWeight: 600 }}>{coin.name}</div>
                      <div style={styles.smallMuted}>
                        {coin.symbol.toUpperCase()} • #
                        {coin.market_cap_rank ?? "—"}
                      </div>
                    </div>
                  </div>
                  <div style={{ marginLeft: "auto", textAlign: "right" }}>
                    <div style={{ fontWeight: 700 }}>
                      ${coin.current_price.toLocaleString()}
                    </div>
                    <div style={styles.smallMuted}>
                      {formatNumber(coin.market_cap)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={styles.compareArea}>
            {selectedCoins.length === 0 ? (
              <div style={{ padding: 18, color: "#64748b" }}>
                Aucune crypto sélectionnée — cochez des éléments dans la liste
                pour comparer.
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Attribut</th>
                      {selectedCoins.map((c) => (
                        <th key={c.id} style={styles.th}>
                          <div
                            style={{
                              display: "flex",
                              gap: 8,
                              alignItems: "center",
                            }}
                          >
                            <img
                              src={c.image}
                              alt={c.name}
                              style={styles.coinImg}
                            />
                            <div>
                              <div style={{ fontWeight: 700 }}>{c.name}</div>
                              <div style={styles.smallMuted}>
                                {c.symbol.toUpperCase()}
                              </div>
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td style={styles.td}>Prix (USD)</td>
                      {selectedCoins.map((c) => (
                        <td key={c.id} style={styles.td}>
                          <div style={{ fontWeight: 700 }}>
                            ${c.current_price.toLocaleString()}
                          </div>
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td style={styles.td}>Market Cap</td>
                      {selectedCoins.map((c) => (
                        <td key={c.id} style={styles.td}>
                          ${formatNumber(c.market_cap)}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td style={styles.td}>Volume 24h</td>
                      {selectedCoins.map((c) => (
                        <td key={c.id} style={styles.td}>
                          ${formatNumber(c.total_volume)}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td style={styles.td}>Circulating Supply</td>
                      {selectedCoins.map((c) => (
                        <td key={c.id} style={styles.td}>
                          {c.circulating_supply
                            ? formatNumber(c.circulating_supply)
                            : "—"}
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td style={styles.td}>Chg 24h</td>
                      {selectedCoins.map((c) => (
                        <td key={c.id} style={styles.td}>
                          <span
                            style={highlightStyle(
                              c.price_change_percentage_24h,
                            )}
                          >
                            {c.price_change_percentage_24h === undefined
                              ? "—"
                              : `${c.price_change_percentage_24h.toFixed(2)}%`}
                          </span>
                        </td>
                      ))}
                    </tr>

                    <tr>
                      <td style={styles.td}>Dernière mise à jour</td>
                      {selectedCoins.map((c) => (
                        <td key={c.id} style={styles.td}>
                          <div style={styles.smallMuted}>
                            {c.last_updated
                              ? new Date(c.last_updated).toLocaleString()
                              : "—"}
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>

                <div
                  style={{
                    marginTop: 12,
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                  }}
                >
                  <div style={styles.smallMuted}>
                    Comparaison de {selectedCoins.length} élément
                    {selectedCoins.length > 1 ? "s" : ""}
                  </div>
                  <button
                    onClick={() => {
                      // trier la sélection par market cap décroissante
                      const sorted = [...selectedIds].sort((a, b) => {
                        const A = coins.find((c) => c.id === a);
                        const B = coins.find((c) => c.id === b);
                        return (B?.market_cap ?? 0) - (A?.market_cap ?? 0);
                      });
                      setSelectedIds(sorted);
                    }}
                    style={styles.clearBtn}
                  >
                    Trier par market cap
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
