import { Dimensions } from "react-native"

export const useScreenDimensions = () => {
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const SCREEN_HEIGHT = Dimensions.get('window').height;

  return { SCREEN_WIDTH, SCREEN_HEIGHT };
}