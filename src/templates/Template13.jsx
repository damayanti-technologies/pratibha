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
 * Template 13: Contemporary Professional
 * Category: Professional
 * Polished, high-end corporate styling with subtle accent badges and premium typography.
 */
export default function Template13({ resume }) {
  const accent = resume.accentColor || "#17243B";
  const { personal, summary, experience, education, skills, projects, certifications, achievements } = resume;

  return (
    <div className={`resume-a4-sheet font-${resume.fontSize || "medium"}`} style={{ fontFamily: resume.fontFamily || "Plus Jakarta Sans, sans-serif" }}>
      {/* Header with dual accent border */}
      <div style={{ marginBottom: "16px", paddingBottom: "12px", borderBottom: `3px solid ${accent}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "8px" }}>
          <h1 style={{ margin: "0", fontSize: "2.1em", fontWeight: 800, color: "#17243B" }}>
            {personal?.fullName || "Your Full Name"}
          </h1>
          <div style={{ fontSize: "1.1em", fontWeight: 700, color: accent }}>
            {personal?.professionalTitle}
          </div>
        </div>
        <div style={{ marginTop: "6px" }}>
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
