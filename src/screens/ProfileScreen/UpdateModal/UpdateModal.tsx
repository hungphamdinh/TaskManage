import React from "react";
import { View, TouchableOpacity, Modal, Image } from "react-native";

import styles from "./styles";
import AppText from "../../../components/AppText";
import { Colors, Fonts, Images } from "../../../themes";
import { strings } from "../../../languages";
import TextInputForm from "../../../components/TextInputForm";
import * as ImagePicker from "expo-image-picker";
import { User } from "../../../services/model/User";

export default ({
  visible = false,
  user,
  image,
  role,
  onPressSubmit = () => {},
  onPressOut = () => {},
  onChangeRole,
  onChangeImage,
  textBtnAccept = strings.common.accept,
}: {
  visible: boolean;
  user: User;
  image: any;
  role: string;
  onPressSubmit: Function;
  onPressOut: Function;
  onChangeRole: Function;
  onChangeImage: Function;
  textBtnAccept?: string;
}) => {
  const _onPressOut = () => {
    onPressOut();
  };

  const _onPressSubmit = () => {
    onPressSubmit();
  };

  const _onChangeRole = (value: string) => {
    onChangeRole(value);
  };

  const imageStyle = () => {
    return {
      ...styles.image,
      width: image ? 40 : 40,
      height: image ? 40 : 40,
    };
  };

  const pickImage = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      onChangeImage(result);
    }
  };

  return visible ? (
    <Modal transparent={true} visible={visible} onRequestClose={_onPressOut}>
      <TouchableOpacity
        style={styles.container}
        onPress={_onPressOut}
        activeOpacity={1}
      >
        <TouchableOpacity style={styles.modal} activeOpacity={1}>
          <View style={styles.modalContent}>
            <AppText
              style={styles.title}
              text={"Update Profile"}
              bold
              center
              size={Fonts.size.large}
            />
            <View style={styles.content}>
              <TouchableOpacity style={styles.buttonUpload} onPress={pickImage}>
                <Image
                  style={imageStyle()}
                  source={{ uri: image !== "" ? image.uri : user?.profile }}
                />
              </TouchableOpacity>
              <AppText
                text={strings.create_team_screen.upload}
                size={Fonts.size.regular}
                center
                color={Colors.overlay5}
                style={styles.title}
              />
              <TextInputForm
                label={strings.profile_screen.role}
                value={role}
                onChangeText={_onChangeRole}
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
