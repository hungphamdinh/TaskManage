import React from "react";
import RecursiveContainer from "./components/AddForm/AddForm";
import { useSelector, useDispatch } from "react-redux";
import ReduxState from "../../../redux/ReduxState";
import { Background } from "../../../components";

const BoardScreen = ({ navigation }: { navigation: any }) => {
  const { user } = useSelector((state: ReduxState) => state.user);
  const dispatch = useDispatch();

  return (
    <Background
      navigation={navigation}
      title={"Add Task"}
      mainComponent={
        <RecursiveContainer
          navigation={navigation}
          dispatch={dispatch}
          user={user}
        />
      }
    />
  );
};

export default BoardScreen;
