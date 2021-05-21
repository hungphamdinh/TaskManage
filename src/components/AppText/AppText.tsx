import React from "react";
import { Text, Platform } from "react-native";
import { Colors, Fonts } from "../../themes";
const androidOS = Platform.OS === "android";
export default (props: any) => {
  const {
    text,
    style,
    color = Colors.appTextBlack,
    font = Fonts.type.regular,
    size = Fonts.size.regular,
    bold = false,
    italic = false,
    center = false,
    right = false,
    scale = true,
  } = props as any;

  return (
    <Text
      {...props}
      style={[
        // eslint-disable-next-line react-native/no-inline-styles
        {
          fontSize: size,
          color: color,
          fontFamily: font,
          fontWeight: bold ? (androidOS ? "bold" : "500") : "400",
          fontStyle: italic ? "italic" : "normal",
          textAlign: center ? "center" : right ? "right" : "left",
        },
        style,
      ]}
      allowFontScaling={scale}
    >
      {text}
    </Text>
  );
};
