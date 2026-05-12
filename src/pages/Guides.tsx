import React, { useMemo, useState, type JSX } from "react";

type Difficulty = "Débutant" | "Intermédiaire" | "Avancé";

type Guide = {
  id: string;
  title: string;
  description: string;
  content?: string;
  tags: string[];
  difficulty: Difficulty;
  updatedAt: string; // ISO date
};

const SAMPLE_GUIDES: Guide[] = [
  {
    id: "intro",
    title: "Introduction à la crypto",
    description:
      "Comprendre les fondamentaux : blockchain, clés publiques/privées, comment débuter en toute sécurité.",
    content:
      "Ce guide couvre les notions de base : qu'est-ce qu'une blockchain, comment fonctionnent les transactions, comment choisir un portefeuille (custodial vs non-custodial) et les premières bonnes pratiques pour acheter et conserver des actifs numériques.",
    tags: ["basics"],
    difficulty: "Débutant",
    updatedAt: "2025-01-10",
  },
  {
    id: "wallet-security",
    title: "Sécurité des portefeuilles",
    description:
      "Meilleures pratiques pour sécuriser vos fonds : hardware wallets, seed phrases, phishing, et gestion des sauvegardes.",
    content:
      "Détaillé : configuration d'un hardware wallet, sauvegarde sécurisée de la seed phrase, détection des scams et conseils pour réduire les risques de perte.",
    tags: ["sécurité"],
    difficulty: "Intermédiaire",
    updatedAt: "2025-02-02",
  },
  {
    id: "fundamental-analysis",
    title: "Analyse fondamentale des tokens",
    description:
      "Comment évaluer un projet crypto : tokenomics, équipe, roadmap, adoption et risques réglementaires.",
    content:
      "Méthodologie d'analyse : lire les whitepapers, vérifier l'activité GitHub, analyser la distribution des tokens et comprendre les mécanismes d'incitation.",
    tags: ["analyse"],
    difficulty: "Intermédiaire",
    updatedAt: "2024-12-01",
  },
  {
    id: "trading-basics",
    title: "Trading : spot vs margin",
    description:
      "Comprendre les différences entre trading spot, margin et produits dérivés, et les risques associés.",
    content:
      "Explication des leviers, liquidation, gestion du risque et règles de base pour construire une stratégie simple.",
    tags: ["trading"],
    difficulty: "Avancé",
    updatedAt: "2024-11-20",
  },
  {
    id: "staking-defi",
    title: "Staking et DeFi",
    description:
      "Principes du staking, yield farming, les risques des pools de liquidité et comment interpréter les APY.",
    content:
      "Comparaison du staking en protocole vs via un exchange, risques de smart contract, slashing, et bonnes pratiques pour diversifier.",
    tags: ["defi", "staking"],
    difficulty: "Intermédiaire",
    updatedAt: "2025-03-15",
  },
  {
    id: "taxes",
    title: "Fiscalité et conformité",
    description:
      "Panorama des obligations fiscales courantes pour les investisseurs crypto et conseils pour la tenue de registre.",
    content:
      "Consignes générales : conserver l'historique des transactions, connaître les règles locales et consulter un conseiller fiscal pour cas complexes.",
    tags: ["fiscalité"],
    difficulty: "Débutant",
    updatedAt: "2024-09-30",
  },
];

const containerStyle: React.CSSProperties = {
  maxWidth: 960,
  margin: "24px auto",
  padding: 20,
  fontFamily: "Inter, Roboto, system-ui, sans-serif",
  color: "#0f172a",
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  gap: 12,
  flexWrap: "wrap",
};

const controlsStyle: React.CSSProperties = {
  display: "flex",
  gap: 8,
  alignItems: "center",
  marginTop: 12,
  flexWrap: "wrap",
};

const inputStyle: React.CSSProperties = {
  padding: "8px 12px",
  borderRadius: 8,
  border: "1px solid #e6e9ef",
  minWidth: 220,
};

const selectStyle: React.CSSProperties = { ...inputStyle, minWidth: 160 };

const listStyle: React.CSSProperties = {
  marginTop: 20,
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 12,
};

const cardStyle: React.CSSProperties = {
  border: "1px solid #e6e9ef",
  borderRadius: 12,
  padding: 14,
  background: "#ffffff",
  boxShadow: "0 2px 8px rgba(15,23,42,0.04)",
};

const tagStyle: React.CSSProperties = {
  display: "inline-block",
  background: "#eef2ff",
  color: "#3730a3",
  padding: "2px 8px",
  borderRadius: 999,
  fontSize: 12,
  marginRight: 6,
};

