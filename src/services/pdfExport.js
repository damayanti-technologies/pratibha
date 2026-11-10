/**
 * High-Fidelity PDF Export & Print Service for Damayanti Resume Studio.
 * Supports direct client-side PDF download via html2pdf.js and native vector A4 browser printing.
 */

import html2pdf from "html2pdf.js";

/**
 * Format a clean filename from personal full name or resume title
 */
export function getPdfFilename(resume) {
  const name = resume?.personal?.fullName?.trim();
  const title = resume?.title?.trim();

  let baseName = "My_Resume";
  if (name) {
    baseName = `${name.replace(/\s+/g, "_")}_Resume`;
  } else if (title && title.toLowerCase() !== "untitled resume") {
    baseName = `${title.replace(/\s+/g, "_")}`;
  }

  // Strip any non-standard characters
  const clean = baseName.replace(/[^a-zA-Z0-9_-]/g, "");
  return `${clean || "My_Resume"}.pdf`;
}

/**
 * Direct PDF Download using html2pdf with A4 configuration
 */
export async function exportResumeToPdf(elementId, resume, onProgress = null) {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Target document element #${elementId} not found.`);
  }

  const filename = getPdfFilename(resume);

  if (onProgress) onProgress("Preparing PDF layout...");

  // Options configured for exact A4 proportions, crisp text, and clean page breaks
  const opt = {
    margin: [8, 8, 8, 8], // mm
    filename: filename,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2.2, // Crisp retina-quality rendering
      useCORS: true,
      letterRendering: true,
      logging: false,
      scrollY: 0,
      scrollX: 0
    },
    jsPDF: {
      unit: "mm",
      format: "a4",
      orientation: "portrait"
    },
    pagebreak: {
      mode: ["avoid-all", "css", "legacy"],
      avoid: [
        ".resume-section",
        ".resume-entry",
        ".resume-header",
        ".resume-skills-group",
        "h2",
        "h3"
      ]
    }
  };

  try {
    if (onProgress) onProgress("Rendering document pages...");
    await html2pdf().set(opt).from(element).save();
    if (onProgress) onProgress("Download complete!");
    return { success: true, filename };
  } catch (error) {
    console.error("html2pdf failed:", error);
    // Fallback if canvas memory or unsupported element fails
    throw error;
  }
}

/**
 * Trigger browser print dialog for native vector print-to-PDF
 */
export function printResumeDocument() {
  window.print();
}
