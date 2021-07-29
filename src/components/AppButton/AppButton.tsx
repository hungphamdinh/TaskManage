import React from "react";
import { TouchableOpacity } from "react-native";

import styles from "./styles";
import AppText from "../AppText";
import { Colors } from "../../themes";

const AppButton = (props: any) => {
  const {
    secondaryStyles,
    disabled,
    text,
    textColor = Colors.appWhite,
    color = Colors.appPrimaryColor,
  } = props;

  return (
    <TouchableOpacity
      testId="appButton" 
      {...props}
      style={[
        styles.container,
        secondaryStyles,
        {
          backgroundColor: disabled ? Colors.appGrayColor : color,
        },
      ]}
    >
      <AppText text={text} color={textColor} bold />
    </TouchableOpacity>
  );
};

export default AppButton;
