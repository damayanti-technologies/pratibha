import React from "react";
import { getTemplateById } from "./templateRegistry";

/**
 * Universal Template Renderer
 * Dynamically renders the selected template with shared resume data
 */
export default function TemplateRenderer({ resume, id = "resume-document-to-print" }) {
  if (!resume) return null;

  const templateConfig = getTemplateById(resume.selectedTemplate);
  const TemplateComponent = templateConfig.component;

  return (
    <div
      id={id}
      className="resume-print-wrapper"
      style={{
        "--accent-color": resume.accentColor || templateConfig.defaultColor || "#365FAD"
      }}
    >
      <TemplateComponent resume={resume} />
    </div>
  );
}
