// Temporary browser-only storage. No request is sent to the museum.
export function savePreproductionSubmission(key, fields) {
  const submissions = JSON.parse(window.localStorage.getItem(key) || '[]');
  submissions.push({ ...fields, createdAt: new Date().toISOString() });
  window.localStorage.setItem(key, JSON.stringify(submissions));
}
