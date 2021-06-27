import React, { useEffect, useState } from "react";
import { View, FlatList, ScrollView } from "react-native";
import styles from "./styles";
import { User } from "../../../../services/model/User";
import { useSelector } from "react-redux";
import ReceiverForm from "../../../../components/ReceiverForm/ReceiverForm";
import SenderForm from "../../../../components/SenderForm/SenderForm";
import ReduxState from "../../../../redux/ReduxState";
import { Invitation } from "../../../../services/model/Invitation";
import {
  acceptInvitation,
  clearInvitationSend,
} from "../../../../redux/team/action/teamInvitationAccept";
import {
  deleteInvitation,
  clearInvitationDelete,
} from "../../../../redux/invitation/action/invitationDelete";
import { getInvitationByUserId } from "../../../../redux/invitation/action/invitationsByUserId";
import { InvitationsType } from "../../../../helpers/Constants";
import {
  rejectInvitation,
  clearRejectInvitation,
} from "../../../../redux/team/action/teamInvitationReject";
import { getTeamInvitation, clearInvitationSend as clearTeamById, onSuccessReceiver } from "../../../../redux/team/action/teamInvitationsByUserId";
import { getTeams } from "../../../../redux/team/action/teamsMemberByUserId";
import { TeamInvitation } from "../../../../services/model/TeamMember";
const invitationType = {
  sender: "Sender",
  receiver: "Receiver",
};
const InvitationForm = ({
  dispatch,
  user,
  isReceiver,
  navigation,
}: {
  dispatch: any;
  user: User;
  isReceiver: boolean;
  navigation: any;
}) => {
  const type = {
    admin: 0,
    member: 1,
  };
  const { response } = useSelector(
    (state: ReduxState) => state.teamInvitationAccept
  );
  const { invitationsSender, invitationsReceiver } = useSelector(
    (state: ReduxState) => state.teamInvitationsByUserId
  );
  const rejectResponse = useSelector(
    (state: ReduxState) => state.teamInvitationReject.response
  );
  const deleteResponse = useSelector(
    (state: ReduxState) => state.invitationDelete.response
  );
  useEffect(() => {
    return () => {
      dispatch(clearTeamById());
      dispatch(clearInvitationSend());
      dispatch(clearInvitationDelete());
      dispatch(clearRejectInvitation());
      // dispatch(clearTeamById());
    };
  }, []);
  //Send invitation
  useEffect(() => {
    if (response) {
      dispatch(
        getTeams({
          userId: user.id,
        })
      );
      dispatch(
        getTeamInvitation({
          type: InvitationsType.receiver,
          id: user?.id,
        })
      );
      navigation.goBack();
    }
  }, [response]);


  //Refresh List and Clear Delete Response
  useEffect(() => {
    if (deleteResponse) {
      dispatch(
        getTeamInvitation({
          id: user?.id,
          type: InvitationsType.sender,
        })
      );
    }
  }, [deleteResponse, dispatch]);

  //Refresh List and Clear Reject Response
  useEffect(() => {
    if (rejectResponse) {
      dispatch(
        getInvitationByUserId({
          id: user?.id,
          type: InvitationsType.receiver,
        })
      );
    }
  }, [rejectResponse, dispatch]);
  const _onPressDetail = (item: TeamInvitation) => {
    // onNavigate(item.taskId);
    navigation.navigate('CreateTeamScreen', {
      isUpdate: true,
      teamId: item.teamId,
    })
  };
  const _keyExtractor = (item: any, index: number) => index.toString();

  const _renderItem = ({
    item,
    index,
  }: {
    item: Invitation;
    index: number;
  }) => (
    <>
      {item.type === invitationType.receiver ? (
        <ReceiverForm
          onPressDetail={_onPressDetail}
          index={index}
          item={item}
          isTeam={true}
          onPress={_onPressItem}
          onPressReject={_onPressReject}
        />
      ) : (
        <SenderForm
          isTeam={true}
          index={index}
          item={item}
          onPress={_onPressItem}
        />
      )}
    </>
  );

  //Accept or Delete Invitation
  const _onPressItem = (item: Invitation) => {
    // Type is Receiver
    item.type === invitationType.receiver
      ? dispatch(
          acceptInvitation({
            id: item.id,
            member: {
              googleUserId: user.id,
              name: user.name,
              mail: user.mail,
              role: user.role,
              profile: user.profile,
              userId: item.userId,
              memberId: user.id,
            },
          })
        )
      : //Type is sender
        dispatch(
          deleteInvitation({
            userId: user.id,
            id: item.id,
          })
        );
  };
  //Reject
  const _onPressReject = (item: Invitation) => {
    dispatch(
      rejectInvitation({
        id: item.id,
      })
    );
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.teamContainer}>
        <FlatList
          data={isReceiver ? invitationsReceiver : (invitationsSender as any)}
          renderItem={_renderItem}
          keyExtractor={_keyExtractor}
        />
      </View>
    </ScrollView>
  );
};

export default InvitationForm;