export default function Guides(): JSX.Element {
  const [query, setQuery] = useState("");
  const [tagFilter, setTagFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"relevant" | "updated">("relevant");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const allTags = useMemo(() => {
    const s = new Set<string>();
    SAMPLE_GUIDES.forEach((g) => g.tags.forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = SAMPLE_GUIDES.filter((g) => {
      if (tagFilter !== "all" && !g.tags.includes(tagFilter)) return false;
      if (difficultyFilter !== "all" && g.difficulty !== difficultyFilter)
        return false;
      if (!q) return true;
      return (
        g.title.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        (g.content && g.content.toLowerCase().includes(q))
      );
    });

    if (sortBy === "updated") {
      arr = arr.slice().sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
    } else {
      // "relevant" : simple heuristic -> title matches first, then description
      arr = arr.slice().sort((a, b) => {
        const aScore =
          (a.title.toLowerCase().includes(q) ? 3 : 0) +
          (a.description.toLowerCase().includes(q) ? 1 : 0);
        const bScore =
          (b.title.toLowerCase().includes(q) ? 3 : 0) +
          (b.description.toLowerCase().includes(q) ? 1 : 0);
        return bScore - aScore || (a.updatedAt < b.updatedAt ? 1 : -1);
      });
    }

    return arr;
  }, [query, tagFilter, difficultyFilter, sortBy]);

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28 }}>Guides</h1>
          <p style={{ margin: "6px 0 0 0", color: "#475569" }}>
            Des tutoriels clairs et pratiques pour mieux comprendre l'univers
            crypto.
          </p>
        </div>

        <div style={{ textAlign: "right", color: "#64748b", fontSize: 13 }}>
          {SAMPLE_GUIDES.length} guides disponibles
        </div>
      </div>

      <div style={controlsStyle}>
        <input
          aria-label="Recherche"
          placeholder="Rechercher un guide, ex: sécurité, staking..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={inputStyle}
        />

        <select
          aria-label="Filtrer par tag"
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
          style={selectStyle}
        >
          <option value="all">Tous les tags</option>
          {allTags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select
          aria-label="Filtrer par difficulté"
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          style={selectStyle}
        >
          <option value="all">Toutes les difficultés</option>
          <option value="Débutant">Débutant</option>
          <option value="Intermédiaire">Intermédiaire</option>
          <option value="Avancé">Avancé</option>
        </select>

        <select
          aria-label="Trier"
          value={sortBy}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setSortBy(e.target.value as "relevant" | "updated")
          }
          style={selectStyle}
        >
          <option value="relevant">Pertinence</option>
          <option value="updated">Dernière mise à jour</option>
        </select>
      </div>

      <div style={listStyle}>
        {filtered.map((g) => (
          <article key={g.id} style={cardStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 8,
              }}
            >
              <div>
                <h2 style={{ margin: "0 0 6px 0", fontSize: 16 }}>{g.title}</h2>
                <div style={{ color: "#64748b", fontSize: 13 }}>
                  {g.description}
                </div>
              </div>

              <div style={{ textAlign: "right", minWidth: 92 }}>
                <div style={{ fontSize: 12, color: "#0f172a" }}>
                  {g.difficulty}
                </div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 6 }}>
                  Mis à jour {new Date(g.updatedAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: 10,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {g.tags.map((t) => (
                <span key={t} style={tagStyle}>
                  {t}
                </span>
              ))}

              <button
                onClick={() => setExpanded((s) => ({ ...s, [g.id]: !s[g.id] }))}
                style={{
                  marginLeft: "auto",
                  padding: "6px 10px",
                  background: "transparent",
                  border: "1px solid #e6e9ef",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
                aria-expanded={!!expanded[g.id]}
              >
                {expanded[g.id] ? "Réduire" : "Lire la suite"}
              </button>
            </div>

            {expanded[g.id] && (
              <div style={{ marginTop: 12, color: "#0f172a", lineHeight: 1.5 }}>
                <p style={{ margin: "0 0 8px 0", color: "#334155" }}>
                  {g.content}
                </p>
                <ul style={{ margin: "0 0 0 18px", color: "#475569" }}>
                  <li>Points clés expliqués clairement</li>
                  <li>Étapes pratiques et pièges à éviter</li>
                  <li>Ressources et lectures recommandées</li>
                </ul>
              </div>
            )}
          </article>
        ))}

        {filtered.length === 0 && (
          <div style={{ color: "#64748b", padding: 12 }}>
            Aucun guide ne correspond à votre recherche.
          </div>
        )}
      </div>
    </div>
  );
}
