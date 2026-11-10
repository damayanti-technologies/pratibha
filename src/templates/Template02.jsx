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
 * Template 02: Classic Professional
 * Category: ATS-Friendly
 * Timeless serif styling, centered header, traditional corporate layout.
 */
export default function Template02({ resume }) {
  const accent = resume.accentColor || "#17243B";
  const { personal, summary, experience, education, skills, projects, internships, certifications, achievements } = resume;

  return (
    <div
      className={`resume-a4-sheet font-${resume.fontSize || "medium"}`}
      style={{ fontFamily: resume.fontFamily || "Merriweather, Georgia, serif" }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <h1 style={{ margin: "0 0 4px 0", fontSize: "1.85em", fontWeight: 700, color: "#17243B", textTransform: "uppercase", letterSpacing: "1px" }}>
          {personal?.fullName || "Your Full Name"}
        </h1>
        {personal?.professionalTitle && (
          <div style={{ fontSize: "1.02em", fontStyle: "italic", color: "#475569", marginBottom: "6px" }}>
            {personal.professionalTitle}
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ContactBar personal={personal} accentColor={accent} layout="row" />
        </div>
        <div style={{ borderBottom: `1.5px solid ${accent}`, marginTop: "10px", width: "100%" }} />
        <div style={{ borderBottom: "0.5px solid #CBD5E1", marginTop: "2px", width: "100%" }} />
      </div>

      {hasContent(resume, "summary") && (
        <SummaryBlock summary={summary} accentColor={accent} variant="classic" />
      )}

      {hasContent(resume, "experience") && (
        <ExperienceBlock experience={experience} accentColor={accent} variant="classic" />
      )}

      {hasContent(resume, "education") && (
        <EducationBlock education={education} accentColor={accent} variant="classic" />
      )}

      {hasContent(resume, "skills") && (
        <SkillsBlock skills={skills} accentColor={accent} variant="classic" badgeStyle="tag" />
      )}

      {hasContent(resume, "projects") && (
        <ProjectsBlock projects={projects} accentColor={accent} variant="classic" />
      )}

      {hasContent(resume, "internships") && (
        <InternshipsBlock internships={internships} accentColor={accent} variant="classic" />
      )}

      {hasContent(resume, "certifications") && (
        <CertificationsBlock certifications={certifications} accentColor={accent} variant="classic" />
      )}

      {hasContent(resume, "achievements") && (
        <AchievementsBlock achievements={achievements} accentColor={accent} variant="classic" />
      )}

      <AdditionalSectionsBlock resume={resume} accentColor={accent} variant="classic" />
    </div>
  );
}
