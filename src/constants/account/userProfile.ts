// Firebase Firestore Error Codes
export const FIRESTORE_ERROR_CODES = {
  permission_denied: 'firestore/permission-denied',
  unauthenticated: 'firestore/unauthenticated',
  not_found: 'firestore/not-found',
  invalid_argument: 'firestore/invalid-argument',
  failed_precondition: 'firestore/failed-precondition',
  unavailable: 'firestore/unavailable',
  resource_exhausted: 'firestore/resource-exhausted',
  aborted: 'firestore/aborted',
  internal: 'firestore/internal',
  something_went_wrong: "firestore/something-went-wrong"
} as const;