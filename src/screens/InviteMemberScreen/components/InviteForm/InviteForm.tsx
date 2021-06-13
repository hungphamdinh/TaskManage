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
import {
  getUsers,
  searchUsers,
  addUser,
  clearLocalUser,
} from "../../../../redux/user/reducer/usersById";
import {
  sendInvitation, clearInvitationSend,
} from "../../../../redux/invitation/action/invitationSend";
import { SendInvitationRequest } from "../../../../services/model/request/Invitation";

const AddForm = ({
  dispatch,
  user,
  onNavigate,
}: {
  dispatch: any;
  user: User;
  onNavigate: Function;
}) => {
  const { users, usersLocal } = useSelector(
    (state: ReduxState) => state.usersById
  );
  const { taskDetail } = useSelector((state: ReduxState) => state.taskDetail);
  const { response } = useSelector((state: ReduxState) => state.invitationSend);
  const [name, setName] = useState("");
  useEffect(() => {
    if (users.length == 0) {
      dispatch(
        getUsers({
          id: user.id,
        })
      );
    }
    return () => {
      dispatch(clearInvitationSend());
      dispatch(clearLocalUser());
    }
  }, []);

  useEffect(() => {
    if (response) {
      onNavigate();
    }
  }, [response]);
  const _onChangeTaskName = (value: any) => {
    setName(value);
    dispatch(searchUsers(value));
  };

  const _onPressDone = () => {
    let arr: Array<SendInvitationRequest> = [];
    usersLocal.map((item: User) => {
      if (item.isActive) {
        arr.push({
          userId: user.id,
          taskId: taskDetail.id,
          userName: user.name,
          receiverId: item.id,
        });
      }
    });
    dispatch(sendInvitation(arr));
  };

  const _keyExtractor = (item: any, index: number) => index.toString();

  const _renderItem = ({ item, index }: { item: User; index: number }) => (
    <Item index={index} item={item} onPress={_onPressItem} />
  );

  const _onPressItem = (item: User, index: number) => {
    dispatch(addUser(item));
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
          data={name !== "" ? usersLocal : users}
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
  item: User;
  index: number;
  onPress: Function;
}) => {
  const _onPress = () => {
    onPress(item, index);
  };
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={_onPress}>
      <View style={styles.profileContainer}>
        <View style={styles.imageProfileContainer}>
          <Image style={styles.imageMember} source={{ uri: item.profile }} />
        </View>
        <View style={styles.roleContainer}>
          <AppText text={item.name} bold size={Fonts.size.large} />
          <AppText
            style={styles.marginTopSmall}
            text={item.role}
            color={Colors.appGrayColor}
          />
        </View>
      </View>
      <Ionicons
        name="checkmark-outline"
        size={20}
        color={item.isActive ? Colors.appPrimaryColor : Colors.appWhite}
      />
    </TouchableOpacity>
  );
};
