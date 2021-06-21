import React, { useState, useEffect } from "react";
import { AppText } from "../../../../components";
import { View, Image } from "react-native";
import { strings } from "../../../../languages";
import { Fonts, Colors } from "../../../../themes";
import styles from "./styles";
import { User } from "../../../../services/model/User";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import ReduxState from "../../../../redux/ReduxState";
import { SubTask } from "../../../../services/model/Task";
import Item from "./components/Item/Item";
import { doneSubTask } from "../../../../redux/task/action/subTaskStatus";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getTeams } from "../../../../redux/team/action/teamsMemberByUserId";
import { TeamMemberByUserId } from "../../../../services/model/TeamMember";
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
  const status = {
    inProgress: 0,
    done: 1,
  };

  useEffect(() => {
    dispatch(
      getTeams({
        userId: user.id,
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
  }) => <Item onPressItem={_onPressItemSubTask} item={item} index={index} />;

  const _onPressItemSubTask = (item: SubTask) => {
    dispatch(
      doneSubTask({
        id: item.id,
        status: status.done,
      })
    );
  };

  const _onPressAdd = () => {
    navigation.navigate('CreateTeamScreen');
  };
  return (
    <View>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Image style={styles.imageAvatar} source={{ uri: user.profile }} />
          </View>
          <AppText
            style={styles.title}
            text={user.name}
            bold
            size={Fonts.size.h5}
          />
          <AppText
            style={styles.description}
            text={user.role}
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
      </KeyboardAwareScrollView>
    </View>
  );
};

export default TaskDetail;
