import React, { useEffect, useState } from "react";
import TaskDetail from "./components/TaskDetail/TaskDetail";
import { useSelector, useDispatch } from "react-redux";
import ReduxState from "../../redux/ReduxState";
import { Background, AppText } from "../../components";
import { getTaskDetail } from "../../redux/task/action/taskDetail";
import { getSubTask } from "../../redux/task/action/subTasks";
import { getComments } from "../../redux/comment/action/comments";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Metrics } from "../../themes";
import { leaveTask, clear } from "../../redux/task/action/taskLeave";
import { CommonActions } from "@react-navigation/native";
import { getInvitationByUserId } from "../../redux/invitation/action/invitationsByUserId";
import { InvitationsType } from "../../helpers/Constants";
const itemId = {
  invite: 0,
  edit: 1,
  history: 2,
  share: 3,
  leave: 4,
};
const dropdownData = [
  {
    id: itemId.invite,
    name: "Invite member",
  },
  {
    id: itemId.edit,
    name: "Edit task",
  },
  {
    id: itemId.history,
    name: "History",
  },
  {
    id: itemId.share,
    name: "Share link",
  },
  {
    id: itemId.leave,
    name: "Leave from task",
  },
];
const TaskDetailScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const { user } = useSelector((state: ReduxState) => state.user);
  const [isShowModal, setIsShowModal] = useState(false);
  const { taskDetail } = useSelector((state: ReduxState) => state.taskDetail);
  const { response } = useSelector((state: ReduxState) => state.taskLeave);
  const dispatch = useDispatch();
  const { taskId } = route.params;
  useEffect(() => {
    dispatch(
      getTaskDetail({
        userId: user?.id,
        id: taskId,
      })
    );
    dispatch(
      getComments({
        taskId: taskId,
      })
    );
    dispatch(
      getSubTask({
        id: taskId,
      })
    );
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
  const _onPressShowDropdown = () => {
    setIsShowModal(!isShowModal);
  };

  const _onPressItem = (item: any) => {
    if (item.id == itemId.invite) {
      navigation.navigate("InviteMemberScreen");
    } else if (item.id == itemId.edit) {
      navigation.navigate("EditTaskScreen", {
        taskId,
      });
    } else if (item.id === itemId.leave) {
      dispatch(
        leaveTask({
          userId: user?.id,
          taskId: taskDetail?.id,
        })
      );
    }
    _onPressShowDropdown();
  };

  const _onPressInvitation = () => {
    dispatch(
      getInvitationByUserId({
        type: InvitationsType.sender,
        id: user.id,
        taskId: taskDetail.id,
      })
    );
    navigation.navigate("InvitationsScreen", {
      isReceiver: false,
    });
  };
  return (
    <>
      <Background
        navigation={navigation}
        title={"Task Detail"}
        mainComponent={<TaskDetail dispatch={dispatch} user={user} />}
        secondaryComponent={
          <View style={styles.secondaryComponent}>
            {taskDetail?.isAdmin ? (
              <TouchableOpacity
                style={styles.buttonInvitation}
                onPress={_onPressInvitation}
              >
                <Ionicons
                  name="mail-unread-outline"
                  size={20}
                  color={Colors.appWhite}
                />
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              style={styles.buttonSetting}
              onPress={_onPressShowDropdown}
            >
              <View style={styles.circle} />
              <View style={styles.circle} />
              <View style={styles.circle} />
            </TouchableOpacity>
          </View>
        }
      />
      {isShowModal ? (
        <View style={styles.dropdown}>
          {dropdownData.map((item) => (
            <>
              {taskDetail?.isAdmin ? (
                <>
                  {item.id < itemId.leave ? (
                    <TouchableOpacity
                      onPress={() => _onPressItem(item)}
                      style={styles.buttonItem}
                      key={item.id.toString()}
                    >
                      <AppText color={Colors.overlay5} text={item.name} />
                    </TouchableOpacity>
                  ) : null}
                </>
              ) : (
                <>
                  {item.id > itemId.edit ? (
                    <TouchableOpacity
                      onPress={() => _onPressItem(item)}
                      style={styles.buttonItem}
                      key={item.id.toString()}
                    >
                      <AppText color={Colors.overlay5} text={item.name} />
                    </TouchableOpacity>
                  ) : null}
                </>
              )}
            </>
          ))}
        </View>
      ) : null}
    </>
  );
};

export default TaskDetailScreen;
const styles = StyleSheet.create({
  circle: {
    width: 4,
    height: 4,
    borderRadius: Metrics.borderRadius.large,
    backgroundColor: Colors.appWhite,
    marginTop: Metrics.margin.tiny,
  },
  dropdown: {
    backgroundColor: Colors.appWhite,
    paddingHorizontal: Metrics.margin.very_huge,
    paddingVertical: Metrics.margin.regular,
    position: "absolute",
    right: 30,
    top: 70,
    borderRadius: Metrics.borderRadius.regular,
  },
  buttonSetting: {
    marginRight: Metrics.margin.small,
    width: 10,
  },
  buttonItem: {
    marginVertical: Metrics.margin.regular,
  },
  secondaryComponent: {
    flexDirection: "row",
  },
  buttonInvitation: {
    marginRight: Metrics.margin.large,
  },
});
