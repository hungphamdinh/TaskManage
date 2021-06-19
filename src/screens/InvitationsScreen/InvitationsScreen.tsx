import React from "react";
import InviteForm from "./components/InvitationForm/InvitationForm";
import { useSelector, useDispatch } from "react-redux";
import ReduxState from "../../redux/ReduxState";
import { Background } from "../../components";

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
  const _onNavigate = (id: string) => {
    if (id) {
      navigation.navigate("TaskDetailScreen", {
        taskId: id,
      });
    } else {
      navigation.goBack();
    }
  };

  return (
    <Background
      title={"Invitations"}
      navigation={navigation}
      mainComponent={
        <InviteForm
          isReceiver={isReceiver}
          onNavigate={_onNavigate}
          dispatch={dispatch}
          user={user}
        />
      }
    />
  );
};

export default InvitationsScreen;
