import React from "react";
import AddForm from "./components/AddForm/AddForm";
import { useSelector, useDispatch } from "react-redux";
import ReduxState from "../../../redux/ReduxState";
import { Background } from "../../../components";
import { strings } from "../../../languages";

const AddMemberScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const { user } = useSelector((state: ReduxState) => state.user);
  const teamId = route.params.teamId;
  const isEditTask = route.params.isEditTask;
  const dispatch = useDispatch();


  return (
    <Background
      title={strings.add_member_screen.title}
      navigation={navigation}
      mainComponent={
        <AddForm
          navigation={navigation}
          isEditTask={isEditTask}
          teamId={teamId}
          dispatch={dispatch}
          user={user}
        />
      }
    />
  );
};

export default AddMemberScreen;
