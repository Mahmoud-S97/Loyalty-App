import {
  FIRESTORE_ERROR_CODES,
  MEDIA_PERMISSION_ERROR_CODES
} from '@/constants/account/userProfile';
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

export const handleMediaPermissionErrorMessage = (errorCode: string): void => {
  let title = '';
  let message = '';

  switch (errorCode) {
    case MEDIA_PERMISSION_ERROR_CODES.request_camera:
      title = 'app.permissions.camera.title';
      message = 'app.permissions.camera.message';
      break;
      case MEDIA_PERMISSION_ERROR_CODES.request_library:
      title = 'app.permissions.media_library.title';
      message = 'app.permissions.media_library.message';
      break;
    case MEDIA_PERMISSION_ERROR_CODES.camera_denied:
      title = 'app.permissions.camera_denied.title';
      message = 'app.permissions.camera_denied.message';
      break;

    case MEDIA_PERMISSION_ERROR_CODES.media_library_denied:
      title = 'app.permissions.media_library_denied.title';
      message = 'app.permissions.media_library_denied.message';
      break;

    default:
      title = 'global.errors.something_went_wrong.title';
      message = 'global.errors.something_went_wrong.message';
      break;
  }
  if (title && message) {
    promptAlert(getTranslated(title), getTranslated(message));
  }
};
