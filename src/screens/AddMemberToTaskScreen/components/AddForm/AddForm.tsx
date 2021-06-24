import React, { useState, useEffect } from "react";
import { View, Image } from "react-native";
import styles from "./styles";
import { User } from "../../../../services/model/User";
import { AppText, AppButton } from "../../../../components";
import { Colors, Fonts } from "../../../../themes";
import {
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import ReduxState from "../../../../redux/ReduxState";
import { strings } from "../../../../languages";
import { Member } from "../../../../services/model/Member";
import { clearTeamMember } from "../../../../redux/team/action/teamMemberInvite";
import { getTeamDetail } from "../../../../redux/team/action/teamDetail";
import {
  addMember,
  pushMemberLocal,
} from "../../../../redux/member/action/members";
import { TeamMemberDetail } from "../../../../services/model/TeamMember";

const AddForm = ({
  dispatch,
  user,
  navigation,
  teamId,
}: {
  dispatch: any;
  user: User;
  navigation: any;
  teamId: any;
}) => {
  const { response } = useSelector(
    (state: ReduxState) => state.teamMemberInvite
  );
  const { membersLocal } = useSelector((state: ReduxState) => state.members);
  const [name, setName] = useState("");
  const { teamDetail } = useSelector((state: ReduxState) => state.teamDetail);
  useEffect(() => {
    if (response) {
      navigation.goBack();
      dispatch(clearTeamMember());
    }
  }, [response]);

  useEffect(() => {
    dispatch(
      getTeamDetail({
        id: teamId,
        userId: user.id,
      })
    );
  }, []);

  useEffect(() => {
    if (teamDetail) {
      dispatch(pushMemberLocal(teamDetail?.members));
    }
  }, [teamDetail]);

  const _onChangeTaskName = (value: any) => {
    setName(value);
    // isTeamMember ? dispatch(searchUsers(value)) : dispatch(searchMember(value));
  };

  const _onPressDone = () => {};

  const _keyExtractor = (item: any, index: number) => index.toString();

  const _renderItem = ({ item, index }: { item: any; index: number }) => (
    <Item index={index} item={item} onPress={_onPressItem} />
  );

  const _onPressItem = (item: TeamMemberDetail) => {
    dispatch(addMember(item));
  };
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputTask}>
        <TextInput
          value={name}
          onChangeText={_onChangeTaskName}
          placeholder={strings.add_member_screen.search}
        />
        <View style={styles.icSearch}>
          <Ionicons
            name="search-outline"
            size={20}
            color={Colors.appGrayColor}
          />
        </View>
      </View>
      <View style={styles.teamContainer}>
        <FlatList
          data={teamDetail?.members}
          renderItem={_renderItem}
          keyExtractor={_keyExtractor}
        />
      </View>

      <View style={styles.buttonDone}>
        <AppButton text={"Done"} onPress={_onPressDone} />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AddForm;

const Item = ({
  item,
  index,
  onPress,
}: {
  item: Member;
  index: number;
  onPress: Function;
}) => {
  const _onPress = () => {
    onPress(item, index);
  };
  return (
    <TouchableOpacity
      disabled={item.isDisable}
      style={styles.itemContainer}
      onPress={_onPress}
    >
      <View style={styles.profileContainer}>
        <View style={styles.imageProfileContainer}>
          <Image style={styles.imageMember} source={{ uri: item.profile }} />
        </View>
        <View style={styles.roleContainer}>
          <AppText
            color={item.isDisable ? Colors.overlay3 : Colors.appTextBlack}
            text={item.name}
            bold
            size={Fonts.size.large}
          />
          <AppText
            style={styles.marginTopSmall}
            text={item.role}
            color={item.isDisable ? Colors.overlay3 : Colors.appGrayColor}
          />
        </View>
      </View>
      <Ionicons
        name="checkmark-outline"
        size={20}
        color={
          item.isDisable
            ? Colors.overlay2
            : item.isActive
            ? Colors.appPrimaryColor
            : Colors.appWhite
        }
      />
    </TouchableOpacity>
  );
};
