import React from "react";
import {
  ContactBar,
  SummaryBlock,
  EducationBlock,
  SkillsBlock,
  ProjectsBlock,
  InternshipsBlock,
  CertificationsBlock,
  AchievementsBlock,
  ExperienceBlock,
  AdditionalSectionsBlock
} from "./SharedSections";
import { hasContent } from "../utils/resumeHelpers";

/**
 * Template 03: Minimal Fresher
 * Category: ATS-Friendly
 * Tailored for students & fresh graduates. Emphasizes Education, Projects, and Skills.
 */
export default function Template03({ resume }) {
  const accent = resume.accentColor || "#365FAD";
  const { personal, summary, education, skills, projects, internships, certifications, achievements, experience } = resume;

  return (
    <div className={`resume-a4-sheet font-${resume.fontSize || "medium"}`} style={{ fontFamily: resume.fontFamily || "Inter" }}>
      {/* Header with neat accent tag */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: `2px solid ${accent}`, paddingBottom: "12px", marginBottom: "14px", flexWrap: "wrap", gap: "8px" }}>
        <div>
          <h1 style={{ margin: "0 0 2px 0", fontSize: "1.8em", fontWeight: 800, color: "#17243B" }}>
            {personal?.fullName || "Your Full Name"}
          </h1>
          <div style={{ fontSize: "1em", fontWeight: 600, color: accent }}>
            {personal?.professionalTitle || "Entry-Level Professional"}
          </div>
        </div>
        <div style={{ maxWidth: "300px" }}>
          <ContactBar personal={personal} accentColor={accent} layout="column" />
        </div>
      </div>

      {hasContent(resume, "summary") && (
        <SummaryBlock summary={summary} title="Career Objective" accentColor={accent} variant="border-left" />
      )}

      {/* Freshers prioritize Education */}
      {hasContent(resume, "education") && (
        <EducationBlock education={education} accentColor={accent} variant="border-left" />
      )}

      {/* Followed by Technical Skills */}
      {hasContent(resume, "skills") && (
        <SkillsBlock skills={skills} accentColor={accent} variant="border-left" badgeStyle="pill" />
      )}

      {/* Projects */}
      {hasContent(resume, "projects") && (
        <ProjectsBlock projects={projects} accentColor={accent} variant="border-left" />
      )}

      {/* Internships */}
      {hasContent(resume, "internships") && (
        <InternshipsBlock internships={internships} accentColor={accent} variant="border-left" />
      )}

      {/* Work Experience (if any) */}
      {hasContent(resume, "experience") && (
        <ExperienceBlock experience={experience} accentColor={accent} variant="border-left" />
      )}

      {/* Certifications & Achievements */}
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
