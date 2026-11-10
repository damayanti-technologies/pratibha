/**
 * Default resume template data & helper to generate clean empty/sample resumes.
 */

export const createBlankResume = (templateId = "template01") => ({
  id: "resume_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
  title: "Untitled Resume",
  selectedTemplate: templateId,
  accentColor: "#365FAD",
  fontFamily: "Inter",
  fontSize: "medium", // "small" | "medium" | "large"
  sectionOrder: [
    "summary",
    "experience",
    "education",
    "skills",
    "projects",
    "internships",
    "certifications",
    "achievements",
    "volunteerExperience",
    "publications",
    "awards",
    "hobbies",
    "references"
  ],
  sectionVisibility: {
    personal: true,
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    internships: true,
    certifications: true,
    achievements: true,
    volunteerExperience: true,
    publications: false,
    awards: false,
    hobbies: false,
    references: false
  },
  personal: {
    fullName: "",
    professionalTitle: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    linkedin: "",
    github: "",
    portfolio: "",
    profilePhoto: ""
  },
  summary: "",
  education: [],
  experience: [],
  internships: [],
  skills: [
    { category: "Technical Skills", items: [] },
    { category: "Soft Skills", items: [] },
    { category: "Languages", items: [] },
    { category: "Other Skills", items: [] }
  ],
  projects: [],
  certifications: [],
  achievements: [],
  volunteerExperience: [],
  publications: [],
  awards: [],
  hobbies: [],
  references: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
});

