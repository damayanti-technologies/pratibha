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
 * Template 12: Executive Resume
 * Category: Professional
 * Tailored for directors, VPs, and senior executives with an executive summary box and leadership focus.
 */
export default function Template12({ resume }) {
  const accent = resume.accentColor || "#17243B";
  const { personal, summary, experience, education, skills, projects, certifications, achievements } = resume;

  return (
    <div className={`resume-a4-sheet font-${resume.fontSize || "medium"}`} style={{ fontFamily: resume.fontFamily || "Inter" }}>
      {/* Executive Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: `3px solid ${accent}`, paddingBottom: "10px", marginBottom: "14px", flexWrap: "wrap", gap: "10px" }}>
        <div>
          <h1 style={{ margin: "0", fontSize: "2.1em", fontWeight: 800, color: "#17243B" }}>
            {personal?.fullName || "Your Full Name"}
          </h1>
          <div style={{ fontSize: "1.15em", fontWeight: 600, color: accent, marginTop: "2px" }}>
            {personal?.professionalTitle || "Executive Leader"}
          </div>
        </div>
        <ContactBar personal={personal} accentColor={accent} layout="column" />
      </div>

      {/* Executive Summary Callout Box */}
      {hasContent(resume, "summary") && (
        <div style={{ background: "#F8FAFC", borderLeft: `4px solid ${accent}`, padding: "10px 14px", borderRadius: "0 4px 4px 0", marginBottom: "14px" }}>
          <strong style={{ display: "block", fontSize: "0.95em", textTransform: "uppercase", letterSpacing: "0.5px", color: accent, marginBottom: "4px" }}>
            Executive Profile
          </strong>
          <p style={{ margin: 0, fontSize: "0.95em", lineHeight: 1.5, color: "#334155" }}>{summary}</p>
        </div>
      )}

      {/* Executive Competencies / Skills */}
      {hasContent(resume, "skills") && (
        <SkillsBlock skills={skills} accentColor={accent} variant="border-left" badgeStyle="tag" />
      )}

      {/* Professional Leadership Experience */}
      {hasContent(resume, "experience") && (
        <ExperienceBlock experience={experience} accentColor={accent} variant="border-left" />
      )}

      {/* Major Achievements */}
      {hasContent(resume, "achievements") && (
        <AchievementsBlock achievements={achievements} accentColor={accent} variant="border-left" />
      )}

      {/* Education & Credentials */}
      {hasContent(resume, "education") && (
        <EducationBlock education={education} accentColor={accent} variant="border-left" />
      )}

      {hasContent(resume, "certifications") && (
        <CertificationsBlock certifications={certifications} accentColor={accent} variant="border-left" />
      )}

      {hasContent(resume, "projects") && (
        <ProjectsBlock projects={projects} accentColor={accent} variant="border-left" />
      )}

      <AdditionalSectionsBlock resume={resume} accentColor={accent} variant="border-left" />
    </div>
  );
}
