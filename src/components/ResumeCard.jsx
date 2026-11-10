import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formatRelativeTime } from "../utils/formatting";
import { getTemplateById } from "../templates/templateRegistry";
import {
  Edit3,
  Copy,
  Download,
  Trash2,
  Calendar,
  Layers,
  Check,
  X
} from "lucide-react";

export default function ResumeCard({
  resume,
  onDuplicate,
  onDelete,
  onDownload,
  onRename
}) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(resume.title || "Untitled Resume");

  const templateConfig = getTemplateById(resume.selectedTemplate);

  const handleSaveTitle = () => {
    if (newTitle.trim()) {
      onRename(resume.id, newTitle.trim());
    }
    setIsEditingTitle(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSaveTitle();
    if (e.key === "Escape") {
      setNewTitle(resume.title || "Untitled Resume");
      setIsEditingTitle(false);
    }
  };

  return (
    <div
      className="card"
      style={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        border: "1px solid var(--color-border)",
        transition: "all 0.2s ease"
      }}
    >
      {/* Top Graphic Header */}
      <div
        style={{
          height: "120px",
          background: `linear-gradient(135deg, ${templateConfig.defaultColor || "#17243B"} 0%, #0F172A 100%)`,
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "#FFFFFF",
          position: "relative"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span
            className="badge"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "#FFFFFF",
              fontSize: "0.75rem"
            }}
          >
            <Layers size={12} style={{ marginRight: "4px" }} />
            {templateConfig.name}
          </span>
        </div>

        <div>
          <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FFFFFF" }}>
            {resume.personal?.fullName || "Unnamed Candidate"}
          </div>
          <div style={{ fontSize: "0.82rem", color: "rgba(255, 255, 255, 0.8)" }}>
            {resume.personal?.professionalTitle || "No title specified"}
          </div>
        </div>
      </div>

      {/* Card Content & Title Edit */}
      <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Editable Title */}
        <div style={{ marginBottom: "10px" }}>
          {isEditingTitle ? (
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <input
                type="text"
                className="form-control"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
                style={{ padding: "4px 8px", fontSize: "0.95rem" }}
              />
              <button
                onClick={handleSaveTitle}
                aria-label="Save title"
                style={{ background: "none", border: "none", color: "#10B981", cursor: "pointer", padding: "4px" }}
              >
                <Check size={18} />
              </button>
              <button
                onClick={() => {
                  setNewTitle(resume.title || "Untitled Resume");
                  setIsEditingTitle(false);
                }}
                aria-label="Cancel"
                style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", padding: "4px" }}
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h3
                style={{
                  margin: 0,
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "var(--color-navy)",
                  cursor: "pointer",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "85%"
                }}
                onClick={() => setIsEditingTitle(true)}
                title="Click to rename"
              >
                {resume.title || "Untitled Resume"}
              </h3>
              <button
                onClick={() => setIsEditingTitle(true)}
                title="Rename resume"
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  padding: "4px"
                }}
              >
                <Edit3 size={15} />
              </button>
            </div>
          )}
        </div>

        {/* Timestamp */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "16px" }}>
          <Calendar size={13} />
          <span>Updated {formatRelativeTime(resume.updatedAt)}</span>
        </div>

        {/* Action Buttons Grid */}
        <div style={{ marginTop: "auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
          <Link
            to={`/editor/${resume.id}`}
            className="btn btn-primary btn-sm"
            style={{ width: "100%", justifyContent: "center" }}
          >
            <Edit3 size={14} /> Edit
          </Link>

          <button
            onClick={() => onDownload(resume)}
            className="btn btn-outline btn-sm"
            style={{ width: "100%", justifyContent: "center" }}
            title="Download PDF"
          >
            <Download size={14} /> PDF
          </button>

          <button
            onClick={() => onDuplicate(resume.id)}
            className="btn btn-ghost btn-sm"
            style={{ width: "100%", justifyContent: "center", border: "1px solid var(--color-border)" }}
            title="Duplicate resume"
          >
            <Copy size={14} /> Duplicate
          </button>

          <button
            onClick={() => onDelete(resume.id, resume.title)}
            className="btn btn-danger btn-sm"
            style={{ width: "100%", justifyContent: "center" }}
            title="Delete resume"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
