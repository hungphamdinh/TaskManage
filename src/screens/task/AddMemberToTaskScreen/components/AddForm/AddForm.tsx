import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import styles from "./styles";
import { User } from "../../../../../services/model/User";
import { AppText } from "../../../../../components";
import { Colors, Fonts } from "../../../../../themes";

import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import ReduxState from "../../../../../redux/ReduxState";
import { strings } from "../../../../../languages";
import { clearTeamMember } from "../../../../../redux/team/action/teamMemberInvite";
import { getTeamDetail } from "../../../../../redux/team/action/teamDetail";
import {
  addMember,
  pushMemberLocal,
  clearMemberLocal,
  searchMember,
} from "../../../../../redux/member/action/members";
import { TeamMemberDetail } from "../../../../../services/model/TeamMember";

const AddForm = ({
  dispatch,
  user,
  navigation,
  teamId,
  isEditTask,
}: {
  dispatch: any;
  user: User;
  navigation: any;
  teamId: any;
  isEditTask: boolean;
}) => {
  const { response } = useSelector(
    (state: ReduxState) => state.teamMemberInvite
  );
  const { members, editFlag, membersLocal } = useSelector(
    (state: ReduxState) => state.members
  );
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
    if (teamDetail && editFlag == 0) {
      if (isEditTask) {
        var newArray = [];

        for (var i = 0; i < teamDetail.members.length; i++) {
          // we want to know if a[i] is found in b
          var match = false; // we haven't found it yet
          for (var j = 0; j < members.length; j++) {
            if (teamDetail.members[i].memberId == members[j].memberId) {
              // we have found a[i] in b, so we can stop searching
              match = true;
              break;
            }
            // if we never find a[i] in b, the for loop will simply end,
            // and match will remain false
          }
          // add a[i] to newArray only if we didn't find a match.
          if (!match) {
            newArray.push(teamDetail.members[i]);
          }
        }

        dispatch(pushMemberLocal(newArray, editFlag + 1));
      } else {
        dispatch(pushMemberLocal(teamDetail?.members, editFlag + 1));
      }
    }
  }, [teamDetail]);

  const _onChangeTaskName = (value: any) => {
    setName(value);
    dispatch(searchMember(value));
  };

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
          data={name !== "" ? membersLocal : members}
          renderItem={_renderItem}
          keyExtractor={_keyExtractor}
        />
      </View>
      {/* 
      <View style={styles.buttonDone}>
        <AppButton text={"Done"} onPress={_onPressDone} />
      </View>
      <SafeAreaView /> */}
    </KeyboardAwareScrollView>
  );
};

export default AddForm;

const Item = ({
  item,
  index,
  onPress,
}: {
  item: TeamMemberDetail;
  index: number;
  onPress: Function;
}) => {
  const _onPress = () => {
    onPress(item, index);
  };
  return (
    <TouchableOpacity
      disabled={item.isAdmin}
      style={styles.itemContainer}
      onPress={_onPress}
    >
      <View style={styles.profileContainer}>
        <View style={styles.imageProfileContainer}>
          <Image style={styles.imageMember} source={{ uri: item.profile }} />
        </View>
        <View style={styles.roleContainer}>
          <AppText
            color={item.isAdmin ? Colors.overlay3 : Colors.appTextBlack}
            text={item.name}
            bold
            size={Fonts.size.large}
          />
          <AppText
            style={styles.marginTopSmall}
            text={item.role}
            color={item.isAdmin ? Colors.overlay3 : Colors.appGrayColor}
          />
        </View>
      </View>
      <Ionicons
        name="checkmark-outline"
        size={20}
        color={
          item.isAdmin
            ? Colors.overlay2
            : item.isActive
            ? Colors.appPrimaryColor
            : Colors.appWhite
        }
      />
    </TouchableOpacity>
  );
};
