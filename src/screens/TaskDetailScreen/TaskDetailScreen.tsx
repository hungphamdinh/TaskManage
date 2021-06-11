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
import { Colors, Metrics } from "../../themes";
const dropdownData = [
  {
    id: 0,
    name: "Invite member",
  },
  {
    id: 1,
    name: "Edit task",
  },
  {
    id: 2,
    name: "History",
  },
  {
    id: 3,
    name: "Share link",
  },
  {
    id: 4,
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

  const _onPressShowDropdown = () => {
    setIsShowModal(!isShowModal);
  };

  const _onPressItem = (item: any) => {
    console.log(item);
    if (item.id == 0) {
      navigation.navigate("InviteMemberScreen");
    } else {
      navigation.navigate("EditTaskScreen", {
        taskId,
      });
    }
    _onPressShowDropdown();
  };
  return (
    <>
      <Background
        navigation={navigation}
        title={"Task Detail"}
        mainComponent={<TaskDetail dispatch={dispatch} user={user} />}
        secondaryComponent={
          <TouchableOpacity
            style={styles.buttonSetting}
            onPress={_onPressShowDropdown}
          >
            <View style={styles.circle} />
            <View style={styles.circle} />
            <View style={styles.circle} />
          </TouchableOpacity>
        }
      />
      {isShowModal ? (
        <View style={styles.dropdown}>
          {dropdownData.map((item) => (
            <TouchableOpacity
              onPress={() => _onPressItem(item)}
              style={styles.buttonItem}
              key={item.id.toString()}
            >
              <AppText color={Colors.overlay5} text={item.name} />
            </TouchableOpacity>
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
});
