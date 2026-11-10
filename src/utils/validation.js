/**
 * Validation helpers for form inputs
 */

export function isValidEmail(email) {
  if (!email || !email.trim()) return true; // optional
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
}

export function isValidPhone(phone) {
  if (!phone || !phone.trim()) return true; // optional
  // Allow international formatting with +, spaces, hyphens, parentheses, 7-18 digits
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, "");
  return cleaned.length >= 7 && /^\d+$/.test(cleaned);
}

export function isValidUrl(url) {
  if (!url || !url.trim()) return true; // optional
  const trimmed = url.trim();
  // Allow domain names with or without http(s)://
  const regex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/i;
  return regex.test(trimmed);
}
