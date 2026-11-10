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
 * Template 05: Compact Professional
 * Category: ATS-Friendly
 * High-density layout designed to fit extensive career histories into clean, compact A4 pages.
 */
export default function Template05({ resume }) {
  const accent = resume.accentColor || "#2B6CB0";
  const { personal, summary, experience, education, skills, projects, internships, certifications, achievements } = resume;

  return (
    <div
      className={`resume-a4-sheet font-${resume.fontSize || "small"}`}
      style={{
        fontFamily: resume.fontFamily || "Inter",
        padding: "10mm 12mm"
      }}
    >
      {/* Compact Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `2px solid ${accent}`, paddingBottom: "6px", marginBottom: "10px", flexWrap: "wrap", gap: "6px" }}>
        <div>
          <h1 style={{ margin: "0", fontSize: "1.6em", fontWeight: 800, color: "#17243B" }}>
            {personal?.fullName || "Your Full Name"}
          </h1>
          <span style={{ fontSize: "0.95em", fontWeight: 600, color: accent }}>
            {personal?.professionalTitle}
          </span>
        </div>
        <ContactBar personal={personal} accentColor={accent} layout="row" />
      </div>

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
