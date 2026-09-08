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

// Native Camera & Media Library Permission Codes
export const MEDIA_PERMISSION_ERROR_CODES = {
  request_camera: 'request_camera',
  request_library: 'request_library',
  camera_denied: 'camera_denied',
  media_library_denied: 'media_library_denied',
  something_went_wrong: 'something_went_wrong'
} as const;

// Firebase Storage Error Codes
export const STORAGE_ERROR_CODES = {
  object_not_found: 'storage/object-not-found',
  unauthenticated: 'storage/unauthenticated',
  unauthorized: 'storage/unauthorized',
  quota_exceeded: 'storage/quota-exceeded',
  retry_limit_exceeded: 'storage/retry-limit-exceeded',
  canceled: 'storage/canceled',
  // App-level error — this will be used when file-size validation is added.
  file_too_large: 'storage/file-too-large',
  something_went_wrong: 'storage/something_went_wrong',
} as const;