import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useResume } from "../hooks/useResume";
import { exportResumeToPdf, printResumeDocument } from "../services/pdfExport";
import confetti from "canvas-confetti";
import TemplateRenderer from "../templates/TemplateRenderer";
import CustomizerPanel from "../components/CustomizerPanel";
import Toast from "../components/Toast";
import {
  PersonalInfoForm,
  SummaryForm,
  EducationForm,
  ExperienceForm,
  SkillsForm,
  ProjectsForm,
  CertificationsAchievementsForm,
  AdditionalSectionsForm
} from "../components/EditorForms";
import {
  User,
  FileText,
  GraduationCap,
  Briefcase,
  Wrench,
  FolderGit2,
  Award,
  MoreHorizontal,
  Sliders,
  Download,
  Printer,
  Eye,
  CheckCircle2,
  Clock,
  ZoomIn,
  ZoomOut,
  Edit2,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from "lucide-react";

const SECTIONS = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "summary", label: "Summary", icon: FileText },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "certifications", label: "Certifications", icon: Award },
  { id: "additional", label: "More Info", icon: MoreHorizontal },
  { id: "design", label: "Design & Style", icon: Sliders }
];

export default function Editor() {
  const { id: routeId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("personal");
  const [mobileTab, setMobileTab] = useState("edit"); // "edit" | "preview"
  const [previewZoom, setPreviewZoom] = useState(0.85);
  const [isExporting, setIsExporting] = useState(false);
  const [toast, setToast] = useState(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const {
    resume,
    loading,
    saveStatus,
    updateResume,
    updatePersonal,
    updateSummary,
    addArrayItem,
    updateArrayItem,
    removeArrayItem,
    moveArrayItem,
    toggleSectionVisibility,
    setTemplate,
    setAccentColor,
    setFontFamily,
    setFontSize,
    loadSampleData,
    clearToBlank
  } = useResume(routeId);

  // If new template query parameter is passed in URL, set template
  useEffect(() => {
    const templateQuery = searchParams.get("template");
    if (templateQuery && resume && resume.selectedTemplate !== templateQuery) {
      setTemplate(templateQuery);
    }
  }, [searchParams, resume, setTemplate]);

  if (loading || !resume) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--color-navy)", marginBottom: "8px" }}>
            Loading your resume workspace...
          </div>
          <div style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Retrieving local browser state...
          </div>
        </div>
      </div>
    );
  }

  // Handle PDF Export
  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const result = await exportResumeToPdf("resume-editor-preview-doc", resume, (msg) => {
        setToast({ message: msg, type: "info" });
      });

      // Confetti celebratory feedback!
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 }
      });

      setToast({
        message: `Resume downloaded as ${result.filename}!`,
        type: "success"
      });
    } catch (err) {
      console.error("PDF Export error:", err);
      setToast({
        message: "PDF download failed. Try using the 'Print' button as a high-quality alternative.",
        type: "error"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    printResumeDocument();
  };

  const currentSectionIndex = SECTIONS.findIndex((s) => s.id === activeSection);

  const handleNextSection = () => {
    if (currentSectionIndex < SECTIONS.length - 1) {
      setActiveSection(SECTIONS[currentSectionIndex + 1].id);
    }
  };

  const handlePrevSection = () => {
    if (currentSectionIndex > 0) {
      setActiveSection(SECTIONS[currentSectionIndex - 1].id);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 70px)", overflow: "hidden" }}>
      {/* =========================================================================
          EDITOR TOP TOOLBAR
          ========================================================================= */}
      <div
        className="no-print"
        style={{
          height: "60px",
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid var(--color-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          zIndex: 20
        }}
      >
        {/* Left: Title & Autosave Status */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {isEditingTitle ? (
              <input
                type="text"
                className="form-control"
                value={resume.title || "My Resume"}
                onChange={(e) => updateResume({ title: e.target.value })}
                onBlur={() => setIsEditingTitle(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setIsEditingTitle(false);
                }}
                autoFocus
                style={{ padding: "4px 8px", fontSize: "1rem", fontWeight: 700, width: "200px" }}
              />
            ) : (
              <div
                onClick={() => setIsEditingTitle(true)}
                title="Click to rename"
                style={{
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  color: "var(--color-navy)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                <span>{resume.title || "My Resume"}</span>
                <Edit2 size={13} color="var(--text-muted)" />
              </div>
            )}
          </div>

          {/* Autosave Status Indicator */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "0.8rem",
              color: saveStatus === "saving" ? "var(--color-royal-blue)" : "#10B981"
            }}
          >
            {saveStatus === "saving" ? (
              <>
                <Clock size={13} />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <CheckCircle2 size={13} />
                <span>Saved locally</span>
              </>
            )}
          </div>
        </div>

        {/* Mobile View Toggle Switch */}
        <div className="mobile-toggle-wrapper" style={{ display: "none" }}>
          <div style={{ display: "flex", backgroundColor: "#F1F5F9", borderRadius: "8px", padding: "2px" }}>
            <button
              onClick={() => setMobileTab("edit")}
              style={{
                border: "none",
                padding: "6px 14px",
                borderRadius: "6px",
                fontSize: "0.85rem",
                fontWeight: 600,
                backgroundColor: mobileTab === "edit" ? "#FFFFFF" : "transparent",
                color: mobileTab === "edit" ? "var(--color-navy)" : "var(--text-muted)",
                boxShadow: mobileTab === "edit" ? "var(--shadow-sm)" : "none",
                cursor: "pointer"
              }}
            >
              Form
            </button>
            <button
              onClick={() => setMobileTab("preview")}
              style={{
                border: "none",
                padding: "6px 14px",
                borderRadius: "6px",
                fontSize: "0.85rem",
                fontWeight: 600,
                backgroundColor: mobileTab === "preview" ? "#FFFFFF" : "transparent",
                color: mobileTab === "preview" ? "var(--color-navy)" : "var(--text-muted)",
                boxShadow: mobileTab === "preview" ? "var(--shadow-sm)" : "none",
                cursor: "pointer"
              }}
            >
              Preview
            </button>
          </div>
        </div>

        {/* Right: Actions (Download PDF, Print, Fullscreen Preview) */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={handlePrint}
            className="btn btn-outline btn-sm desktop-only-btn"
            title="Print to PDF via browser dialog"
          >
            <Printer size={15} />
            <span>Print</span>
          </button>

          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="btn btn-gold btn-sm"
            style={{ fontWeight: 700 }}
          >
            <Download size={15} />
            <span>{isExporting ? "Exporting..." : "Download PDF"}</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          EDITOR MAIN BODY (2-COLUMN ON DESKTOP, TOGGLE ON MOBILE)
          ========================================================================= */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Left Side: Form Section (Scrollable) */}
        <div
          className={`editor-form-col ${mobileTab === "preview" ? "mobile-hidden" : ""}`}
          style={{
            flex: "1 1 50%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#FFFFFF",
            borderRight: "1px solid var(--color-border)",
            overflowY: "auto"
          }}
        >
          {/* Section Navigation Tabs Bar */}
          <div
            style={{
              display: "flex",
              overflowX: "auto",
              borderBottom: "1px solid var(--color-border)",
              backgroundColor: "#FAFBFD",
              padding: "0 10px"
            }}
          >
            {SECTIONS.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "12px 14px",
                    border: "none",
                    borderBottom: isActive ? "2.5px solid var(--color-royal-blue)" : "2.5px solid transparent",
                    backgroundColor: "transparent",
                    color: isActive ? "var(--color-navy)" : "var(--text-muted)",
                    fontWeight: isActive ? 700 : 500,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.15s ease"
                  }}
                >
                  <Icon size={15} color={isActive ? "var(--color-royal-blue)" : "#94A3B8"} />
                  <span>{sec.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Section Form Content */}
          <div style={{ padding: "24px 20px 80px 20px", flex: 1 }}>
            {activeSection === "personal" && (
              <PersonalInfoForm personal={resume.personal} updatePersonal={updatePersonal} />
            )}

            {activeSection === "summary" && (
              <SummaryForm summary={resume.summary} updateSummary={updateSummary} />
            )}

            {activeSection === "education" && (
              <EducationForm
                education={resume.education}
                addArrayItem={addArrayItem}
                updateArrayItem={updateArrayItem}
                removeArrayItem={removeArrayItem}
                moveArrayItem={moveArrayItem}
              />
            )}

            {activeSection === "experience" && (
              <ExperienceForm
                experience={resume.experience}
                addArrayItem={addArrayItem}
                updateArrayItem={updateArrayItem}
                removeArrayItem={removeArrayItem}
                moveArrayItem={moveArrayItem}
              />
            )}

            {activeSection === "skills" && (
              <SkillsForm skills={resume.skills} updateResume={updateResume} />
            )}

            {activeSection === "projects" && (
              <ProjectsForm
                projects={resume.projects}
                addArrayItem={addArrayItem}
                updateArrayItem={updateArrayItem}
                removeArrayItem={removeArrayItem}
                moveArrayItem={moveArrayItem}
              />
            )}

            {activeSection === "certifications" && (
              <CertificationsAchievementsForm
                certifications={resume.certifications}
                achievements={resume.achievements}
                addArrayItem={addArrayItem}
                updateArrayItem={updateArrayItem}
                removeArrayItem={removeArrayItem}
              />
            )}

            {activeSection === "additional" && (
              <AdditionalSectionsForm
                resume={resume}
                addArrayItem={addArrayItem}
                updateArrayItem={updateArrayItem}
                removeArrayItem={removeArrayItem}
                updateResume={updateResume}
              />
            )}

            {activeSection === "design" && (
              <CustomizerPanel
                resume={resume}
                setTemplate={setTemplate}
                setAccentColor={setAccentColor}
                setFontFamily={setFontFamily}
                setFontSize={setFontSize}
                toggleSectionVisibility={toggleSectionVisibility}
                loadSampleData={loadSampleData}
                clearToBlank={clearToBlank}
              />
            )}

            {/* Stepper Navigation Buttons */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "32px", borderTop: "1px solid var(--color-border)", paddingTop: "16px" }}>
              <button
                type="button"
                disabled={currentSectionIndex === 0}
                onClick={handlePrevSection}
                className="btn btn-outline btn-sm"
                style={{ opacity: currentSectionIndex === 0 ? 0.3 : 1 }}
              >
                <ChevronLeft size={16} /> Back
              </button>

              <button
                type="button"
                disabled={currentSectionIndex === SECTIONS.length - 1}
                onClick={handleNextSection}
                className="btn btn-primary btn-sm"
              >
                Next Section <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Live Resume Document Preview (Scrollable Canvas) */}
        <div
          className={`editor-preview-col ${mobileTab === "edit" ? "mobile-hidden" : ""}`}
          style={{
            flex: "1 1 50%",
            backgroundColor: "#E2E8F0",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            padding: "24px 16px"
          }}
        >
          {/* Zoom & Quick Controls Floating Bar */}
          <div
            className="no-print"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              margin: "0 auto 16px auto",
              backgroundColor: "rgba(23, 36, 59, 0.9)",
              backdropFilter: "blur(6px)",
              padding: "6px 14px",
              borderRadius: "999px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#FFFFFF",
              fontSize: "0.82rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
            }}
          >
            <button
              onClick={() => setPreviewZoom((z) => Math.max(0.6, z - 0.1))}
              aria-label="Zoom out"
              style={{ background: "none", border: "none", color: "#FFFFFF", cursor: "pointer", display: "flex" }}
            >
              <ZoomOut size={15} />
            </button>
            <span>{Math.round(previewZoom * 100)}%</span>
            <button
              onClick={() => setPreviewZoom((z) => Math.min(1.2, z + 0.1))}
              aria-label="Zoom in"
              style={{ background: "none", border: "none", color: "#FFFFFF", cursor: "pointer", display: "flex" }}
            >
              <ZoomIn size={15} />
            </button>
            <div style={{ width: "1px", height: "14px", backgroundColor: "rgba(255,255,255,0.2)" }} />
            <button
              onClick={() => setActiveSection("design")}
              style={{ background: "none", border: "none", color: "var(--color-gold)", cursor: "pointer", fontWeight: 600, fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "4px" }}
            >
              <Sliders size={13} />
              <span>Change Style</span>
            </button>
          </div>

          {/* Scaled A4 Document Container */}
          <div
            style={{
              margin: "0 auto",
              transform: `scale(${previewZoom})`,
              transformOrigin: "top center",
              transition: "transform 0.1s ease"
            }}
          >
            <TemplateRenderer resume={resume} id="resume-editor-preview-doc" />
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {toast && <Toast toast={toast} onClose={() => setToast(null)} />}

      {/* Responsive Style */}
      <style>{`
        @media (max-width: 900px) {
          .mobile-toggle-wrapper {
            display: block !important;
          }
          .desktop-only-btn {
            display: none !important;
          }
          .mobile-hidden {
            display: none !important;
          }
          .editor-form-col {
            flex: 1 1 100% !important;
            border-right: none !important;
          }
          .editor-preview-col {
            flex: 1 1 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
