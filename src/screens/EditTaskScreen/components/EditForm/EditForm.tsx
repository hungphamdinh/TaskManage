import React, { useState, useEffect } from "react";
import { View, Image } from "react-native";
import styles from "./styles";
import { User } from "../../../../services/model/User";
import {
  TextInputForm,
  AppText,
  AppButton,
} from "../../../../components";
import { Colors } from "../../../../themes";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { statusesDetail } from "../../../../helpers/Constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import ReduxState from "../../../../redux/ReduxState";
import { Member } from "../../../../services/model/Member";
import { updateTask, clear } from "../../../../redux/task/action/taskUpdate";
import { initialMember, clearMemberLocal } from "../../../../redux/member/action/members";
import { CommonActions } from "@react-navigation/native";

const EditForm = ({
  dispatch,
  navigation,
}: {
  dispatch: any;
  user: User;
  navigation: any;
}) => {
  const { taskDetail } = useSelector((state: ReduxState) => state.taskDetail);
  const { response } = useSelector((state: ReduxState) => state.taskUpdate);
  const { membersLocal } = useSelector((state: ReduxState) => state.members);
  const [name, setName] = useState(taskDetail.name);
  const [description, setDescription] = useState(taskDetail.description);
  const [boardStatus, setBoardStatus] = useState(
    statusesDetail.map((item: any) =>
      item.id === taskDetail.status
        ? { ...item, isActive: true }
        : { ...item, isActive: false }
    )
  );

  useEffect(() => {
    dispatch(initialMember(taskDetail.members));
  }, [])
  useEffect(() => {
    if (response) {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'HomeTabNavigation' }],
        }),
      );
      dispatch(clear());
      dispatch(clearMemberLocal());
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
      backgroundColor: item.isActive ? Colors.appGreen : Colors.appSecondaryColor,
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
    dispatch(updateTask({
      id: taskDetail.id,
      description: description,
      name: name,
      members: membersLocal.filter((item: Member) => item.isActive == true),
      status: boardStatus.filter((item: any) => item.isActive == true)[0].id,
    }))
  };

  const _onPressAdd = () => {
    navigation.navigate("AddMemberScreen");
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
    </KeyboardAwareScrollView>
  );
};

export default EditForm;
