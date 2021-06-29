import React, { useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { AppText, Divider, AlertDialog } from "../index";
import { Colors, Fonts } from "../../themes";
import { invitationStatus } from "../../helpers/Constants";
import { Ionicons } from "@expo/vector-icons";
import { strings } from "../../languages";

const Item = ({
  item,
  index,
  isTeam,
  onPress,
}: {
  item: any;
  index: number;
  isTeam?: boolean;
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
    };
  };

  const infoContainer = () => {
    return {
      ...styles.infoContainer,
      flexDirection: isTeam ? "row" : "column",
      alignItems: isTeam ? "center" : null,
    } as any;
  };
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

          <View style={infoContainer()}>
            {isTeam ? (
              <>
                <Image
                  source={{ uri: item.member.profile }}
                  style={styles.profileImage}
                />
                <View>
                  <AppText
                    style={styles.marginLeftSmall}
                    text={item.member.name}
                    bold
                  />
                  <AppText
                    style={[styles.marginTopSmall, styles.marginLeftSmall]}
                    text={item.member.mail}
                    color={Colors.appGrayColor}
                  />
                </View>
              </>
            ) : (
              <>
                <AppText text={item.taskId} bold size={Fonts.size.large} />
                <AppText
                  style={styles.marginTopSmall}
                  text={item.receiverName}
                  color={Colors.appGrayColor}
                />
              </>
            )}
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
