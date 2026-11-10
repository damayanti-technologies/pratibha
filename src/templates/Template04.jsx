import React from "react";
import {
  ContactBar,
  SummaryBlock,
  ExperienceBlock,
  ProjectsBlock,
  SkillsBlock,
  EducationBlock,
  CertificationsBlock,
  AchievementsBlock,
  AdditionalSectionsBlock
} from "./SharedSections";
import { hasContent } from "../utils/resumeHelpers";

/**
 * Template 04: Engineering Resume
 * Category: ATS-Friendly
 * Built for engineers, developers, and technical specialists with prominent skills matrix and project highlights.
 */
export default function Template04({ resume }) {
  const accent = resume.accentColor || "#1E3A8A";
  const { personal, summary, experience, projects, skills, education, certifications, achievements } = resume;

  return (
    <div className={`resume-a4-sheet font-${resume.fontSize || "medium"}`} style={{ fontFamily: resume.fontFamily || "Inter" }}>
      {/* Top Engineering Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: `2.5px solid ${accent}`, paddingBottom: "8px", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
        <div>
          <h1 style={{ margin: "0 0 2px 0", fontSize: "1.85em", fontWeight: 800, color: "#17243B" }}>
            {personal?.fullName || "Your Full Name"}
          </h1>
          <div style={{ fontSize: "1.05em", fontWeight: 600, color: accent }}>
            {personal?.professionalTitle || "Software Engineer"}
          </div>
        </div>
        <ContactBar personal={personal} accentColor={accent} layout="row" />
      </div>

      {hasContent(resume, "summary") && (
        <SummaryBlock summary={summary} accentColor={accent} variant="line" />
      )}

      {/* Engineering resumes prioritize technical skills matrix */}
      {hasContent(resume, "skills") && (
        <SkillsBlock skills={skills} accentColor={accent} variant="line" badgeStyle="tag" />
      )}

      {hasContent(resume, "experience") && (
        <ExperienceBlock experience={experience} accentColor={accent} variant="line" />
      )}

      {hasContent(resume, "projects") && (
        <ProjectsBlock projects={projects} accentColor={accent} variant="line" />
      )}

      {hasContent(resume, "education") && (
        <EducationBlock education={education} accentColor={accent} variant="line" />
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
