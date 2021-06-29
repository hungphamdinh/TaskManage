import React, { useEffect, useState } from "react";
import ProfileForm from "./components/ProfileForm/CreatTeamForm";
import { useSelector, useDispatch } from "react-redux";
import ReduxState from "../../../redux/ReduxState";
import { Background, AppText } from "../../../components";
import { strings } from "../../../languages";
import { getTeamDetail } from "../../../redux/team/action/teamDetail";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Metrics, Colors } from "../../../themes";
import { getTeamInvitation, onSuccessSender } from "../../../redux/team/action/teamInvitationsByUserId";
import { InvitationsType } from "../../../helpers/Constants";

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
  const { invitationsSender } = useSelector(
    (state: ReduxState) => state.teamInvitationsByUserId
  );
  const dispatch = useDispatch();
  const isUpdate = route.params?.isUpdate;
  const isInvite = route.params?.isInvite;
  const teamId = route.params?.teamId;
  const itemId = {
    invite: 0,
    invitations: 4,
  };
  const dropdownData = [
    {
      id: itemId.invite,
      name: "Invite member",
    },
    {
      id: itemId.invitations,
      name: "View Invitations",
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
  useEffect(() => {
    dispatch(onSuccessSender([]));
  }, [])
  useEffect(() => {
    if (invitationsSender.length > 0) {
      navigation.navigate("TeamInvitationsScreen", {
        isReceiver: false,
      });
    }
  }, [invitationsSender.length]);

  const _onPressItem = (item: any) => {
    if(item.id === itemId.invite) {
      navigation.navigate("AddMemberScreen", {
        isTeamMember: true,
        isInvite: true,
      });
    }
    else {
      dispatch(
        getTeamInvitation({
          type: InvitationsType.sender,
          id: user?.id,
          teamId: teamDetail?.teamId,
        })
      );
    }

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
            isInvite={isInvite}
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
