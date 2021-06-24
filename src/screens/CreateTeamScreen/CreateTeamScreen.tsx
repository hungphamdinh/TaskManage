import React, { useEffect, useState } from "react";
import ProfileForm from "./components/ProfileForm/CreatTeamForm";
import { useSelector, useDispatch } from "react-redux";
import ReduxState from "../../redux/ReduxState";
import { Background, AppText } from "../../components";
import { strings } from "../../languages";
import { getTeamDetail } from "../../redux/team/action/teamDetail";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Metrics, Colors } from "../../themes";

const CreateTeamScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const { user } = useSelector((state: ReduxState) => state.user);
  const { teamDetail } = useSelector((state: ReduxState) => state.teamDetail);
  const [isShowModal, setIsShowModal] = useState(false);

  const dispatch = useDispatch();
  const isUpdate = route.params?.isUpdate;
  const teamId = route.params?.teamId;
  const itemId = {
    invite: 0,
    leave: 4,
  };
  const dropdownData = [
    {
      id: itemId.invite,
      name: "Invite member",
    },
    {
      id: itemId.leave,
      name: "Leave from task",
    },
  ];
  useEffect(() => {
    if (teamId) {
      dispatch(
        getTeamDetail({
          id: teamId,
          userId: user?.id,
        })
      );
    }
  }, [teamId]);
  const _onPressShowDropdown = () => {
    setIsShowModal(!isShowModal);
  };

  const _onPressItem = (item: any) => {
    navigation.navigate("AddMemberScreen", {
      isTeamMember: true,
      isInvite: true,
    });
    _onPressShowDropdown();
  };
  return (
    <>
      <Background
        navigation={navigation}
        title={
          isUpdate
            ? strings.create_team_screen.title_detail
            : strings.create_team_screen.title
        }
        mainComponent={
          <ProfileForm
            isUpdate={isUpdate}
            navigation={navigation}
            dispatch={dispatch}
            user={user}
          />
        }
        secondaryComponent={
          <View style={styles.secondaryComponent}>
            {teamDetail?.isAdmin && isUpdate ? (
              <TouchableOpacity
                style={styles.buttonSetting}
                onPress={_onPressShowDropdown}
              >
                <View style={styles.circle} />
                <View style={styles.circle} />
                <View style={styles.circle} />
              </TouchableOpacity>
            ) : null}
          </View>
        }
      />
      {isShowModal ? (
        <View style={styles.dropdown}>
          {dropdownData.map((item) => (
            <>
              <TouchableOpacity
                onPress={() => _onPressItem(item)}
                style={styles.buttonItem}
                key={item.id.toString()}
              >
                <AppText color={Colors.overlay5} text={item.name} />
              </TouchableOpacity>
            </>
          ))}
        </View>
      ) : null}
    </>
  );
};

export default CreateTeamScreen;
const styles = StyleSheet.create({
  circle: {
    width: 4,
    height: 4,
    borderRadius: Metrics.borderRadius.large,
    backgroundColor: Colors.appWhite,
    marginTop: Metrics.margin.tiny,
  },
  dropdown: {
    backgroundColor: Colors.appWhite,
    paddingHorizontal: Metrics.margin.very_huge,
    paddingVertical: Metrics.margin.regular,
    position: "absolute",
    right: 30,
    top: 70,
    borderRadius: Metrics.borderRadius.regular,
  },
  buttonSetting: {
    marginRight: Metrics.margin.small,
    width: 10,
  },
  buttonItem: {
    marginVertical: Metrics.margin.regular,
  },
  secondaryComponent: {
    flexDirection: "row",
  },
  buttonInvitation: {
    marginRight: Metrics.margin.large,
  },
});
