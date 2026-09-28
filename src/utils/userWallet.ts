import { FIRESTORE_ERROR_CODES } from '@/constants';
import { promptAlert } from '@/lib/alerts/promptAlert';
import { getTranslated } from '@/lib/localization';

export const handleUserWalletErrorMessage = (errorCode: string): void => {
  let title = '';
  let message = '';

  switch (errorCode) {
    case FIRESTORE_ERROR_CODES.unauthenticated:
      title = 'userWallet.errors.unauthenticated.title';
      message = 'userWallet.errors.unauthenticated.message';
      break;

    case FIRESTORE_ERROR_CODES.permission_denied:
      title = 'userWallet.errors.unauthorized.title';
      message = 'userWallet.errors.unauthorized.message';
      break;

    case FIRESTORE_ERROR_CODES.not_found:
      title = 'userWallet.errors.not_found.title';
      message = 'userWallet.errors.not_found.message';
      break;

    case FIRESTORE_ERROR_CODES.unavailable:
      title = 'userWallet.errors.unavailable.title';
      message = 'userWallet.errors.unavailable.message';
      break;

    case FIRESTORE_ERROR_CODES.network_error:
      title = 'userWallet.errors.network_error.title';
      message = 'userWallet.errors.network_error.message';
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
