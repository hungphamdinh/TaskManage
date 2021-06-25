import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { AppText, ModalInput } from "../../components";
import { Metrics, Fonts, Colors, Images } from "../../themes";
import { strings } from "../../languages";
import { useSelector, useDispatch } from "react-redux";
import ReduxState from "../../redux/ReduxState";
import { getInvitationByUserId } from "../../redux/invitation/action/invitationsByUserId";
import { InvitationsType } from "../../helpers/Constants";
import { logout, updateRole } from "../../redux/user/reducer/user";

const DashboardScreen = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: ReduxState) => state.user);
  const { invitationsReceiver } = useSelector(
    (state: ReduxState) => state.invitationsByUserId
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [role, setRole] = useState("");
  useEffect(() => {
    if (user.role === "") {
      _onChangeModalVisible();
    }
    dispatch(
      getInvitationByUserId({
        id: user?.id,
        type: InvitationsType.receiver,
      })
    );
  }, []);

  const _onPress = () => {
    navigation.navigate("InvitationsScreen", {
      isReceiver: true,
    });
  };

  const _onPressProfile = () => {
    navigation.navigate("ProfileScreen");
  };

  const _onChangeModalVisible = () => {
    setIsModalVisible(!isModalVisible);
  };

  const _onChangeRole = (value: string) => {
    setRole(value);
  };

  const _onPressSubmitRole = () => {
    dispatch(
      updateRole({
        userId: user.id,
        role: role,
      })
    );
    _onChangeModalVisible();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <AppText
          size={Fonts.size.h6}
          bold
          text={strings.dashboard_screen.title}
        />

        <View style={styles.headerRightContainer}>
          <TouchableOpacity style={styles.buttonNoti} onPress={_onPress}>
            <Image
              source={Images.icNoti}
              style={[styles.notification, { tintColor: Colors.overlay6 }]}
              resizeMode={"contain"}
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
            style={styles.profilePicture}
            onPress={_onPressProfile}
          >
            <Image
              source={{ uri: user?.profile }}
              style={styles.avatar}
              resizeMode={"contain"}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ModalInput
        visible={isModalVisible}
        data={role}
        onPressOut={_onChangeModalVisible}
        title={"Complete Info"}
        textInputTitle={"Your role"}
        onPressSubmit={_onPressSubmitRole}
        onChangeData={_onChangeRole}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.margin.very_huge,
    marginHorizontal: Metrics.margin.large,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  profilePicture: {
    borderRadius: 40,
    width: 40,
    height: 40,
    backgroundColor: Colors.appPrimaryColor,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: Metrics.borderRadius.huge,
  },
  notification: {
    width: 40,
    height: 40,
  },
  buttonNoti: {
    width: 40,
    height: 40,
    marginRight: Metrics.margin.small,
  },
  headerRightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  count: {
    position: "absolute",
    width: 18,
    height: 18,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    right: 5,
    borderColor: Colors.overlay6,
    borderRadius: Metrics.borderRadius.large,
  },
});

export default DashboardScreen;
