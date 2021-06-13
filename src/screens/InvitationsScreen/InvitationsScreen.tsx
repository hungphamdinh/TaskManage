import React from "react";
import InviteForm from "./components/InvitationForm/InvitationForm";
import { useSelector, useDispatch } from "react-redux";
import ReduxState from "../../redux/ReduxState";
import { Background } from "../../components";

const InvitationsScreen = ({ navigation }: { navigation: any }) => {
  const { user } = useSelector((state: ReduxState) => state.user);
  const dispatch = useDispatch();
  const _onNavigate = () => {
    navigation.goBack();
  }
  return (
    <Background
      title={"Invitations"}
      navigation={navigation}
      mainComponent={<InviteForm onNavigate={_onNavigate} dispatch={dispatch} user={user} />}
    />
  );
};

export default InvitationsScreen;
