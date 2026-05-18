import { motion } from "framer-motion";

type Lesson = {
  id: string;
  title: string;
  description: string;
  tag: string;
  level: string;
};

type Track = {
  title: string;
  description: string;
  steps: string[];
};

const lessons: Lesson[] = [
  {
    id: "crypto-basics",
    title: "Crypto fundamentals",
    description:
      "Understand wallets, private keys, seed phrases, transactions, gas fees, and why self-custody matters.",
    tag: "Starter",
    level: "Beginner",
  },
  {
    id: "blockchain-basics",
    title: "Blockchain basics",
    description:
      "Learn how blocks, consensus, validators, miners, and finality work behind the scenes.",
    tag: "Core",
    level: "Beginner",
  },
  {
    id: "ethereum-dev",
    title: "Ethereum & smart contracts",
    description:
      "Move from account-based networks to Solidity, contract deployment, and dApp interactions.",
    tag: "Build",
    level: "Intermediate",
  },
  {
    id: "defi-security",
    title: "DeFi risk & security",
    description:
      "Read approvals, spot phishing patterns, review contract risk, and protect funds before signing.",
    tag: "Security",
    level: "Practical",
  },
];

const tracks: Track[] = [
  {
    title: "Start safely",
    description: "The fastest path for a new user who wants to avoid costly mistakes.",
    steps: ["Create a wallet", "Secure the seed phrase", "Send a small test transaction"],
  },
  {
    title: "Understand markets",
    description: "Build enough context to compare assets without guessing in the dark.",
    steps: ["Read token supply", "Compare liquidity", "Track volatility"],
  },
  {
    title: "Use dApps",
    description: "Connect a wallet, inspect permissions, and interact with protocols carefully.",
    steps: ["Connect wallet", "Check network", "Review approvals"],
  },
];

const stats = [
  { label: "Learning paths", value: "3" },
  { label: "Core modules", value: "12" },
  { label: "Security checks", value: "8" },
];

export default function Education() {
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
              Education hub
            </p>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">
              Learn crypto without flying blind
            </h1>
            <p className="mt-4 max-w-2xl text-white/50">
              Build a clean mental model of wallets, blockchains, DeFi, and
              security before connecting funds to protocols.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl">
            {stats.map((stat) => (
              <div key={stat.label} className="min-w-24 rounded-xl bg-white/5 px-4 py-3">
                <p className="text-2xl font-black">{stat.value}</p>
                <p className="mt-1 text-xs text-white/45">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.header>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.article
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-black">Getting started</h2>
                <p className="mt-2 max-w-xl text-sm text-white/50">
                  Follow the path in order if you are new. It keeps the risky
                  concepts separated from the practical wallet actions.
                </p>
              </div>
              <button className="w-full rounded-xl bg-[#6366F1] px-5 py-3 text-sm font-bold shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-500 md:w-auto">
                Start learning
              </button>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {tracks.map((track, index) => (
                <div
                  key={track.title}
                  className="rounded-2xl border border-white/10 bg-black/20 p-5"
                >
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/15 text-sm font-black text-indigo-200">
                    {index + 1}
                  </div>
                  <h3 className="font-bold">{track.title}</h3>
                  <p className="mt-2 text-sm text-white/45">{track.description}</p>
                  <ul className="mt-4 space-y-2 text-sm text-white/60">
                    {track.steps.map((step) => (
                      <li key={step} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.article>

          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">
              Wallet checklist
            </p>
            <h2 className="mt-3 text-2xl font-black">Before you connect</h2>
            <div className="mt-6 space-y-3">
              {[
                "Confirm the URL before signing.",
                "Never type your seed phrase into a website.",
                "Review token approvals after DeFi actions.",
                "Send a small test transaction first.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/70"
                >
                  {item}
                </div>
              ))}
            </div>
          </motion.aside>
        </section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mt-10"
        >
          <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-black">Courses & tutorials</h2>
              <p className="mt-1 text-sm text-white/45">
                Short modules designed for scanning, practice, and safer decisions.
              </p>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {lessons.map((lesson) => (
              <article
                key={lesson.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition hover:border-indigo-400/60 hover:bg-white/10"
              >
                <div className="mb-5 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-indigo-500/15 px-3 py-1 text-xs font-bold text-indigo-200">
                    {lesson.tag}
                  </span>
                  <span className="text-xs text-white/40">{lesson.level}</span>
                </div>
                <h3 className="text-lg font-black">{lesson.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/50">
                  {lesson.description}
                </p>
                <a
                  href="#"
                  className="mt-5 inline-block text-sm font-semibold text-indigo-300 transition hover:text-indigo-200"
                >
                  Open module →
                </a>
              </article>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
}
