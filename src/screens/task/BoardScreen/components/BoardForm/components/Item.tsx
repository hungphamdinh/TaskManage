import React from "react";
import { Divider, AppText } from "../../../../../../components";
import { View, Image } from "react-native";
import { Fonts, Colors, Metrics, Images } from "../../../../../../themes";
import styles from "./styles";
import { Task } from "../../../../../../services/model/Task";
import { statusType } from "../../../../../../helpers/Constants";
import moment from "moment";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import ReduxState from "../../../../../../redux/ReduxState";

const ItemBoard = ({
  item,
  onPressItem,
}: {
  item: Task;
  onPressItem: Function;
}) => {
  const { user } = useSelector((state: ReduxState) => state.user);
  let status = "";
  let color = "";
  switch (item.status) {
    case statusType.urgent:
      status = "Urgent";
      color = Colors.sponsoredColor;
      break;

    case statusType.running:
      status = "Running";
      color = Colors.appGreen;
      break;

    // case statusType.ongoing:
    //   status = "Onggoing";
    //   color = Colors.appPrimaryColor;
    //   break;

    case statusType.done:
      status = "Done";
      color = Colors.appBlue;
      break;
    default:
      break;
  }
  const itemBody = () => {
    return {
      ...styles.itemBody,
      borderLeftColor: color,
      marginBottom: Metrics.margin.very_huge,
    };
  };
  const _onPressItem = () => {
    onPressItem(item);
  };
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={_onPressItem}>
      <View style={styles.sideHeader}>
        <AppText color={color} text={status.toUpperCase()} />
        {item.userId === user?.id ? (
          <Ionicons name="star-half-outline" size={15} color={color} />
        ) : null}
      </View>
      <View style={styles.marginVertical}>
        <Divider />
      </View>
      <View style={itemBody()}>
        <AppText
          style={styles.taskName}
          text={item.name}
          bold
          size={Fonts.size.h6}
        />

        <AppText
          color={Colors.overlay3}
          style={styles.textDescription}
          text={
            item.description.length > 100
              ? item.description.substring(0, 100) + "..."
              : item.description
          }
        />
      </View>
      <View style={styles.itemFooter}>
        <View style={styles.timeContainer}>
          <Image
            source={Images.icTime}
            resizeMode={"contain"}
            style={styles.iconTime}
          />
          <AppText
            style={styles.textTime}
            text={moment(item.date).format("LL")}
          />
        </View>
        <View style={styles.memberContainer}>
          <Image
            source={Images.icUser}
            resizeMode={"contain"}
            style={styles.iconUser}
          />
          <AppText
            style={styles.textTime}
            text={`${item.members.length - 1} Persons`}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default ItemBoard;
