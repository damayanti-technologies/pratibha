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
 * Template 10: Corporate Blue
 * Category: Professional
 * Full-width executive banner header in corporate navy/blue, crisp high-trust layout.
 */
export default function Template10({ resume }) {
  const accent = resume.accentColor || "#17243B";
  const { personal, summary, experience, education, skills, projects, certifications, achievements } = resume;

  return (
    <div
      className={`resume-a4-sheet font-${resume.fontSize || "medium"}`}
      style={{
        fontFamily: resume.fontFamily || "Inter",
        padding: "0"
      }}
    >
      {/* Executive Banner */}
      <div
        style={{
          background: accent,
          color: "#FFFFFF",
          padding: "16mm 16mm 12mm 16mm",
          marginBottom: "12px"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <h1 style={{ margin: "0 0 4px 0", fontSize: "2.1em", fontWeight: 800, color: "#FFFFFF", letterSpacing: "0.5px" }}>
              {personal?.fullName || "Your Full Name"}
            </h1>
            <div style={{ fontSize: "1.1em", color: "#E2E8F0", fontWeight: 500 }}>
              {personal?.professionalTitle}
            </div>
          </div>
          <div style={{ color: "#E2E8F0", fontSize: "0.9em" }}>
            <ContactBar personal={personal} accentColor="#C5A46D" layout="column" />
          </div>
        </div>
      </div>

      <div style={{ padding: "0 16mm 14mm 16mm" }}>
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
    </div>
  );
}
