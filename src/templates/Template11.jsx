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
 * Template 11: Elegant Monochrome
 * Category: Professional
 * Minimalist luxury monochrome aesthetic with editorial typography and fine hairline dividers.
 */
export default function Template11({ resume }) {
  const accent = "#242A35"; // Pure elegant charcoal/monochrome
  const { personal, summary, experience, education, skills, projects, certifications, achievements } = resume;

  return (
    <div
      className={`resume-a4-sheet font-${resume.fontSize || "medium"}`}
      style={{
        fontFamily: resume.fontFamily || "Playfair Display, serif"
      }}
    >
      {/* Editorial Header */}
      <div style={{ textAlign: "center", borderBottom: "1px solid #242A35", paddingBottom: "14px", marginBottom: "16px" }}>
        <h1 style={{ margin: "0 0 4px 0", fontSize: "2.3em", fontWeight: 700, color: "#111827", letterSpacing: "1px" }}>
          {personal?.fullName || "Your Full Name"}
        </h1>
        <div style={{ fontSize: "1.05em", letterSpacing: "2px", textTransform: "uppercase", color: "#6B7280", marginBottom: "8px", fontFamily: "Inter, sans-serif" }}>
          {personal?.professionalTitle}
        </div>
        <div style={{ display: "flex", justifyContent: "center", fontFamily: "Inter, sans-serif" }}>
          <ContactBar personal={personal} accentColor="#242A35" layout="row" />
        </div>
      </div>

      <div style={{ fontFamily: "Inter, sans-serif" }}>
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

        {hasContent(resume, "certifications") && (
          <CertificationsBlock certifications={certifications} accentColor={accent} variant="classic" />
        )}

        {hasContent(resume, "achievements") && (
          <AchievementsBlock achievements={achievements} accentColor={accent} variant="classic" />
        )}

        <AdditionalSectionsBlock resume={resume} accentColor={accent} variant="classic" />
      </div>
    </div>
  );
}
