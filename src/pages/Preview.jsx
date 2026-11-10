import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useResume } from "../hooks/useResume";
import { exportResumeToPdf, printResumeDocument } from "../services/pdfExport";
import TemplateRenderer from "../templates/TemplateRenderer";
import Toast from "../components/Toast";
import confetti from "canvas-confetti";
import {
  Download,
  Printer,
  ArrowLeft,
  ZoomIn,
  ZoomOut,
  Edit3
} from "lucide-react";

export default function Preview() {
  const { id } = useParams();
  const { resume, loading } = useResume(id);
  const [zoom, setZoom] = useState(0.9);
  const [isExporting, setIsExporting] = useState(false);
  const [toast, setToast] = useState(null);

  if (loading || !resume) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        Loading resume preview...
      </div>
    );
  }

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const res = await exportResumeToPdf("full-page-preview-doc", resume);
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.8 } });
      setToast({ message: `Downloaded ${res.filename}!`, type: "success" });
    } catch (err) {
      setToast({ message: "Export failed: " + err.message, type: "error" });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "calc(100vh - 70px)", backgroundColor: "#E2E8F0" }}>
      {/* Top Floating Control Bar */}
      <div
        className="no-print"
        style={{
          height: "60px",
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid var(--color-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          position: "sticky",
          top: 0,
          zIndex: 50
        }}
      >
        <Link to={`/editor/${resume.id}`} className="btn btn-outline btn-sm">
          <ArrowLeft size={16} /> Back to Editor
        </Link>

        {/* Zoom Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.85rem", color: "var(--text-primary)" }}>
          <button
            onClick={() => setZoom((z) => Math.max(0.6, z - 0.1))}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}
          >
            <ZoomOut size={16} />
          </button>
          <span>{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => setZoom((z) => Math.min(1.3, z + 0.1))}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex" }}
          >
            <ZoomIn size={16} />
          </button>
        </div>

        {/* Export Buttons */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={printResumeDocument} className="btn btn-outline btn-sm">
            <Printer size={15} /> Print
          </button>
          <button onClick={handleExportPDF} disabled={isExporting} className="btn btn-gold btn-sm">
            <Download size={15} /> {isExporting ? "Exporting..." : "Download PDF"}
          </button>
        </div>
      </div>

      {/* Document View */}
      <div style={{ padding: "40px 16px", overflowX: "auto", display: "flex", justifyContent: "center" }}>
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top center",
            transition: "transform 0.15s ease"
          }}
        >
          <TemplateRenderer resume={resume} id="full-page-preview-doc" />
        </div>
      </div>

      {toast && <Toast toast={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
