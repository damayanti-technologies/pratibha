import Template01 from "./Template01";
import Template02 from "./Template02";
import Template03 from "./Template03";
import Template04 from "./Template04";
import Template05 from "./Template05";
import Template06 from "./Template06";
import Template07 from "./Template07";
import Template08 from "./Template08";
import Template09 from "./Template09";
import Template10 from "./Template10";
import Template11 from "./Template11";
import Template12 from "./Template12";
import Template13 from "./Template13";
import Template14 from "./Template14";
import Template15 from "./Template15";
import Template16 from "./Template16";
import Template17 from "./Template17";
import Template18 from "./Template18";

export const TEMPLATE_CATEGORIES = [
  "All",
  "ATS-Friendly",
  "Modern",
  "Professional",
  "Creative",
  "Academic"
];

export const TEMPLATES = [
  // 1. ATS-Friendly (5 templates)
  {
    id: "template01",
    name: "Minimal ATS Resume",
    category: "ATS-Friendly",
    component: Template01,
    description: "Ultra-clean single column layout with standard headings for optimal scanner parsing.",
    defaultColor: "#17243B",
    popular: true,
    tags: ["ATS-Ready", "Single Column", "Clean"]
  },
  {
    id: "template02",
    name: "Classic Professional",
    category: "ATS-Friendly",
    component: Template02,
    description: "Timeless serif design with traditional centered header and formal horizontal dividers.",
    defaultColor: "#17243B",
    popular: false,
    tags: ["Serif", "Traditional", "ATS-Ready"]
  },
  {
    id: "template03",
    name: "Minimal Fresher",
    category: "ATS-Friendly",
    component: Template03,
    description: "Prioritizes Education, Projects, and Technical Skills. Designed for students and graduates.",
    defaultColor: "#365FAD",
    popular: true,
    tags: ["Entry-Level", "Fresher", "Student"]
  },
  {
    id: "template04",
    name: "Engineering Resume",
    category: "ATS-Friendly",
    component: Template04,
    description: "Built for developers and engineers with prominent technical skill matrices and metrics.",
    defaultColor: "#1E3A8A",
    popular: true,
    tags: ["Technical", "Engineering", "Metrics"]
  },
  {
    id: "template05",
    name: "Compact Professional",
    category: "ATS-Friendly",
    component: Template05,
    description: "Space-saving high-density structure to cleanly fit long histories into fewer pages.",
    defaultColor: "#2B6CB0",
    popular: false,
    tags: ["Compact", "Dense", "1-Page Fit"]
  },

  // 2. Modern (4 templates)
  {
    id: "template06",
    name: "Modern Two-Column",
    category: "Modern",
    component: Template06,
    description: "Balanced two-column structure with quick-scan sidebar for contact, skills, and credentials.",
    defaultColor: "#365FAD",
    popular: true,
    tags: ["Two-Column", "Modern", "Photo Slot"]
  },
  {
    id: "template07",
    name: "Modern Sidebar",
    category: "Modern",
    component: Template07,
    description: "Full-height shaded rail contrasting against a clean experience timeline.",
    defaultColor: "#17243B",
    popular: false,
    tags: ["Sidebar", "Minimalist", "Sleek"]
  },
  {
    id: "template09",
    name: "Clean Modern",
    category: "Modern",
    component: Template09,
    description: "Contemporary spacing, rounded badge headers, and balanced whitespace.",
    defaultColor: "#365FAD",
    popular: false,
    tags: ["Contemporary", "Badge Headers", "Sleek"]
  },
  {
    id: "template13",
    name: "Contemporary Professional",
    category: "Modern",
    component: Template13,
    description: "Polished corporate styling with subtle accent badges and premium typography.",
    defaultColor: "#17243B",
    popular: false,
    tags: ["Contemporary", "Polished", "Corporate"]
  },

  // 3. Professional (4 templates)
  {
    id: "template08",
    name: "Software Developer",
    category: "Professional",
    component: Template08,
    description: "Dark-accented terminal-style header with dedicated GitHub and live project badges.",
    defaultColor: "#2563EB",
    popular: true,
    tags: ["Developer", "Tech Stack", "GitHub Links"]
  },
  {
    id: "template10",
    name: "Corporate Blue",
    category: "Professional",
    component: Template10,
    description: "Full-width authoritative header band in rich corporate navy with crisp contrast.",
    defaultColor: "#17243B",
    popular: true,
    tags: ["Corporate", "Executive", "High Impact"]
  },
  {
    id: "template11",
    name: "Elegant Monochrome",
    category: "Professional",
    component: Template11,
    description: "Editorial aesthetic with high-contrast typography and subtle hairline rules.",
    defaultColor: "#242A35",
    popular: false,
    tags: ["Monochrome", "Editorial", "Minimal"]
  },
  {
    id: "template12",
    name: "Executive Resume",
    category: "Professional",
    component: Template12,
    description: "Leadership-focused layout featuring executive profile callout and leadership milestones.",
    defaultColor: "#17243B",
    popular: false,
    tags: ["Leadership", "Director", "VP/Executive"]
  },

  // 4. Creative (3 templates)
  {
    id: "template14",
    name: "Creative Portfolio",
    category: "Creative",
    component: Template14,
    description: "Expressive gold accent header with profile photo and project showcase spotlight.",
    defaultColor: "#C5A46D",
    popular: true,
    tags: ["Creative", "Gold Accent", "Portfolio"]
  },
  {
    id: "template15",
    name: "Designer Resume",
    category: "Creative",
    component: Template15,
    description: "Asymmetrical grid showcasing design philosophy, Figma tools, and UX case studies.",
    defaultColor: "#365FAD",
    popular: false,
    tags: ["UI/UX", "Designer", "Grid Layout"]
  },
  {
    id: "template16",
    name: "Bold Accent",
    category: "Creative",
    component: Template16,
    description: "High-contrast left edge accent stripe with vibrant framing and modern typography.",
    defaultColor: "#17243B",
    popular: false,
    tags: ["Stripe", "Bold", "Modern"]
  },

  // 5. Academic (2 templates)
  {
    id: "template17",
    name: "Academic CV",
    category: "Academic",
    component: Template17,
    description: "Curriculum Vitae format prioritizing Degrees, Peer-Reviewed Publications, and Teaching.",
    defaultColor: "#17243B",
    popular: false,
    tags: ["Academic", "Publications", "CV"]
  },
  {
    id: "template18",
    name: "Research Resume",
    category: "Academic",
    component: Template18,
    description: "Designed for laboratory scholars and R&D scientists with methodology and grants focus.",
    defaultColor: "#1E3A8A",
    popular: false,
    tags: ["Research", "R&D", "Scientific"]
  }
];

export function getTemplateById(id) {
  return TEMPLATES.find((t) => t.id === id) || TEMPLATES[0];
}
