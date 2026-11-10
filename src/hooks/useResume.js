/**
 * Custom hook to manage active resume data, section edits, and state transitions
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { getResumeById, saveResume, createNewResume } from "../services/storage";
import { createBlankResume, sampleResume } from "../data/defaultResume";

export function useResume(resumeId) {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState("saved"); // "saved" | "saving" | "unsaved" | "error"
  const saveTimeoutRef = useRef(null);

  // Load resume by ID on mount or change
  useEffect(() => {
    let isMounted = true;

    async function load() {
      setLoading(true);
      try {
        if (!resumeId) {
          // If no ID passed, try to create or load sample
          if (isMounted) setResume(sampleResume);
        } else {
          const loaded = await getResumeById(resumeId);
          if (loaded && isMounted) {
            setResume(loaded);
          } else if (isMounted) {
            // If not found, create new
            const brandNew = await createNewResume("template01", "My Resume");
            setResume(brandNew);
          }
        }
      } catch (err) {
        console.error("Failed to load resume:", err);
        if (isMounted) setResume(sampleResume);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [resumeId]);

  // Debounced Auto-Save function
  const triggerAutoSave = useCallback((updatedData) => {
    setSaveStatus("saving");
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await saveResume(updatedData);
        setSaveStatus("saved");
      } catch (e) {
        console.error("Autosave failed:", e);
        setSaveStatus("error");
      }
    }, 700);
  }, []);

  // Generic updater
  const updateResume = useCallback((updater) => {
    setResume((prev) => {
      if (!prev) return prev;
      const next = typeof updater === "function" ? updater(prev) : { ...prev, ...updater };
      triggerAutoSave(next);
      return next;
    });
  }, [triggerAutoSave]);

  // Update personal field
  const updatePersonal = useCallback((field, value) => {
    updateResume((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value
      }
    }));
  }, [updateResume]);

  // Update summary
  const updateSummary = useCallback((summary) => {
    updateResume((prev) => ({ ...prev, summary }));
  }, [updateResume]);

  // Add item to array sections (education, experience, projects, etc.)
  const addArrayItem = useCallback((sectionKey, newItem) => {
    updateResume((prev) => {
      const currentList = Array.isArray(prev[sectionKey]) ? prev[sectionKey] : [];
      return {
        ...prev,
        [sectionKey]: [...currentList, newItem]
      };
    });
  }, [updateResume]);

  // Update item in array section
  const updateArrayItem = useCallback((sectionKey, index, updatedItem) => {
    updateResume((prev) => {
      const currentList = Array.isArray(prev[sectionKey]) ? [...prev[sectionKey]] : [];
      currentList[index] = updatedItem;
      return {
        ...prev,
        [sectionKey]: currentList
      };
    });
  }, [updateResume]);

  // Remove item from array section
  const removeArrayItem = useCallback((sectionKey, index) => {
    updateResume((prev) => {
      const currentList = Array.isArray(prev[sectionKey]) ? [...prev[sectionKey]] : [];
      currentList.splice(index, 1);
      return {
        ...prev,
        [sectionKey]: currentList
      };
    });
  }, [updateResume]);

  // Reorder items in array section
  const moveArrayItem = useCallback((sectionKey, index, direction) => {
    updateResume((prev) => {
      const list = [...(prev[sectionKey] || [])];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= list.length) return prev;
      const temp = list[index];
      list[index] = list[targetIndex];
      list[targetIndex] = temp;
      return {
        ...prev,
        [sectionKey]: list
      };
    });
  }, [updateResume]);

  // Toggle section visibility
  const toggleSectionVisibility = useCallback((sectionKey) => {
    updateResume((prev) => ({
      ...prev,
      sectionVisibility: {
        ...prev.sectionVisibility,
        [sectionKey]: !prev.sectionVisibility?.[sectionKey]
      }
    }));
  }, [updateResume]);

  // Set template
  const setTemplate = useCallback((templateId) => {
    updateResume((prev) => ({ ...prev, selectedTemplate: templateId }));
  }, [updateResume]);

  // Set accent color
  const setAccentColor = useCallback((color) => {
    updateResume((prev) => ({ ...prev, accentColor: color }));
  }, [updateResume]);

  // Set font family
  const setFontFamily = useCallback((fontFamily) => {
    updateResume((prev) => ({ ...prev, fontFamily }));
  }, [updateResume]);

  // Set font size
  const setFontSize = useCallback((fontSize) => {
    updateResume((prev) => ({ ...prev, fontSize }));
  }, [updateResume]);

  // Reorder sections in resume
  const moveSection = useCallback((sectionKey, direction) => {
    updateResume((prev) => {
      const order = [...(prev.sectionOrder || [])];
      const idx = order.indexOf(sectionKey);
      if (idx === -1) return prev;
      const targetIdx = direction === "up" ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= order.length) return prev;
      const temp = order[idx];
      order[idx] = order[targetIdx];
      order[targetIdx] = temp;
      return { ...prev, sectionOrder: order };
    });
  }, [updateResume]);

  // Reset to default sample
  const loadSampleData = useCallback(() => {
    updateResume((prev) => ({
      ...sampleResume,
      id: prev.id,
      title: prev.title || "Reshwanth Gangula - Professional",
      selectedTemplate: prev.selectedTemplate || "template01"
    }));
  }, [updateResume]);

  // Clear all data to blank
  const clearToBlank = useCallback(() => {
    updateResume((prev) => ({
      ...createBlankResume(prev.selectedTemplate),
      id: prev.id,
      title: prev.title || "My Resume"
    }));
  }, [updateResume]);

  return {
    resume,
    setResume,
    loading,
    saveStatus,
    updateResume,
    updatePersonal,
    updateSummary,
    addArrayItem,
    updateArrayItem,
    removeArrayItem,
    moveArrayItem,
    toggleSectionVisibility,
    setTemplate,
    setAccentColor,
    setFontFamily,
    setFontSize,
    moveSection,
    loadSampleData,
    clearToBlank
  };
}
