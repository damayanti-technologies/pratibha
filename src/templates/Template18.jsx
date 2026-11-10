import React from "react";
import {
  ContactBar,
  SummaryBlock,
  EducationBlock,
  ExperienceBlock,
  ProjectsBlock,
  SkillsBlock,
  CertificationsBlock,
  AchievementsBlock,
  AdditionalSectionsBlock
} from "./SharedSections";
import { hasContent } from "../utils/resumeHelpers";

/**
 * Template 18: Research Resume
 * Category: Academic
 * Geared towards researchers, doctoral candidates, R&D scientists, and laboratory scholars.
 */
export default function Template18({ resume }) {
  const accent = resume.accentColor || "#1E3A8A";
  const { personal, summary, education, experience, projects, skills, certifications, achievements } = resume;

  return (
    <div className={`resume-a4-sheet font-${resume.fontSize || "medium"}`} style={{ fontFamily: resume.fontFamily || "Inter" }}>
      {/* Research Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderBottom: `2.5px solid ${accent}`, paddingBottom: "10px", marginBottom: "14px", flexWrap: "wrap", gap: "8px" }}>
        <div>
          <h1 style={{ margin: "0", fontSize: "1.9em", fontWeight: 800, color: "#17243B" }}>
            {personal?.fullName || "Your Full Name"}
          </h1>
          <div style={{ fontSize: "1.08em", fontWeight: 600, color: accent }}>
            {personal?.professionalTitle || "Research Scholar & Scientist"}
          </div>
        </div>
        <ContactBar personal={personal} accentColor={accent} layout="row" />
      </div>

      {/* Research Focus */}
      {hasContent(resume, "summary") && (
        <SummaryBlock summary={summary} title="Research Focus & Methodology" accentColor={accent} variant="line" />
      )}

      {/* Education & Scientific Training */}
      {hasContent(resume, "education") && (
        <EducationBlock education={education} accentColor={accent} variant="line" />
      )}

      {/* Laboratory & Research Experience */}
      {hasContent(resume, "experience") && (
        <ExperienceBlock experience={experience} accentColor={accent} variant="line" />
      )}

      {/* Research Projects & Grants */}
      {hasContent(resume, "projects") && (
        <ProjectsBlock projects={projects} accentColor={accent} variant="line" />
      )}

      {/* Scientific Skills & Laboratory Techniques */}
      {hasContent(resume, "skills") && (
        <SkillsBlock skills={skills} accentColor={accent} variant="line" badgeStyle="tag" />
      )}

      {/* Publications and Honors */}
      <AdditionalSectionsBlock resume={resume} accentColor={accent} variant="line" />

      {hasContent(resume, "certifications") && (
        <CertificationsBlock certifications={certifications} accentColor={accent} variant="line" />
      )}

      {hasContent(resume, "achievements") && (
        <AchievementsBlock achievements={achievements} accentColor={accent} variant="line" />
      )}
    </div>
  );
}
