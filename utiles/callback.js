import {Alert} from "react-native";

export const onerror = error => {
  Alert.alert("Error", error.messagge);
};
