import React from "react";
import { Link } from "react-router-dom";
import { BRAND } from "../brandConfig";
import {
  ShieldCheck,
  Cpu,
  Layers,
  Heart,
  FileCheck,
  CheckCircle,
  ExternalLink,
  ArrowRight
} from "lucide-react";

export default function About() {
  return (
    <div className="container" style={{ padding: "50px 20px 90px 20px", maxWidth: "900px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <span className="badge badge-gold" style={{ marginBottom: "8px" }}>
          Product Philosophy & Vision
        </span>
        <h1 style={{ fontSize: "2.6rem", fontWeight: 800, color: "var(--color-navy)", letterSpacing: "-0.5px" }}>
          About {BRAND.productName}
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", margin: "8px auto 0 auto", maxWidth: "620px" }}>
          An uncompromisingly private, recruiter-grade resume builder created by{" "}
          <strong>{BRAND.parentCompany}</strong>, powered by <strong>{BRAND.parentBrand}</strong>.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        {/* Card 1: The Core Mission */}
        <div className="card" style={{ padding: "32px" }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--color-navy)", marginBottom: "14px" }}>
            The Mission: "Build Your Professional Identity."
          </h2>
          <p style={{ color: "#334155", lineHeight: 1.7, marginBottom: "16px" }}>
            In an era where modern web applications require mandatory account registrations, intrusive email tracking, subscription lock-ins, and cloud data collection, <strong>{BRAND.productName}</strong> was designed with a fundamentally different philosophy: <em>your career data belongs entirely to you.</em>
          </p>
          <p style={{ color: "#334155", lineHeight: 1.7, margin: 0 }}>
            Whether you are a college student writing your very first internship application, a seasoned software architect, an executive leader, or an academic researcher, you deserve a fast, reliable, beautiful, and distraction-free tool to present your skills to the world.
          </p>
        </div>

        {/* Card 2: Technical Principles */}
        <div className="card" style={{ padding: "32px" }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--color-navy)", marginBottom: "18px" }}>
            Guiding Technical Principles
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            {[
              {
                icon: ShieldCheck,
                title: "100% In-Browser Execution",
                desc: "No custom backend, no Firebase, no cloud databases, and zero analytics trackers. Every single calculation happens on your local device."
              },
              {
                icon: Cpu,
                title: "No AI APIs or Fake Magic",
                desc: "We do not send your confidential resume information to third-party AI APIs. All suggestions are curated, offline reference templates."
              },
              {
                icon: Layers,
                title: "18 True Layouts",
                desc: "18 genuinely distinct document layouts spanning ATS-friendly formats, modern two-column designs, and formal academic CVs."
              },
              {
                icon: FileCheck,
                title: "High-Fidelity PDF Engine",
                desc: "Standard A4 vector output engineered with strict pagebreak logic so your text is crisp, selectable, and never cut off between pages."
              }
            ].map((principle, idx) => {
              const Icon = principle.icon;
              return (
                <div key={idx} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      backgroundColor: "rgba(54, 95, 173, 0.1)",
                      color: "var(--color-royal-blue)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <h4 style={{ margin: "0 0 4px 0", fontSize: "1rem", color: "var(--color-navy)" }}>
                      {principle.title}
                    </h4>
                    <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                      {principle.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Card 3: About Damayanti Technologies & Damayanti Crest */}
        <div className="card" style={{ padding: "32px", backgroundColor: "#FAFBFD" }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--color-navy)", marginBottom: "12px" }}>
            About the Creators
          </h2>
          <p style={{ color: "#334155", lineHeight: 1.7, marginBottom: "16px" }}>
            <strong>{BRAND.parentCompany}</strong> is a forward-thinking technology enterprise specializing in high-performance digital products, modern frontend platforms, and user-centric software tools.
          </p>
          <p style={{ color: "#334155", lineHeight: 1.7, marginBottom: "20px" }}>
            Under the umbrella of <strong>{BRAND.parentBrand}</strong>, our products adhere to the highest benchmarks of visual elegance, performance, and ethical data privacy.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link to="/templates" className="btn btn-primary btn-sm">
              Explore Templates <ArrowRight size={14} />
            </Link>
            <Link to="/privacy" className="btn btn-outline btn-sm">
              Read Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
