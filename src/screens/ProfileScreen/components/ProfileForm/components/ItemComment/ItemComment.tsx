import React from "react";
import { AppText } from "../../../../../../components";
import { View, Image } from "react-native";
import styles from "./styles";
import { Comment } from "../../../../../../services/model/Comment";
import { Fonts, Colors } from "../../../../../../themes";
import moment from "moment";
const ItemBoard = ({
  item,
  onPressItem,
}: {
  item: Comment;
  index: number;
  onPressItem: Function;
}) => {
  const { user } = item;
  return (
    <View style={styles.itemContainer}>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: user.profile }} style={styles.profile} />
          <View style={styles.contentContainer}>
            <AppText
              style={styles.textName}
              text={user.name}
              bold
              size={Fonts.size.large}
            />
            <AppText
              style={styles.textRole}
              color={Colors.overlay4}
              text={user.role}
            />
            <AppText style={styles.textName} text={item.message} />
          </View>
        </View>
        <AppText text={moment(item.timeCreated).startOf("hour").fromNow()} />
      </View>
    </View>
  );
};
export default ItemBoard;
