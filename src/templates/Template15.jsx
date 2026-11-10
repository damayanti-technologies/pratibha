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
 * Template 15: Designer Resume
 * Category: Creative
 * Asymmetrical grid with dedicated spotlight for projects, design tools, and UX case studies.
 */
export default function Template15({ resume }) {
  const accent = resume.accentColor || "#365FAD";
  const { personal, summary, experience, education, skills, projects, certifications, achievements } = resume;

  return (
    <div className={`resume-a4-sheet font-${resume.fontSize || "medium"}`} style={{ fontFamily: resume.fontFamily || "Outfit, sans-serif" }}>
      {/* Designer Header */}
      <div style={{ display: "grid", gridTemplateColumns: "60% 40%", gap: "16px", borderBottom: `3px solid ${accent}`, paddingBottom: "14px", marginBottom: "16px" }}>
        <div>
          <h1 style={{ margin: "0 0 2px 0", fontSize: "2.3em", fontWeight: 800, color: "#17243B", lineHeight: 1.1 }}>
            {personal?.fullName || "Your Full Name"}
          </h1>
          <div style={{ fontSize: "1.15em", fontWeight: 700, color: accent, marginTop: "4px" }}>
            {personal?.professionalTitle || "Product & UI/UX Designer"}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <ContactBar personal={personal} accentColor={accent} layout="column" />
        </div>
      </div>

      <div className="resume-two-col">
        {/* Left Column (Main Portfolio & Experience) */}
        <div style={{ paddingRight: "8px" }}>
          {hasContent(resume, "summary") && (
            <SummaryBlock summary={summary} title="Design Philosophy" accentColor={accent} variant="border-left" />
          )}

          {hasContent(resume, "projects") && (
            <ProjectsBlock projects={projects} accentColor={accent} variant="border-left" />
          )}

          {hasContent(resume, "experience") && (
            <ExperienceBlock experience={experience} accentColor={accent} variant="border-left" />
          )}
        </div>

        {/* Right Column (Design Stack, Credentials, Education) */}
        <div style={{ borderLeft: "1px solid #E2E8F0", paddingLeft: "12px" }}>
          {hasContent(resume, "skills") && (
            <SkillsBlock skills={skills} accentColor={accent} variant="border-left" badgeStyle="pill" />
          )}

          {hasContent(resume, "education") && (
            <EducationBlock education={education} accentColor={accent} variant="border-left" />
          )}

          {hasContent(resume, "certifications") && (
            <CertificationsBlock certifications={certifications} accentColor={accent} variant="border-left" />
          )}

          {hasContent(resume, "achievements") && (
            <AchievementsBlock achievements={achievements} accentColor={accent} variant="border-left" />
          )}

          <AdditionalSectionsBlock resume={resume} accentColor={accent} variant="border-left" />
        </div>
      </div>
    </div>
  );
}
