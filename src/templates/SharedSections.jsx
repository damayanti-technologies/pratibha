import React from "react";
import { parseBulletPoints, hasContent } from "../utils/resumeHelpers";
import { formatUrlForDisplay } from "../utils/formatting";
import { Mail, Phone, MapPin, Linkedin, Github, Globe, ExternalLink } from "lucide-react";

/**
 * Clean Contact Details Bar
 */
export function ContactBar({ personal, accentColor, layout = "row" }) {
  if (!personal) return null;
  const { email, phone, city, country, linkedin, github, portfolio } = personal;

  const location = [city, country].filter(Boolean).join(", ");

  const items = [
    email && { icon: Mail, label: email, href: `mailto:${email}` },
    phone && { icon: Phone, label: phone, href: `tel:${phone.replace(/\s+/g, "")}` },
    location && { icon: MapPin, label: location },
    linkedin && { icon: Linkedin, label: formatUrlForDisplay(linkedin), href: linkedin.startsWith("http") ? linkedin : `https://${linkedin}` },
    github && { icon: Github, label: formatUrlForDisplay(github), href: github.startsWith("http") ? github : `https://${github}` },
    portfolio && { icon: Globe, label: formatUrlForDisplay(portfolio), href: portfolio.startsWith("http") ? portfolio : `https://${portfolio}` }
  ].filter(Boolean);

  if (items.length === 0) return null;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: layout === "column" ? "column" : "row",
        gap: layout === "column" ? "6px" : "12px",
        alignItems: layout === "column" ? "flex-start" : "center",
        fontSize: "0.85em",
        marginTop: "4px"
      }}
    >
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <span key={idx} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
            <Icon size={12} style={{ color: accentColor || "#365FAD", flexShrink: 0 }} />
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                {item.label}
              </a>
            ) : (
              <span>{item.label}</span>
            )}
          </span>
        );
      })}
    </div>
  );
}

/**
 * Standard Section Title
 */
export function SectionTitle({ title, accentColor, variant = "line" }) {
  if (variant === "badge") {
    return (
      <div
        style={{
          display: "inline-block",
          background: accentColor || "#365FAD",
          color: "#fff",
          padding: "2px 8px",
          borderRadius: "3px",
          fontWeight: 700,
          fontSize: "0.9em",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          marginBottom: "8px"
        }}
      >
        {title}
      </div>
    );
  }

  if (variant === "border-left") {
    return (
      <div
        style={{
          borderLeft: `3px solid ${accentColor || "#365FAD"}`,
          paddingLeft: "8px",
          fontWeight: 700,
          fontSize: "1.05em",
          color: "#17243B",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          marginBottom: "8px"
        }}
      >
        {title}
      </div>
    );
  }

  if (variant === "classic") {
    return (
      <div
        style={{
          borderBottom: "1px solid #17243B",
          fontWeight: 700,
          fontSize: "1.05em",
          color: "#17243B",
          textTransform: "uppercase",
          letterSpacing: "0.8px",
          marginBottom: "8px",
          paddingBottom: "2px"
        }}
      >
        {title}
      </div>
    );
  }

  // Default: modern accent bottom line
  return (
    <div
      style={{
        borderBottom: `1.5px solid ${accentColor || "#365FAD"}`,
        fontWeight: 700,
        fontSize: "1.05em",
        color: accentColor || "#17243B",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        marginBottom: "8px",
        paddingBottom: "3px"
      }}
    >
      {title}
    </div>
  );
}

/**
 * Professional Summary
 */
export function SummaryBlock({ summary, title = "Professional Summary", accentColor, variant }) {
  if (!summary || !summary.trim()) return null;
  return (
    <div className="resume-section">
      <SectionTitle title={title} accentColor={accentColor} variant={variant} />
      <p style={{ margin: 0, whiteSpace: "pre-line", textAlign: "justify" }}>{summary}</p>
    </div>
  );
}

/**
 * Work Experience Section
 */
