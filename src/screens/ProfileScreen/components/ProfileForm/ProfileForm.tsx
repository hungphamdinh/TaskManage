import React, { useEffect } from "react";
import { AppText } from "../../../../components";
import { View, Image } from "react-native";
import { strings } from "../../../../languages";
import { Fonts, Colors, Images } from "../../../../themes";
import styles from "./styles";
import { User } from "../../../../services/model/User";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import ReduxState from "../../../../redux/ReduxState";
import Item from "./components/Item/Item";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getTeams } from "../../../../redux/team/action/teamsMemberByUserId";
import { TeamMemberByUserId } from "../../../../services/model/TeamMember";
import { getTeamInvitation } from "../../../../redux/team/action/teamInvitationsByUserId";
import { InvitationsType } from "../../../../helpers/Constants";
import { logout } from "../../../../redux/user/reducer/user";
const TaskDetail = ({
  dispatch,
  user,
  navigation,
}: {
  dispatch: any;
  user: User;
  navigation: any;
}) => {
  const { teamMembers } = useSelector(
    (state: ReduxState) => state.teamsMemberByUserId
  );
  const { invitationsSender } = useSelector(
    (state: ReduxState) => state.teamInvitationsByUserId
  );

  useEffect(() => {
    dispatch(
      getTeams({
        userId: user?.id,
      })
    );
  }, [dispatch]);
  const _keyExtractor = (item: any) => item.id;
  const _renderItem = ({
    item,
    index,
  }: {
    item: TeamMemberByUserId;
    index: number;
  }) => <Item onPressDetail={_onPressDetail} onPressItem={_onPressTeamItem} item={item} index={index} />;

  useEffect(() => {
    if (invitationsSender.length > 0) {
      navigation.navigate("TeamInvitationsScreen", {
        isReceiver: false,
      });
    }
  }, [invitationsSender.length]);
  const _onPressTeamItem = (item: TeamMemberByUserId) => {
    if (item.isAdmin) {
      dispatch(
        getTeamInvitation({
          type: InvitationsType.sender,
          id: user?.id,
          teamId: item.teamId,
        })
      );
    }
  };

  const _onPressDetail = (item: TeamMemberByUserId) => {
    navigation.navigate("CreateTeamScreen", {
      isUpdate: true,
      teamId: item.teamId,
    });
  }
  const _onPressAdd = () => {
    navigation.navigate("CreateTeamScreen");
  };

  const _onPressSettings = () => {
    dispatch(logout());
  };
  return (
    <View>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Image
              resizeMode={"contain"}
              style={styles.imageAvatar}
              source={{ uri: user?.profile }}
            />
          </View>
          <AppText
            style={styles.title}
            text={user?.name}
            bold
            size={Fonts.size.h5}
          />
          <AppText
            style={styles.description}
            text={user?.role}
            color={Colors.appGrayColor}
          />
        </View>
        <View style={styles.addSubTask}>
          <AppText
            size={Fonts.size.large}
            bold
            text={strings.profile_screen.team_work}
          />
          <TouchableOpacity style={styles.buttonAdd} onPress={_onPressAdd}>
            <Ionicons
              name="add-outline"
              size={20}
              color={Colors.appPrimaryColor}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.taskContainer}>
          <FlatList
            data={teamMembers}
            renderItem={_renderItem}
            keyExtractor={_keyExtractor}
          />
        </View>
        <View style={styles.mainInfoContainer}>
          <View style={styles.team}>
            <AppText
              text={strings.profile_screen.work_with}
              bold
              size={Fonts.size.large}
            />
            <View style={styles.teamContainer}>
              {/* {taskDetail.members.map((item: Member, idx: number) => (
                <View key={idx.toString()} style={styles.imageMember}>
                  <Image
                    style={styles.profile}
                    source={{ uri: item.profile }}
                  />
                </View>
              ))} */}
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.buttonSetting}
          onPress={_onPressSettings}
        >
          <Image source={Images.icSetting} style={styles.iconSetting} />
          <AppText
            text={strings.profile_screen.settings}
            bold
            style={styles.textSetting}
            size={Fonts.size.large}
          />
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default TaskDetail;
