import React, { useEffect } from "react";
import AddForm from "./components/AddForm/AddForm";
import { useSelector, useDispatch } from "react-redux";
import ReduxState from "../../redux/ReduxState";
import { Background } from "../../components";
import { strings } from "../../languages";
import {
  inviteTeamMember,
  clearTeamMember,
} from "../../redux/team/action/teamMemberInvite";
import { TeamMember } from "../../services/model/request/TeamMember";
import { User } from "../../services/model/User";

const AddMemberScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const { user } = useSelector((state: ReduxState) => state.user);
  const { response } = useSelector(
    (state: ReduxState) => state.teamMemberInvite
  );
  const { teamDetail } = useSelector((state: ReduxState) => state.teamDetail);
  const dispatch = useDispatch();
  const isTeamMember = route.params?.isTeamMember;
  const isInvite = route.params?.isInvite;

  useEffect(() => {
    if (response) {
      navigation.goBack();
      dispatch(clearTeamMember());
    }
  }, [response]);
  const _onNavigate = (arr: Array<User>) => {
    if (isInvite) {
      let data = [] as Array<TeamMember>;
      arr.map((item: User) => {
        if (item.isActive && !item.isDisable) {
          data.push({
            googleUserId: item.googleUserId,
            name: item.name,
            mail: item.mail,
            role: item.role,
            profile: item.profile,
            userId: user.id,
            memberId: item.id,
          });
        }
      });
      dispatch(
        inviteTeamMember({
          members: data,
          userId: user.id,
          teamName: teamDetail.teamName,
          teamId: teamDetail.teamId,
        })
      );
    } else {
      navigation.goBack();
    }
  };
  return (
    <Background
      title={strings.add_member_screen.title}
      navigation={navigation}
      mainComponent={
        <AddForm
          isTeamMember={isTeamMember}
          isInvite={isInvite}
          onNavigate={_onNavigate}
          dispatch={dispatch}
          user={user}
          teamDetail={teamDetail}
        />
      }
    />
  );
};

export default AddMemberScreen;
