import React, { useEffect } from "react";
import TaskDetail from "./components/TaskDetail/TaskDetail";
import { useSelector, useDispatch } from "react-redux";
import ReduxState from "../../redux/ReduxState";
import { Background } from "../../components";
import { getTaskDetail } from "../../redux/task/action/taskDetail";
import { getSubTask } from "../../redux/task/action/subTasks";
import { getComments } from "../../redux/comment/action/comments";
const BoardScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const { user } = useSelector((state: ReduxState) => state.user);
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
  return (
    <Background
      navigation={navigation}
      title={"Task Detail"}
      mainComponent={<TaskDetail dispatch={dispatch} user={user} />}
    />
  );
};

export default BoardScreen;