export function ExperienceBlock({ experience, accentColor, variant }) {
  if (!Array.isArray(experience) || experience.length === 0) return null;
  const valid = experience.filter((e) => (e.company && e.company.trim()) || (e.title && e.title.trim()));
  if (valid.length === 0) return null;

  return (
    <div className="resume-section">
      <SectionTitle title="Work Experience" accentColor={accentColor} variant={variant} />
      {valid.map((exp, idx) => {
        const bullets = parseBulletPoints(exp.responsibilities);
        const dates = [exp.startDate, exp.currentlyWorking ? "Present" : exp.endDate].filter(Boolean).join(" - ");

        return (
          <div key={exp.id || idx} className="resume-entry" style={{ marginBottom: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap" }}>
              <strong style={{ fontSize: "1.02em", color: "#17243B" }}>{exp.title}</strong>
              <span style={{ fontSize: "0.88em", color: "#64748B", fontWeight: 500 }}>{dates}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.92em", color: "#475569", marginBottom: "4px" }}>
              <span style={{ fontWeight: 600, color: accentColor || "#365FAD" }}>{exp.company}</span>
              {exp.location && <span>{exp.location}</span>}
            </div>

            {bullets.length > 0 ? (
              <ul className="resume-bullets">
                {bullets.map((b, bIdx) => (
                  <li key={bIdx}>{b}</li>
                ))}
              </ul>
            ) : exp.responsibilities ? (
              <p style={{ margin: "3px 0 0 0", whiteSpace: "pre-line" }}>{exp.responsibilities}</p>
            ) : null}

            {exp.achievements && (
              <div style={{ marginTop: "4px", fontSize: "0.92em", color: "#334155" }}>
                <strong>Key Achievement: </strong>
                <span>{exp.achievements}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Education Section
 */
export function EducationBlock({ education, accentColor, variant }) {
  if (!Array.isArray(education) || education.length === 0) return null;
  const valid = education.filter((e) => (e.institution && e.institution.trim()) || (e.degree && e.degree.trim()));
  if (valid.length === 0) return null;

  return (
    <div className="resume-section">
      <SectionTitle title="Education" accentColor={accentColor} variant={variant} />
      {valid.map((edu, idx) => {
        const dates = [edu.startDate, edu.endDate].filter(Boolean).join(" - ");
        const degreeField = [edu.degree, edu.field].filter(Boolean).join(" in ");

        return (
          <div key={edu.id || idx} className="resume-entry" style={{ marginBottom: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap" }}>
              <strong style={{ color: "#17243B" }}>{edu.institution}</strong>
              <span style={{ fontSize: "0.88em", color: "#64748B" }}>{dates}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.92em", color: "#475569" }}>
              <span>{degreeField}</span>
              {edu.grade && <strong style={{ color: accentColor || "#365FAD" }}>{edu.grade}</strong>}
            </div>
            {edu.description && (
              <p style={{ margin: "2px 0 0 0", fontSize: "0.9em", color: "#475569" }}>{edu.description}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Skills Section (Supports grouped categories or flat list)
 */
export function SkillsBlock({ skills, accentColor, variant, badgeStyle = "tag" }) {
  if (!Array.isArray(skills) || skills.length === 0) return null;
  const valid = skills.filter((s) => s.items && s.items.length > 0);
  if (valid.length === 0) return null;

  return (
    <div className="resume-section">
      <SectionTitle title="Skills" accentColor={accentColor} variant={variant} />
      {valid.map((group, idx) => (
        <div key={idx} style={{ marginBottom: "6px" }}>
          {group.category && (
            <span style={{ fontWeight: 600, fontSize: "0.92em", color: "#17243B", marginRight: "6px" }}>
              {group.category}:
            </span>
          )}
          {badgeStyle === "tag" ? (
            <span style={{ fontSize: "0.9em", color: "#334155" }}>
              {group.items.join(" • ")}
            </span>
          ) : (
            <div style={{ display: "inline-flex", flexWrap: "wrap", gap: "4px" }}>
              {group.items.map((item, itemIdx) => (
                <span
                  key={itemIdx}
                  className="skill-tag"
                  style={{
                    backgroundColor: "rgba(54, 95, 173, 0.08)",
                    color: "#17243B",
                    fontSize: "0.85em",
                    padding: "1px 6px",
                    borderRadius: "3px"
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * Projects Section
 */
export function ProjectsBlock({ projects, accentColor, variant }) {
  if (!Array.isArray(projects) || projects.length === 0) return null;
  const valid = projects.filter((p) => p.name && p.name.trim());
  if (valid.length === 0) return null;

  return (
    <div className="resume-section">
      <SectionTitle title="Projects" accentColor={accentColor} variant={variant} />
      {valid.map((proj, idx) => (
        <div key={proj.id || idx} className="resume-entry" style={{ marginBottom: "8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap" }}>
            <span style={{ fontWeight: 700, color: "#17243B" }}>
              {proj.name}
              {proj.role && <span style={{ fontWeight: 400, color: "#64748B", fontSize: "0.9em" }}> — {proj.role}</span>}
            </span>
            {proj.url && (
              <a
                href={proj.url.startsWith("http") ? proj.url : `https://${proj.url}`}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: "0.85em", color: accentColor || "#365FAD", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "2px" }}
              >
                <span>Link</span>
                <ExternalLink size={10} />
              </a>
            )}
          </div>
          {proj.technologies && (
            <div style={{ fontSize: "0.85em", color: accentColor || "#365FAD", fontWeight: 600 }}>
              Tech Stack: {proj.technologies}
            </div>
          )}
          {proj.description && (
            <p style={{ margin: "2px 0 0 0", fontSize: "0.92em", color: "#334155" }}>{proj.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * Internships Block
 */
export function InternshipsBlock({ internships, accentColor, variant }) {
  if (!Array.isArray(internships) || internships.length === 0) return null;
  const valid = internships.filter((i) => (i.organization && i.organization.trim()) || (i.role && i.role.trim()));
  if (valid.length === 0) return null;

  return (
    <div className="resume-section">
      <SectionTitle title="Internships" accentColor={accentColor} variant={variant} />
      {valid.map((item, idx) => (
        <div key={item.id || idx} className="resume-entry" style={{ marginBottom: "8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <strong style={{ color: "#17243B" }}>{item.role}</strong>
            <span style={{ fontSize: "0.88em", color: "#64748B" }}>{item.duration}</span>
          </div>
          <div style={{ fontSize: "0.9em", color: accentColor || "#365FAD", fontWeight: 600 }}>
            {item.organization}
          </div>
          {item.description && (
            <p style={{ margin: "2px 0 0 0", fontSize: "0.92em", color: "#334155" }}>{item.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * Certifications Block
 */
export function CertificationsBlock({ certifications, accentColor, variant }) {
  if (!Array.isArray(certifications) || certifications.length === 0) return null;
  const valid = certifications.filter((c) => c.name && c.name.trim());
  if (valid.length === 0) return null;

  return (
    <div className="resume-section">
      <SectionTitle title="Certifications" accentColor={accentColor} variant={variant} />
      <ul style={{ margin: "2px 0 0 16px", padding: 0 }}>
        {valid.map((cert, idx) => (
          <li key={cert.id || idx} style={{ marginBottom: "4px", fontSize: "0.92em" }}>
            <strong style={{ color: "#17243B" }}>{cert.name}</strong>
            {cert.organization && <span> — {cert.organization}</span>}
            {cert.date && <span style={{ color: "#64748B", fontSize: "0.9em" }}> ({cert.date})</span>}
            {cert.url && (
              <a
                href={cert.url.startsWith("http") ? cert.url : `https://${cert.url}`}
                target="_blank"
                rel="noreferrer"
                style={{ marginLeft: "6px", color: accentColor || "#365FAD", textDecoration: "none", fontSize: "0.88em" }}
              >
                [Verify]
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Achievements Block
 */
export function AchievementsBlock({ achievements, accentColor, variant }) {
  if (!Array.isArray(achievements) || achievements.length === 0) return null;
  const valid = achievements.filter((a) => a.title && a.title.trim());
  if (valid.length === 0) return null;

  return (
    <div className="resume-section">
      <SectionTitle title="Achievements" accentColor={accentColor} variant={variant} />
      <ul style={{ margin: "2px 0 0 16px", padding: 0 }}>
        {valid.map((ach, idx) => (
          <li key={ach.id || idx} style={{ marginBottom: "4px", fontSize: "0.92em" }}>
            <strong style={{ color: "#17243B" }}>{ach.title}</strong>
            {ach.description && <span>: {ach.description}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Additional Sections (Volunteer, Publications, Awards, Hobbies, References)
 */
export function AdditionalSectionsBlock({ resume, accentColor, variant }) {
  const { volunteerExperience, publications, awards, hobbies, references } = resume;

  return (
    <>
      {hasContent(resume, "volunteerExperience") && (
        <div className="resume-section">
          <SectionTitle title="Volunteer Experience" accentColor={accentColor} variant={variant} />
          {volunteerExperience.map((vol, idx) => (
            <div key={vol.id || idx} className="resume-entry" style={{ marginBottom: "6px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <strong style={{ color: "#17243B" }}>{vol.role}</strong>
                <span style={{ fontSize: "0.88em", color: "#64748B" }}>{vol.duration}</span>
              </div>
              <div style={{ fontSize: "0.9em", color: accentColor || "#365FAD" }}>{vol.organization}</div>
              {vol.description && <p style={{ margin: "2px 0 0 0", fontSize: "0.9em" }}>{vol.description}</p>}
            </div>
          ))}
        </div>
      )}

      {hasContent(resume, "publications") && (
        <div className="resume-section">
          <SectionTitle title="Publications" accentColor={accentColor} variant={variant} />
          <ul style={{ margin: "2px 0 0 16px", padding: 0 }}>
            {publications.map((pub, idx) => (
              <li key={pub.id || idx} style={{ marginBottom: "4px", fontSize: "0.92em" }}>
                <em>"{pub.title}"</em> — {pub.publisher} ({pub.date})
                {pub.url && (
                  <a href={pub.url} target="_blank" rel="noreferrer" style={{ marginLeft: "4px", color: accentColor || "#365FAD" }}>
                    [Link]
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasContent(resume, "awards") && (
        <div className="resume-section">
          <SectionTitle title="Honors & Awards" accentColor={accentColor} variant={variant} />
          <ul style={{ margin: "2px 0 0 16px", padding: 0 }}>
            {awards.map((award, idx) => (
              <li key={award.id || idx} style={{ marginBottom: "4px", fontSize: "0.92em" }}>
                <strong>{award.title}</strong> — {award.issuer} ({award.date})
                {award.description && <div>{award.description}</div>}
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasContent(resume, "hobbies") && (
        <div className="resume-section">
          <SectionTitle title="Interests & Hobbies" accentColor={accentColor} variant={variant} />
          <p style={{ margin: 0, fontSize: "0.92em" }}>
            {hobbies.filter(Boolean).join(" • ")}
          </p>
        </div>
      )}

      {hasContent(resume, "references") && (
        <div className="resume-section">
          <SectionTitle title="References" accentColor={accentColor} variant={variant} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "8px" }}>
            {references.map((ref, idx) => (
              <div key={ref.id || idx} style={{ fontSize: "0.9em", background: "#F8FAFC", padding: "6px 10px", borderRadius: "4px" }}>
                <strong style={{ color: "#17243B", display: "block" }}>{ref.name}</strong>
                <div>{ref.title} — {ref.company}</div>
                {ref.contact && <div style={{ color: accentColor || "#365FAD" }}>{ref.contact}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
