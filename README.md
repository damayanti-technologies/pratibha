# Damayanti Resume Studio

> **"Build Your Professional Identity."**  
> Powered by **Damayanti Crest** • Developed by **Damayanti Technologies**  
> Official Repository: [`damayanti-technologies/pratibha`](https://github.com/damayanti-technologies/pratibha)

---

## 🌟 Overview

**Damayanti Resume Studio** is a complete, production-quality, mobile-first resume builder that operates **100% inside the user's browser**.

No cloud database, no mandatory user accounts, no paid APIs, no AI trackers, and zero server storage. All resumes and personal information are stored privately on the client device using **IndexedDB**, with high-resolution vector **A4 PDF export**, customizable styles, and **18 recruiter-tested resume templates**.

---

## ✨ Key Features

- **18 Genuinely Distinct Templates**:
  - **ATS-Friendly (5)**: Minimal ATS Resume, Classic Professional, Minimal Fresher, Engineering Resume, Compact Professional.
  - **Modern (4)**: Modern Two-Column, Modern Sidebar, Clean Modern, Contemporary Professional.
  - **Professional (4)**: Software Developer, Corporate Blue, Elegant Monochrome, Executive Resume.
  - **Creative (3)**: Creative Portfolio, Designer Resume, Bold Accent.
  - **Academic (2)**: Academic CV, Research Resume.
- **Privacy First (100% Client-Side)**: Zero backend, no Firebase/Supabase, zero remote trackers.
- **Persistent Local Autosave**: High-capacity **IndexedDB** engine automatically preserves drafts in the browser.
- **High-Fidelity A4 PDF Generation**: Direct PDF download with smart multi-page pagebreak detection and zero text clipping, plus vector browser print-to-PDF.
- **Mobile-First Experience**: Designed from the ground up for Android smartphones, iPhones, tablets, and desktop workstations.
- **Live Real-Time Preview**: Instantaneous updates as you type, with interactive zoom controls (60% to 120%).
- **JSON Backup & Restore**: Export full database or single resume JSON backups to transfer across devices anytime.
- **Curated Offline Suggestions**: Role-specific summaries and bullet points (offline, non-AI).
- **Design Customizer**: Switch accent palettes (Navy, Royal Blue, Gold, Emerald, Charcoal, etc.), professional fonts (Inter, Plus Jakarta Sans, Outfit, Merriweather, Playfair, JetBrains Mono), and density scales.

---

## 🏗️ Technology Stack

- **Frontend Core**: React 18, Vite, JavaScript (ES2024), HTML5, CSS3
- **Routing**: React Router DOM (v6)
- **Icons**: Lucide React
- **Storage**: Browser IndexedDB (primary) + LocalStorage (preferences)
- **Export Engines**: `html2pdf.js` + Native CSS `@media print` A4 pagination
- **Celebration Feedback**: `canvas-confetti`

---

## 📁 Project Folder Structure

```
pratibha/
├── public/
│   ├── _redirects             # Static SPA routing fallback for Netlify
│   └── robots.txt             # SEO crawler directives
├── src/
│   ├── components/            # Reusable UI & editor components
│   │   ├── CustomizerPanel.jsx# Accent color, font, density & visibility
│   │   ├── EditorForms.jsx    # Section forms with inline validations
│   │   ├── Footer.jsx         # Global footer with Damayanti Crest branding
│   │   ├── Modal.jsx          # Accessible dialog modal
│   │   ├── Navbar.jsx         # Mobile-responsive header navigation
│   │   ├── ResumeCard.jsx     # Dashboard resume management card
│   │   ├── TemplateCard.jsx   # Template gallery preview card
│   │   └── Toast.jsx          # Action feedback notifications
│   ├── data/
│   │   ├── defaultResume.js   # Unified resume model & initial samples
│   │   └── summarySuggestions.js # Predefined offline role summaries
│   ├── hooks/
│   │   └── useResume.js       # Centralized state management & autosave
│   ├── pages/
│   │   ├── About.jsx          # Company & engineering philosophy
│   │   ├── Editor.jsx         # Split-screen responsive editor
│   │   ├── Home.jsx           # Landing page with interactive mockups
│   │   ├── MyResumes.jsx      # IndexedDB dashboard & JSON backup
│   │   ├── Preview.jsx        # Dedicated full-screen preview page
│   │   ├── Privacy.jsx        # Transparent privacy policy & guarantees
│   │   └── Templates.jsx      # Filterable 18-template catalog
│   ├── services/
│   │   ├── backupService.js   # JSON import/export routines
│   │   ├── pdfExport.js       # A4 PDF exporter & print setup
│   │   └── storage.js         # Native IndexedDB wrapper
│   ├── styles/
│   │   ├── global.css         # Design system, tokens, and button classes
│   │   └── templates.css      # Shared A4 canvas & print rules
│   ├── templates/             # 18 Distinct Resume Template Components
│   │   ├── SharedSections.jsx # Clean modular section blocks
│   │   ├── Template01.jsx     # Minimal ATS Resume
│   │   ├── Template02.jsx     # Classic Professional
│   │   ├── Template03.jsx     # Minimal Fresher
│   │   ├── Template04.jsx     # Engineering Resume
│   │   ├── Template05.jsx     # Compact Professional
│   │   ├── Template06.jsx     # Modern Two-Column
│   │   ├── Template07.jsx     # Modern Sidebar
│   │   ├── Template08.jsx     # Software Developer
│   │   ├── Template09.jsx     # Clean Modern
│   │   ├── Template10.jsx     # Corporate Blue
│   │   ├── Template11.jsx     # Elegant Monochrome
│   │   ├── Template12.jsx     # Executive Resume
│   │   ├── Template13.jsx     # Contemporary Professional
│   │   ├── Template14.jsx     # Creative Portfolio
│   │   ├── Template15.jsx     # Designer Resume
│   │   ├── Template16.jsx     # Bold Accent
│   │   ├── Template17.jsx     # Academic CV
│   │   ├── Template18.jsx     # Research Resume
│   │   ├── templateRegistry.js# Registry, filters, and metadata
│   │   └── TemplateRenderer.jsx# Dynamic template router
│   ├── utils/
│   │   ├── formatting.js      # Date & URL display utilities
│   │   ├── resumeHelpers.js   # Empty section detectors & parser
│   │   └── validation.js      # Form validation logic
│   ├── brandConfig.js         # Centralized product and company config
│   ├── App.jsx                # Main route controller
│   └── main.jsx               # App entrypoint
├── index.html                 # HTML template with Google Fonts
├── netlify.toml               # Netlify build & security headers config
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### 1. Installation

Clone this repository and install dependencies:

```bash
git clone https://github.com/damayanti-technologies/pratibha.git
cd pratibha
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open your browser at `http://localhost:5173`.

### 3. Production Build

To build the optimized static bundle for deployment:

```bash
npm run build
```

To preview the built output locally:

```bash
npm run preview
```

---

## 🌐 Netlify Deployment Instructions

This platform is 100% static and ready for instant deployment on Netlify:

1. **Option A: Netlify Git Integration (Recommended)**
   - Link your GitHub repository (`damayanti-technologies/pratibha`).
   - Set **Build command**: `npm run build`
   - Set **Publish directory**: `dist`
   - Click **Deploy Site**. The included `netlify.toml` automatically handles SPA routing and security headers.

2. **Option B: Manual Drag-and-Drop Deploy**
   - Run `npm run build`.
   - Drag and drop the generated `dist/` folder into your Netlify dashboard.

---

## 📄 License & Credits

- **Product**: Damayanti Resume Studio
- **Parent Company**: Damayanti Technologies
- **Brand**: Powered by Damayanti Crest
- **Copyright**: © 2026 Damayanti Technologies. All rights reserved.
