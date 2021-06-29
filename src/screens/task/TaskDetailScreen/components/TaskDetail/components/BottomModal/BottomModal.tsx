import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Colors, Fonts } from "../../../../../../../themes";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import {
  AppText,
  TextInputForm,
  AppButton,
} from "../../../../../../../components";
import { Scale } from "../../../../../../../utilities/Utils";
import { strings } from "../../../../../../../languages";

export default ({
  visible = false,
  onPressOut = () => {},
  onPressAdd,
}: {
  visible: boolean;
  onPressOut: Function;
  onPressAdd: Function;
}) => {
  const [name, setName] = useState("");
  const _onPressOut = () => {
    onPressOut();
  };

  const _onPressItem = () => {
    onPressAdd(name);
    setName('');
  };

  const _onChangeTaskName = (value: any) => {
    setName(value);
  };
  return (
    <Modal
      isVisible={visible}
      style={styles.modal}
      propagateSwipe={true}
      onBackdropPress={_onPressOut}
    >
      <View>
        {/* Wrap a View work like parent component to fix size of modal work based on this child View */}
        <View style={styles.container}>
          <View style={styles.header}>
            <AppText
              size={Fonts.size.large}
              bold
              text={strings.detail_screen.add_task}
            />

            <TouchableOpacity style={styles.btnClose} onPress={_onPressOut}>
              <Ionicons
                size={Scale(20)}
                name={"ios-close-outline"}
                color={Colors.appGrayColor}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.mainContainer}>
            <TextInputForm
              label={"Task name".toUpperCase()}
              value={name}
              autoFocus={true}
              onChangeText={_onChangeTaskName}
            />
            <View style={styles.buttonAdd}>
              <AppButton
                text={strings.detail_screen.add_task}
                onPress={_onPressItem}
              />
            </View>
          </View>
          <View style={styles.bottomPushUp} />
        </View>
      </View>
    </Modal>
  );
};
