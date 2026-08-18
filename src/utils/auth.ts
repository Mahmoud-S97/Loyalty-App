import { AUTH_ERROR_CODES } from '@/constants';
import { promptAlert } from '@/lib/alerts/promptAlert';
import { getTranslated } from '@/lib/localization';

// Check login validation from the client-side
export const isLoginValidated = (email: string, password: string): boolean => {
  let errorCode = '';

  if (!email.trim()) {
    errorCode = AUTH_ERROR_CODES.empty_email;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errorCode = AUTH_ERROR_CODES.invalid_email;
  } else if (!password.trim()) {
    errorCode = AUTH_ERROR_CODES.empty_password;
  }

  if (errorCode) {
    handleAuthErrorMessage(errorCode);
    return false;
  }

  return true;
};

// Check login validation from the client-side
export const isSignUpValidated = (
  email: string,
  password: string,
  confirmPassword: string
): boolean => {
  let errorCode = '';

  if (!email.trim()) {
    errorCode = AUTH_ERROR_CODES.empty_email;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errorCode = AUTH_ERROR_CODES.invalid_email;
  } else if (!password.trim() || !confirmPassword.trim()) {
    errorCode = AUTH_ERROR_CODES.empty_password;
  } else if (password !== confirmPassword) {
    errorCode = AUTH_ERROR_CODES.passwords_dont_match;
  } else if (password.length < 6) {
    errorCode = AUTH_ERROR_CODES.weak_password;
  }

  if (errorCode) {
    handleAuthErrorMessage(errorCode);
    return false;
  }

  return true;
};

export const handleAuthErrorMessage = (errorCode: string): void => {
  let title = '';
  let message = '';

  switch (errorCode) {
    case AUTH_ERROR_CODES.empty_email:
      title = 'auth.errors.empty_email.title';
      message = 'auth.errors.empty_email.message';
      break;
    case AUTH_ERROR_CODES.invalid_email:
      title = 'auth.errors.invalid_email.title';
      message = 'auth.errors.invalid_email.message';
      break;
    case AUTH_ERROR_CODES.email_already_in_use:
      title = 'auth.errors.email_already_in_use.title';
      message = 'auth.errors.email_already_in_use.message';
      break;
    case AUTH_ERROR_CODES.invalid_credentials:
      title = 'auth.errors.invalid_credentials.title';
      message = 'auth.errors.invalid_credentials.message';
      break;
    case AUTH_ERROR_CODES.empty_password:
      title = 'auth.errors.empty_password.title';
      message = 'auth.errors.empty_password.message';
      break;
    case AUTH_ERROR_CODES.weak_password:
      title = 'auth.errors.weak_password.title';
      message = 'auth.errors.weak_password.message';
      break;
    case AUTH_ERROR_CODES.passwords_dont_match:
      title = 'auth.errors.passwords_dont_match.title';
      message = 'auth.errors.passwords_dont_match.message';
      break;
    case AUTH_ERROR_CODES.too_many_requests:
      title = 'auth.errors.too_many_requests.title';
      message = 'auth.errors.too_many_requests.message';
      break;
    case AUTH_ERROR_CODES.network_request_failed:
      title = 'auth.errors.network_request_failed.title';
      message = 'auth.errors.network_request_failed.message';
      break;
    case AUTH_ERROR_CODES.user_disabled:
      title = 'auth.errors.user_disabled.title';
      message = 'auth.errors.user_disabled.message';
      break;
    default:
      title = 'auth.errors.something_went_wrong.title';
      message = 'auth.errors.something_went_wrong.message';
  }

  if (title && message) {
    promptAlert(getTranslated(title), getTranslated(message));
  }
};
