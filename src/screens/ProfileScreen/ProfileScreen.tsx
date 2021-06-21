import React, { useState } from "react";
import ProfileForm from "./components/ProfileForm/ProfileForm";
import { useSelector, useDispatch } from "react-redux";
import ReduxState from "../../redux/ReduxState";
import { Background } from "../../components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Metrics } from "../../themes";
import { getInvitationByUserId } from "../../redux/invitation/action/invitationsByUserId";
import { InvitationsType } from "../../helpers/Constants";
import { strings } from "../../languages";
const TaskDetailScreen = ({ navigation }: { navigation: any }) => {
  const { user } = useSelector((state: ReduxState) => state.user);
  const { taskDetail } = useSelector((state: ReduxState) => state.taskDetail);
  const dispatch = useDispatch();

  const _onPressInvitation = () => {
    dispatch(
      getInvitationByUserId({
        type: InvitationsType.sender,
        id: user.id,
        taskId: taskDetail.id,
      })
    );
    navigation.navigate("InvitationsScreen", {
      isReceiver: false,
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

export default TaskDetailScreen;
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
