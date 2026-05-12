import { useEffect, useState, type JSX } from "react";

type ChecklistItem = {
  id: string;
  label: string;
  checked: boolean;
};

const STORAGE_KEY = "crypto-portal-security-checklist-v1";

export default function Security(): JSX.Element {
  const defaultChecklist: ChecklistItem[] = [
    { id: "password", label: "Mot de passe unique et fort", checked: false },
    {
      id: "2fa",
      label: "2FA activée (authenticator/Hardware key)",
      checked: false,
    },
    { id: "email", label: "Email de récupération vérifié", checked: false },
    { id: "software", label: "Logiciels et OS à jour", checked: false },
    {
      id: "backup",
      label: "Sauvegardes des clés/seed sécurisées",
      checked: false,
    },
  ];

  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : defaultChecklist;
    } catch {
      return defaultChecklist;
    }
  });

  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({});
  const [showSecret, setShowSecret] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [pgpOpen, setPgpOpen] = useState(false);

  const TOTP_SECRET = "JBSWY3DPEHPK3PXP"; // exemple : remplacer par la vraie valeur côté serveur
  const PGP_PUBLIC_KEY = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: OpenPGP.js v4.10.10
Comment: Exemple de clé publique

mQENBFu...exemple...IDAQAB
=abcd
-----END PGP PUBLIC KEY BLOCK-----`;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checklist));
  }, [checklist]);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(null), 2500);
    return () => clearTimeout(t);
  }, [copied]);

  function toggleItem(id: string) {
    setChecklist((prev) =>
      prev.map((it) => (it.id === id ? { ...it, checked: !it.checked } : it)),
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
    localStorage.removeItem(STORAGE_KEY);
  }

  const styles: Record<string, React.CSSProperties> = {
    page: {
      fontFamily:
        "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      padding: 20,
      maxWidth: 900,
      margin: "0 auto",
      color: "#0f172a",
    },
    header: { marginBottom: 18 },
    title: { fontSize: 28, margin: 0 },
    subtitle: { color: "#475569", marginTop: 6 },
    card: {
      background: "#fff",
      borderRadius: 10,
      boxShadow: "0 1px 3px rgba(2,6,23,0.08)",
      padding: 16,
      marginBottom: 14,
    },
    checklistItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "8px 0",
      borderBottom: "1px solid #f1f5f9",
    },
    btn: {
      background: "#0ea5a4",
      color: "#fff",
      border: "none",
      padding: "8px 12px",
      borderRadius: 8,
      cursor: "pointer",
    },
    secondaryBtn: {
      background: "#eef2ff",
      border: "1px solid #e0e7ff",
      color: "#3730a3",
      padding: "8px 12px",
      borderRadius: 8,
      cursor: "pointer",
    },
    smallBtn: {
      padding: "6px 8px",
      borderRadius: 6,
      border: "1px solid #e5e7eb",
      background: "#fff",
      cursor: "pointer",
      marginLeft: 8,
    },
    pre: {
      whiteSpace: "pre-wrap",
      wordBreak: "break-all",
      background: "#0f172a",
      color: "#f8fafc",
      padding: 12,
      borderRadius: 8,
      fontSize: 12,
      marginTop: 8,
    },
    faqQuestion: {
      width: "100%",
      textAlign: "left",
      padding: 10,
      background: "transparent",
      border: "none",
      fontSize: 16,
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>Sécurité du compte</h1>
        <p style={styles.subtitle}>
          Conseils et outils pour protéger votre compte et vos actifs. Suivez
          ces étapes pour réduire les risques.
        </p>
      </header>

      <section style={styles.card}>
        <h2 style={{ marginTop: 0 }}>Checklist de sécurité</h2>
        {checklist.map((item) => (
          <div key={item.id} style={styles.checklistItem}>
            <label style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleItem(item.id)}
                aria-checked={item.checked}
              />
              <span>{item.label}</span>
            </label>
            <div>
              <button
                style={styles.smallBtn}
                onClick={() =>
                  alert(
                    "Conseil: utilisez un gestionnaire de mots de passe (ex: Bitwarden, 1Password) et activez 2FA pour les comptes critiques.",
                  )
                }
              >
                Astuce
              </button>
            </div>
          </div>
        ))}

        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button
            style={styles.btn}
            onClick={() =>
              setChecklist((c) => c.map((i) => ({ ...i, checked: true })))
            }
          >
            Marquer tout comme fait
          </button>
          <button style={styles.secondaryBtn} onClick={resetChecklist}>
            Réinitialiser
          </button>
        </div>
      </section>

      <section style={styles.card}>
        <h2 style={{ marginTop: 0 }}>Authentification à deux facteurs (2FA)</h2>
        <p>
          Nous recommandons d'utiliser une application d'authentification ou une
          clé matérielle (ex: YubiKey). Voici une clé de démonstration (ne pas
          utiliser en production).
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            marginTop: 8,
          }}
        >
          <div>
            <strong>Clé TOTP:</strong>
            <div style={styles.pre}>
              {showSecret ? TOTP_SECRET : "••••••••••••••••"}
            </div>
          </div>

          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            <button
              style={styles.smallBtn}
              onClick={() => {
                setShowSecret((s) => !s);
              }}
              aria-pressed={showSecret}
            >
              {showSecret ? "Masquer" : "Afficher"}
            </button>

            <button
              style={styles.smallBtn}
              onClick={() => copyToClipboard(TOTP_SECRET, "TOTP")}
              aria-label="Copier la clé TOTP"
            >
              Copier
            </button>
          </div>
        </div>

        <ol style={{ marginTop: 12 }}>
          <li>
            Ouvrez votre application d'authentification (Google Authenticator,
            Authy, etc.).
          </li>
          <li>Ajoutez un nouveau compte et utilisez la clé TOTP fournie.</li>
          <li>Entrez le code généré pour vérifier la configuration.</li>
        </ol>
      </section>

      <section style={styles.card}>
        <h2 style={{ marginTop: 0 }}>Clé publique PGP</h2>
        <p>
          Utilisez cette clé pour vérifier les communications signées. Cliquez
          pour afficher/cacher.
        </p>

        <div>
          <button
            style={{ ...styles.smallBtn, marginBottom: 8 }}
            onClick={() => setPgpOpen((v) => !v)}
            aria-expanded={pgpOpen}
          >
            {pgpOpen ? "Cacher la clé" : "Afficher la clé"}
          </button>

          {pgpOpen && (
            <>
              <pre style={styles.pre}>{PGP_PUBLIC_KEY}</pre>
              <div style={{ marginTop: 8 }}>
                <button
                  style={styles.smallBtn}
                  onClick={() => copyToClipboard(PGP_PUBLIC_KEY, "PGP")}
                >
                  Copier la clé PGP
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      <section style={styles.card}>
        <h2 style={{ marginTop: 0 }}>FAQ rapide</h2>
        {[
          {
            q: "Que faire si je perds l'accès à mon 2FA ?",
            a: "Utilisez vos codes de récupération stockés en lieu sûr ou contactez le support avec une preuve d'identité.",
          },
          {
            q: "Comment vérifier une signature PGP ?",
            a: "Importez la clé publique dans votre client PGP et utilisez la commande de vérification (ex: gpg --verify).",
          },
          {
            q: "Comment reconnaître un phishing ?",
            a: "Vérifiez l'URL, méfiez-vous des demandes de clés privées/seed et activez la vérification en deux temps.",
          },
        ].map((item, i) => (
          <div key={i} style={{ marginBottom: 6 }}>
            <button
              style={styles.faqQuestion}
              onClick={() => setFaqOpen((s) => ({ ...s, [i]: !s[i] }))}
              aria-expanded={!!faqOpen[i]}
            >
              {item.q}
            </button>
            {faqOpen[i] && (
              <div style={{ padding: "6px 10px", color: "#334155" }}>
                {item.a}
              </div>
            )}
          </div>
        ))}
      </section>

      <footer style={{ textAlign: "center", color: "#64748b", marginTop: 18 }}>
        <div>
          {copied === "TOTP" && (
            <span>Clé TOTP copiée dans le presse-papiers.</span>
          )}
          {copied === "PGP" && (
            <span>Clé PGP copiée dans le presse-papiers.</span>
          )}
          {copied === "error" && <span>Erreur: impossible de copier.</span>}
        </div>
        <div style={{ marginTop: 8 }}>
          <small>
            Pour une sécurité maximale : sauvegardez vos seeds hors ligne,
            évitez de partager vos clés privées et mettez à jour vos appareils.
          </small>
        </div>
      </footer>
    </div>
  );
}
