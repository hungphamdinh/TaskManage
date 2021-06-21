import React from "react";
import ProfileForm from "./components/ProfileForm/CreatTeamForm";
import { useSelector, useDispatch } from "react-redux";
import ReduxState from "../../redux/ReduxState";
import { Background } from "../../components";
import { strings } from "../../languages";

const BoardScreen = ({ navigation }: { navigation: any }) => {
  const { user } = useSelector((state: ReduxState) => state.user);
  const dispatch = useDispatch();

  return (
    <Background
      navigation={navigation}
      title={strings.create_team_screen.title}
      mainComponent={
        <ProfileForm
          navigation={navigation}
          dispatch={dispatch}
          user={user}
        />
      }
    />
  );
};

export default BoardScreen;
