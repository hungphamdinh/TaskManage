import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { User } from "../../../../../services/model/User";
import {
  TextInputForm,
  AppText,
  Divider,
  AppButton,
} from "../../../../../components";
import { Colors, Images } from "../../../../../themes";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { statuses } from "../../../../../helpers/Constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { addTask, clear } from "../../../../../redux/task/action/task";
import { useSelector } from "react-redux";
import ReduxState from "../../../../../redux/ReduxState";
import { AddTaskRequest } from "../../../../../services/model/request/Task";
import {
  getMembers,
  clearMemberLocal,
} from "../../../../../redux/member/action/members";
import { Member } from "../../../../../services/model/Member";
import { CommonActions } from "@react-navigation/native";
import BottomModal from "./BottomModal";
import { getTeams } from "../../../../../redux/team/action/teamsMemberByUserId";
import { TeamMemberByUserId } from "../../../../../services/model/TeamMember";
import { onSuccess } from "../../../../../redux/team/action/teamDetail";
import { showMessage } from "react-native-flash-message";
import { strings } from "../../../../../languages";
import { useFormik } from "formik";
import * as yup from "yup";
const addFormValidationSchema = yup.object().shape({
  name: yup.string().required("Task name is Required"),
  description: yup
    .string()
    .min(
      20,
      ({ min }) =>
        `${strings.warning.at_least} ${min} ${strings.common.characters}`
    )
    .required(strings.common.description + " is " + strings.warning.required),
  date: yup.date().min(moment(new Date()).format("LL")).required(),
  isModalVisible: yup.bool(),
  boardStatus: yup.array(),
  isTeam: yup.bool(),
  teamItem: yup.object(),
});

const BoardForm = ({
  dispatch,
  user,
  navigation,
}: {
  dispatch: any;
  user: User;
  navigation: any;
}) => {
  const formik = useFormik({
    // validateOnMount: true,
    validationSchema: addFormValidationSchema,
    initialValues: {
      name: "",
      description: "",
      date: new Date(),
      isModalVisible: false,
      boardStatus: statuses,
      isTeam: false,
      teamItem: "" as any,
    },
    onSubmit: (values, errors) => _onPressDone(values, errors),
  });

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    errors,
    setFieldValue,
  } = formik;
  const {
    name,
    description,
    date,
    boardStatus,
    isTeam,
    teamItem,
    isModalVisible
  } = formik.values;

  const { members } = useSelector((state: ReduxState) => state.members);
  const { teamMembers } = useSelector(
    (state: ReduxState) => state.teamsMemberByUserId
  );
  const { response } = useSelector((state: ReduxState) => state.task);
  useEffect(() => {
    // dispatch(onSuccess([]));
    if (members.length == 0) {
      dispatch(
        getMembers({
          userId: user.id,
        })
      );
    }
    return () => {
      dispatch(clearMemberLocal());
      dispatch(clear());
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
    }
  }, [response]);

  const _onChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setFieldValue("date", currentDate);
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
      borderColor: Colors.appWhite,
      borderWidth: item.isActive ? 1 : 0,
      zIndex: item.isActive ? 1 : 0,
    };
  };

  const _onPressBoardStatus = (item: any) => {
    setFieldValue(
      "boardStatus",
      boardStatus.map((value: any) =>
        value.id === item.id
          ? { ...value, isActive: true }
          : { ...value, isActive: false }
      )
    );
  };

  const _onPressDone = (values: any, errors: any) => {
    if (
      errors.name ||
      errors.description ||
      errors.date ||
      members.filter((item: Member) => item.isActive).length == 0
    ) {
      showMessage({
        message: strings.warning.not_full_fill,
        description: "Please check your information",
        type: "warning",
      });
    } else {
      const param: AddTaskRequest = {
        userId: user?.id,
        name: values.name,
        status: values.boardStatus.filter((item: any) => item.isActive)[0].id,
        date:values. date,
        timeStart: moment(new Date()).format("LT"),
        timeEnd: moment(new Date()).format("LT"),
        members: values.members.filter((item: Member) => item.isActive),
        description: values.description,
      };
      dispatch(addTask(param));
    }
  };

  const _onPressAdd = () => {
    dispatch(
      getTeams({
        userId: user.id,
        isAdminTeams: true,
      })
    );
    setFieldValue("isTeam", true);
  };

  const _onPressOut = () => {
    setFieldValue("isTeam", false);
  };

  const _onPressTeamId = (item: TeamMemberByUserId) => {
    setFieldValue("isTeam", false);
    navigation.navigate("AddMemberToTaskScreen", {
      teamId: item.teamId,
    });
    if (teamItem?.teamId !== item.teamId) {
      setFieldValue("teamItem", item);
      dispatch(clearMemberLocal());
      dispatch(onSuccess(undefined as any)); //clear Team Detail
    }
  };
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.inputTask}>
        <TextInputForm
          label={"Task name".toUpperCase()}
          onChangeText={handleChange("name")}
          onBlur={handleBlur("name")}
          value={name}
        />
        {errors.name && touched.name && (
          <AppText color={Colors.appColor} text={errors.name} />
        )}
        <View style={styles.inputTask}>
          <TextInputForm
            label={"Description".toUpperCase()}
            onBlur={handleBlur("description")}
            onChangeText={handleChange("description")}
            value={description}
          />
        </View>
        {errors.description && touched.description && (
          <AppText color={Colors.appColor} text={errors.description} />
        )}
        <View style={styles.inputTask}>
          <AppText text={"TEAM MEMBER"} color={Colors.appGrayColor} />
          <View style={styles.teamContainer}>
            {members.map((item: Member) => (
              <>
                {item.isActive ? (
                  <View key={item.userId} style={styles.imageMember}>
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
            onPress={() =>
              setFieldValue("isModalVisible", !isModalVisible)
            }
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
          <View style={styles.marginBottomSmall}>
            <Divider />
          </View>
          {errors.date && (
            <AppText text={errors.date} color={Colors.appColor} />
          )}
        </View>
        <View style={styles.inputTask}>
          <AppText text={"BOARD"} color={Colors.appGrayColor} />
          <View style={styles.boardContainer}>
            {boardStatus.map((item: any) => (
              <>
                <View key={item.id} style={styles.boardView}>
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
      </View>
      <View style={styles.buttonDone}>
        <AppButton text={"Done"} onPress={handleSubmit} />
      </View>
      <BottomModal
        visible={isTeam}
        data={teamMembers}
        setFieldValues={setFieldValue}
        onPressOut={_onPressOut}
        onPressAdd={_onPressTeamId}
      />
    </KeyboardAwareScrollView>
  );
};

export default BoardForm;
