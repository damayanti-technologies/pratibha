import React from "react";
import { TEMPLATES } from "../templates/templateRegistry";
import {
  Palette,
  Type,
  Maximize2,
  Sliders,
  Eye,
  EyeOff,
  RotateCcw,
  Sparkles
} from "lucide-react";

const PALETTE = [
  { name: "Deep Navy", hex: "#17243B" },
  { name: "Royal Blue", hex: "#365FAD" },
  { name: "Damayanti Gold", hex: "#C5A46D" },
  { name: "Charcoal Slate", hex: "#242A35" },
  { name: "Emerald Teal", hex: "#0D9488" },
  { name: "Burgundy Ruby", hex: "#9F1239" },
  { name: "Indigo Modern", hex: "#4338CA" },
  { name: "Forest Green", hex: "#166534" }
];

const FONTS = [
  { name: "Inter (Modern ATS)", value: "Inter, sans-serif" },
  { name: "Plus Jakarta Sans", value: "'Plus Jakarta Sans', sans-serif" },
  { name: "Outfit (Creative & Bold)", value: "Outfit, sans-serif" },
  { name: "Roboto (Clean Standard)", value: "Roboto, sans-serif" },
  { name: "Merriweather (Classic Serif)", value: "Merriweather, Georgia, serif" },
  { name: "Playfair (Editorial Luxury)", value: "'Playfair Display', serif" },
  { name: "JetBrains Mono (Developer)", value: "'JetBrains Mono', monospace" }
];

const SECTIONS = [
  { key: "summary", label: "Professional Summary" },
  { key: "experience", label: "Work Experience" },
  { key: "education", label: "Education" },
  { key: "skills", label: "Skills Matrix" },
  { key: "projects", label: "Projects & Demos" },
  { key: "internships", label: "Internships" },
  { key: "certifications", label: "Certifications" },
  { key: "achievements", label: "Achievements & Honors" },
  { key: "volunteerExperience", label: "Volunteer Experience" },
  { key: "publications", label: "Publications & Research" },
  { key: "awards", label: "Awards & Recognition" },
  { key: "hobbies", label: "Interests & Hobbies" },
  { key: "references", label: "References" }
];

export default function CustomizerPanel({
  resume,
  setTemplate,
  setAccentColor,
  setFontFamily,
  setFontSize,
  toggleSectionVisibility,
  loadSampleData,
  clearToBlank
}) {
  return (
    <div className="card" style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Template Switcher */}
      <div>
        <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Sliders size={15} style={{ color: "var(--color-royal-blue)" }} />
          <span>Active Template Layout</span>
        </label>
        <select
          className="form-control"
          value={resume.selectedTemplate}
          onChange={(e) => setTemplate(e.target.value)}
        >
          {TEMPLATES.map((tmpl) => (
            <option key={tmpl.id} value={tmpl.id}>
              {tmpl.name} ({tmpl.category})
            </option>
          ))}
        </select>
      </div>

      {/* Accent Color Palette */}
      <div>
        <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Palette size={15} style={{ color: "var(--color-royal-blue)" }} />
          <span>Accent Color Theme</span>
        </label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
          {PALETTE.map((color) => {
            const isSelected = resume.accentColor?.toLowerCase() === color.hex.toLowerCase();
            return (
              <button
                key={color.hex}
                type="button"
                onClick={() => setAccentColor(color.hex)}
                title={color.name}
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  backgroundColor: color.hex,
                  border: isSelected ? "3px solid #FFFFFF" : "1px solid rgba(0,0,0,0.15)",
                  boxShadow: isSelected ? `0 0 0 2px ${color.hex}` : "none",
                  cursor: "pointer",
                  transition: "transform 0.15s ease"
                }}
              />
            );
          })}
          {/* Custom Hex Color Picker input */}
          <input
            type="color"
            value={resume.accentColor || "#17243B"}
            onChange={(e) => setAccentColor(e.target.value)}
            title="Custom Hex Color"
            style={{
              width: "30px",
              height: "30px",
              padding: "0",
              border: "1px solid var(--color-border)",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          />
        </div>
      </div>

      {/* Typography Selector */}
      <div>
        <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Type size={15} style={{ color: "var(--color-royal-blue)" }} />
          <span>Font Family</span>
        </label>
        <select
          className="form-control"
          value={resume.fontFamily || "Inter, sans-serif"}
          onChange={(e) => setFontFamily(e.target.value)}
        >
          {FONTS.map((font) => (
            <option key={font.value} value={font.value}>
              {font.name}
            </option>
          ))}
        </select>
      </div>

      {/* Font Size Selector */}
      <div>
        <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Maximize2 size={15} style={{ color: "var(--color-royal-blue)" }} />
          <span>Document Density & Font Size</span>
        </label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
          {[
            { id: "small", label: "Compact (8.5pt)" },
            { id: "medium", label: "Standard (9.5pt)" },
            { id: "large", label: "Spacious (10.5pt)" }
          ].map((size) => (
            <button
              key={size.id}
              type="button"
              className={`btn btn-sm ${resume.fontSize === size.id ? "btn-primary" : "btn-outline"}`}
              onClick={() => setFontSize(size.id)}
              style={{ justifyContent: "center" }}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>

      {/* Section Visibility Toggles */}
      <div>
        <label className="form-label" style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "10px" }}>
          <Eye size={15} style={{ color: "var(--color-royal-blue)" }} />
          <span>Section Visibility</span>
        </label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "6px", maxHeight: "180px", overflowY: "auto", paddingRight: "4px" }}>
          {SECTIONS.map((sec) => {
            const isVisible = resume.sectionVisibility?.[sec.key] !== false;
            return (
              <div
                key={sec.key}
                onClick={() => toggleSectionVisibility(sec.key)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "6px 10px",
                  backgroundColor: isVisible ? "#F8FAFC" : "#F1F5F9",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  color: isVisible ? "var(--color-navy)" : "#94A3B8"
                }}
              >
                <span>{sec.label}</span>
                {isVisible ? <Eye size={15} color="#10B981" /> : <EyeOff size={15} color="#94A3B8" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Reset & Sample Helpers */}
      <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "14px", display: "flex", gap: "8px" }}>
        <button
          type="button"
          onClick={loadSampleData}
          className="btn btn-outline btn-sm"
          style={{ flex: 1, justifyContent: "center" }}
          title="Fill with professional sample data"
        >
          <Sparkles size={14} /> Sample Data
        </button>
        <button
          type="button"
          onClick={clearToBlank}
          className="btn btn-ghost btn-sm"
          style={{ flex: 1, justifyContent: "center", border: "1px solid var(--color-border)" }}
          title="Clear all fields"
        >
          <RotateCcw size={14} /> Clear All
        </button>
      </div>
    </div>
  );
}
