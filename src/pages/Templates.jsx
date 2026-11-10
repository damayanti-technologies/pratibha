import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TEMPLATES, TEMPLATE_CATEGORIES } from "../templates/templateRegistry";
import { sampleResume } from "../data/defaultResume";
import TemplateRenderer from "../templates/TemplateRenderer";
import TemplateCard from "../components/TemplateCard";
import Modal from "../components/Modal";
import { createNewResume } from "../services/storage";
import { Search, Filter, X, ArrowRight, Eye, Check } from "lucide-react";

export default function Templates() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const navigate = useNavigate();

  // Filter logic
  const filteredTemplates = TEMPLATES.filter((tmpl) => {
    const matchesCategory =
      selectedCategory === "All" || tmpl.category === selectedCategory;
    const matchesSearch =
      tmpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tmpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tmpl.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleUseTemplate = async (templateId) => {
    try {
      const newResume = await createNewResume(templateId, "My Resume");
      navigate(`/editor/${newResume.id}`);
    } catch (e) {
      navigate(`/editor/new?template=${templateId}`);
    }
  };

  const handleClearFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
  };

  return (
    <div className="container" style={{ padding: "40px 20px 80px 20px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <span className="badge badge-gold" style={{ marginBottom: "8px" }}>
          Template Collection
        </span>
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--color-navy)", letterSpacing: "-0.5px" }}>
          18 Professional Resume Templates
        </h1>
        <p style={{ color: "var(--text-muted)", maxWidth: "600px", margin: "8px auto 0 auto", fontSize: "1.05rem" }}>
          Explore our complete catalog of ATS-friendly, Modern, Professional, Creative, and Academic layouts.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="card"
        style={{
          padding: "16px 20px",
          marginBottom: "36px",
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}
      >
        <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
          {/* Search Input */}
          <div style={{ position: "relative", flex: 1, minWidth: "240px" }}>
            <Search
              size={18}
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)"
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Search templates by name, keyword or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: "38px" }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "#94A3B8",
                  cursor: "pointer"
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {(selectedCategory !== "All" || searchQuery) && (
            <button onClick={handleClearFilters} className="btn btn-ghost btn-sm" style={{ color: "#EF4444" }}>
              <X size={15} /> Clear Filters
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)", marginRight: "6px" }}>
            Categories:
          </span>
          {TEMPLATE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`btn btn-sm ${isSelected ? "btn-primary" : "btn-outline"}`}
                style={{
                  borderRadius: "999px",
                  padding: "5px 14px",
                  fontSize: "0.82rem"
                }}
              >
                {cat}
                {cat !== "All" && (
                  <span style={{ opacity: 0.7, marginLeft: "4px" }}>
                    ({TEMPLATES.filter((t) => t.category === cat).length})
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 500 }}>
          Showing <strong>{filteredTemplates.length}</strong> of {TEMPLATES.length} templates
        </span>
      </div>

      {/* Templates Grid */}
      {filteredTemplates.length === 0 ? (
        <div className="card" style={{ padding: "60px 20px", textAlign: "center", color: "var(--text-muted)" }}>
          <h3 style={{ color: "var(--color-navy)", marginBottom: "8px" }}>No templates found</h3>
          <p style={{ margin: "0 0 16px 0" }}>No templates matched your search for "{searchQuery}".</p>
          <button onClick={handleClearFilters} className="btn btn-primary btn-sm">
            Reset All Filters
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "28px"
          }}
        >
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onSelect={() => handleUseTemplate(template.id)}
              onPreview={(tmpl) => setPreviewTemplate(tmpl)}
            />
          ))}
        </div>
      )}

      {/* Interactive Template Preview Modal */}
      {previewTemplate && (
        <Modal
          isOpen={Boolean(previewTemplate)}
          onClose={() => setPreviewTemplate(null)}
          title={`Template Preview: ${previewTemplate.name}`}
          maxWidth="850px"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
              <div>
                <span className="badge badge-gold" style={{ marginRight: "6px" }}>
                  {previewTemplate.category}
                </span>
                <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                  {previewTemplate.description}
                </span>
              </div>
              <button
                onClick={() => {
                  setPreviewTemplate(null);
                  handleUseTemplate(previewTemplate.id);
                }}
                className="btn btn-primary btn-sm"
              >
                <span>Use This Template</span>
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Live Rendered Template Mockup Container */}
            <div
              style={{
                backgroundColor: "#F1F5F9",
                padding: "20px",
                borderRadius: "8px",
                overflowX: "auto",
                maxHeight: "70vh"
              }}
            >
              <div style={{ transform: "scale(0.85)", transformOrigin: "top center", width: "210mm", margin: "0 auto" }}>
                <TemplateRenderer
                  resume={{
                    ...sampleResume,
                    selectedTemplate: previewTemplate.id,
                    accentColor: previewTemplate.defaultColor
                  }}
                  id="preview-modal-render"
                />
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
