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
 * Template 14: Creative Portfolio
 * Category: Creative
 * Built for visual designers, product designers, content creators, and art directors.
 */
export default function Template14({ resume }) {
  const accent = resume.accentColor || "#C5A46D"; // Gold accent
  const { personal, summary, experience, education, skills, projects, certifications, achievements } = resume;

  return (
    <div className={`resume-a4-sheet font-${resume.fontSize || "medium"}`} style={{ fontFamily: resume.fontFamily || "Outfit, sans-serif" }}>
      {/* Creative Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px", paddingBottom: "14px", borderBottom: `2px solid ${accent}` }}>
        {personal?.profilePhoto && (
          <img src={personal.profilePhoto} alt="Profile" className="resume-photo" style={{ width: "80px", height: "80px", borderColor: accent }} />
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: "0 0 2px 0", fontSize: "2.2em", fontWeight: 800, color: "#17243B" }}>
            {personal?.fullName || "Your Full Name"}
          </h1>
          <div style={{ fontSize: "1.1em", fontWeight: 600, color: accent, marginBottom: "6px" }}>
            {personal?.professionalTitle || "Creative Director & Designer"}
          </div>
          <ContactBar personal={personal} accentColor={accent} layout="row" />
        </div>
      </div>

      {hasContent(resume, "summary") && (
        <SummaryBlock summary={summary} title="About Me" accentColor={accent} variant="line" />
      )}

      {/* Projects upfront for creative portfolios */}
      {hasContent(resume, "projects") && (
        <ProjectsBlock projects={projects} accentColor={accent} variant="line" />
      )}

      {hasContent(resume, "experience") && (
        <ExperienceBlock experience={experience} accentColor={accent} variant="line" />
      )}

      {hasContent(resume, "skills") && (
        <SkillsBlock skills={skills} accentColor={accent} variant="line" badgeStyle="pill" />
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
