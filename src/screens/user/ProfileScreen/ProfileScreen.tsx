import React, { useState, useEffect } from "react";
import ProfileForm from "./components/ProfileForm/ProfileForm";
import { useSelector, useDispatch } from "react-redux";
import ReduxState from "../../../redux/ReduxState";
import { Background, AppText } from "../../../components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Metrics, Fonts } from "../../../themes";
import { InvitationsType } from "../../../helpers/Constants";
import { strings } from "../../../languages";
import { getTeamInvitation, clearInvitationSend as clearInvitation } from "../../../redux/team/action/teamInvitationsByUserId";
import UpdateModal from "./UpdateModal";
import * as ImagePicker from "expo-image-picker";
import { updateUserProfile } from "../../../redux/user/reducer/user";

const ProfileScreen = ({ navigation }: { navigation: any }) => {
  const { user } = useSelector((state: ReduxState) => state.user);
  const { invitationsReceiver } = useSelector(
    (state: ReduxState) => state.teamInvitationsByUserId
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [role, setRole] = useState("");
  const [image, setImage] = useState(user?.profile);
  const dispatch = useDispatch();

  const _onPressInvitation = () => {
    navigation.navigate("TeamInvitationsScreen", {
      isReceiver: true,
    });
  };

  useEffect(() => {
    dispatch(
      getTeamInvitation({
        type: InvitationsType.receiver,
        id: user?.id,
      })
    );
    return () => {
      dispatch(clearInvitation());
    }
  }, []);

  const checkPermission = async () => {
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };
  const _onPressUpdateProfile = () => {
    _onChangeModalVisible();
  };

  const _onChangeModalVisible = () => {
    setIsModalVisible(!isModalVisible);
  };

  const _onPressUpdate = () => {
    _onChangeModalVisible();
    dispatch(
      updateUserProfile({
        userId: user.id,
        profile: image,
        role: role,
      })
    );
  };

  const _onChangeRole = (value: string) => {
    setRole(value);
  };

  const _onChangeImage = (value: any) => {
    checkPermission();
    setImage(value);
  };
  return (
    <>
      <Background
        navigation={navigation}
        title={strings.profile_screen.title}
        mainComponent={
          <ProfileForm
            navigation={navigation}
            dispatch={dispatch}
            user={user}
          />
        }
        secondaryComponent={
          <View style={styles.secondaryComponent}>
            <TouchableOpacity
              style={styles.buttonInvitation}
              onPress={_onPressInvitation}
            >
              <Ionicons
                name="mail-unread-outline"
                size={25}
                color={Colors.appWhite}
              />
              <TouchableOpacity style={styles.count}>
                <AppText
                  bold
                  color={Colors.appWhite}
                  size={Fonts.size.tiny}
                  text={invitationsReceiver.length}
                />
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonInvitation}
              onPress={_onPressUpdateProfile}
            >
              <Ionicons
                name="cloud-upload-outline"
                size={25}
                color={Colors.appWhite}
              />
            </TouchableOpacity>
          </View>
        }
      />
      <UpdateModal
        role={role}
        image={image}
        user={user}
        onChangeImage={_onChangeImage}
        visible={isModalVisible}
        onPressSubmit={_onPressUpdate}
        onChangeRole={_onChangeRole}
        onPressOut={_onChangeModalVisible}
      />
    </>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  circle: {
    width: 4,
    height: 4,
    borderRadius: Metrics.borderRadius.large,
    backgroundColor: Colors.appWhite,
    marginTop: Metrics.margin.tiny,
  },
  secondaryComponent: {
    flexDirection: "row",
  },
  buttonInvitation: {
    marginRight: Metrics.margin.huge,
    flexDirection: 'row',
  },
  count: {
    position: "absolute",
    width: 15,
    height: 15,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.overlay6,
    borderRadius: Metrics.borderRadius.large,
  },
});
