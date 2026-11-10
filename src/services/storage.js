/**
 * IndexedDB and LocalStorage Service for Damayanti Resume Studio.
 * 100% in-browser, zero cloud dependencies, full privacy preservation.
 */

import { sampleResume, createBlankResume } from "../data/defaultResume";

const DB_NAME = "DamayantiResumeStudioDB";
const DB_VERSION = 1;
const STORE_NAME = "resumes";

/**
 * Open or upgrade the IndexedDB database
 */
function openDB() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error("IndexedDB is not supported by your browser."));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("updatedAt", "updatedAt", { unique: false });
        store.createIndex("title", "title", { unique: false });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error || new Error("Failed to open IndexedDB"));
    };
  });
}

/**
 * Initialize storage with sample resume if empty
 */
export async function initializeStorage() {
  try {
    const resumes = await getAllResumes();
    if (resumes.length === 0) {
      await saveResume(sampleResume);
    }
  } catch (error) {
    console.warn("Storage init warning:", error);
  }
}

/**
 * Retrieve all resumes sorted by last updated descending
 */
export async function getAllResumes() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      const list = request.result || [];
      // Sort newest updated first
      list.sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
      resolve(list);
    };

    request.onerror = (e) => reject(e.target.error);
  });
}

/**
 * Get a specific resume by ID
 */
export async function getResumeById(id) {
  if (!id) return null;
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(id);

    request.onsuccess = () => {
      resolve(request.result || null);
    };

    request.onerror = (e) => reject(e.target.error);
  });
}

/**
 * Save or update a resume in IndexedDB
 */
export async function saveResume(resume) {
  if (!resume || !resume.id) {
    throw new Error("Invalid resume payload: missing ID");
  }

  const updatedResume = {
    ...resume,
    updatedAt: new Date().toISOString()
  };

  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.put(updatedResume);

    request.onsuccess = () => {
      resolve(updatedResume);
    };

    request.onerror = (e) => reject(e.target.error);
  });
}

/**
 * Create a brand new blank resume
 */
export async function createNewResume(templateId = "template01", customTitle = "My New Resume") {
  const newResume = createBlankResume(templateId);
  newResume.title = customTitle;
  return await saveResume(newResume);
}

/**
 * Duplicate an existing resume
 */
export async function duplicateResume(id) {
  const original = await getResumeById(id);
  if (!original) {
    throw new Error("Resume to duplicate not found.");
  }

  const copy = {
    ...JSON.parse(JSON.stringify(original)),
    id: "resume_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
    title: `${original.title || "Resume"} (Copy)`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  return await saveResume(copy);
}

/**
 * Delete a resume by ID
 */
export async function deleteResume(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => resolve(true);
    request.onerror = (e) => reject(e.target.error);
  });
}

/**
 * Rename a resume
 */
export async function updateResumeTitle(id, newTitle) {
  const resume = await getResumeById(id);
  if (!resume) throw new Error("Resume not found.");
  resume.title = newTitle.trim() || "Untitled Resume";
  return await saveResume(resume);
}

/* ================= LocalStorage Preferences ================= */

export const PREF_KEYS = {
  RECENT_TEMPLATE: "drs_recent_template",
  COLOR_THEME: "drs_color_theme",
  AUTOSAVE_STATUS: "drs_autosave_status"
};

export function getLocalPreference(key, fallback = null) {
  try {
    const val = localStorage.getItem(key);
    return val !== null ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
}

export function setLocalPreference(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn("Could not save preference:", e);
  }
}
