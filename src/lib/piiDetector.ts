/**
 * Client-side PII detection for medical data.
 * Scans prompts for patient-identifiable information patterns.
 * All detection happens locally - no PII is ever sent to analytics.
 */

interface PIIMatch {
  type: string;
  description: string;
}

const PII_PATTERNS: Array<{ pattern: RegExp; type: string; description: string }> = [
  // Names with medical context
  {
    pattern: /\b(?:patient|mr\.?|mrs\.?|ms\.?|dr\.?)\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?/i,
    type: 'name',
    description: 'Patient or person name',
  },
  // Date of birth patterns
  {
    pattern: /\b(?:DOB|date of birth|born|d\.o\.b\.?)\s*[:\-]?\s*\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}/i,
    type: 'dob',
    description: 'Date of birth',
  },
  // Medical Record Numbers
  {
    pattern: /\b(?:MRN|medical record|record number|chart number|patient id)\s*[:#\-]?\s*\d{4,}/i,
    type: 'mrn',
    description: 'Medical record number',
  },
  // Phone numbers
  {
    pattern: /\b(?:\+?\d{1,3}[\s-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\b/,
    type: 'phone',
    description: 'Phone number',
  },
  // Email addresses
  {
    pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
    type: 'email',
    description: 'Email address',
  },
  // SSN-like patterns
  {
    pattern: /\b\d{3}[-\s]?\d{2}[-\s]?\d{4}\b/,
    type: 'ssn',
    description: 'SSN-like number',
  },
  // Aadhaar-like patterns (Indian ID)
  {
    pattern: /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/,
    type: 'aadhaar',
    description: 'Aadhaar-like number',
  },
  // Hospital/institution + specific patient reference
  {
    pattern: /\b(?:admitted|discharged|presented)\s+(?:on|at|to)\s+.{5,30}\s+(?:on|with)\b/i,
    type: 'clinical_narrative',
    description: 'Clinical narrative with identifiable details',
  },
];

/**
 * Scan a prompt for potential PII.
 * Returns array of matches (empty if clean).
 */
export function detectPII(text: string): PIIMatch[] {
  const matches: PIIMatch[] = [];
  const seen = new Set<string>();

  for (const { pattern, type, description } of PII_PATTERNS) {
    if (pattern.test(text) && !seen.has(type)) {
      seen.add(type);
      matches.push({ type, description });
    }
  }

  return matches;
}

/**
 * Quick check: does the prompt contain any PII?
 */
export function containsPII(text: string): boolean {
  return PII_PATTERNS.some(({ pattern }) => pattern.test(text));
}
