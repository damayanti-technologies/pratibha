import React from "react";
import {
  ContactBar,
  SummaryBlock,
  ExperienceBlock,
  EducationBlock,
  SkillsBlock,
  ProjectsBlock,
  CertificationsBlock,
  AchievementsBlock,
  AdditionalSectionsBlock
} from "./SharedSections";
import { hasContent } from "../utils/resumeHelpers";

/**
 * Template 07: Modern Sidebar
 * Category: Modern
 * Prominent left sidebar with subtle shaded background, crisp section dividers and clear typographic hierarchy.
 */
export default function Template07({ resume }) {
  const accent = resume.accentColor || "#17243B";
  const { personal, summary, experience, education, skills, projects, certifications, achievements } = resume;

  return (
    <div
      className={`resume-a4-sheet font-${resume.fontSize || "medium"}`}
      style={{
        fontFamily: resume.fontFamily || "Outfit, sans-serif",
        padding: "0",
        display: "grid",
        gridTemplateColumns: "33% 67%",
        overflow: "hidden"
      }}
    >
      {/* Left Shaded Sidebar */}
      <div
        style={{
          backgroundColor: "#F8FAFC",
          borderRight: "1px solid #E2E8F0",
          padding: "14mm 10mm"
        }}
      >
        {personal?.profilePhoto && (
          <div style={{ textAlign: "center", marginBottom: "14px" }}>
            <img src={personal.profilePhoto} alt="Profile" className="resume-photo" style={{ width: "90px", height: "90px", borderColor: accent }} />
          </div>
        )}

        <div style={{ marginBottom: "16px" }}>
          <h2 style={{ fontSize: "1.05em", textTransform: "uppercase", letterSpacing: "1px", color: accent, borderBottom: `2px solid ${accent}`, paddingBottom: "4px", marginBottom: "8px" }}>
            Contact
          </h2>
          <ContactBar personal={personal} accentColor={accent} layout="column" />
        </div>

        {hasContent(resume, "education") && (
          <div style={{ marginBottom: "16px" }}>
            <EducationBlock education={education} accentColor={accent} variant="border-left" />
          </div>
        )}

        {hasContent(resume, "skills") && (
          <div style={{ marginBottom: "16px" }}>
            <SkillsBlock skills={skills} accentColor={accent} variant="border-left" badgeStyle="pill" />
          </div>
        )}

        {hasContent(resume, "certifications") && (
          <CertificationsBlock certifications={certifications} accentColor={accent} variant="border-left" />
        )}
      </div>

      {/* Right Content Area */}
      <div style={{ padding: "14mm 12mm" }}>
        <div style={{ marginBottom: "16px" }}>
          <h1 style={{ margin: "0 0 2px 0", fontSize: "2.1em", fontWeight: 800, color: "#17243B" }}>
            {personal?.fullName || "Your Full Name"}
          </h1>
          <div style={{ fontSize: "1.1em", fontWeight: 600, color: accent }}>
            {personal?.professionalTitle}
          </div>
        </div>

        {hasContent(resume, "summary") && (
          <SummaryBlock summary={summary} accentColor={accent} variant="border-left" />
        )}

        {hasContent(resume, "experience") && (
          <ExperienceBlock experience={experience} accentColor={accent} variant="border-left" />
        )}

        {hasContent(resume, "projects") && (
          <ProjectsBlock projects={projects} accentColor={accent} variant="border-left" />
        )}

        {hasContent(resume, "achievements") && (
          <AchievementsBlock achievements={achievements} accentColor={accent} variant="border-left" />
        )}

        <AdditionalSectionsBlock resume={resume} accentColor={accent} variant="border-left" />
      </div>
    </div>
  );
}
