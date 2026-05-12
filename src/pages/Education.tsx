import React from "react";

type Resource = {
  id: string;
  title: string;
  description?: string;
  link?: string;
  tag?: string;
};

const sampleCourses: Resource[] = [
  {
    id: "c1",
    title: "Intro to Cryptography",
    description:
      "Foundations of modern cryptography: hashes, symmetric/asymmetric crypto.",
    link: "#",
    tag: "Course",
  },
  {
    id: "c2",
    title: "Blockchain Basics",
    description:
      "How blockchains work: consensus, mining, and smart contracts.",
    link: "#",
    tag: "Course",
  },
  {
    id: "r1",
    title: "Ethereum Dev Tutorial",
    description: "Hands-on guide for writing smart contracts and dApps.",
    link: "#",
    tag: "Tutorial",
  },
];

const cardStyle: React.CSSProperties = {
  border: "1px solid #e6e6e6",
  borderRadius: 8,
  padding: 16,
  background: "#fff",
  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
};

const Education: React.FC = () => {
  return (
    <main
      style={{
        padding: "32px",
        fontFamily: "Inter, system-ui, sans-serif",
        color: "#0f172a",
      }}
    >
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ margin: 0, fontSize: 28 }}>Education</h1>
        <p style={{ margin: "8px 0 0", color: "#475569" }}>
          Learn the fundamentals of crypto, blockchain, and smart contract
          development.
        </p>
      </header>

      <section style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 320px", ...cardStyle }}>
            <h2 style={{ marginTop: 0, fontSize: 18 }}>Getting started</h2>
            <p style={{ margin: "8px 0", color: "#475569" }}>
              If you're new, start with the basics: cryptography primitives,
              blockchain concepts, then move to smart contracts and dApp
              development.
            </p>
            <a href="#" style={{ color: "#0ea5a4", textDecoration: "none" }}>
              Starter guide →
            </a>
          </div>

          <div style={{ flex: "1 1 320px", ...cardStyle }}>
            <h2 style={{ marginTop: 0, fontSize: 18 }}>Recommended tools</h2>
            <ul
              style={{ margin: "8px 0 0", paddingLeft: 20, color: "#475569" }}
            >
              <li>VS Code + Solidity extensions</li>
              <li>Hardhat / Truffle</li>
              <li>Metamask</li>
            </ul>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h3 style={{ margin: "0 0 12px 0" }}>Courses & Tutorials</h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 12,
          }}
        >
          {sampleCourses.map((r) => (
            <article key={r.id} style={cardStyle}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                  gap: 8,
                }}
              >
                <h4 style={{ margin: 0, fontSize: 16 }}>{r.title}</h4>
                {r.tag && (
                  <span
                    style={{
                      background: "#eef2ff",
                      color: "#4f46e5",
                      borderRadius: 6,
                      padding: "2px 8px",
                      fontSize: 12,
                    }}
                  >
                    {r.tag}
                  </span>
                )}
              </div>
              {r.description && (
                <p style={{ margin: "8px 0 12px", color: "#475569" }}>
                  {r.description}
                </p>
              )}
              {r.link && (
                <a
                  href={r.link}
                  style={{
                    color: "#0ea5a4",
                    textDecoration: "none",
                    fontSize: 14,
                  }}
                >
                  Open →
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      <section>
        <h3 style={{ margin: "0 0 12px 0" }}>Resources</h3>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <div style={{ ...cardStyle, flex: "1 1 240px" }}>
            <strong>Glossary</strong>
            <p style={{ margin: "8px 0 0", color: "#475569" }}>
              Quick definitions of common crypto terms.
            </p>
          </div>
          <div style={{ ...cardStyle, flex: "1 1 240px" }}>
            <strong>Security best practices</strong>
            <p style={{ margin: "8px 0 0", color: "#475569" }}>
              How to avoid common smart contract vulnerabilities.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Education;
