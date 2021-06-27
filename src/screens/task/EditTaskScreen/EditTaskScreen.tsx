import React from "react";
import EditForm from "./components/EditForm/EditForm";
import { useSelector, useDispatch } from "react-redux";
import ReduxState from "../../../redux/ReduxState";
import { Background } from "../../../components";

const EditTaskScreen = ({ navigation }: { navigation: any }) => {
  const { user } = useSelector((state: ReduxState) => state.user);
  const dispatch = useDispatch();

  return (
    <Background
      navigation={navigation}
      title={"Edit Task"}
      mainComponent={
        <EditForm
          navigation={navigation}
          dispatch={dispatch}
          user={user}
        />
      }
    />
  );
};

export default EditTaskScreen;
