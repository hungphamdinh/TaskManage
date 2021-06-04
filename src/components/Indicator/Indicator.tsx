import React, { Component } from "react";
import { View, TouchableOpacity, ActivityIndicator, Modal } from "react-native";

import styles from "./styles";
import { Colors } from "../../themes";

export default (props: any) => {
  const _onPressBackdrop = () => {
    props.onPressBackDrop();
  };

  const {
    visible,
    backdropColor = "red",
    color = Colors.appWhite,
    containerStyle,
    size = 10,
  } = props;

  return visible ? (
    <Modal transparent={true}>
      <TouchableOpacity
        style={
          containerStyle
            ? containerStyle
            : [styles.container, { backgroundColor: backdropColor }]
        }
        onPress={_onPressBackdrop}
        activeOpacity={1}
      >
        <View style={styles.indicatorContainer}>
          <ActivityIndicator color={color} size={size} />
        </View>
      </TouchableOpacity>
    </Modal>
  ) : null;
};
