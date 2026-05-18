import React from "react";

type CommunityItem = {
  id: string;
  title: string;
  description: string;
  cta?: { label: string; href?: string; onClick?: () => void };
};

const mockItems: CommunityItem[] = [
  {
    id: "discussions",
    title: "Discussions",
    description:
      "Rejoignez nos canaux Discord et forums pour échanger, poser des questions et partager des idées.",
    cta: { label: "Accéder au Discord", href: "https://discord.gg/" },
  },
  {
    id: "events",
    title: "Événements",
    description:
      "Meetups, workshops et hackathons en ligne pour apprendre et collaborer.",
    cta: { label: "Voir le calendrier", href: "/events" },
  },
  {
    id: "projects",
    title: "Projets collaboratifs",
    description:
      "Participez à des projets open-source, soumettez des idées et contribuez au code.",
    cta: { label: "Explorer les projets", href: "/projects" },
  },
  {
    id: "contribute",
    title: "Contribuer",
    description:
      "Guide rapide pour contribuer : issues, pull requests et bonnes pratiques.",
    cta: { label: "Commencer", href: "/contribute" },
  },
];

const styles: { [k: string]: React.CSSProperties } = {
  page: {
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    color: "#0f172a",
    padding: "32px",
    maxWidth: 1100,
    margin: "0 auto",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 24,
  },
  title: {
    margin: 0,
    fontSize: 28,
    lineHeight: 1.1,
  },
  subtitle: {
    margin: 0,
    color: "#475569",
    fontSize: 14,
  },
  hero: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    background: "#f8fafc",
    padding: 20,
    borderRadius: 10,
    marginBottom: 24,
  },
  ctaRow: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    marginTop: 8,
  },
  buttonPrimary: {
    background: "#0ea5a8",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
  },
  buttonGhost: {
    background: "transparent",
    color: "#0f172a",
    border: "1px solid #cbd5e1",
    padding: "10px 14px",
    borderRadius: 8,
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 16,
  },
  card: {
    background: "white",
    padding: 16,
    borderRadius: 10,
    boxShadow: "0 1px 2px rgba(2,6,23,0.06)",
    minHeight: 120,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  cardTitle: {
    margin: 0,
    fontSize: 16,
    fontWeight: 600,
  },
  cardDesc: {
    marginTop: 8,
    fontSize: 13,
    color: "#475569",
    flexGrow: 1,
  },
  footer: {
    marginTop: 28,
    color: "#64748b",
    fontSize: 13,
  },
};

const CommunityPage: React.FC = () => {
  const handleJoin = () => {
    // placeholder: ouvrir le lien d'invitation ou afficher modal
    window.open("https://discord.gg/", "_blank", "noopener");
  };

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Communauté</h1>
          <p style={styles.subtitle}>
            Un lieu pour échanger, apprendre et construire ensemble.
          </p>
        </div>
        <div>
          <button
            style={styles.buttonPrimary}
            onClick={handleJoin}
            aria-label="Rejoindre la communauté"
          >
            Rejoindre la communauté
          </button>
        </div>
      </header>

      <section style={styles.hero} aria-labelledby="hero-heading">
        <h2 id="hero-heading" style={{ margin: 0, fontSize: 18 }}>
          Bienvenue dans la communauté Crypto Portal
        </h2>
        <p style={{ margin: 0, color: "#475569" }}>
          Ici vous trouverez des discussions techniques, des événements, des
          projets collaboratifs et des guides pour contribuer. Que vous soyez
          débutant ou expert, il y a une place pour vous.
        </p>

        <div style={styles.ctaRow}>
          <button style={styles.buttonPrimary} onClick={handleJoin}>
            Rejoindre le Discord
          </button>
          <a href="/events" style={{ textDecoration: "none" }}>
            <button style={styles.buttonGhost}>Voir les événements</button>
          </a>
          <a href="/contribute" style={{ textDecoration: "none" }}>
            <button style={styles.buttonGhost}>Guide de contribution</button>
          </a>
        </div>
      </section>

      <section aria-labelledby="sections-heading">
        <h3 id="sections-heading" style={{ marginTop: 0, marginBottom: 12 }}>
          Espaces de la communauté
        </h3>

        <div style={styles.grid}>
          {mockItems.map((item) => (
            <article
              key={item.id}
              style={styles.card}
              aria-labelledby={`${item.id}-title`}
            >
              <div>
                <h4 id={`${item.id}-title`} style={styles.cardTitle}>
                  {item.title}
                </h4>
                <p style={styles.cardDesc}>{item.description}</p>
              </div>

              {item.cta ? (
                item.cta.href ? (
                  <a href={item.cta.href} style={{ textDecoration: "none" }}>
                    <button style={{ ...styles.buttonPrimary, width: "100%" }}>
                      {item.cta.label}
                    </button>
                  </a>
                ) : (
                  <button
                    style={{ ...styles.buttonPrimary, width: "100%" }}
                    onClick={item.cta.onClick}
                    aria-label={item.cta.label}
                  >
                    {item.cta.label}
                  </button>
                )
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <footer style={styles.footer}>
        <p style={{ margin: 0 }}>
          Besoin d'aide ? Contactez-nous sur support@crypto-portal.example ou
          consultez la documentation pour commencer.
        </p>
      </footer>
    </main>
  );
};

export default CommunityPage;
