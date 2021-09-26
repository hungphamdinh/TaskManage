import React from "react";
import { TouchableOpacity } from "react-native";

import styles from "./styles";
import AppText from "../AppText";
import { Colors } from "../../themes";

const AppButton = (
  {
    text = "",
    onPress,
    secondaryStyles,
    textColor = Colors.appWhite,
    color = Colors.appPrimaryColor,
  }: {
    text: string;
    onPress: Function;
    secondaryStyles?: any;
    textColor?: any;
    color?: any;
  },
  props: any
) => {
  return (
    <TouchableOpacity
      testId="appButton"
      {...props}
      onPress={onPress}
      style={[
        styles.container,
        secondaryStyles,
        {
          backgroundColor: props.disabled ? Colors.appGrayColor : color,
        },
      ]}
    >
      <AppText text={text} color={textColor} bold />
    </TouchableOpacity>
  );
};

export default AppButton;
