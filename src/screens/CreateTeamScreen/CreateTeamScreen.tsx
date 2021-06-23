import React, { useEffect } from "react";
import ProfileForm from "./components/ProfileForm/CreatTeamForm";
import { useSelector, useDispatch } from "react-redux";
import ReduxState from "../../redux/ReduxState";
import { Background } from "../../components";
import { strings } from "../../languages";
import { getTeamDetail } from "../../redux/team/action/teamDetail";

const CreateTeamScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const { user } = useSelector((state: ReduxState) => state.user);
  const dispatch = useDispatch();
  const isUpdate = route.params?.isUpdate;
  const teamId = route.params?.teamId;
  useEffect(() => {
    if (teamId) {
      dispatch(
        getTeamDetail({
          id: teamId,
          userId: user?.id,
        })
      );
    }
  }, [teamId]);
  return (
    <Background
      navigation={navigation}
      title={
        isUpdate
          ? strings.create_team_screen.title_detail
          : strings.create_team_screen.title
      }
      mainComponent={
        <ProfileForm
          isUpdate={isUpdate}
          navigation={navigation}
          dispatch={dispatch}
          user={user}
        />
      }
    />
  );
};

export default CreateTeamScreen;
