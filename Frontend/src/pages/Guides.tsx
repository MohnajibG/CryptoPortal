import { useMemo, useState, type JSX } from "react";
import { motion } from "framer-motion";

type Difficulty = "Debutant" | "Intermediaire" | "Avance";

type Guide = {
  id: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  difficulty: Difficulty;
  updatedAt: string;
};

const sampleGuides: Guide[] = [
  {
    id: "intro",
    title: "Introduction a la crypto",
    description:
      "Comprendre les fondamentaux : blockchain, cles publiques/privees, et premiers reflexes.",
    content:
      "Ce guide couvre les bases : fonctionnement d'une blockchain, transactions, choix d'un portefeuille custodial ou non-custodial, et bonnes pratiques pour acheter et conserver des actifs numeriques.",
    tags: ["basics"],
    difficulty: "Debutant",
    updatedAt: "2025-01-10",
  },
  {
    id: "wallet-security",
    title: "Securite des portefeuilles",
    description:
      "Hardware wallets, seed phrases, phishing, sauvegardes et hygiene de signature.",
    content:
      "Configuration d'un hardware wallet, sauvegarde securisee de la seed phrase, detection des scams et reduction des risques de perte.",
    tags: ["securite"],
    difficulty: "Intermediaire",
    updatedAt: "2025-02-02",
  },
  {
    id: "fundamental-analysis",
    title: "Analyse fondamentale des tokens",
    description:
      "Evaluer un projet crypto avec tokenomics, equipe, roadmap, adoption et risques.",
    content:
      "Methodologie d'analyse : lire les whitepapers, verifier l'activite du projet, analyser la distribution des tokens et comprendre les mecanismes d'incitation.",
    tags: ["analyse"],
    difficulty: "Intermediaire",
    updatedAt: "2024-12-01",
  },
  {
    id: "trading-basics",
    title: "Trading : spot vs margin",
    description:
      "Comprendre les differences entre spot, margin, produits derives et liquidation.",
    content:
      "Explication du levier, de la liquidation, de la gestion du risque et des regles de base pour construire une strategie simple.",
    tags: ["trading"],
    difficulty: "Avance",
    updatedAt: "2024-11-20",
  },
  {
    id: "staking-defi",
    title: "Staking et DeFi",
    description:
      "Principes du staking, yield farming, pools de liquidite et lecture des APY.",
    content:
      "Comparaison du staking en protocole et via exchange, risques de smart contract, slashing et bonnes pratiques pour diversifier.",
    tags: ["defi", "staking"],
    difficulty: "Intermediaire",
    updatedAt: "2025-03-15",
  },
  {
    id: "taxes",
    title: "Fiscalite et conformite",
    description:
      "Panorama des obligations fiscales courantes et tenue de registre crypto.",
    content:
      "Conservez l'historique des transactions, connaissez les regles locales et consultez un conseiller fiscal pour les cas complexes.",
    tags: ["fiscalite"],
    difficulty: "Debutant",
    updatedAt: "2024-09-30",
  },
];

const difficultyLabels: Difficulty[] = ["Debutant", "Intermediaire", "Avance"];

export default function Guides(): JSX.Element {
  const [query, setQuery] = useState("");
  const [tagFilter, setTagFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"relevant" | "updated">("relevant");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    sampleGuides.forEach((guide) => guide.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags).sort();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let guides = sampleGuides.filter((guide) => {
      if (tagFilter !== "all" && !guide.tags.includes(tagFilter)) return false;
      if (difficultyFilter !== "all" && guide.difficulty !== difficultyFilter) {
        return false;
      }
      if (!q) return true;

      return (
        guide.title.toLowerCase().includes(q) ||
        guide.description.toLowerCase().includes(q) ||
        guide.content.toLowerCase().includes(q)
      );
    });

    guides = guides.slice().sort((a, b) => {
      if (sortBy === "updated") {
        return a.updatedAt < b.updatedAt ? 1 : -1;
      }

      const aScore =
        (a.title.toLowerCase().includes(q) ? 3 : 0) +
        (a.description.toLowerCase().includes(q) ? 1 : 0);
      const bScore =
        (b.title.toLowerCase().includes(q) ? 3 : 0) +
        (b.description.toLowerCase().includes(q) ? 1 : 0);

      return bScore - aScore || (a.updatedAt < b.updatedAt ? 1 : -1);
    });

    return guides;
  }, [difficultyFilter, query, sortBy, tagFilter]);

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
              Practical guides
            </p>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">
              Guides crypto
            </h1>
            <p className="mt-4 max-w-2xl text-white/50">
              Des tutoriels courts et actionnables pour comprendre, comparer et
              utiliser les outils crypto avec plus de confiance.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl">
            <div className="rounded-xl bg-white/5 px-4 py-3">
              <p className="text-2xl font-black">{sampleGuides.length}</p>
              <p className="mt-1 text-xs text-white/45">Guides</p>
            </div>
            <div className="rounded-xl bg-white/5 px-4 py-3">
              <p className="text-2xl font-black">{allTags.length}</p>
              <p className="mt-1 text-xs text-white/45">Categories</p>
            </div>
          </div>
        </motion.header>

        <section className="mt-10 grid gap-3 lg:grid-cols-[1fr_180px_210px_210px]">
          <input
            aria-label="Recherche"
            placeholder="Rechercher securite, staking, analyse..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none backdrop-blur-xl placeholder:text-white/30 focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/30"
          />

          <select
            aria-label="Filtrer par tag"
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className="rounded-2xl border border-white/10 bg-gray-950/80 px-4 py-4 text-white outline-none"
          >
            <option value="all">Tous les tags</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>

          <select
            aria-label="Filtrer par difficulte"
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="rounded-2xl border border-white/10 bg-gray-950/80 px-4 py-4 text-white outline-none"
          >
            <option value="all">Toutes difficultes</option>
            {difficultyLabels.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>

          <select
            aria-label="Trier"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "relevant" | "updated")}
            className="rounded-2xl border border-white/10 bg-gray-950/80 px-4 py-4 text-white outline-none"
          >
            <option value="relevant">Pertinence</option>
            <option value="updated">Mise a jour</option>
          </select>
        </section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {filtered.map((guide) => (
            <article
              key={guide.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition hover:border-indigo-400/60 hover:bg-white/10"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="text-lg font-black">{guide.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-white/50">
                    {guide.description}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-bold text-indigo-200">
                  {guide.difficulty}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {guide.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/55"
                  >
                    {tag}
                  </span>
                ))}
                <span className="ml-auto text-xs text-white/35">
                  {new Date(guide.updatedAt).toLocaleDateString()}
                </span>
              </div>

              {expanded[guide.id] && (
                <div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="text-sm leading-6 text-white/55">{guide.content}</p>
                  <ul className="mt-4 space-y-2 text-sm text-white/50">
                    <li>Points cles expliques clairement</li>
                    <li>Etapes pratiques et pieges a eviter</li>
                    <li>Lectures recommandees pour aller plus loin</li>
                  </ul>
                </div>
              )}

              <button
                onClick={() =>
                  setExpanded((state) => ({
                    ...state,
                    [guide.id]: !state[guide.id],
                  }))
                }
                className="mt-5 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-indigo-200 transition hover:bg-white/10"
              >
                {expanded[guide.id] ? "Reduire" : "Lire la suite"}
              </button>
            </article>
          ))}
        </motion.section>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-white/40">
            Aucun guide ne correspond a votre recherche.
          </p>
        )}
      </div>
    </main>
  );
}
