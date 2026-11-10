/**
 * Helper utilities for resume data checking and formatting
 */

/**
 * Check if a section has valid content and should be rendered in the template
 */
export function hasContent(resume, sectionKey) {
  if (!resume) return false;

  // Check section visibility toggle first
  if (resume.sectionVisibility && resume.sectionVisibility[sectionKey] === false) {
    return false;
  }

  switch (sectionKey) {
    case "personal":
      return Boolean(
        resume.personal?.fullName?.trim() ||
        resume.personal?.email?.trim() ||
        resume.personal?.phone?.trim()
      );

    case "summary":
      return Boolean(resume.summary && resume.summary.trim().length > 0);

    case "education":
      return Boolean(
        Array.isArray(resume.education) &&
        resume.education.some(
          (e) => (e.institution && e.institution.trim()) || (e.degree && e.degree.trim())
        )
      );

    case "experience":
      return Boolean(
        Array.isArray(resume.experience) &&
        resume.experience.some(
          (e) => (e.company && e.company.trim()) || (e.title && e.title.trim())
        )
      );

    case "internships":
      return Boolean(
        Array.isArray(resume.internships) &&
        resume.internships.some(
          (i) => (i.organization && i.organization.trim()) || (i.role && i.role.trim())
        )
      );

    case "skills":
      return Boolean(
        Array.isArray(resume.skills) &&
        resume.skills.some((group) => group.items && group.items.length > 0)
      );

    case "projects":
      return Boolean(
        Array.isArray(resume.projects) &&
        resume.projects.some((p) => p.name && p.name.trim())
      );

    case "certifications":
      return Boolean(
        Array.isArray(resume.certifications) &&
        resume.certifications.some((c) => c.name && c.name.trim())
      );

    case "achievements":
      return Boolean(
        Array.isArray(resume.achievements) &&
        resume.achievements.some((a) => a.title && a.title.trim())
      );

    case "volunteerExperience":
      return Boolean(
        Array.isArray(resume.volunteerExperience) &&
        resume.volunteerExperience.some((v) => (v.organization && v.organization.trim()) || (v.role && v.role.trim()))
      );

    case "publications":
      return Boolean(
        Array.isArray(resume.publications) &&
        resume.publications.some((p) => p.title && p.title.trim())
      );

    case "awards":
      return Boolean(
        Array.isArray(resume.awards) &&
        resume.awards.some((a) => a.title && a.title.trim())
      );

    case "hobbies":
      return Boolean(
        Array.isArray(resume.hobbies) &&
        resume.hobbies.some((h) => typeof h === "string" && h.trim().length > 0)
      );

    case "references":
      return Boolean(
        Array.isArray(resume.references) &&
        resume.references.some((r) => r.name && r.name.trim())
      );

    default:
      return true;
  }
}

/**
 * Splits multiline string into bullet points or paragraphs cleanly
 */
export function parseBulletPoints(text) {
  if (!text) return [];
  return text
    .split("\n")
    .map((line) => line.replace(/^[•\-\*]\s*/, "").trim())
    .filter((line) => line.length > 0);
}
