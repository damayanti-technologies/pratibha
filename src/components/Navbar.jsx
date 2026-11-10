import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BRAND } from "../brandConfig";
import { createNewResume } from "../services/storage";
import {
  FileText,
  LayoutGrid,
  FolderKanban,
  Info,
  ShieldCheck,
  PlusCircle,
  Menu,
  X
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleCreateNew = async () => {
    try {
      const newResume = await createNewResume("template01", "My Resume");
      setMobileMenuOpen(false);
      navigate(`/editor/${newResume.id}`);
    } catch (e) {
      console.error("Create resume error:", e);
      navigate("/templates");
    }
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header
      style={{
        backgroundColor: "var(--color-navy)",
        color: "#FFFFFF",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "70px"
        }}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            color: "#FFFFFF"
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              backgroundColor: "var(--color-gold)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-navy)",
              fontWeight: 800,
              fontSize: "1.1rem",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
            }}
          >
            D
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "0.2px", lineHeight: 1.1 }}>
              {BRAND.productName}
            </div>
            <div style={{ fontSize: "0.72rem", color: "var(--color-gold)", fontWeight: 500 }}>
              {BRAND.footerTagline}
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px"
          }}
          className="desktop-nav"
        >
          <NavLink
            to="/"
            end
            style={({ isActive }) => ({
              color: isActive ? "var(--color-gold)" : "#E2E8F0",
              fontWeight: isActive ? 700 : 500,
              fontSize: "0.95rem",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            })}
          >
            Home
          </NavLink>

          <NavLink
            to="/templates"
            style={({ isActive }) => ({
              color: isActive ? "var(--color-gold)" : "#E2E8F0",
              fontWeight: isActive ? 700 : 500,
              fontSize: "0.95rem",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            })}
          >
            <LayoutGrid size={16} />
            Templates
          </NavLink>

          <NavLink
            to="/my-resumes"
            style={({ isActive }) => ({
              color: isActive ? "var(--color-gold)" : "#E2E8F0",
              fontWeight: isActive ? 700 : 500,
              fontSize: "0.95rem",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            })}
          >
            <FolderKanban size={16} />
            My Resumes
          </NavLink>

          <NavLink
            to="/about"
            style={({ isActive }) => ({
              color: isActive ? "var(--color-gold)" : "#E2E8F0",
              fontWeight: isActive ? 700 : 500,
              fontSize: "0.95rem",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            })}
          >
            <Info size={16} />
            About
          </NavLink>

          {/* Create Resume CTA Button */}
          <button
            onClick={handleCreateNew}
            className="btn btn-gold"
            style={{
              padding: "8px 18px",
              fontSize: "0.9rem",
              cursor: "pointer"
            }}
          >
            <PlusCircle size={17} />
            Create Resume
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          style={{
            background: "none",
            border: "none",
            color: "#FFFFFF",
            cursor: "pointer",
            padding: "8px",
            display: "none"
          }}
          className="mobile-hamburger-btn"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: "var(--color-navy-dark)",
            padding: "16px 20px 24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            flexDirection: "column",
            gap: "16px"
          }}
          className="mobile-drawer"
        >
          <NavLink
            to="/"
            end
            onClick={closeMenu}
            style={{ color: "#F8FAFC", fontSize: "1.05rem", fontWeight: 600, padding: "8px 0" }}
          >
            Home
          </NavLink>
          <NavLink
            to="/templates"
            onClick={closeMenu}
            style={{ color: "#F8FAFC", fontSize: "1.05rem", fontWeight: 600, padding: "8px 0" }}
          >
            Templates Gallery (18)
          </NavLink>
          <NavLink
            to="/my-resumes"
            onClick={closeMenu}
            style={{ color: "#F8FAFC", fontSize: "1.05rem", fontWeight: 600, padding: "8px 0" }}
          >
            My Resumes
          </NavLink>
          <NavLink
            to="/about"
            onClick={closeMenu}
            style={{ color: "#F8FAFC", fontSize: "1.05rem", fontWeight: 600, padding: "8px 0" }}
          >
            About & Philosophy
          </NavLink>
          <NavLink
            to="/privacy"
            onClick={closeMenu}
            style={{ color: "#F8FAFC", fontSize: "1.05rem", fontWeight: 600, padding: "8px 0" }}
          >
            Privacy Guarantee
          </NavLink>
          <button
            onClick={handleCreateNew}
            className="btn btn-gold"
            style={{ width: "100%", justifyContent: "center", marginTop: "8px", padding: "12px" }}
          >
            <PlusCircle size={18} />
            Create New Resume
          </button>
        </div>
      )}

      {/* Responsive media styling for navbar */}
      <style>{`
        @media (max-width: 860px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-hamburger-btn {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
