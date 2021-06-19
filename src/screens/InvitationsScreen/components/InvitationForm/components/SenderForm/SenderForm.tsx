import React, { useState } from "react";
import { View } from "react-native";
import styles from "./styles";
import { AppText, Divider, AlertDialog } from "../../../../../../components";
import { Colors, Fonts } from "../../../../../../themes";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Invitation } from "../../../../../../services/model/Invitation";
import { invitationStatus } from "../../../../../../helpers/Constants";
import { Ionicons } from "@expo/vector-icons";
import { strings } from "../../../../../../languages";

const Item = ({
  item,
  index,
  onPress,
}: {
  item: Invitation;
  index: number;
  onPress: Function;
}) => {
  const [isShowDialog, setIsShowDialog] = useState(false);
  let color = "";
  let name = "";
  switch (item.status) {
    case invitationStatus.pending:
      color = Colors.appYellow;
      name = "Pending";
      break;
    case invitationStatus.accepted:
      color = Colors.appGreen;
      name = "Accept";
      break;
    case invitationStatus.rejected:
      color = Colors.appColor;
      name = "Rejected";
      break;

    default:
      break;
  }
  const _onPressDelete = () => {
    onPress(item, index);
    changeModalVisible();
  };

  const changeModalVisible = () => {
    setIsShowDialog(!isShowDialog);
  };

  const verticalBar = () => {
    return {
      ...styles.verticalBar,
      backgroundColor: color,
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText text={name} color={color} />
        <TouchableOpacity onPress={changeModalVisible}>
          <Ionicons
            name="close-outline"
            size={20}
            color={Colors.appGrayColor}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.divider}>
        <Divider />
      </View>
      <View style={styles.itemContainer}>
        <View style={styles.mainContainer}>
          <View style={verticalBar()} />

          <View style={styles.infoContainer}>
            <AppText text={item.taskId} bold size={Fonts.size.large} />
            <AppText
              style={styles.marginTopSmall}
              text={item.receiverName}
              color={Colors.appGrayColor}
            />
          </View>
        </View>
      </View>
      <AlertDialog
        visible={isShowDialog}
        title={strings.alert.notify}
        content={strings.invite_member_screen.delete}
        textBtnAccept={strings.alert.accept}
        textBtnOut={strings.alert.cancel}
        onPressButtonLeft={changeModalVisible}
        onPressOut={changeModalVisible}
        onPressSubmit={_onPressDelete}
      />
    </View>
  );
};
export default Item;
