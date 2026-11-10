import React from "react";
import {
  ContactBar,
  SummaryBlock,
  EducationBlock,
  ExperienceBlock,
  SkillsBlock,
  ProjectsBlock,
  CertificationsBlock,
  AchievementsBlock,
  AdditionalSectionsBlock
} from "./SharedSections";
import { hasContent } from "../utils/resumeHelpers";

/**
 * Template 17: Academic CV
 * Category: Academic
 * Standard academic curriculum vitae format prioritizing Education, Publications, Teaching, and Research.
 */
export default function Template17({ resume }) {
  const accent = resume.accentColor || "#17243B";
  const { personal, summary, education, experience, publications, awards, skills, projects, certifications, achievements } = resume;

  return (
    <div
      className={`resume-a4-sheet font-${resume.fontSize || "medium"}`}
      style={{
        fontFamily: resume.fontFamily || "Merriweather, Georgia, serif"
      }}
    >
      {/* Formal Academic Header */}
      <div style={{ textAlign: "center", marginBottom: "16px", paddingBottom: "10px", borderBottom: `2px solid #17243B` }}>
        <h1 style={{ margin: "0 0 4px 0", fontSize: "1.9em", fontWeight: 700, color: "#17243B", letterSpacing: "1px" }}>
          {personal?.fullName || "Your Full Name"}
        </h1>
        <div style={{ fontSize: "1.05em", fontStyle: "italic", color: "#475569", marginBottom: "6px" }}>
          {personal?.professionalTitle || "Curriculum Vitae"}
        </div>
        <div style={{ display: "flex", justifyContent: "center", fontFamily: "Inter, sans-serif" }}>
          <ContactBar personal={personal} accentColor={accent} layout="row" />
        </div>
      </div>

      {/* Academic Profile */}
      {hasContent(resume, "summary") && (
        <SummaryBlock summary={summary} title="Academic Profile & Research Interests" accentColor={accent} variant="classic" />
      )}

      {/* Academic degrees come first */}
      {hasContent(resume, "education") && (
        <EducationBlock education={education} accentColor={accent} variant="classic" />
      )}

      {/* Research & Teaching Appointments */}
      {hasContent(resume, "experience") && (
        <ExperienceBlock experience={experience} accentColor={accent} variant="classic" />
      )}

      {/* Publications */}
      <AdditionalSectionsBlock resume={resume} accentColor={accent} variant="classic" />

      {/* Projects / Grants */}
      {hasContent(resume, "projects") && (
        <ProjectsBlock projects={projects} accentColor={accent} variant="classic" />
      )}

      {/* Skills / Methodologies */}
      {hasContent(resume, "skills") && (
        <SkillsBlock skills={skills} accentColor={accent} variant="classic" badgeStyle="tag" />
      )}

      {/* Certifications */}
      {hasContent(resume, "certifications") && (
        <CertificationsBlock certifications={certifications} accentColor={accent} variant="classic" />
      )}

      {/* Honors */}
      {hasContent(resume, "achievements") && (
        <AchievementsBlock achievements={achievements} accentColor={accent} variant="classic" />
      )}
    </div>
  );
}
