import React from "react";
import {
  ContactBar,
  SummaryBlock,
  ExperienceBlock,
  EducationBlock,
  SkillsBlock,
  ProjectsBlock,
  InternshipsBlock,
  CertificationsBlock,
  AchievementsBlock,
  AdditionalSectionsBlock
} from "./SharedSections";
import { hasContent } from "../utils/resumeHelpers";

/**
 * Template 09: Clean Modern
 * Category: Modern
 * Balanced whitespace, elegant badge headers, refined typography and contemporary layout.
 */
export default function Template09({ resume }) {
  const accent = resume.accentColor || "#365FAD";
  const { personal, summary, experience, education, skills, projects, internships, certifications, achievements } = resume;

  return (
    <div className={`resume-a4-sheet font-${resume.fontSize || "medium"}`} style={{ fontFamily: resume.fontFamily || "Plus Jakarta Sans, sans-serif" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "16px", paddingBottom: "12px", borderBottom: `2px dashed ${accent}40` }}>
        <h1 style={{ margin: "0 0 4px 0", fontSize: "2.1em", fontWeight: 800, color: "#17243B" }}>
          {personal?.fullName || "Your Full Name"}
        </h1>
        <div style={{ fontSize: "1.1em", fontWeight: 600, color: accent, marginBottom: "6px" }}>
          {personal?.professionalTitle}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ContactBar personal={personal} accentColor={accent} layout="row" />
        </div>
      </div>

      {hasContent(resume, "summary") && (
        <SummaryBlock summary={summary} accentColor={accent} variant="badge" />
      )}

      {hasContent(resume, "experience") && (
        <ExperienceBlock experience={experience} accentColor={accent} variant="badge" />
      )}

      {hasContent(resume, "education") && (
        <EducationBlock education={education} accentColor={accent} variant="badge" />
      )}

      {hasContent(resume, "skills") && (
        <SkillsBlock skills={skills} accentColor={accent} variant="badge" badgeStyle="pill" />
      )}

      {hasContent(resume, "projects") && (
        <ProjectsBlock projects={projects} accentColor={accent} variant="badge" />
      )}

      {hasContent(resume, "internships") && (
        <InternshipsBlock internships={internships} accentColor={accent} variant="badge" />
      )}

      {hasContent(resume, "certifications") && (
        <CertificationsBlock certifications={certifications} accentColor={accent} variant="badge" />
      )}

      {hasContent(resume, "achievements") && (
        <AchievementsBlock achievements={achievements} accentColor={accent} variant="badge" />
      )}

      <AdditionalSectionsBlock resume={resume} accentColor={accent} variant="badge" />
    </div>
  );
}
