import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BRAND } from "../brandConfig";
import { TEMPLATES } from "../templates/templateRegistry";
import { createNewResume } from "../services/storage";
import TemplateCard from "../components/TemplateCard";
import {
  FileText,
  Sliders,
  Download,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Smartphone,
  Eye,
  Layers,
  Sparkles,
  Lock,
  Cpu
} from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  const handleStartResume = async (templateId = "template01") => {
    try {
      const newResume = await createNewResume(templateId, "My Resume");
      navigate(`/editor/${newResume.id}`);
    } catch (e) {
      navigate(`/editor/new?template=${templateId}`);
    }
  };

  // Select 6 featured templates across diverse categories
  const featuredTemplates = [
    TEMPLATES[0], // Minimal ATS
    TEMPLATES[2], // Minimal Fresher
    TEMPLATES[5], // Modern Two-Column
    TEMPLATES[9], // Software Developer
    TEMPLATES[13], // Creative Portfolio
    TEMPLATES[16] // Academic CV
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "80px", paddingBottom: "60px" }}>
      {/* =========================================================================
          SECTION A: HERO SECTION
          ========================================================================= */}
      <section
        style={{
          background: "linear-gradient(180deg, var(--color-navy) 0%, #111D30 100%)",
          color: "#FFFFFF",
          padding: "70px 0 90px 0",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Subtle decorative background gradient circles */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "450px",
            height: "450px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(197, 164, 109, 0.12) 0%, transparent 70%)",
            pointerEvents: "none"
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(54, 95, 173, 0.15) 0%, transparent 70%)",
            pointerEvents: "none"
          }}
        />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 0.9fr",
              gap: "48px",
              alignItems: "center"
            }}
            className="hero-grid"
          >
            {/* Left Hero Content */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 14px",
                  borderRadius: "999px",
                  backgroundColor: "rgba(197, 164, 109, 0.15)",
                  border: "1px solid rgba(197, 164, 109, 0.3)",
                  color: "var(--color-gold)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  marginBottom: "20px"
                }}
              >
                <Sparkles size={14} />
                <span>{BRAND.productName} • {BRAND.footerTagline}</span>
              </div>

              <h1
                style={{
                  fontSize: "3.2rem",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: "-0.5px",
                  marginBottom: "18px",
                  color: "#FFFFFF"
                }}
                className="hero-title"
              >
                Create a Resume That{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #FFFFFF 0%, var(--color-gold) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}
                >
                  Opens Doors.
                </span>
              </h1>

              <p
                style={{
                  fontSize: "1.15rem",
                  lineHeight: 1.6,
                  color: "#CBD5E1",
                  marginBottom: "32px",
                  maxWidth: "540px"
                }}
              >
                {BRAND.subTagline} Built 100% in your browser with zero tracking, 18 tailored templates, and crisp vector PDF downloads.
              </p>

              {/* CTA Buttons */}
              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "32px" }}>
                <button
                  onClick={() => handleStartResume("template01")}
                  className="btn btn-gold btn-lg"
                  style={{ cursor: "pointer", boxShadow: "0 8px 20px rgba(197, 164, 109, 0.3)" }}
                >
                  <FileText size={18} />
                  <span>Create My Resume</span>
                  <ArrowRight size={16} />
                </button>

                <Link
                  to="/templates"
                  className="btn btn-outline btn-lg"
                  style={{
                    color: "#FFFFFF",
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    backgroundColor: "rgba(255, 255, 255, 0.05)"
                  }}
                >
                  <Layers size={18} />
                  <span>Explore 18 Templates</span>
                </Link>
              </div>

              {/* Guarantees */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", fontSize: "0.85rem", color: "#94A3B8" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <CheckCircle size={15} color="var(--color-gold)" />
                  <span>100% Free & No Sign-Up</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <ShieldCheck size={15} color="#10B981" />
                  <span>100% Local & Private</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <Download size={15} color="#60A5FA" />
                  <span>Instant Vector A4 PDF</span>
                </div>
              </div>
            </div>

            {/* Right Hero Graphic: Layered Resume Mockups */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative"
              }}
              className="hero-mockup-wrapper"
            >
              {/* Background Mockup Sheet 1 */}
              <div
                style={{
                  position: "absolute",
                  width: "240px",
                  height: "320px",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "8px",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                  transform: "rotate(-8deg) translate(-50px, -10px)",
                  padding: "16px",
                  opacity: 0.65,
                  pointerEvents: "none"
                }}
              >
                <div style={{ height: "14px", width: "40%", backgroundColor: "#365FAD", marginBottom: "8px" }} />
                <div style={{ height: "6px", width: "80%", backgroundColor: "#E2E8F0", marginBottom: "4px" }} />
                <div style={{ height: "6px", width: "60%", backgroundColor: "#E2E8F0" }} />
              </div>

              {/* Background Mockup Sheet 2 */}
              <div
                style={{
                  position: "absolute",
                  width: "240px",
                  height: "320px",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "8px",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                  transform: "rotate(6deg) translate(40px, 10px)",
                  padding: "16px",
                  opacity: 0.75,
                  pointerEvents: "none"
                }}
              >
                <div style={{ height: "14px", width: "50%", backgroundColor: "#17243B", marginBottom: "8px" }} />
                <div style={{ height: "6px", width: "70%", backgroundColor: "#E2E8F0", marginBottom: "4px" }} />
                <div style={{ height: "6px", width: "90%", backgroundColor: "#E2E8F0" }} />
              </div>

              {/* Foreground Centerpiece Mockup */}
              <div
                style={{
                  width: "270px",
                  height: "360px",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "10px",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.1)",
                  padding: "20px",
                  zIndex: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px"
                }}
              >
                {/* Header with avatar */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", borderBottom: "2px solid #17243B", paddingBottom: "10px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#C5A46D", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#17243B" }}>
                    R
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "#17243B" }}>Reshwanth Gangula</div>
                    <div style={{ fontSize: "0.72rem", color: "#365FAD", fontWeight: 600 }}>Senior Software Engineer</div>
                  </div>
                </div>

                {/* Section 1 */}
                <div>
                  <div style={{ width: "45%", height: "8px", backgroundColor: "#365FAD", borderRadius: "2px", marginBottom: "6px" }} />
                  <div style={{ width: "100%", height: "4px", backgroundColor: "#E2E8F0", borderRadius: "2px", marginBottom: "3px" }} />
                  <div style={{ width: "90%", height: "4px", backgroundColor: "#E2E8F0", borderRadius: "2px", marginBottom: "3px" }} />
                  <div style={{ width: "80%", height: "4px", backgroundColor: "#E2E8F0", borderRadius: "2px" }} />
                </div>

                {/* Section 2 */}
                <div>
                  <div style={{ width: "50%", height: "8px", backgroundColor: "#17243B", borderRadius: "2px", marginBottom: "6px" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                    <div style={{ width: "45%", height: "5px", backgroundColor: "#64748B" }} />
                    <div style={{ width: "25%", height: "5px", backgroundColor: "#94A3B8" }} />
                  </div>
                  <div style={{ width: "95%", height: "4px", backgroundColor: "#E2E8F0", borderRadius: "2px", marginBottom: "3px" }} />
                  <div style={{ width: "85%", height: "4px", backgroundColor: "#E2E8F0", borderRadius: "2px" }} />
                </div>

                {/* Skill Pills preview */}
                <div style={{ marginTop: "auto", display: "flex", gap: "4px", flexWrap: "wrap" }}>
                  {["React.js", "TypeScript", "Node.js", "Vite", "Cloud"].map((s, i) => (
                    <span key={i} style={{ fontSize: "0.62rem", padding: "2px 6px", backgroundColor: "rgba(54,95,173,0.1)", color: "#17243B", borderRadius: "3px", fontWeight: 600 }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION B: HOW IT WORKS (4 STEPS)
          ========================================================================= */}
      <section className="container">
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span className="badge badge-blue" style={{ marginBottom: "8px" }}>
            Effortless Workflow
          </span>
          <h2 style={{ fontSize: "2.3rem", fontWeight: 800, color: "var(--color-navy)", letterSpacing: "-0.5px" }}>
            Build Your Resume in 4 Simple Steps
          </h2>
          <p style={{ color: "var(--text-muted)", maxWidth: "580px", margin: "8px auto 0 auto", fontSize: "1rem" }}>
            A streamlined process engineered to get you from blank screen to a job-ready resume in minutes.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px"
          }}
        >
          {[
            {
              num: "01",
              title: "Choose a Template",
              desc: "Select from 18 recruiter-tested designs across ATS-friendly, Modern, Creative, and Academic categories.",
              icon: Layers
            },
            {
              num: "02",
              title: "Add Your Details",
              desc: "Fill in personal info, career summary, work history, skills, and projects with helpful local suggestions.",
              icon: FileText
            },
            {
              num: "03",
              title: "Customize Your Style",
              desc: "Adjust accent colors, select professional typography, configure section orders, and preview live.",
              icon: Sliders
            },
            {
              num: "04",
              title: "Download as PDF",
              desc: "Export standard high-resolution A4 vector PDF files with crisp text, clean pagination, and zero watermark.",
              icon: Download
            }
          ].map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="card"
                style={{
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  border: "1px solid var(--color-border)"
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    fontSize: "2rem",
                    fontWeight: 900,
                    color: "rgba(23, 36, 59, 0.08)"
                  }}
                >
                  {step.num}
                </div>

                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    backgroundColor: "rgba(54, 95, 173, 0.1)",
                    color: "var(--color-royal-blue)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px"
                  }}
                >
                  <Icon size={24} />
                </div>

                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "8px" }}>
                  {step.title}
                </h3>

                <p style={{ fontSize: "0.92rem", color: "var(--text-muted)", lineHeight: 1.5, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION C: FEATURED TEMPLATES
          ========================================================================= */}
      <section className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "36px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <span className="badge badge-gold" style={{ marginBottom: "8px" }}>
              Template Showcase
            </span>
            <h2 style={{ fontSize: "2.3rem", fontWeight: 800, color: "var(--color-navy)", letterSpacing: "-0.5px" }}>
              Featured Resume Templates
            </h2>
            <p style={{ color: "var(--text-muted)", margin: "4px 0 0 0", fontSize: "1rem" }}>
              Every template uses genuinely distinct layouts, typography, and visual structure.
            </p>
          </div>

          <Link to="/templates" className="btn btn-outline">
            <span>View All 18 Templates</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "28px"
          }}
        >
          {featuredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onSelect={() => handleStartResume(template.id)}
            />
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION D: FEATURES & CAPABILITIES
          ========================================================================= */}
      <section
        style={{
          backgroundColor: "#FFFFFF",
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
          padding: "70px 0"
        }}
      >
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "50px" }}>
            <span className="badge badge-navy" style={{ marginBottom: "8px" }}>
              Architecture & Benefits
            </span>
            <h2 style={{ fontSize: "2.3rem", fontWeight: 800, color: "var(--color-navy)", letterSpacing: "-0.5px" }}>
              Engineered for Privacy, Speed, and Quality
            </h2>
            <p style={{ color: "var(--text-muted)", maxWidth: "600px", margin: "8px auto 0 auto", fontSize: "1rem" }}>
              Designed without cloud trackers, mandatory registrations, or subscription paywalls.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "28px"
            }}
          >
            {[
              {
                icon: ShieldCheck,
                title: "100% Privacy-Focused",
                desc: "All personal details and resumes stay inside your browser storage. Zero server uploads or cloud databases."
              },
              {
                icon: Download,
                title: "Crisp Vector A4 PDF",
                desc: "Print-ready A4 exports formatted with precision margins, multi-page pagebreak intelligence, and selectable text."
              },
              {
                icon: Eye,
                title: "Live Real-Time Preview",
                desc: "Watch your resume update instantaneously as you type. Switch between templates anytime with zero data loss."
              },
              {
                icon: Smartphone,
                title: "Mobile-First Usability",
                desc: "Fully optimized for Android smartphones, tablets, and iPhones with touch-friendly controls and drawer navigation."
              },
              {
                icon: Lock,
                title: "No Account Mandatory",
                desc: "Start drafting immediately without being forced to create an account, verify an email, or enter credit card info."
              },
              {
                icon: Cpu,
                title: "IndexedDB Persistent Autosave",
                desc: "Your resumes autosave continuously into browser storage so you can close the tab and resume anytime."
              }
            ].map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    gap: "16px",
                    alignItems: "flex-start",
                    padding: "20px",
                    borderRadius: "12px",
                    backgroundColor: "#F8FAFC",
                    border: "1px solid #E2E8F0"
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "10px",
                      backgroundColor: "var(--color-navy)",
                      color: "var(--color-gold)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "6px" }}>
                      {feat.title}
                    </h3>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.5, margin: 0 }}>
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION E: CALL TO ACTION (CTA)
          ========================================================================= */}
      <section className="container">
        <div
          style={{
            background: "linear-gradient(135deg, var(--color-navy) 0%, #1E3A8A 100%)",
            color: "#FFFFFF",
            borderRadius: "20px",
            padding: "60px 30px",
            textAlign: "center",
            boxShadow: "0 20px 40px rgba(23, 36, 59, 0.2)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <div style={{ position: "relative", zIndex: 1, maxWidth: "680px", margin: "0 auto" }}>
            <span
              style={{
                display: "inline-block",
                padding: "4px 12px",
                borderRadius: "999px",
                backgroundColor: "rgba(197, 164, 109, 0.2)",
                color: "var(--color-gold)",
                fontWeight: 700,
                fontSize: "0.85rem",
                marginBottom: "16px",
                letterSpacing: "1px"
              }}
            >
              FREE & PRIVATE FOREVER
            </span>

            <h2 style={{ fontSize: "2.6rem", fontWeight: 800, marginBottom: "16px", letterSpacing: "-0.5px" }}>
              Your Next Opportunity Starts Here.
            </h2>

            <p style={{ fontSize: "1.1rem", color: "#CBD5E1", lineHeight: 1.6, marginBottom: "32px" }}>
              Empower your career journey with a polished, recruiter-approved resume crafted in minutes.
            </p>

            <button
              onClick={() => handleStartResume("template01")}
              className="btn btn-gold btn-lg"
              style={{
                padding: "16px 36px",
                fontSize: "1.1rem",
                cursor: "pointer",
                boxShadow: "0 10px 25px rgba(197, 164, 109, 0.35)"
              }}
            >
              <FileText size={20} />
              <span>Build Your Resume</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-grid > div:first-child {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-title {
            font-size: 2.4rem !important;
          }
          .hero-mockup-wrapper {
            margin-top: 20px;
          }
        }
      `}</style>
    </div>
  );
}
