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

  const { teamDetail } = useSelector((state: ReduxState) => state.teamDetail);
  const dispatch = useDispatch();
  const isTeamMember = route.params?.isTeamMember;
  const isInvite = route.params?.isInvite;


  return (
    <Background
      title={strings.add_member_screen.title}
      navigation={navigation}
      mainComponent={
        <AddForm
          isTeamMember={isTeamMember}
          isInvite={isInvite}
          navigation={navigation}
          dispatch={dispatch}
          user={user}
          teamDetail={teamDetail}
        />
      }
    />
  );
};

export default AddMemberScreen;
