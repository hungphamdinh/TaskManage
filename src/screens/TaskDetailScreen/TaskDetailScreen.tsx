import React, { useEffect } from "react";
import RecursiveContainer from "./components/TaskDetail/TaskDetail";
import { StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ReduxState from "../../redux/ReduxState";
import { Colors } from "../../themes";
import { Background } from "../../components";
import { getTaskDetail } from "../../redux/task/action/taskDetail";
const BoardScreen = ({ navigation, route }: { navigation: any; route: any }) => {
  const { user } = useSelector((state: ReduxState) => state.user);
  const dispatch = useDispatch();
  console.log(route.params);
  useEffect(() => {
    dispatch(getTaskDetail({
      userId: user?.id,
      id: route.params.taskId,
    }))
  }, [])
  return (
    <Background
      navigation={navigation}
      title={"Task Detail"}
      mainComponent={
        <RecursiveContainer
          dispatch={dispatch}
          user={user}
        />
      }
    />
  );
};

export default BoardScreen;