export const sampleResume = {
  id: "sample_resume_01",
  title: "Reshwanth Gangula - Professional",
  selectedTemplate: "template01",
  accentColor: "#365FAD",
  fontFamily: "Inter",
  fontSize: "medium",
  sectionOrder: [
    "summary",
    "experience",
    "education",
    "skills",
    "projects",
    "internships",
    "certifications",
    "achievements",
    "volunteerExperience",
    "publications",
    "awards",
    "hobbies",
    "references"
  ],
  sectionVisibility: {
    personal: true,
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: true,
    internships: true,
    certifications: true,
    achievements: true,
    volunteerExperience: true,
    publications: true,
    awards: true,
    hobbies: true,
    references: true
  },
  personal: {
    fullName: "Reshwanth Gangula",
    professionalTitle: "Senior Software Engineer",
    email: "reshwanth.gangula@example.com",
    phone: "+91 98765 43210",
    city: "Hyderabad",
    country: "India",
    linkedin: "linkedin.com/in/reshwanth-gangula",
    github: "github.com/reshwanthg",
    portfolio: "reshwanth.dev",
    profilePhoto: ""
  },
  summary: "Results-driven Software Engineer with 4+ years of experience building scalable web applications and high-performance frontend interfaces. Proven track record of improving page load speeds by 40% and leading cross-functional teams to deliver enterprise-grade digital products.",
  education: [
    {
      id: "edu_1",
      institution: "National Institute of Technology",
      degree: "Bachelor of Technology",
      field: "Computer Science and Engineering",
      startDate: "2018",
      endDate: "2022",
      grade: "8.9 CGPA",
      description: "Graduated with First Class Honors. Led the University Coding Club and organized national-level hackathons."
    }
  ],
  experience: [
    {
      id: "exp_1",
      title: "Senior Frontend Engineer",
      company: "Damayanti Technologies",
      location: "Hyderabad, India",
      startDate: "July 2022",
      endDate: "",
      currentlyWorking: true,
      responsibilities: "• Architected responsive frontend microservices serving 150K+ monthly active users with 99.9% uptime.\n• Spearheaded performance audits reducing initial bundle size by 38% and First Contentful Paint by 1.2s.\n• Mentored a team of 4 junior developers in modern React patterns, accessibility standards, and clean architecture.",
      achievements: "Recognized with the Annual Innovation Star Award for designing the core UI component library."
    },
    {
      id: "exp_2",
      title: "Frontend Developer",
      company: "Nexus Digital Systems",
      location: "Bengaluru, India",
      startDate: "Jan 2021",
      endDate: "June 2022",
      currentlyWorking: false,
      responsibilities: "• Developed interactive user interfaces using React, Redux, and RESTful APIs for FinTech clients.\n• Implemented end-to-end automated testing suites with Cypress, boosting test coverage from 45% to 88%.\n• Designed modular form wizards handling complex loan applications with client-side validation.",
      achievements: "Delivered 3 mission-critical enterprise client releases ahead of scheduled milestones."
    }
  ],
  internships: [
    {
      id: "intern_1",
      role: "Web Engineering Intern",
      organization: "TechSphere Labs",
      duration: "May 2020 - Dec 2020",
      description: "Engineered responsive dashboard charts and optimized client-side state caching using IndexedDB and Service Workers."
    }
  ],
  skills: [
    {
      category: "Technical Skills",
      items: ["JavaScript (ES6+)", "TypeScript", "React.js", "Node.js", "HTML5 & CSS3", "REST APIs", "Tailwind CSS", "Git & GitHub"]
    },
    {
      category: "Soft Skills",
      items: ["Technical Leadership", "Agile & Scrum", "Cross-Functional Collaboration", "Problem Solving", "Clear Communication"]
    },
    {
      category: "Languages",
      items: ["English (Fluent)", "Telugu (Native)", "Hindi (Professional Working)"]
    },
    {
      category: "Tools & Frameworks",
      items: ["Vite", "Webpack", "Docker Basics", "Figma", "Jest & Cypress", "VS Code"]
    }
  ],
  projects: [
    {
      id: "proj_1",
      name: "CloudFlow DevOps Telemetry Hub",
      role: "Lead Developer",
      technologies: "React, Vite, IndexedDB, Tailwind CSS",
      url: "https://cloudflow.example.com",
      description: "High-performance cluster management portal capable of streaming 1,000+ real-time container metrics without frame drops."
    },
    {
      id: "proj_2",
      name: "Pulse E-Commerce Platform",
      role: "Full-Stack Contributor",
      technologies: "React, Node.js, Stripe, PostgreSQL",
      url: "https://pulse-store.example.com",
      description: "Full-featured shopping application with optimistic UI updates, multi-currency support, and dynamic product filtering."
    }
  ],
  certifications: [
    {
      id: "cert_1",
      name: "AWS Certified Solutions Architect – Associate",
      organization: "Amazon Web Services",
      date: "2023",
      url: "https://aws.amazon.com/verification"
    },
    {
      id: "cert_2",
      name: "Meta Front-End Developer Professional Certificate",
      organization: "Meta / Coursera",
      date: "2022",
      url: "https://coursera.org/verify"
    }
  ],
  achievements: [
    {
      id: "ach_1",
      title: "1st Place – National Smart India Hackathon",
      description: "Selected 1st out of 500+ teams for creating an offline-first disaster coordination dispatch system."
    },
    {
      id: "ach_2",
      title: "Technical Writing Impact",
      description: "Published 20+ comprehensive guides on frontend performance and modern web standards with over 60,000 community reads."
    }
  ],
  volunteerExperience: [
    {
      id: "vol_1",
      role: "Volunteer Coding Mentor",
      organization: "Code for Tomorrow Non-Profit",
      duration: "2022 - Present",
      description: "Conducted weekly hands-on coding bootcamps for 50+ underserved students learning web development."
    }
  ],
  publications: [
    {
      id: "pub_1",
      title: "Modern Client-Side Caching Strategies for High-Volume Web Applications",
      publisher: "International Journal of Web Systems Research",
      date: "2023",
      url: "https://doi.org/10.1109/example"
    }
  ],
  awards: [
    {
      id: "award_1",
      title: "Engineering Excellence Award 2023",
      issuer: "Damayanti Technologies",
      date: "2023",
      description: "Recognized for foundational architecture improvements driving core platform speed and developer ergonomics."
    }
  ],
  hobbies: [
    "Open Source Tooling",
    "Landscape Photography",
    "Competitive Chess",
    "Distance Running"
  ],
  references: [
    {
      id: "ref_1",
      name: "Dr. Arvind Sharma",
      title: "VP of Engineering",
      company: "Damayanti Technologies",
      contact: "a.sharma@damayanti.tech"
    }
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};
