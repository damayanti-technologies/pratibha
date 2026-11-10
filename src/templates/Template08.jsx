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
 * Template 08: Software Developer
 * Category: Professional
 * Tailored for software engineers, frontend/backend specialists, DevOps, and cloud architects.
 */
export default function Template08({ resume }) {
  const accent = resume.accentColor || "#2563EB";
  const { personal, summary, experience, projects, skills, education, certifications, achievements } = resume;

  return (
    <div className={`resume-a4-sheet font-${resume.fontSize || "medium"}`} style={{ fontFamily: resume.fontFamily || "Inter" }}>
      {/* Dev Header */}
      <div style={{ background: "#0F172A", color: "#F8FAFC", padding: "14px 18px", borderRadius: "6px", marginBottom: "14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
          <div>
            <h1 style={{ margin: "0", fontSize: "1.9em", fontWeight: 800, color: "#FFFFFF", letterSpacing: "0.5px" }}>
              {personal?.fullName || "Your Full Name"}
            </h1>
            <div style={{ fontSize: "1.05em", color: "#93C5FD", fontWeight: 600, fontFamily: "monospace" }}>
              const role = "{personal?.professionalTitle || "Full-Stack Engineer"}";
            </div>
          </div>
          <div style={{ fontSize: "0.88em", color: "#CBD5E1" }}>
            <ContactBar personal={personal} accentColor="#60A5FA" layout="column" />
          </div>
        </div>
      </div>

      {hasContent(resume, "summary") && (
        <SummaryBlock summary={summary} accentColor={accent} variant="border-left" />
      )}

      {/* Skills Matrix */}
      {hasContent(resume, "skills") && (
        <SkillsBlock skills={skills} accentColor={accent} variant="border-left" badgeStyle="pill" />
      )}

      {/* Projects */}
      {hasContent(resume, "projects") && (
        <ProjectsBlock projects={projects} accentColor={accent} variant="border-left" />
      )}

      {/* Experience */}
      {hasContent(resume, "experience") && (
        <ExperienceBlock experience={experience} accentColor={accent} variant="border-left" />
      )}

      {/* Education */}
      {hasContent(resume, "education") && (
        <EducationBlock education={education} accentColor={accent} variant="border-left" />
      )}

      {/* Certifications */}
      {hasContent(resume, "certifications") && (
        <CertificationsBlock certifications={certifications} accentColor={accent} variant="border-left" />
      )}

      {/* Achievements */}
      {hasContent(resume, "achievements") && (
        <AchievementsBlock achievements={achievements} accentColor={accent} variant="border-left" />
      )}

      <AdditionalSectionsBlock resume={resume} accentColor={accent} variant="border-left" />
    </div>
  );
}
