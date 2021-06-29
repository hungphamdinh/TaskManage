import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { User } from "../../../../../services/model/User";
import { TextInputForm, AppText, AppButton } from "../../../../../components";
import { Colors } from "../../../../../themes";
import { Ionicons } from "@expo/vector-icons";
import { statusesDetail } from "../../../../../helpers/Constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import ReduxState from "../../../../../redux/ReduxState";
import { Member } from "../../../../../services/model/Member";
import { updateTask, clear } from "../../../../../redux/task/action/taskUpdate";
import {
  initialMember,
  clearMemberLocal,
  resetFlag,
} from "../../../../../redux/member/action/members";
import { CommonActions } from "@react-navigation/native";
import BottomModal from "../../../AddTaskScreen/components/AddForm/BottomModal";
import { getTeams } from "../../../../../redux/team/action/teamsMemberByUserId";
import { TeamMemberByUserId } from "../../../../../services/model/TeamMember";

const EditForm = ({
  dispatch,
  navigation,
  user,
}: {
  dispatch: any;
  user: User;
  navigation: any;
}) => {
  const { teamMembers } = useSelector(
    (state: ReduxState) => state.teamsMemberByUserId
  );
  const { taskDetail } = useSelector((state: ReduxState) => state.taskDetail);
  const { response } = useSelector((state: ReduxState) => state.taskUpdate);
  const { members } = useSelector((state: ReduxState) => state.members);
  const [name, setName] = useState(taskDetail.name);
  const [description, setDescription] = useState(taskDetail.description);
  const [boardStatus, setBoardStatus] = useState(
    statusesDetail.map((item: any) =>
      item.id === taskDetail.status
        ? { ...item, isActive: true }
        : { ...item, isActive: false }
    )
  );
  const [isTeam, setIsTeam] = useState(false);
  useEffect(() => {
    dispatch(initialMember(taskDetail.members));
    // dispatch(pushMemberLocal(taskDetail.members));
    return () => {
      dispatch(clearMemberLocal());
      dispatch(clear());
    };
    
  }, []);

  console.log(members.length);

  useEffect(() => {
    if (response) {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "HomeTabNavigation" }],
        })
      );
    }
  }, [response]);

  const _onChangeTaskName = (value: any) => {
    setName(value);
  };

  const _onChangeDescription = (value: any) => {
    setDescription(value);
  };

  const board = (item: any) => {
    return {
      ...styles.board,
      backgroundColor: item.color,
    };
  };
  const check = (item: any) => {
    return {
      ...styles.check,
      backgroundColor: item.isActive
        ? Colors.appGreen
        : Colors.appSecondaryColor,
      borderWidth: item.isActive ? 1 : 0,
      zIndex: item.isActive ? 1 : 0,
    };
  };

  const _onPressBoardStatus = (item: any) => {
    setBoardStatus(
      boardStatus.map((value: any) =>
        value.id === item.id
          ? { ...value, isActive: true }
          : { ...value, isActive: false }
      )
    );
  };

  const _onPressDone = () => {
    console.log(members);
    dispatch(
      updateTask({
        id: taskDetail.id,
        description: description,
        name: name,
        members: members.filter((item: Member) => item.isActive == true),
        status: boardStatus.filter((item: any) => item.isActive == true)[0].id,
      })
    );
  };

  const _onPressAdd = () => {
    // dispatch(
    //   getTeams({
    //     userId: user.id,
    //     isAdminTeams: true,
    //   })
    // );
    navigation.navigate("AddMemberToTaskScreen", {
      teamId: taskDetail.members[1].teamId,
      isEditTask: true,
    });
    // setIsTeam(true);
  };

  const _onPressOut = () => {
    setIsTeam(false);
  };

  const _onPressTeamId = (item: TeamMemberByUserId) => {
    setIsTeam(false);
    // if (teamItem?.teamId !== item.teamId) {
    //   setTeamItem(item);
    //   dispatch(resetFlag());
    //   dispatch(clearMemberLocal());
    // }
  };
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputTask}>
        <TextInputForm
          label={"Task name".toUpperCase()}
          value={name}
          onChangeText={_onChangeTaskName}
        />
      </View>
      <View style={styles.inputTask}>
        <AppText text={"TEAM MEMBER"} color={Colors.appGrayColor} />
        <View style={styles.teamContainer}>
          {members.map((item: any) => (
            <>
              {item.isAdmin ? null : (
                <>
                  {item.isActive ? (
                    <View style={styles.imageMember}>
                      <Image
                        style={styles.profile}
                        source={{ uri: item.profile }}
                      />
                    </View>
                  ) : null}
                </>
              )}
            </>
          ))}
          <TouchableOpacity style={styles.buttonAdd} onPress={_onPressAdd}>
            <Ionicons
              name="add-outline"
              size={30}
              color={Colors.appPrimaryColor}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputTask}>
        <TextInputForm
          label={"Description".toUpperCase()}
          value={description}
          onChangeText={_onChangeDescription}
        />
      </View>
      <View style={styles.inputTask}>
        <AppText text={"BOARD"} color={Colors.appGrayColor} />
        <View style={styles.boardContainer}>
          {boardStatus.map((item: any) => (
            <>
              <View style={styles.boardView}>
                <View style={check(item)}>
                  <Ionicons
                    name="checkmark-sharp"
                    size={10}
                    color={Colors.appWhite}
                  />
                </View>
                <TouchableOpacity
                  style={board(item)}
                  onPress={() => _onPressBoardStatus(item)}
                >
                  <AppText
                    color={item.textColor}
                    text={item.name.toUpperCase()}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.marginRight} />
            </>
          ))}
        </View>
      </View>
      <BottomModal
        visible={isTeam}
        data={teamMembers}
        onPressOut={_onPressOut}
        onPressAdd={_onPressTeamId}
      />
      <View style={styles.buttonDone}>
        <AppButton text={"Done"} onPress={_onPressDone} />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default EditForm;
