export const AUTH_ERROR_CODES = {
  // Firebase Error Codes
  invalid_credentials: 'auth/invalid-credential',
  user_disabled: 'auth/user-disabled',
  too_many_requests: 'auth/too-many-requests',
  network_request_failed: 'auth/network-request-failed',
  email_already_in_use: 'auth/email-already-in-use',
  invalid_email: 'auth/invalid-email',
  weak_password: 'auth/weak-password',
  // Custom Error Codes
  empty_email: 'validation/empty-email',
  empty_password: 'validation/empty-password',
  passwords_dont_match: 'validation/passwords-dont-match',
  something_went_wrong: 'validation/something-went-wrong'
} as const;
