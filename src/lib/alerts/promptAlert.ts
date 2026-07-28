import { Alert } from "react-native";
import { getTranslated } from "../localization";

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
        text: getTranslated('common.ok'),
        style: 'default'
      }
    ];
  }

  Alert.alert(title, message, alertActions);
};