import React, { useMemo } from "react";
import { AppText } from "../../../../../../../components";
import { View, Image } from "react-native";
import { Colors, Fonts } from "../../../../../../../themes";
import styles from "./styles";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TeamMemberByUserId } from "../../../../../../../services/model/TeamMember";
const status = {
  inProgress: 0,
  done: 1,
};
const ItemBoard = ({
  item,
  onPressItem,
  onPressDetail,
}: {
  item: TeamMemberByUserId;
  index: number;
  onPressItem: Function;
  onPressDetail: Function;
}) => {
  return useMemo(() => {
    const _onPressItem = () => {
      onPressItem(item);
    };

    const _onPressDetail = () => {
      onPressDetail(item);
    };
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={_onPressDetail}>
        <View style={styles.body}>
          <View style={styles.infoContainer}>
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
          {item.isAdmin ? (
            <TouchableOpacity onPress={_onPressItem}>
              <Ionicons
                name="mail-unread-outline"
                size={20}
                color={Colors.overlay4}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  }, [item, onPressItem, onPressDetail]);
};
export default ItemBoard;
