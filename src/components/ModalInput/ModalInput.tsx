import React from "react";
import { View, TouchableOpacity, Modal } from "react-native";

import styles from "./styles";
import AppText from "../AppText";
import { Colors, Fonts } from "../../themes";
import { strings } from "../../languages";
import TextInputForm from "../TextInputForm";

export default ({
  visible = false,
  data,
  title,
  textInputTitle,
  onPressSubmit = () => {},
  onPressOut = () => {},
  onChangeData,
  textBtnAccept = strings.common.accept,
}: {
  visible: boolean;
  data: string;
  title?: string;
  textInputTitle: string;
  onPressSubmit: Function;
  onPressOut: Function;
  onChangeData: Function;
  textBtnAccept?: string;
}) => {
  const _onPressOut = () => {
    onPressOut();
  };

  const _onPressSubmit = () => {
    onPressSubmit();
  };

  const _onChangeData = (value: string) => {
    onChangeData(value);
  }
  return visible ? (
    <Modal transparent={true} visible={visible} onRequestClose={_onPressOut}>
      <TouchableOpacity
        style={styles.container}
        onPress={_onPressOut}
        activeOpacity={1}
      >
        <TouchableOpacity style={styles.modal} activeOpacity={1}>
          <View style={styles.modalContent}>
            {title ? (
              <AppText
                style={styles.title}
                text={title}
                bold
                center
                size={Fonts.size.large}
              />
            ) : null}
            <View style={styles.content}>
              <TextInputForm
                label={textInputTitle}
                value={data}
                onChangeText={_onChangeData}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.buttonAccept}
            onPress={_onPressSubmit}
          >
            <AppText text={textBtnAccept} color={Colors.appGreen} bold />
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  ) : null;
};
