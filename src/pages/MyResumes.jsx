import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAllResumes,
  createNewResume,
  duplicateResume,
  deleteResume,
  updateResumeTitle,
  initializeStorage
} from "../services/storage";
import {
  exportAllResumesBackup,
  exportSingleResumeJSON,
  importResumesFromJSON
} from "../services/backupService";
import { exportResumeToPdf } from "../services/pdfExport";
import ResumeCard from "../components/ResumeCard";
import Modal from "../components/Modal";
import Toast from "../components/Toast";
import TemplateRenderer from "../templates/TemplateRenderer";
import confetti from "canvas-confetti";
import {
  PlusCircle,
  FolderDown,
  FolderUp,
  Search,
  AlertTriangle,
  HardDrive,
  ShieldCheck,
  FileText
} from "lucide-react";

export default function MyResumes() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, title: "" });
  const [downloadingResume, setDownloadingResume] = useState(null);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  // Load resumes from IndexedDB
  const fetchResumes = async () => {
    setLoading(true);
    try {
      await initializeStorage();
      const list = await getAllResumes();
      setResumes(list);
    } catch (err) {
      console.error("Failed to load resumes:", err);
      setToast({ message: "Could not load resumes: " + err.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  // Create new resume
  const handleCreateNew = async () => {
    try {
      const created = await createNewResume("template01", "My Resume");
      navigate(`/editor/${created.id}`);
    } catch (err) {
      setToast({ message: "Failed to create resume: " + err.message, type: "error" });
    }
  };

  // Duplicate
  const handleDuplicate = async (id) => {
    try {
      await duplicateResume(id);
      setToast({ message: "Resume duplicated successfully!", type: "success" });
      await fetchResumes();
    } catch (err) {
      setToast({ message: "Duplication failed: " + err.message, type: "error" });
    }
  };

  // Rename
  const handleRename = async (id, newTitle) => {
    try {
      await updateResumeTitle(id, newTitle);
      setToast({ message: "Resume renamed!", type: "success" });
      await fetchResumes();
    } catch (err) {
      setToast({ message: "Rename failed: " + err.message, type: "error" });
    }
  };

  // Confirm delete modal
  const openDeleteModal = (id, title) => {
    setDeleteModal({ isOpen: true, id, title });
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteResume(deleteModal.id);
      setDeleteModal({ isOpen: false, id: null, title: "" });
      setToast({ message: "Resume deleted.", type: "info" });
      await fetchResumes();
    } catch (err) {
      setToast({ message: "Delete failed: " + err.message, type: "error" });
    }
  };

  // Direct download PDF
  const handleDownload = async (resume) => {
    setDownloadingResume(resume);
    setToast({ message: "Generating PDF file...", type: "info" });

    // Allow hidden render element to mount in DOM
    setTimeout(async () => {
      try {
        const res = await exportResumeToPdf("hidden-resume-exporter", resume);
        confetti({ particleCount: 60, spread: 50, origin: { y: 0.8 } });
        setToast({ message: `Downloaded ${res.filename}!`, type: "success" });
      } catch (err) {
        setToast({ message: "PDF export failed: " + err.message, type: "error" });
      } finally {
        setDownloadingResume(null);
      }
    }, 150);
  };

  // Export full JSON backup
  const handleExportBackup = async () => {
    try {
      const res = await exportAllResumesBackup();
      setToast({ message: `Exported ${res.count} resumes to JSON backup file!`, type: "success" });
    } catch (err) {
      setToast({ message: err.message, type: "error" });
    }
  };

  // Import JSON backup
  const handleImportFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const res = await importResumesFromJSON(file);
      setToast({ message: `Successfully imported ${res.count} resumes!`, type: "success" });
      await fetchResumes();
    } catch (err) {
      setToast({ message: err.message, type: "error" });
    } finally {
      e.target.value = "";
    }
  };

  const filteredResumes = resumes.filter((r) =>
    (r.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (r.personal?.fullName || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container" style={{ padding: "40px 20px 80px 20px" }}>
      {/* Header & Local Storage Info Banner */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <span className="badge badge-gold" style={{ marginBottom: "8px" }}>
            Local Workspace
          </span>
          <h1 style={{ fontSize: "2.4rem", fontWeight: 800, color: "var(--color-navy)", letterSpacing: "-0.5px" }}>
            My Resumes
          </h1>
          <p style={{ color: "var(--text-muted)", margin: "4px 0 0 0", fontSize: "1rem" }}>
            Manage, duplicate, and export your resumes stored privately in this browser.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button onClick={handleExportBackup} className="btn btn-outline btn-sm" title="Download JSON backup">
            <FolderDown size={15} /> Backup All (JSON)
          </button>

          <label className="btn btn-outline btn-sm" style={{ cursor: "pointer" }} title="Import from JSON file">
            <FolderUp size={15} /> Import Backup
            <input type="file" accept=".json" onChange={handleImportFile} style={{ display: "none" }} />
          </label>

          <button onClick={handleCreateNew} className="btn btn-gold btn-sm">
            <PlusCircle size={16} /> Create Resume
          </button>
        </div>
      </div>

      {/* Privacy & Storage Transparency Card */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          backgroundColor: "#F8FAFC",
          border: "1px solid #E2E8F0",
          borderRadius: "8px",
          padding: "12px 16px",
          marginBottom: "28px",
          fontSize: "0.85rem",
          color: "#475569"
        }}
      >
        <HardDrive size={18} color="var(--color-royal-blue)" style={{ flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <strong>Browser Storage Guarantee:</strong> Resumes are stored directly in your browser's IndexedDB on this device. No data is ever transmitted to cloud servers. Use the <em>Backup All (JSON)</em> button to transfer your resumes across devices or safeguard your work.
        </div>
      </div>

      {/* Search Input Bar */}
      {resumes.length > 0 && (
        <div style={{ marginBottom: "24px", maxWidth: "360px", position: "relative" }}>
          <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input
            type="text"
            className="form-control"
            placeholder="Search saved resumes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: "36px", fontSize: "0.9rem" }}
          />
        </div>
      )}

      {/* Resumes Grid */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-muted)" }}>
          Loading saved resumes...
        </div>
      ) : filteredResumes.length === 0 ? (
        <div
          className="card"
          style={{
            padding: "60px 20px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "14px",
            color: "var(--text-muted)"
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              backgroundColor: "rgba(54, 95, 173, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-royal-blue)"
            }}
          >
            <FileText size={28} />
          </div>
          <h3 style={{ margin: 0, fontSize: "1.25rem", color: "var(--color-navy)" }}>
            {searchQuery ? "No matching resumes found" : "No resumes saved yet"}
          </h3>
          <p style={{ maxWidth: "420px", margin: 0, fontSize: "0.92rem", lineHeight: 1.5 }}>
            {searchQuery
              ? `No resumes match your query "${searchQuery}".`
              : "Create your first professional resume in minutes, or import an existing backup file."}
          </p>
          <button onClick={handleCreateNew} className="btn btn-primary" style={{ marginTop: "8px" }}>
            <PlusCircle size={16} /> Create Your First Resume
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
            gap: "24px"
          }}
        >
          {filteredResumes.map((res) => (
            <ResumeCard
              key={res.id}
              resume={res}
              onDuplicate={handleDuplicate}
              onDelete={openDeleteModal}
              onDownload={handleDownload}
              onRename={handleRename}
            />
          ))}
        </div>
      )}

      {/* Hidden Mount Container for Direct PDF Export from Dashboard */}
      {downloadingResume && (
        <div style={{ position: "fixed", left: "-9999px", top: 0 }}>
          <TemplateRenderer resume={downloadingResume} id="hidden-resume-exporter" />
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null, title: "" })}
        title="Confirm Deletion"
        maxWidth="420px"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#DC2626" }}>
            <AlertTriangle size={24} />
            <span style={{ fontWeight: 600, fontSize: "1rem" }}>
              Are you sure you want to delete this resume?
            </span>
          </div>
          <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
            You are about to permanently delete "<strong>{deleteModal.title}</strong>". This action cannot be undone.
          </p>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
            <button
              onClick={() => setDeleteModal({ isOpen: false, id: null, title: "" })}
              className="btn btn-outline btn-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              className="btn btn-danger btn-sm"
            >
              Delete Resume
            </button>
          </div>
        </div>
      </Modal>

      {/* Toast Notification */}
      {toast && <Toast toast={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
