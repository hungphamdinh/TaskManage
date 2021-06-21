import React, { useState, useEffect } from "react";
import { View, Image, Platform } from "react-native";
import styles from "./styles";
import { User } from "../../../../services/model/User";
import {
  TextInputForm,
  AppText,
  AppButton,
  Divider,
} from "../../../../components";
import { Colors, Images, Fonts } from "../../../../themes";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { statuses } from "../../../../helpers/Constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { addTask, clear } from "../../../../redux/task/action/task";
import { useSelector } from "react-redux";
import ReduxState from "../../../../redux/ReduxState";
import { AddTaskRequest } from "../../../../services/model/request/Task";
import {
  getMembers,
  clearMemberLocal,
} from "../../../../redux/member/action/members";
import { Member } from "../../../../services/model/Member";
import { CommonActions } from "@react-navigation/native";
import { strings } from "../../../../languages";
import * as ImagePicker from "expo-image-picker";

const BoardForm = ({
  dispatch,
  user,
  navigation,
}: {
  dispatch: any;
  user: User;
  navigation: any;
}) => {
  const { members, membersLocal } = useSelector(
    (state: ReduxState) => state.members
  );
  const [image, setImage] = useState(null);

  const { response } = useSelector((state: ReduxState) => state.task);
  const [name, setName] = useState("");
  useEffect(() => {
    if (members.length == 0) {
      dispatch(
        getMembers({
          userId: user.id,
        })
      );
    }
    return () => {
      dispatch(clearMemberLocal());
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (response) {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "HomeTabNavigation" }],
        })
      );
      dispatch(clear());
    }
  }, [response]);
  const _onChangeTaskName = (value: any) => {
    setName(value);
  };

  const _onPressDone = () => {};

  const _onPressAdd = () => {
    navigation.navigate("AddMemberScreen");
  };

  const pickImage = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  
  const imageStyle = () => {
    return {
      ...styles.image,
      width: image ? 80 : 40,
      height: image ? 80 : 40,
    }
  }
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.buttonUpload} onPress={pickImage}>
          <Image
            style={imageStyle()}
            source={image ? { uri: image } : Images.icUpload}
          />
        </TouchableOpacity>
        <AppText
          text={strings.create_team_screen.upload}
          size={Fonts.size.h6}
          bold
          style={styles.title}
        />
        <AppText
          text={strings.create_team_screen.logo_description}
          color={Colors.overlay3}
        />
      </View>
      <View style={styles.inputTask}>
        <TextInputForm
          label={"Team name".toUpperCase()}
          value={name}
          onChangeText={_onChangeTaskName}
        />
      </View>
      <View style={styles.inputTask}>
        <AppText
          text={strings.create_team_screen.member.toUpperCase()}
          color={Colors.appGrayColor}
        />
        <View style={styles.selectContainer}>
          <AppText
            size={Fonts.size.large}
            text={strings.create_team_screen.select_member}
          />
          <View style={styles.teamContainer}>
            {membersLocal.map((item: Member) => (
              <>
                {item.isActive ? (
                  <View style={styles.imageMember}>
                    <Image
                      style={styles.profile}
                      source={{ uri: item.profile }}
                    />
                  </View>
                ) : null}
              </>
            ))}
            <TouchableOpacity onPress={_onPressAdd}>
              <Ionicons
                name="add-outline"
                size={30}
                color={Colors.appPrimaryColor}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Divider />
      </View>

      <View style={styles.buttonDone}>
        <AppButton text={"Done"} onPress={_onPressDone} />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default BoardForm;
