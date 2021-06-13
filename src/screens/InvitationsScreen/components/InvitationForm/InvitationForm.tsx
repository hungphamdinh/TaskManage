import React, { useState, useEffect } from "react";
import { View, PanResponder } from "react-native";
import styles from "./styles";
import { User } from "../../../../services/model/User";
import { AppText } from "../../../../components";
import { Colors, Fonts } from "../../../../themes";
import {
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import ReduxState from "../../../../redux/ReduxState";
import { Invitation } from "../../../../services/model/Invitation";
import { acceptInvitation, clearInvitationSend } from "../../../../redux/invitation/action/invitationAccept";

const AddForm = ({
  dispatch,
  user,
  onNavigate,
}: {
  dispatch: any;
  user: User;
  onNavigate: Function;
}) => {
  const { response } = useSelector((state: ReduxState) => state.invitationAccept);
  const { invitations } = useSelector(
    (state: ReduxState) => state.invitationsByUserId
  );
  useEffect(() => {
    if (response) {
      onNavigate();
    }
    return () => {
      dispatch(clearInvitationSend());
    }
  }, [response]);

  const _keyExtractor = (item: any, index: number) => index.toString();

  const _renderItem = ({
    item,
    index,
  }: {
    item: Invitation;
    index: number;
  }) => <Item index={index} item={item} onPress={_onPressItem} />;

  const _onPressItem = (item: Invitation) => {
    dispatch(acceptInvitation({
      id: item.id,
      userId: user?.id,
    }))
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.teamContainer}>
        <FlatList
          data={invitations}
          renderItem={_renderItem}
          keyExtractor={_keyExtractor}
        />
      </View>
    </ScrollView>
  );
};

export default AddForm;

const Item = ({
  item,
  index,
  onPress,
}: {
  item: Invitation;
  index: number;
  onPress: Function;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const _onPressAccept = () => {
    onPress(item, index);
  };


  const infoContainer = () => {
    return {
      ...styles.infoContainer,
      flex: isVisible ? 0.65 : 1,
    }
  }
  const recognizeDrag = ({
    dx,
  }: {
    moveX: any;
    moveY: any;
    dx: any;
    dy: any;
  }) => {
    if (dx < -100) return true; //left to right
    return false;
  };
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => {
      return true;
    },
    onPanResponderEnd: (e, gestureState) => {
      if (recognizeDrag(gestureState)) {
        setIsVisible(true);
      }
      return true;
    },
  });
  return (
    <View {...panResponder.panHandlers} style={styles.itemContainer}>
      <View style={styles.mainContainer}>
        <View style={infoContainer()}>
          <AppText text={item.taskId} bold size={Fonts.size.large} />
          <AppText
            style={styles.marginTopSmall}
            text={item.content}
            color={Colors.appGrayColor}
          />
        </View>
        {isVisible ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonAccept} onPress={_onPressAccept}>
              <AppText color={Colors.appWhite} text={"Accept"} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCancel}>
              <AppText color={Colors.appWhite} text={"Cancel"} />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
};
