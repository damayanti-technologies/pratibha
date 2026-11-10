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
 * Template 06: Modern Two-Column
 * Category: Modern
 * 32/68 two-column layout with sidebar for credentials, skills, contact and main column for experience.
 */
export default function Template06({ resume }) {
  const accent = resume.accentColor || "#365FAD";
  const { personal, summary, experience, education, skills, projects, internships, certifications, achievements } = resume;

  return (
    <div className={`resume-a4-sheet font-${resume.fontSize || "medium"}`} style={{ fontFamily: resume.fontFamily || "Plus Jakarta Sans, sans-serif" }}>
      {/* Top Banner Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", borderBottom: `2.5px solid ${accent}`, paddingBottom: "12px", marginBottom: "16px" }}>
        {personal?.profilePhoto && (
          <img src={personal.profilePhoto} alt="Profile" className="resume-photo" style={{ borderColor: accent }} />
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: "0 0 2px 0", fontSize: "1.9em", fontWeight: 800, color: "#17243B" }}>
            {personal?.fullName || "Your Full Name"}
          </h1>
          <div style={{ fontSize: "1.08em", fontWeight: 600, color: accent, marginBottom: "4px" }}>
            {personal?.professionalTitle}
          </div>
          <ContactBar personal={personal} accentColor={accent} layout="row" />
        </div>
      </div>

      {/* Two Column Body */}
      <div className="resume-two-col">
        {/* Left Column */}
        <div className="resume-sidebar-left">
          {hasContent(resume, "skills") && (
            <SkillsBlock skills={skills} accentColor={accent} variant="badge" badgeStyle="pill" />
          )}

          {hasContent(resume, "education") && (
            <EducationBlock education={education} accentColor={accent} variant="badge" />
          )}

          {hasContent(resume, "certifications") && (
            <CertificationsBlock certifications={certifications} accentColor={accent} variant="badge" />
          )}

          {hasContent(resume, "internships") && (
            <InternshipsBlock internships={internships} accentColor={accent} variant="badge" />
          )}
        </div>

        {/* Right Main Column */}
        <div className="resume-main-right">
          {hasContent(resume, "summary") && (
            <SummaryBlock summary={summary} accentColor={accent} variant="badge" />
          )}

          {hasContent(resume, "experience") && (
            <ExperienceBlock experience={experience} accentColor={accent} variant="badge" />
          )}

          {hasContent(resume, "projects") && (
            <ProjectsBlock projects={projects} accentColor={accent} variant="badge" />
          )}

          {hasContent(resume, "achievements") && (
            <AchievementsBlock achievements={achievements} accentColor={accent} variant="badge" />
          )}

          <AdditionalSectionsBlock resume={resume} accentColor={accent} variant="badge" />
        </div>
      </div>
    </div>
  );
}
