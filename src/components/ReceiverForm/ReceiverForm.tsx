import React, { useState } from "react";
import { View, PanResponder } from "react-native";
import styles from "./styles";
import { AppText, AlertDialog } from "../../components";
import { Colors, Fonts } from "../../themes";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Invitation } from "../../services/model/Invitation";
import { strings } from "../../languages";

const Item = ({
  item,
  index,
  onPress,
  onPressDetail,
  onPressReject,
  isTeam = false,
}: {
  item: any;
  index: number;
  onPress: Function;
  onPressDetail: Function;
  onPressReject: Function;
  isTeam?: boolean;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isShowDialog, setIsShowDialog] = useState(false);
  const _onPressAccept = () => {
    onPress(item, index);
  };

  const infoContainer = () => {
    return {
      ...styles.infoContainer,
      flex: isVisible ? 0.65 : 1,
    };
  };
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

  const _onPressDetail = () => {
    onPressDetail(item);
  };

  const _onPressReject = () => {
    onPressReject(item);
    changeModalVisible();
  };

  const changeModalVisible = () => {
    setIsShowDialog(!isShowDialog);
  };
  return (
    <View {...panResponder.panHandlers} style={styles.itemContainer}>
      <View style={styles.mainContainer}>
        <View style={infoContainer()}>
          <AppText
            text={isTeam ? item.teamId : item.taskId}
            bold
            size={Fonts.size.large}
          />
          <AppText
            style={styles.marginTopSmall}
            text={item.content}
            color={Colors.appGrayColor}
          />
          <TouchableOpacity onPress={_onPressDetail}>
            <AppText
              style={styles.marginTopSmall}
              color={Colors.appBlue}
              text={strings.invite_member_screen.view_detail}
            />
          </TouchableOpacity>
        </View>
        {isVisible ? (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonAccept}
              onPress={_onPressAccept}
            >
              <AppText color={Colors.appWhite} text={"Accept"} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonCancel}
              onPress={changeModalVisible}
            >
              <AppText color={Colors.appWhite} text={"Cancel"} />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
      <AlertDialog
        visible={isShowDialog}
        title={strings.alert.notify}
        content={strings.invite_member_screen.delete}
        textBtnAccept={strings.alert.accept}
        textBtnOut={strings.alert.cancel}
        onPressButtonLeft={changeModalVisible}
        onPressOut={changeModalVisible}
        onPressSubmit={_onPressReject}
      />
    </View>
  );
};
export default Item;
