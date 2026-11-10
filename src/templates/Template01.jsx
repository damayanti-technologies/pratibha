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
 * Template 01: Minimal ATS Resume
 * Category: ATS-Friendly
 * Clean, single-column, standard headings, maximum machine readability.
 */
export default function Template01({ resume }) {
  const accent = resume.accentColor || "#17243B";
  const { personal, summary, experience, education, skills, projects, internships, certifications, achievements } = resume;

  return (
    <div className={`resume-a4-sheet font-${resume.fontSize || "medium"}`} style={{ fontFamily: resume.fontFamily || "Inter" }}>
      {/* Header */}
      <div style={{ textAlign: "center", borderBottom: `2px solid ${accent}`, paddingBottom: "10px", marginBottom: "14px" }}>
        <h1 style={{ margin: "0 0 4px 0", fontSize: "1.9em", fontWeight: 800, color: "#17243B", letterSpacing: "0.5px" }}>
          {personal?.fullName || "Your Full Name"}
        </h1>
        {personal?.professionalTitle && (
          <div style={{ fontSize: "1.05em", fontWeight: 600, color: accent, marginBottom: "4px" }}>
            {personal.professionalTitle}
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ContactBar personal={personal} accentColor={accent} layout="row" />
        </div>
      </div>

      {/* Body sections according to user order */}
      {hasContent(resume, "summary") && (
        <SummaryBlock summary={summary} accentColor={accent} variant="line" />
      )}

      {hasContent(resume, "experience") && (
        <ExperienceBlock experience={experience} accentColor={accent} variant="line" />
      )}

      {hasContent(resume, "education") && (
        <EducationBlock education={education} accentColor={accent} variant="line" />
      )}

      {hasContent(resume, "skills") && (
        <SkillsBlock skills={skills} accentColor={accent} variant="line" badgeStyle="tag" />
      )}

      {hasContent(resume, "projects") && (
        <ProjectsBlock projects={projects} accentColor={accent} variant="line" />
      )}

      {hasContent(resume, "internships") && (
        <InternshipsBlock internships={internships} accentColor={accent} variant="line" />
      )}

      {hasContent(resume, "certifications") && (
        <CertificationsBlock certifications={certifications} accentColor={accent} variant="line" />
      )}

      {hasContent(resume, "achievements") && (
        <AchievementsBlock achievements={achievements} accentColor={accent} variant="line" />
      )}

      <AdditionalSectionsBlock resume={resume} accentColor={accent} variant="line" />
    </div>
  );
}
