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
 * Template 16: Bold Accent
 * Category: Creative
 * High-impact vertical accent stripe along the left edge with contemporary badge section headers.
 */
export default function Template16({ resume }) {
  const accent = resume.accentColor || "#17243B";
  const { personal, summary, experience, education, skills, projects, certifications, achievements } = resume;

  return (
    <div
      className={`resume-a4-sheet font-${resume.fontSize || "medium"}`}
      style={{
        fontFamily: resume.fontFamily || "Inter",
        borderLeft: `10mm solid ${accent}`,
        padding: "12mm 14mm"
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "16px", paddingBottom: "10px", borderBottom: `2px solid #E2E8F0` }}>
        <h1 style={{ margin: "0 0 2px 0", fontSize: "2.1em", fontWeight: 800, color: "#17243B" }}>
          {personal?.fullName || "Your Full Name"}
        </h1>
        <div style={{ fontSize: "1.08em", fontWeight: 600, color: accent, marginBottom: "6px" }}>
          {personal?.professionalTitle}
        </div>
        <ContactBar personal={personal} accentColor={accent} layout="row" />
      </div>

      {hasContent(resume, "summary") && (
        <SummaryBlock summary={summary} accentColor={accent} variant="border-left" />
      )}

      {hasContent(resume, "experience") && (
        <ExperienceBlock experience={experience} accentColor={accent} variant="border-left" />
      )}

      {hasContent(resume, "education") && (
        <EducationBlock education={education} accentColor={accent} variant="border-left" />
      )}

      {hasContent(resume, "skills") && (
        <SkillsBlock skills={skills} accentColor={accent} variant="border-left" badgeStyle="tag" />
      )}

      {hasContent(resume, "projects") && (
        <ProjectsBlock projects={projects} accentColor={accent} variant="border-left" />
      )}

      {hasContent(resume, "certifications") && (
        <CertificationsBlock certifications={certifications} accentColor={accent} variant="border-left" />
      )}

      {hasContent(resume, "achievements") && (
        <AchievementsBlock achievements={achievements} accentColor={accent} variant="border-left" />
      )}

      <AdditionalSectionsBlock resume={resume} accentColor={accent} variant="border-left" />
    </div>
  );
}
