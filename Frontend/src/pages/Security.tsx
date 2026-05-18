import { useEffect, useMemo, useState, type JSX } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ChecklistItem = {
  id: string;
  label: string;
  tip: string;
  checked: boolean;
};

const storageKey = "crypto-portal-security-checklist-v1";

const defaultChecklist: ChecklistItem[] = [
  {
    id: "password",
    label: "Mot de passe unique et fort",
    tip: "Utilisez un gestionnaire de mots de passe pour generer et stocker un mot de passe long.",
    checked: false,
  },
  {
    id: "2fa",
    label: "2FA activee avec authenticator ou hardware key",
    tip: "Preferez une application d'authentification ou une cle materielle aux codes SMS.",
    checked: false,
  },
  {
    id: "email",
    label: "Email de recuperation verifie",
    tip: "Votre email est souvent le point de recuperation principal. Protegez-le aussi.",
    checked: false,
  },
  {
    id: "software",
    label: "Logiciels, wallet et OS a jour",
    tip: "Les mises a jour corrigent souvent des failles qui touchent navigateurs et extensions.",
    checked: false,
  },
  {
    id: "backup",
    label: "Seed phrase sauvegardee hors ligne",
    tip: "Ne stockez jamais une seed phrase dans un cloud, une note mobile ou une capture d'ecran.",
    checked: false,
  },
];

const totpSecret = "JBSWY3DPEHPK3PXP";
const pgpPublicKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: OpenPGP.js v4.10.10
Comment: Exemple de cle publique

mQENBFu...exemple...IDAQAB
=abcd
-----END PGP PUBLIC KEY BLOCK-----`;

const faq = [
  {
    q: "Que faire si je perds l'acces a mon 2FA ?",
    a: "Utilisez vos codes de recuperation stockes hors ligne. Si le compte est custodial, contactez le support avec les preuves demandees.",
  },
  {
    q: "Comment reconnaitre un phishing ?",
    a: "Controlez l'URL, refusez toute demande de seed phrase et verifiez chaque signature avant de la valider.",
  },
  {
    q: "Pourquoi envoyer une petite transaction test ?",
    a: "Une transaction test limite les pertes si l'adresse, le reseau ou le token ne correspondent pas.",
  },
];

export default function Security(): JSX.Element {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : defaultChecklist;
    } catch {
      return defaultChecklist;
    }
  });
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({});
  const [showSecret, setShowSecret] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [pgpOpen, setPgpOpen] = useState(false);

  const completed = checklist.filter((item) => item.checked).length;
  const progress = useMemo(
    () => Math.round((completed / checklist.length) * 100),
    [checklist.length, completed],
  );

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(checklist));
  }, [checklist]);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(null), 2500);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  function toggleItem(id: string) {
    setChecklist((current) =>
      current.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  }

  async function copyToClipboard(text: string, label: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
    } catch {
      setCopied("error");
    }
  }

  function resetChecklist() {
    setChecklist(defaultChecklist);
    localStorage.removeItem(storageKey);
  }

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
              Security center
            </p>
            <h1 className="text-4xl font-black tracking-tight md:text-5xl">
              Securisez vos comptes crypto
            </h1>
            <p className="mt-4 max-w-2xl text-white/50">
              Une checklist simple pour proteger vos wallets, vos comptes
              d'exchange et vos habitudes de signature.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.16em] text-white/40">
              Progression
            </p>
            <p className="mt-2 text-4xl font-black">{progress}%</p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#6366F1]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.header>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.article
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-black">Checklist de securite</h2>
                <p className="mt-1 text-sm text-white/45">
                  {completed} sur {checklist.length} protections validees.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    setChecklist((items) =>
                      items.map((item) => ({ ...item, checked: true })),
                    )
                  }
                  className="rounded-xl bg-[#6366F1] px-4 py-2 text-sm font-bold shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-500"
                >
                  Tout valider
                </button>
                <button
                  onClick={resetChecklist}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/70 transition hover:text-white"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {checklist.map((item) => (
                <label
                  key={item.id}
                  className="flex cursor-pointer gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-indigo-400/50"
                >
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleItem(item.id)}
                    className="mt-1 h-5 w-5 accent-[#6366F1]"
                  />
                  <span>
                    <span className="block font-bold">{item.label}</span>
                    <span className="mt-1 block text-sm text-white/45">
                      {item.tip}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </motion.article>

          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">
                2FA demo
              </p>
              <h2 className="mt-3 text-2xl font-black">Cle TOTP</h2>
              <p className="mt-2 text-sm text-white/45">
                Exemple de cle de demonstration. En production, elle doit venir
                du serveur et ne jamais etre reutilisee.
              </p>

              <div className="mt-5 rounded-xl border border-white/10 bg-black/30 p-4 font-mono text-sm text-white/75">
                {showSecret ? totpSecret : "••••••••••••••••"}
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => setShowSecret((value) => !value)}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/70 transition hover:text-white"
                >
                  {showSecret ? "Masquer" : "Afficher"}
                </button>
                <button
                  onClick={() => copyToClipboard(totpSecret, "TOTP")}
                  className="rounded-xl bg-[#6366F1] px-4 py-2 text-sm font-bold transition hover:bg-indigo-500"
                >
                  Copier
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <h2 className="text-2xl font-black">Cle publique PGP</h2>
              <p className="mt-2 text-sm text-white/45">
                Verifiez les communications sensibles avec une cle publique.
              </p>
              <button
                onClick={() => setPgpOpen((value) => !value)}
                className="mt-4 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/70 transition hover:text-white"
              >
                {pgpOpen ? "Cacher la cle" : "Afficher la cle"}
              </button>

              {pgpOpen && (
                <div className="mt-4">
                  <pre className="max-h-56 overflow-auto rounded-xl border border-white/10 bg-black/30 p-4 text-xs text-white/65">
                    {pgpPublicKey}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(pgpPublicKey, "PGP")}
                    className="mt-3 rounded-xl bg-[#6366F1] px-4 py-2 text-sm font-bold transition hover:bg-indigo-500"
                  >
                    Copier la cle PGP
                  </button>
                </div>
              )}
            </div>
          </motion.aside>
        </section>

        <section className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h2 className="text-2xl font-black">FAQ rapide</h2>
          <div className="mt-5 space-y-3">
            {faq.map((item, index) => (
              <div key={item.q} className="rounded-xl border border-white/10 bg-black/20">
                <button
                  onClick={() =>
                    setFaqOpen((state) => ({ ...state, [index]: !state[index] }))
                  }
                  className="flex w-full items-center justify-between px-4 py-3 text-left font-semibold"
                >
                  {item.q}
                  <span className="text-indigo-300">
                    {faqOpen[index] ? "-" : "+"}
                  </span>
                </button>
                {faqOpen[index] && (
                  <p className="px-4 pb-4 text-sm leading-6 text-white/50">
                    {item.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-white/10 bg-gray-950 px-4 py-3 text-sm shadow-2xl"
            >
              {copied === "error"
                ? "Impossible de copier."
                : `${copied} copie dans le presse-papiers.`}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
