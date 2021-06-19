import React, { useEffect } from "react";
import { View, FlatList, ScrollView } from "react-native";
import styles from "./styles";
import { User } from "../../../../services/model/User";
import { useSelector } from "react-redux";
import ReceiverForm from "./components/ReceiverForm/ReceiverForm";
import SenderForm from "./components/SenderForm/SenderForm";
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
const invitationType = {
  sender: "Sender",
  receiver: "Receiver",
};
const AddForm = ({
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
  const { invitationsSender, invitationsReceiver } = useSelector(
    (state: ReduxState) => state.invitationsByUserId
  );
  const deleteResponse = useSelector(
    (state: ReduxState) => state.invitationDelete.response
  );

  useEffect(() => {
    if (response) {
      onNavigate();
    }
    return () => {
      dispatch(clearInvitationSend());
    };
  }, [response]);

  useEffect(() => {
    if (deleteResponse) {
      dispatch(
        getInvitationByUserId({
          id: user?.id,
          type: InvitationsType.sender,
        })
      );
      dispatch(clearInvitationDelete());
    }
  }, []);

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
        />
      ) : (
        <SenderForm index={index} item={item} onPress={_onPressItem} />
      )}
    </>
  );

  const _onPressItem = (item: Invitation) => {
    item.type === invitationType.receiver
      ? dispatch(
          acceptInvitation({
            id: item.id,
            userId: user?.id,
            taskId: item.taskId,
          })
        )
      : dispatch(
          deleteInvitation({
            userId: user.id,
            id: item.id,
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

export default AddForm;
