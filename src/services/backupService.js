/**
 * JSON Backup and Restore service for Damayanti Resume Studio.
 * Allows users to export all or single resumes to an encrypted/structured JSON file
 * and restore them locally without any backend requirement.
 */

import { getAllResumes, saveResume } from "./storage";

/**
 * Export all resumes as a downloadable JSON file
 */
export async function exportAllResumesBackup() {
  try {
    const resumes = await getAllResumes();
    const backupData = {
      app: "Damayanti Resume Studio",
      poweredBy: "Damayanti Crest",
      version: "1.0",
      exportDate: new Date().toISOString(),
      count: resumes.length,
      resumes
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: "application/json"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const dateStr = new Date().toISOString().split("T")[0];
    link.href = url;
    link.download = `Damayanti_Resume_Studio_Backup_${dateStr}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return { success: true, count: resumes.length };
  } catch (error) {
    console.error("Export backup failed:", error);
    throw new Error("Failed to export backup: " + error.message);
  }
}

/**
 * Export a single resume as JSON
 */
export function exportSingleResumeJSON(resume) {
  try {
    const cleanName = (resume.personal?.fullName || resume.title || "Resume")
      .replace(/[^a-zA-Z0-9_-]/g, "_");
    const dataStr = JSON.stringify(resume, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${cleanName}_backup.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return true;
  } catch (err) {
    console.error("Export single failed:", err);
    throw err;
  }
}

/**
 * Import resumes from a user-uploaded JSON file
 */
export async function importResumesFromJSON(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No file selected."));
      return;
    }

    if (!file.name.endsWith(".json")) {
      reject(new Error("Invalid file format. Please upload a .json backup file."));
      return;
    }

    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const text = e.target.result;
        const parsed = JSON.parse(text);

        let resumesToImport = [];

        // Support both full backup format and single resume export format
        if (parsed.resumes && Array.isArray(parsed.resumes)) {
          resumesToImport = parsed.resumes;
        } else if (parsed.id && (parsed.personal || parsed.title)) {
          resumesToImport = [parsed];
        } else {
          throw new Error("Unrecognized JSON structure. Not a valid Damayanti Resume Studio backup.");
        }

        let importedCount = 0;
        for (const res of resumesToImport) {
          // Ensure valid structure & generate a unique ID if importing to prevent collision
          const item = {
            ...res,
            id: "resume_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
            title: res.title ? `${res.title} (Imported)` : "Imported Resume",
            updatedAt: new Date().toISOString()
          };
          await saveResume(item);
          importedCount++;
        }

        resolve({ success: true, count: importedCount });
      } catch (err) {
        reject(new Error("Failed to parse JSON file: " + err.message));
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file from disk."));
    };

    reader.readAsText(file);
  });
}
