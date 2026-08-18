import { Alert } from 'react-native';
import i18next from 'i18next';

export const promptAlert = (
  title: string = '',
  message: string,
  actions?: Array<any>
): void => {
  let alertActions: Array<any>;
  if (actions?.length) {
    alertActions = actions;
  } else {
    alertActions = [
      {
        text: i18next.t('common.ok'),
        style: 'default'
      }
    ];
  }

  Alert.alert(title, message, alertActions);
};
