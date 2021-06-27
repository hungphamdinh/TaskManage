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
} from "../../../../redux/invitation/action/invitationAccept";
import {
  deleteInvitation,
  clearInvitationDelete,
} from "../../../../redux/invitation/action/invitationDelete";
import { getInvitationByUserId } from "../../../../redux/invitation/action/invitationsByUserId";
import { InvitationsType } from "../../../../helpers/Constants";
import {
  rejectInvitation,
  clearRejectInvitation,
} from "../../../../redux/invitation/action/invitationReject";
const invitationType = {
  sender: "Sender",
  receiver: "Receiver",
};
const InvitationForm = ({
  dispatch,
  user,
  onNavigate,
  isReceiver,
}: {
  dispatch: any;
  user: User;
  onNavigate: Function;
  isReceiver: boolean;
}) => {
  const { response } = useSelector(
    (state: ReduxState) => state.invitationAccept
  );
  const { taskDetail } = useSelector((state: ReduxState) => state.taskDetail);
  const { invitationsSender, invitationsReceiver } = useSelector(
    (state: ReduxState) => state.invitationsByUserId
  );
  const rejectResponse = useSelector(
    (state: ReduxState) => state.invitationReject.response
  );
  const deleteResponse = useSelector(
    (state: ReduxState) => state.invitationDelete.response
  );
  useEffect(() => {
    return () => {
      dispatch(clearInvitationSend());
      dispatch(clearInvitationDelete());
      dispatch(clearRejectInvitation());
    }
  }, [])

  //Send invitation
  useEffect(() => {
    if (response) {
      dispatch(getInvitationByUserId({
        id: user?.id,
        type: 0,
      }))
    }
  }, [response]);

  //Refresh List and Clear Delete Response
  useEffect(() => {
    if (deleteResponse) {
      dispatch(
        getInvitationByUserId({
          id: user?.id,
          type: InvitationsType.sender,
          taskId: taskDetail.id,
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
  const _onPressDetail = (item: Invitation) => {
    onNavigate(item.taskId);
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
          onPress={_onPressItem}
          onPressReject={_onPressReject}
        />
      ) : (
        <SenderForm index={index} item={item} onPress={_onPressItem} />
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
            userId: user?.id,
            taskId: item.taskId,
          })
        )
      //Type is sender
      : dispatch(
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
        userId: item.receiverId,
      })
    );
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.teamContainer}>
        <FlatList
          data={isReceiver ? invitationsReceiver : invitationsSender}
          renderItem={_renderItem}
          keyExtractor={_keyExtractor}
        />
      </View>
    </ScrollView>
  );
};

export default InvitationForm;
