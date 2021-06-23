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
import {
  getMembers,
  addMember,
  searchMember,
} from "../../../../redux/member/action/members";
import { strings } from "../../../../languages";
import { Member } from "../../../../services/model/Member";
import {
  getUsers,
  addUser,
  searchUsers,
  initialMemberLocal,
  clearLocalUser,
} from "../../../../redux/user/reducer/usersById";
import { TeamDetail } from "../../../../services/model/TeamMember";

const AddForm = ({
  dispatch,
  user,
  onNavigate,
  isTeamMember,
  isInvite,
  teamDetail,
}: {
  dispatch: any;
  user: User;
  onNavigate: Function;
  isTeamMember?: boolean;
  isInvite?: boolean;
  teamDetail: TeamDetail;
}) => {
  const { members, membersLocal } = useSelector(
    (state: ReduxState) => state.members
  );
  const { users, usersLocal } = useSelector(
    (state: ReduxState) => state.usersById
  );
  const [name, setName] = useState("");
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!isTeamMember) {
      if (members.length == 0) {
        dispatch(
          getMembers({
            userId: user.id,
          })
        );
      }
    } else {
      if (users.length === 0) {
        dispatch(
          getUsers({
            id: user.id,
          })
        );
      }
    }
    setMounted(true);
    // return () => {
    //   dispatch(clearLocalUser());
    // }
  }, []);

  useEffect(() => {
    if (usersLocal.length > 0 && isInvite) {
      // console.log(teamDetail.members);
      if (mounted) {
        dispatch(initialMemberLocal(teamDetail.members));
      }
    }
  }, [usersLocal.length, mounted]);
  const _onChangeTaskName = (value: any) => {
    setName(value);
    isTeamMember ? dispatch(searchUsers(value)) : dispatch(searchMember(value));
  };

  const _onPressDone = () => {
    onNavigate(usersLocal);
  };

  const _keyExtractor = (item: any, index: number) => index.toString();

  const _renderItem = ({ item, index }: { item: any; index: number }) => (
    <Item index={index} item={item} onPress={_onPressItem} />
  );

  const _onPressItem = (item: any, index: number) => {
    isTeamMember ? dispatch(addUser(item)) : dispatch(addMember(item));
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
          data={
            (name !== ""
              ? isTeamMember
                ? usersLocal
                : membersLocal
              : isTeamMember
              ? users
              : members) as any
          }
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
