import React from "react";
import { Link } from "react-router-dom";
import { BRAND } from "../brandConfig";
import { Shield, Sparkles, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--color-navy)",
        color: "#E2E8F0",
        marginTop: "auto",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        padding: "48px 0 28px 0"
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "36px",
            marginBottom: "36px"
          }}
        >
          {/* Brand Info */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: "var(--color-gold)",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-navy)",
                  fontWeight: 800,
                  fontSize: "1rem"
                }}
              >
                D
              </div>
              <span style={{ fontWeight: 800, fontSize: "1.15rem", color: "#FFFFFF" }}>
                {BRAND.productName}
              </span>
            </div>
            <p style={{ fontSize: "0.9rem", color: "#94A3B8", lineHeight: 1.6, marginBottom: "12px" }}>
              A privacy-first, 100% in-browser resume creation studio engineered by{" "}
              <strong style={{ color: "#FFFFFF" }}>{BRAND.parentCompany}</strong> and{" "}
              <strong style={{ color: "var(--color-gold)" }}>{BRAND.footerTagline}</strong>.
            </p>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.82rem",
                color: "#10B981",
                background: "rgba(16, 185, 129, 0.1)",
                padding: "4px 10px",
                borderRadius: "999px"
              }}
            >
              <Shield size={14} />
              <span>100% Client-Side • Zero Cloud Tracking</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 style={{ color: "var(--color-gold)", fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>
              Quick Navigation
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.92rem" }}>
              <li>
                <Link to="/" style={{ color: "#CBD5E1" }}>Home</Link>
              </li>
              <li>
                <Link to="/templates" style={{ color: "#CBD5E1" }}>18 Resume Templates</Link>
              </li>
              <li>
                <Link to="/my-resumes" style={{ color: "#CBD5E1" }}>My Resumes Dashboard</Link>
              </li>
              <li>
                <Link to="/about" style={{ color: "#CBD5E1" }}>About Damayanti Technologies</Link>
              </li>
              <li>
                <Link to="/privacy" style={{ color: "#CBD5E1" }}>Privacy Policy & Guarantees</Link>
              </li>
            </ul>
          </div>

          {/* Templates Categories */}
          <div>
            <h4 style={{ color: "var(--color-gold)", fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>
              Template Categories
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.88rem", color: "#94A3B8" }}>
              <li>• ATS-Friendly Resumes (5 Designs)</li>
              <li>• Modern Two-Column Layouts (4 Designs)</li>
              <li>• Professional & Executive (4 Designs)</li>
              <li>• Creative & Portfolio (3 Designs)</li>
              <li>• Academic CV & Research (2 Designs)</li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h4 style={{ color: "var(--color-gold)", fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>
              About The Creator
            </h4>
            <p style={{ fontSize: "0.88rem", color: "#94A3B8", lineHeight: 1.6, marginBottom: "12px" }}>
              Developed by <strong>{BRAND.parentCompany}</strong> under the visionary leadership of <strong>{BRAND.parentBrand}</strong>.
            </p>
            <p style={{ fontSize: "0.85rem", color: "#64748B" }}>
              Repository: <code>damayanti-technologies/pratibha</code>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
            fontSize: "0.85rem",
            color: "#94A3B8"
          }}
        >
          <div>
            © {BRAND.copyrightYear} <strong>{BRAND.parentCompany}</strong>. All rights reserved.
          </div>
          <div style={{ color: "var(--color-gold)", fontWeight: 600 }}>
            {BRAND.footerTagline}
          </div>
        </div>
      </div>
    </footer>
  );
}
