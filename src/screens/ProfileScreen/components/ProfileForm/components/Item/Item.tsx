import React from "react";
import { AppText } from "../../../../../../components";
import { View, Image } from "react-native";
import { Colors, Fonts } from "../../../../../../themes";
import styles from "./styles";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TeamMemberByUserId } from "../../../../../../services/model/TeamMember";
const status = {
  inProgress: 0,
  done: 1,
};
const ItemBoard = ({
  item,
  onPressItem,
}: {
  item: TeamMemberByUserId;
  index: number;
  onPressItem: Function;
}) => {
  const _onPressItem = () => {
    onPressItem(item);
  };
  return (
    <View style={styles.itemContainer}>
      <View style={styles.body}>
        {item.profile !== "" ? (
          <Image style={styles.profile} source={{ uri: item.profile }} />
        ) : (
          <View style={styles.profile} />
        )}
        <AppText
          bold
          size={Fonts.size.large}
          style={styles.textName}
          text={item.teamName}
        />
      </View>
    </View>
  );
};
export default ItemBoard;
