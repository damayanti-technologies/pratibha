import React from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight, Eye } from "lucide-react";

export default function TemplateCard({
  template,
  isSelected = false,
  onSelect,
  onPreview,
  showUseButton = true
}) {
  return (
    <div
      className="card"
      style={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        border: isSelected ? "2px solid var(--color-royal-blue)" : "1px solid var(--color-border)",
        boxShadow: isSelected ? "0 8px 24px rgba(54, 95, 173, 0.18)" : "var(--shadow-card)",
        position: "relative"
      }}
    >
      {/* Category Pill Tag */}
      <div style={{ position: "absolute", top: "12px", right: "12px", zIndex: 2 }}>
        <span
          className="badge"
          style={{
            backgroundColor: "rgba(23, 36, 59, 0.85)",
            color: "#FFFFFF",
            backdropFilter: "blur(4px)",
            fontSize: "0.75rem",
            padding: "4px 8px"
          }}
        >
          {template.category}
        </span>
      </div>

      {/* Mini Mockup Visual Preview */}
      <div
        style={{
          height: "220px",
          backgroundColor: "#F1F5F9",
          borderBottom: "1px solid var(--color-border)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: onPreview ? "pointer" : "default"
        }}
        onClick={onPreview ? () => onPreview(template) : undefined}
      >
        {/* Miniature document card representation */}
        <div
          style={{
            width: "160px",
            height: "210px",
            backgroundColor: "#FFFFFF",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            borderRadius: "2px",
            padding: "10px",
            transform: "translateY(16px)",
            display: "flex",
            flexDirection: "column",
            gap: "6px"
          }}
        >
          {/* Header block preview */}
          <div
            style={{
              height: "18px",
              backgroundColor: template.defaultColor || "#17243B",
              borderRadius: "2px",
              opacity: 0.9
            }}
          />
          {/* Mock lines */}
          <div style={{ width: "85%", height: "4px", backgroundColor: "#CBD5E1", borderRadius: "1px" }} />
          <div style={{ width: "60%", height: "3px", backgroundColor: "#E2E8F0", borderRadius: "1px" }} />

          <div style={{ margin: "4px 0", borderBottom: `1px solid ${template.defaultColor || "#365FAD"}` }} />

          {/* Section preview lines */}
          <div style={{ display: "flex", gap: "4px" }}>
            <div style={{ width: "40%", height: "4px", backgroundColor: template.defaultColor || "#365FAD" }} />
          </div>
          <div style={{ width: "100%", height: "3px", backgroundColor: "#E2E8F0" }} />
          <div style={{ width: "90%", height: "3px", backgroundColor: "#E2E8F0" }} />
          <div style={{ width: "75%", height: "3px", backgroundColor: "#E2E8F0" }} />

          <div style={{ margin: "3px 0", borderBottom: "1px solid #E2E8F0" }} />

          <div style={{ width: "45%", height: "4px", backgroundColor: template.defaultColor || "#365FAD" }} />
          <div style={{ width: "95%", height: "3px", backgroundColor: "#E2E8F0" }} />
          <div style={{ width: "80%", height: "3px", backgroundColor: "#E2E8F0" }} />
        </div>

        {/* Hover preview prompt */}
        {onPreview && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(23, 36, 59, 0.4)",
              opacity: 0,
              transition: "opacity 0.2s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              gap: "6px",
              fontWeight: 600,
              fontSize: "0.9rem"
            }}
            className="template-preview-overlay"
          >
            <Eye size={18} />
            <span>Click to Preview</span>
          </div>
        )}
      </div>

      {/* Card Info & Actions */}
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", flex: 1 }}>
        <h3 style={{ margin: "0 0 6px 0", fontSize: "1.1rem", fontWeight: 700, color: "var(--color-navy)" }}>
          {template.name}
        </h3>
        <p style={{ margin: "0 0 12px 0", fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.4, flex: 1 }}>
          {template.description}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "14px" }}>
          {template.tags?.map((tag, idx) => (
            <span
              key={idx}
              style={{
                fontSize: "0.72rem",
                padding: "2px 6px",
                backgroundColor: "#F1F5F9",
                borderRadius: "3px",
                color: "#475569",
                fontWeight: 500
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        {showUseButton && (
          <div style={{ display: "flex", gap: "8px" }}>
            {onSelect ? (
              <button
                onClick={() => onSelect(template.id)}
                className={`btn ${isSelected ? "btn-accent" : "btn-primary"}`}
                style={{ width: "100%", justifyContent: "center" }}
              >
                {isSelected ? (
                  <>
                    <Check size={16} /> Selected
                  </>
                ) : (
                  <>
                    Use Template <ArrowRight size={15} />
                  </>
                )}
              </button>
            ) : (
              <Link
                to={`/editor/new?template=${template.id}`}
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                Use Template <ArrowRight size={15} />
              </Link>
            )}
          </div>
        )}
      </div>

      <style>{`
        .card:hover .template-preview-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
