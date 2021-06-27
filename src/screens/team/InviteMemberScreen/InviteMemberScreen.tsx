import React from "react";
import InviteForm from "./components/InviteForm/InviteForm";
import { useSelector, useDispatch } from "react-redux";
import ReduxState from "../../../redux/ReduxState";
import { Background } from "../../../components";
import { strings } from "../../../languages";

const InviteMemberScreen = ({ navigation }: { navigation: any }) => {
  const { user } = useSelector((state: ReduxState) => state.user);
  const dispatch = useDispatch();
  const _onNavigate = () => {
    navigation.goBack();
  };
  return (
    <Background
      title={strings.invite_member_screen.title}
      navigation={navigation}
      mainComponent={
        <InviteForm onNavigate={_onNavigate} dispatch={dispatch} user={user} />
      }
    />
  );
};

export default InviteMemberScreen;
