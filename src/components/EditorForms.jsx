import React, { useState } from "react";
import { SUMMARY_CATEGORIES } from "../data/summarySuggestions";
import { isValidEmail, isValidPhone, isValidUrl } from "../utils/validation";
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  Sparkles,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Upload,
  Image,
  BookOpen,
  HelpCircle
} from "lucide-react";

/**
 * 1. Personal Information Section Form
 */
export function PersonalInfoForm({ personal, updatePersonal }) {
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Image is larger than 2MB. Please choose a smaller photo.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      updatePersonal("profilePhoto", uploadEvent.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleEmailChange = (val) => {
    updatePersonal("email", val);
    if (!isValidEmail(val)) {
      setEmailError("Please enter a valid email format");
    } else {
      setEmailError("");
    }
  };

  const handlePhoneChange = (val) => {
    updatePersonal("phone", val);
    if (!isValidPhone(val)) {
      setPhoneError("Please enter a valid phone number format");
    } else {
      setPhoneError("");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Profile Photo Upload */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "12px", backgroundColor: "#F8FAFC", borderRadius: "8px", border: "1px dashed var(--color-border)" }}>
        {personal?.profilePhoto ? (
          <img
            src={personal.profilePhoto}
            alt="Profile Preview"
            style={{ width: "65px", height: "65px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--color-royal-blue)" }}
          />
        ) : (
          <div style={{ width: "65px", height: "65px", borderRadius: "50%", backgroundColor: "#E2E8F0", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748B" }}>
            <Image size={24} />
          </div>
        )}
        <div>
          <label className="form-label" style={{ marginBottom: "4px" }}>
            Profile Photo <span className="optional">(Optional)</span>
          </label>
          <div style={{ display: "flex", gap: "8px" }}>
            <label className="btn btn-outline btn-sm" style={{ cursor: "pointer" }}>
              <Upload size={14} /> Upload Photo
              <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: "none" }} />
            </label>
            {personal?.profilePhoto && (
              <button
                type="button"
                onClick={() => updatePersonal("profilePhoto", "")}
                className="btn btn-ghost btn-sm"
                style={{ color: "#EF4444" }}
              >
                Remove
              </button>
            )}
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px", display: "block" }}>
            JPG, PNG or WebP under 2MB. Saved locally in browser.
          </span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "14px" }}>
        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Reshwanth Gangula"
            value={personal?.fullName || ""}
            onChange={(e) => updatePersonal("fullName", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Professional Title *</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Senior Software Engineer"
            value={personal?.professionalTitle || ""}
            onChange={(e) => updatePersonal("professionalTitle", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email Address *</label>
          <input
            type="email"
            className={`form-control ${emailError ? "is-invalid" : ""}`}
            placeholder="e.g. reshwanth@example.com"
            value={personal?.email || ""}
            onChange={(e) => handleEmailChange(e.target.value)}
          />
          {emailError && <div className="form-error">{emailError}</div>}
        </div>

        <div className="form-group">
          <label className="form-label">Phone Number *</label>
          <input
            type="tel"
            className={`form-control ${phoneError ? "is-invalid" : ""}`}
            placeholder="e.g. +91 98765 43210"
            value={personal?.phone || ""}
            onChange={(e) => handlePhoneChange(e.target.value)}
          />
          {phoneError && <div className="form-error">{phoneError}</div>}
        </div>

        <div className="form-group">
          <label className="form-label">City <span className="optional">(Optional)</span></label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Hyderabad"
            value={personal?.city || ""}
            onChange={(e) => updatePersonal("city", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Country <span className="optional">(Optional)</span></label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. India"
            value={personal?.country || ""}
            onChange={(e) => updatePersonal("country", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">LinkedIn URL <span className="optional">(Optional)</span></label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. linkedin.com/in/reshwanth"
            value={personal?.linkedin || ""}
            onChange={(e) => updatePersonal("linkedin", e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">GitHub URL <span className="optional">(Optional)</span></label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. github.com/reshwanth"
            value={personal?.github || ""}
            onChange={(e) => updatePersonal("github", e.target.value)}
          />
        </div>

        <div className="form-group" style={{ gridColumn: "1 / -1" }}>
          <label className="form-label">Portfolio / Personal Website <span className="optional">(Optional)</span></label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. reshwanth.dev"
            value={personal?.portfolio || ""}
            onChange={(e) => updatePersonal("portfolio", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * 2. Professional Summary Form with Curated Local Suggestions
 */
export function SummaryForm({ summary, updateSummary }) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const charCount = summary?.length || 0;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <label className="form-label" style={{ margin: 0 }}>
          Professional Summary
        </label>
        <button
          type="button"
          onClick={() => setShowSuggestions(!showSuggestions)}
          className="btn btn-outline btn-sm"
          style={{ fontSize: "0.8rem", padding: "4px 10px" }}
        >
          <Sparkles size={13} style={{ color: "var(--color-royal-blue)" }} />
          {showSuggestions ? "Hide Suggestions" : "Browse Role Suggestions"}
        </button>
      </div>

      {/* Suggested Curated Summaries Drawer */}
      {showSuggestions && (
        <div style={{ backgroundColor: "#F8FAFC", border: "1px solid var(--color-border)", borderRadius: "8px", padding: "14px", marginBottom: "14px" }}>
          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-navy)", marginBottom: "10px" }}>
            Select a verified role template (100% offline & local):
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "250px", overflowY: "auto" }}>
            {SUMMARY_CATEGORIES.map((cat, catIdx) => (
              <div key={catIdx}>
                <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--color-royal-blue)", textTransform: "uppercase", marginBottom: "4px" }}>
                  {cat.category}
                </div>
                {cat.suggestions.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    onClick={() => {
                      updateSummary(item.text);
                      setShowSuggestions(false);
                    }}
                    style={{
                      padding: "8px 10px",
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      borderRadius: "6px",
                      cursor: "pointer",
                      marginBottom: "6px",
                      fontSize: "0.82rem",
                      color: "#334155"
                    }}
                  >
                    <strong style={{ color: "var(--color-navy)", display: "block", marginBottom: "2px" }}>
                      {item.title}
                    </strong>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="form-group">
        <textarea
          className="form-control"
          rows={5}
          placeholder="Briefly highlight your core experience, key accomplishments, technical expertise, and career goals..."
          value={summary || ""}
          onChange={(e) => updateSummary(e.target.value)}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "4px" }}>
          <span>Aim for 200–500 characters for an optimal 3-4 sentence overview.</span>
          <span>{charCount} characters</span>
        </div>
      </div>
    </div>
  );
}

/**
 * 3. Education Form
 */
export function EducationForm({ education, addArrayItem, updateArrayItem, removeArrayItem, moveArrayItem }) {
  const handleAdd = () => {
    addArrayItem("education", {
      id: "edu_" + Date.now(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      grade: "",
      description: ""
    });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <div>
          <h4 style={{ margin: 0, fontSize: "1rem", color: "var(--color-navy)" }}>Education Entries</h4>
          <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>Degrees, universities, diplomas, or high school qualifications.</span>
        </div>
        <button type="button" onClick={handleAdd} className="btn btn-primary btn-sm">
          <Plus size={15} /> Add Education
        </button>
      </div>

      {(!education || education.length === 0) ? (
        <div style={{ textAlign: "center", padding: "24px", border: "2px dashed var(--color-border)", borderRadius: "8px", color: "var(--text-muted)" }}>
          No education entries yet. Click "Add Education" to include your degree.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {education.map((edu, idx) => (
            <div key={edu.id || idx} className="card" style={{ padding: "16px", backgroundColor: "#FAFBFD" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", borderBottom: "1px solid #E2E8F0", paddingBottom: "8px" }}>
                <strong style={{ fontSize: "0.95rem", color: "var(--color-navy)" }}>
                  #{idx + 1} {edu.institution || "New Institution"}
                </strong>
                <div style={{ display: "flex", gap: "4px" }}>
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => moveArrayItem("education", idx, "up")}
                    aria-label="Move Up"
                    style={{ background: "none", border: "none", cursor: idx === 0 ? "not-allowed" : "pointer", opacity: idx === 0 ? 0.3 : 1 }}
                  >
                    <ChevronUp size={16} />
                  </button>
                  <button
                    type="button"
                    disabled={idx === education.length - 1}
                    onClick={() => moveArrayItem("education", idx, "down")}
                    aria-label="Move Down"
                    style={{ background: "none", border: "none", cursor: idx === education.length - 1 ? "not-allowed" : "pointer", opacity: idx === education.length - 1 ? 0.3 : 1 }}
                  >
                    <ChevronDown size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeArrayItem("education", idx)}
                    aria-label="Remove Entry"
                    style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", marginLeft: "6px" }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
                <div className="form-group" style={{ marginBottom: "8px" }}>
                  <label className="form-label">Institution / University *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. National Institute of Technology"
                    value={edu.institution || ""}
                    onChange={(e) => updateArrayItem("education", idx, { ...edu, institution: e.target.value })}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: "8px" }}>
                  <label className="form-label">Degree *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Bachelor of Technology"
                    value={edu.degree || ""}
                    onChange={(e) => updateArrayItem("education", idx, { ...edu, degree: e.target.value })}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: "8px" }}>
                  <label className="form-label">Field of Study</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Computer Science"
                    value={edu.field || ""}
                    onChange={(e) => updateArrayItem("education", idx, { ...edu, field: e.target.value })}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: "8px" }}>
                  <label className="form-label">CGPA / Percentage</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. 8.9 CGPA / 85%"
                    value={edu.grade || ""}
                    onChange={(e) => updateArrayItem("education", idx, { ...edu, grade: e.target.value })}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: "8px" }}>
                  <label className="form-label">Start Year / Date</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. 2018"
                    value={edu.startDate || ""}
                    onChange={(e) => updateArrayItem("education", idx, { ...edu, startDate: e.target.value })}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: "8px" }}>
                  <label className="form-label">End Year / Expected</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. 2022"
                    value={edu.endDate || ""}
                    onChange={(e) => updateArrayItem("education", idx, { ...edu, endDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginTop: "6px", marginBottom: "0" }}>
                <label className="form-label">Key Highlights / Coursework <span className="optional">(Optional)</span></label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Dean's Honor List, President of Robotics Club"
                  value={edu.description || ""}
                  onChange={(e) => updateArrayItem("education", idx, { ...edu, description: e.target.value })}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * 4. Work Experience Form
 */
export function ExperienceForm({ experience, addArrayItem, updateArrayItem, removeArrayItem, moveArrayItem }) {
  const handleAdd = () => {
    addArrayItem("experience", {
      id: "exp_" + Date.now(),
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      responsibilities: "",
      achievements: ""
    });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <div>
          <h4 style={{ margin: 0, fontSize: "1rem", color: "var(--color-navy)" }}>Work Experience</h4>
          <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>Full-time or part-time professional roles. Skip if not applicable.</span>
        </div>
        <button type="button" onClick={handleAdd} className="btn btn-primary btn-sm">
          <Plus size={15} /> Add Position
        </button>
      </div>

      {(!experience || experience.length === 0) ? (
        <div style={{ textAlign: "center", padding: "24px", border: "2px dashed var(--color-border)", borderRadius: "8px", color: "var(--text-muted)" }}>
          No work experience added yet. Students and freshers can leave this blank!
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {experience.map((exp, idx) => (
            <div key={exp.id || idx} className="card" style={{ padding: "16px", backgroundColor: "#FAFBFD" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", borderBottom: "1px solid #E2E8F0", paddingBottom: "8px" }}>
                <strong style={{ fontSize: "0.95rem", color: "var(--color-navy)" }}>
                  #{idx + 1} {exp.title || "New Job Title"} {exp.company ? `at ${exp.company}` : ""}
                </strong>
                <div style={{ display: "flex", gap: "4px" }}>
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => moveArrayItem("experience", idx, "up")}
                    aria-label="Move Up"
                    style={{ background: "none", border: "none", cursor: idx === 0 ? "not-allowed" : "pointer", opacity: idx === 0 ? 0.3 : 1 }}
                  >
                    <ChevronUp size={16} />
                  </button>
                  <button
                    type="button"
                    disabled={idx === experience.length - 1}
                    onClick={() => moveArrayItem("experience", idx, "down")}
                    aria-label="Move Down"
                    style={{ background: "none", border: "none", cursor: idx === experience.length - 1 ? "not-allowed" : "pointer", opacity: idx === experience.length - 1 ? 0.3 : 1 }}
                  >
                    <ChevronDown size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeArrayItem("experience", idx)}
                    aria-label="Remove Position"
                    style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", marginLeft: "6px" }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
                <div className="form-group" style={{ marginBottom: "8px" }}>
                  <label className="form-label">Job Title *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Senior Frontend Engineer"
                    value={exp.title || ""}
                    onChange={(e) => updateArrayItem("experience", idx, { ...exp, title: e.target.value })}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: "8px" }}>
                  <label className="form-label">Company / Organization *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Damayanti Technologies"
                    value={exp.company || ""}
                    onChange={(e) => updateArrayItem("experience", idx, { ...exp, company: e.target.value })}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: "8px" }}>
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Hyderabad, India (or Remote)"
                    value={exp.location || ""}
                    onChange={(e) => updateArrayItem("experience", idx, { ...exp, location: e.target.value })}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: "8px" }}>
                  <label className="form-label">Start Date</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. July 2022"
                    value={exp.startDate || ""}
                    onChange={(e) => updateArrayItem("experience", idx, { ...exp, startDate: e.target.value })}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: "8px" }}>
                  <label className="form-label">End Date</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Present"
                    disabled={exp.currentlyWorking}
                    value={exp.currentlyWorking ? "Present" : exp.endDate || ""}
                    onChange={(e) => updateArrayItem("experience", idx, { ...exp, endDate: e.target.value })}
                  />
                </div>
                <div className="form-group" style={{ display: "flex", alignItems: "center", marginTop: "24px", marginBottom: "8px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "0.88rem" }}>
                    <input
                      type="checkbox"
                      checked={Boolean(exp.currentlyWorking)}
                      onChange={(e) => updateArrayItem("experience", idx, { ...exp, currentlyWorking: e.target.checked })}
                    />
                    <span>Currently working here</span>
                  </label>
                </div>
              </div>

              <div className="form-group" style={{ marginTop: "6px", marginBottom: "8px" }}>
                <label className="form-label">Responsibilities & Scope (Bullet points support multiple lines)</label>
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="• Architected responsive frontend microservices serving 150K+ monthly active users.&#10;• Reduced average bundle size by 35% using code-splitting."
                  value={exp.responsibilities || ""}
                  onChange={(e) => updateArrayItem("experience", idx, { ...exp, responsibilities: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ marginBottom: "0" }}>
                <label className="form-label">Key Achievement <span className="optional">(Optional highlight)</span></label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Awarded Innovation Star 2023 for leading the design system rollout"
                  value={exp.achievements || ""}
                  onChange={(e) => updateArrayItem("experience", idx, { ...exp, achievements: e.target.value })}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * 5. Skills Section Form (Categorized Technical, Soft, Languages, Other)
 */
export function SkillsForm({ skills, updateResume }) {
  const [newSkillText, setNewSkillText] = useState("");
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const categories = Array.isArray(skills) && skills.length > 0 ? skills : [
    { category: "Technical Skills", items: [] },
    { category: "Soft Skills", items: [] },
    { category: "Languages", items: [] },
    { category: "Other Skills", items: [] }
  ];

  const handleAddSkill = (catIdx) => {
    if (!newSkillText.trim()) return;
    const updated = [...categories];
    if (!updated[catIdx].items) updated[catIdx].items = [];
    if (!updated[catIdx].items.includes(newSkillText.trim())) {
      updated[catIdx].items.push(newSkillText.trim());
      updateResume({ skills: updated });
    }
    setNewSkillText("");
  };

  const handleRemoveSkill = (catIdx, itemIdx) => {
    const updated = [...categories];
    updated[catIdx].items.splice(itemIdx, 1);
    updateResume({ skills: updated });
  };

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <h4 style={{ margin: 0, fontSize: "1rem", color: "var(--color-navy)" }}>Skills Matrix</h4>
        <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
          Add technical tools, soft skills, languages, and competencies.
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {categories.map((group, catIdx) => (
          <div key={catIdx} className="card" style={{ padding: "14px", backgroundColor: "#FAFBFD" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <input
                type="text"
                value={group.category}
                onChange={(e) => {
                  const updated = [...categories];
                  updated[catIdx].category = e.target.value;
                  updateResume({ skills: updated });
                }}
                className="form-control"
                style={{ fontWeight: 700, width: "200px", padding: "4px 8px", fontSize: "0.9rem" }}
              />
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                {group.items?.length || 0} skills
              </span>
            </div>

            {/* Existing Skill Pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "10px", minHeight: "28px" }}>
              {group.items?.map((item, itemIdx) => (
                <span
                  key={itemIdx}
                  className="skill-tag"
                  style={{
                    backgroundColor: "rgba(54, 95, 173, 0.1)",
                    color: "var(--color-navy)",
                    padding: "3px 8px",
                    borderRadius: "4px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.85rem"
                  }}
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(catIdx, itemIdx)}
                    style={{ background: "none", border: "none", color: "#64748B", cursor: "pointer", padding: "0", fontSize: "1rem", lineHeight: 1 }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            {/* Add Input */}
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="text"
                className="form-control"
                placeholder={`Type a skill (e.g. React.js, Python, Leadership)...`}
                value={activeCategoryIndex === catIdx ? newSkillText : ""}
                onFocus={() => setActiveCategoryIndex(catIdx)}
                onChange={(e) => setNewSkillText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSkill(catIdx);
                  }
                }}
                style={{ padding: "6px 10px", fontSize: "0.9rem" }}
              />
              <button
                type="button"
                onClick={() => handleAddSkill(catIdx)}
                className="btn btn-outline btn-sm"
              >
                <Plus size={14} /> Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 6. Projects Section Form
 */
export function ProjectsForm({ projects, addArrayItem, updateArrayItem, removeArrayItem, moveArrayItem }) {
  const handleAdd = () => {
    addArrayItem("projects", {
      id: "proj_" + Date.now(),
      name: "",
      role: "",
      technologies: "",
      url: "",
      description: ""
    });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <div>
          <h4 style={{ margin: 0, fontSize: "1rem", color: "var(--color-navy)" }}>Projects & Portfolio</h4>
          <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>Showcase applications, systems, or case studies you've built.</span>
        </div>
        <button type="button" onClick={handleAdd} className="btn btn-primary btn-sm">
          <Plus size={15} /> Add Project
        </button>
      </div>

      {(!projects || projects.length === 0) ? (
        <div style={{ textAlign: "center", padding: "24px", border: "2px dashed var(--color-border)", borderRadius: "8px", color: "var(--text-muted)" }}>
          No projects added yet. Click "Add Project" to showcase your work!
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {projects.map((proj, idx) => (
            <div key={proj.id || idx} className="card" style={{ padding: "16px", backgroundColor: "#FAFBFD" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", borderBottom: "1px solid #E2E8F0", paddingBottom: "8px" }}>
                <strong style={{ fontSize: "0.95rem", color: "var(--color-navy)" }}>
                  #{idx + 1} {proj.name || "New Project"}
                </strong>
                <div style={{ display: "flex", gap: "4px" }}>
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => moveArrayItem("projects", idx, "up")}
                    aria-label="Move Up"
                    style={{ background: "none", border: "none", cursor: idx === 0 ? "not-allowed" : "pointer", opacity: idx === 0 ? 0.3 : 1 }}
                  >
                    <ChevronUp size={16} />
                  </button>
                  <button
                    type="button"
                    disabled={idx === projects.length - 1}
                    onClick={() => moveArrayItem("projects", idx, "down")}
                    aria-label="Move Down"
                    style={{ background: "none", border: "none", cursor: idx === projects.length - 1 ? "not-allowed" : "pointer", opacity: idx === projects.length - 1 ? 0.3 : 1 }}
                  >
                    <ChevronDown size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeArrayItem("projects", idx)}
                    aria-label="Remove Project"
                    style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", marginLeft: "6px" }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
                <div className="form-group" style={{ marginBottom: "8px" }}>
                  <label className="form-label">Project Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. CloudFlow DevOps Monitor"
                    value={proj.name || ""}
                    onChange={(e) => updateArrayItem("projects", idx, { ...proj, name: e.target.value })}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: "8px" }}>
                  <label className="form-label">Your Role</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Lead Developer / Creator"
                    value={proj.role || ""}
                    onChange={(e) => updateArrayItem("projects", idx, { ...proj, role: e.target.value })}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: "8px" }}>
                  <label className="form-label">Technologies Used</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. React, Node.js, IndexedDB, Tailwind"
                    value={proj.technologies || ""}
                    onChange={(e) => updateArrayItem("projects", idx, { ...proj, technologies: e.target.value })}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: "8px" }}>
                  <label className="form-label">Project / Demo Link</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. https://cloudflow.example.com"
                    value={proj.url || ""}
                    onChange={(e) => updateArrayItem("projects", idx, { ...proj, url: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: "0", marginTop: "4px" }}>
                <label className="form-label">Description & Key Architecture</label>
                <textarea
                  className="form-control"
                  rows={2}
                  placeholder="Designed an offline-first dashboard capable of streaming live metrics..."
                  value={proj.description || ""}
                  onChange={(e) => updateArrayItem("projects", idx, { ...proj, description: e.target.value })}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * 7. Certifications & Achievements Form
 */
export function CertificationsAchievementsForm({
  certifications,
  achievements,
  addArrayItem,
  updateArrayItem,
  removeArrayItem
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Certifications */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <h4 style={{ margin: 0, fontSize: "1rem", color: "var(--color-navy)" }}>Licenses & Certifications</h4>
          <button
            type="button"
            onClick={() => addArrayItem("certifications", { id: "cert_" + Date.now(), name: "", organization: "", date: "", url: "" })}
            className="btn btn-primary btn-sm"
          >
            <Plus size={15} /> Add Certificate
          </button>
        </div>

        {certifications?.map((cert, idx) => (
          <div key={cert.id || idx} className="card" style={{ padding: "12px", marginBottom: "8px", backgroundColor: "#FAFBFD" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "8px" }}>
              <input
                type="text"
                className="form-control"
                placeholder="Certification Name (e.g. AWS Solutions Architect)"
                value={cert.name || ""}
                onChange={(e) => updateArrayItem("certifications", idx, { ...cert, name: e.target.value })}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Issuing Organization (e.g. Amazon Web Services)"
                value={cert.organization || ""}
                onChange={(e) => updateArrayItem("certifications", idx, { ...cert, organization: e.target.value })}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Date / Year (e.g. 2023)"
                value={cert.date || ""}
                onChange={(e) => updateArrayItem("certifications", idx, { ...cert, date: e.target.value })}
              />
              <div style={{ display: "flex", gap: "6px" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Credential URL"
                  value={cert.url || ""}
                  onChange={(e) => updateArrayItem("certifications", idx, { ...cert, url: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem("certifications", idx)}
                  style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", padding: "4px" }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <h4 style={{ margin: 0, fontSize: "1rem", color: "var(--color-navy)" }}>Key Achievements</h4>
          <button
            type="button"
            onClick={() => addArrayItem("achievements", { id: "ach_" + Date.now(), title: "", description: "" })}
            className="btn btn-primary btn-sm"
          >
            <Plus size={15} /> Add Achievement
          </button>
        </div>

        {achievements?.map((ach, idx) => (
          <div key={ach.id || idx} className="card" style={{ padding: "12px", marginBottom: "8px", backgroundColor: "#FAFBFD" }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Achievement Title (e.g. 1st Place National Hackathon)"
                  value={ach.title || ""}
                  onChange={(e) => updateArrayItem("achievements", idx, { ...ach, title: e.target.value })}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Details (e.g. Selected 1st out of 500+ teams nationwide)"
                  value={ach.description || ""}
                  onChange={(e) => updateArrayItem("achievements", idx, { ...ach, description: e.target.value })}
                />
              </div>
              <button
                type="button"
                onClick={() => removeArrayItem("achievements", idx)}
                style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", padding: "8px" }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 8. Additional Sections Form (Internships, Volunteer, Publications, Awards, Hobbies, References)
 */
export function AdditionalSectionsForm({ resume, addArrayItem, updateArrayItem, removeArrayItem, updateResume }) {
  const handleHobbiesChange = (val) => {
    const list = val.split(",").map((s) => s.trim());
    updateResume({ hobbies: list });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Internships */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <h4 style={{ margin: 0, fontSize: "0.95rem", color: "var(--color-navy)" }}>Internships</h4>
          <button
            type="button"
            onClick={() => addArrayItem("internships", { id: "intern_" + Date.now(), role: "", organization: "", duration: "", description: "" })}
            className="btn btn-outline btn-sm"
          >
            <Plus size={14} /> Add Internship
          </button>
        </div>
        {resume.internships?.map((item, idx) => (
          <div key={item.id || idx} className="card" style={{ padding: "10px", marginBottom: "8px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: "6px" }}>
              <input
                type="text"
                className="form-control"
                placeholder="Role (e.g. Web Intern)"
                value={item.role || ""}
                onChange={(e) => updateArrayItem("internships", idx, { ...item, role: e.target.value })}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Organization"
                value={item.organization || ""}
                onChange={(e) => updateArrayItem("internships", idx, { ...item, organization: e.target.value })}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Duration (e.g. May - July 2021)"
                value={item.duration || ""}
                onChange={(e) => updateArrayItem("internships", idx, { ...item, duration: e.target.value })}
              />
              <button
                type="button"
                onClick={() => removeArrayItem("internships", idx)}
                style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer" }}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Hobbies & Interests */}
      <div className="form-group" style={{ marginBottom: "0" }}>
        <label className="form-label">Interests & Hobbies (Comma separated)</label>
        <input
          type="text"
          className="form-control"
          placeholder="e.g. Open Source, Landscape Photography, Competitive Chess, Marathon Running"
          value={Array.isArray(resume.hobbies) ? resume.hobbies.join(", ") : ""}
          onChange={(e) => handleHobbiesChange(e.target.value)}
        />
      </div>
    </div>
  );
}
