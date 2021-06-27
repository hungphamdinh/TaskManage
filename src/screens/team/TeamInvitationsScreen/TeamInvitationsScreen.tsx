import React from "react";
import TeamInvitationForm from "./components/InvitationForm/TeamInvitationForm";
import { useSelector, useDispatch } from "react-redux";
import ReduxState from "../../../redux/ReduxState";
import { Background } from "../../../components";

const InvitationsScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const { user } = useSelector((state: ReduxState) => state.user);
  const { isReceiver } = route.params;
  const dispatch = useDispatch();

  return (
    <Background
      title={"Invitations"}
      navigation={navigation}
      mainComponent={
        <TeamInvitationForm
          navigation={navigation}
          isReceiver={isReceiver}
          dispatch={dispatch}
          user={user}
        />
      }
    />
  );
};

export default InvitationsScreen;
