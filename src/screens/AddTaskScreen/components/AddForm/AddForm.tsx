import React, { useState, useEffect } from "react";
import { View, Image } from "react-native";
import styles from "./styles";
import { User } from "../../../../services/model/User";
import {
  TextInputForm,
  AppText,
  Divider,
  AppButton,
} from "../../../../components";
import { Colors, Images } from "../../../../themes";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { statuses } from "../../../../helpers/Constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { addTask, clear } from "../../../../redux/task/action/task";
import { useSelector } from "react-redux";
import ReduxState from "../../../../redux/ReduxState";
import { AddTaskRequest } from "../../../../services/model/request/Task";
import {
  getMembers,
  clearMemberLocal,
} from "../../../../redux/member/action/members";
import { Member } from "../../../../services/model/Member";
import { CommonActions } from "@react-navigation/native";
import BottomModal from "./BottomModal";
import {
  getTeams,
  onSuccess,
} from "../../../../redux/team/action/teamsMemberByUserId";
import { TeamMemberByUserId } from "../../../../services/model/TeamMember";

const BoardForm = ({
  dispatch,
  user,
  navigation,
}: {
  dispatch: any;
  user: User;
  navigation: any;
}) => {
  const { members, membersLocal } = useSelector(
    (state: ReduxState) => state.members
  );
  const { teamMembers } = useSelector(
    (state: ReduxState) => state.teamsMemberByUserId
  );
  const { response } = useSelector((state: ReduxState) => state.task);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTeam, setIsTeam] = useState(false);
  // const [startTime, setStartTime] = useState(new Date());
  // const [isStartTimeVisible, setIsStartTimeVisible] = useState(false);
  // const [endTime, setEndTIme] = useState(new Date());
  // const [isEndTimeVisible, setIsEndTimeVisible] = useState(false);
  const [boardStatus, setBoardStatus] = useState(statuses);
  useEffect(() => {
    dispatch(onSuccess([]));
    if (members.length == 0) {
      dispatch(
        getMembers({
          userId: user.id,
        })
      );
    }
    return () => {
      dispatch(clearMemberLocal());
    };
  }, []);

  useEffect(() => {
    if (response) {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "HomeTabNavigation" }],
        })
      );
      dispatch(clear());
    }
  }, [response]);

  //teamMembers have data
  useEffect(() => {
    if (teamMembers.length) {
      setIsTeam(true);
    }
  }, [teamMembers.length]);
  const _onChangeTaskName = (value: any) => {
    setName(value);
  };

  const _onChangeDescription = (value: any) => {
    setDescription(value);
  };

  const _onPressModalVisible = () => {
    setIsModalVisible(!isModalVisible);
  };

  // const _onPressStartTImeVisible = () => {
  //   setIsStartTimeVisible(!isStartTimeVisible);
  // };

  // const _onPressEndTimeVisible = () => {
  //   setIsEndTimeVisible(!isEndTimeVisible);
  // };
  const _onChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  // const _onChangeStartTime = (event: any, selectedDate: any) => {
  //   const currentDate = selectedDate || startTime;
  //   setStartTime(currentDate);
  // };

  // const _onChangeEndTime = (event: any, selectedDate: any) => {
  //   const currentDate = selectedDate || endTime;
  //   setEndTIme(currentDate);
  // };

  const board = (item: any) => {
    return {
      ...styles.board,
      backgroundColor: item.color,
    };
  };
  const check = (item: any) => {
    return {
      ...styles.check,
      backgroundColor: item.isActive ? Colors.appGreen : Colors.appWhite,
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
    const param: AddTaskRequest = {
      userId: user?.id,
      name: name,
      status: boardStatus.filter((item: any) => item.isActive)[0].id,
      date: date,
      timeStart: moment(new Date()).format("LT"),
      timeEnd: moment(new Date()).format("LT"),
      members: membersLocal.filter((item: Member) => item.isActive),
      description: description,
    };
    dispatch(addTask(param));
  };

  const _onPressAdd = () => {
    dispatch(
      getTeams({
        userId: user.id,
        isAdminTeams: true,
      })
    );
    // navigation.navigate("AddMemberToTaskScreen");
  };

  const _onPressOut = () => {
    setIsTeam(false);
  };

  const _onPressTeamId = (item: TeamMemberByUserId) => {
    setIsTeam(false);
    navigation.navigate("AddMemberToTaskScreen", {
      teamId: item.teamId,
    });
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
          {membersLocal.map((item: Member) => (
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
        <AppText text={"DATE"} color={Colors.appGrayColor} />
        <TouchableOpacity
          style={styles.dateContainer}
          onPress={_onPressModalVisible}
        >
          <AppText text={moment(date).format("LL").toUpperCase()} />
          <Image
            resizeMode={"contain"}
            style={styles.icDate}
            source={Images.icDate}
          />
        </TouchableOpacity>
        {isModalVisible ? (
          <View style={styles.marginBottomSmall}>
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={"datetime"}
              // is24Hour={true}
              display="default"
              onChange={_onChangeDate}
            />
          </View>
        ) : null}

        <Divider />
      </View>
      {/* <View style={[styles.inputTask, styles.timeContainer]}>
        <View style={styles.startTimeContainer}>
          <AppText text={"START TIME"} color={Colors.appGrayColor} />
          <TouchableOpacity
            style={styles.dateContainer}
            onPress={_onPressStartTImeVisible}
          >
            <AppText text={moment(startTime).format("LT").toUpperCase()} />
            <Image
              resizeMode={"contain"}
              style={styles.icDate}
              source={Images.icDate}
            />
          </TouchableOpacity>
          {isStartTimeVisible ? (
            <View style={styles.marginBottomSmall}>
              <DateTimePicker
                testID="dateTimePicker"
                value={startTime}
                mode={"time"}
                display="default"
                onChange={_onChangeStartTime}
              />
            </View>
          ) : null}

          <Divider />
        </View>
        <View style={styles.endTimeContainer}>
          <AppText text={"END TIME"} color={Colors.appGrayColor} />
          <TouchableOpacity
            style={styles.dateContainer}
            onPress={_onPressEndTimeVisible}
          >
            <AppText text={moment(endTime).format("LT").toUpperCase()} />
            <Image
              resizeMode={"contain"}
              style={styles.icDate}
              source={Images.icDate}
            />
          </TouchableOpacity>
          {isEndTimeVisible ? (
            <View style={styles.marginBottomSmall}>
              <DateTimePicker
                testID="dateTimePicker"
                value={endTime}
                mode={"time"}
                is24Hour={true}
                display="default"
                onChange={_onChangeEndTime}
              />
            </View>
          ) : null}

          <Divider />
        </View>
      </View> */}
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
      <View style={styles.buttonDone}>
        <AppButton text={"Done"} onPress={_onPressDone} />
      </View>
      <BottomModal
        visible={isTeam}
        data={teamMembers}
        onPressOut={_onPressOut}
        onPressAdd={_onPressTeamId}
      />
    </KeyboardAwareScrollView>
  );
};

export default BoardForm;
