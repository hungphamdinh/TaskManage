import React, { useState } from "react";
import ProfileForm from "./components/ProfileForm/ProfileForm";
import { useSelector, useDispatch } from "react-redux";
import ReduxState from "../../redux/ReduxState";
import { Background } from "../../components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Metrics } from "../../themes";
import { InvitationsType } from "../../helpers/Constants";
import { strings } from "../../languages";
import { getTeamInvitation } from "../../redux/team/action/teamInvitationsByUserId";
const ProfileScreen = ({ navigation }: { navigation: any }) => {
  const { user } = useSelector((state: ReduxState) => state.user);
  const dispatch = useDispatch();

  const _onPressInvitation = () => {
    dispatch(
      getTeamInvitation({
        type: InvitationsType.receiver,
        id: user?.id,
      })
    );
    navigation.navigate("TeamInvitationsScreen", {
      isReceiver: true,
    });
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
                size={20}
                color={Colors.appWhite}
              />
            </TouchableOpacity>
          </View>
        }
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
    marginRight: Metrics.margin.large,
  },
});
