import { FIRESTORE_ERROR_CODES } from '@/constants/account/userProfile';
import { promptAlert } from '@/lib/alerts/promptAlert';
import { getTranslated } from '@/lib/localization';

export const handleFirestoreErrorMessage = (errorCode: string): void => {
  let title = '';
  let message = '';

  switch (errorCode) {
    case FIRESTORE_ERROR_CODES.permission_denied:
      title = 'firestore.errors.permission_denied.title';
      message = 'firestore.errors.permission_denied.message';
      break;
    case FIRESTORE_ERROR_CODES.unauthenticated:
      title = 'firestore.errors.unauthenticated.title';
      message = 'firestore.errors.unauthenticated.message';
      break;
    case FIRESTORE_ERROR_CODES.not_found:
      title = 'firestore.errors.not_found.title';
      message = 'firestore.errors.not_found.message';
      break;
    case FIRESTORE_ERROR_CODES.invalid_argument:
      title = 'firestore.errors.invalid_argument.title';
      message = 'firestore.errors.invalid_argument.message';
      break;
    case FIRESTORE_ERROR_CODES.failed_precondition:
      title = 'firestore.errors.failed_precondition.title';
      message = 'firestore.errors.failed_precondition.message';
      break;
    case FIRESTORE_ERROR_CODES.unavailable:
      title = 'firestore.errors.unavailable.title';
      message = 'firestore.errors.unavailable.message';
      break;
    case FIRESTORE_ERROR_CODES.resource_exhausted:
      title = 'firestore.errors.resource_exhausted.title';
      message = 'firestore.errors.resource_exhausted.message';
      break;
    case FIRESTORE_ERROR_CODES.aborted:
      title = 'firestore.errors.aborted.title';
      message = 'firestore.errors.aborted.message';
      break;
    case FIRESTORE_ERROR_CODES.internal:
      title = 'firestore.errors.internal.title';
      message = 'firestore.errors.internal.message';
      break;
    default:
      title = 'global.errors.something_went_wrong.title';
      message = 'global.errors.something_went_wrong.message';
  }

  if (title && message) {
    promptAlert(getTranslated(title), getTranslated(message));
  }
};
