import React from "react";
import { AppText } from "../../../../../../components";
import { View } from "react-native";
import { Colors } from "../../../../../../themes";
import styles from "./styles";
import { SubTask } from "../../../../../../services/model/Task";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const status = {
  inProgress: 0,
  done: 1,
};
const ItemBoard = ({
  item,
  onPressItem,
}: {
  item: SubTask;
  index: number;
  onPressItem: Function;
}) => {
  const checkBox = () => {
    return {
      ...styles.checkBox,
      backgroundColor:
        item.status === status.inProgress ? Colors.appWhite : Colors.appGreen,
    };
  };

  const _onPressItem = () => {
    onPressItem(item);
  };
  return (
    <View style={styles.itemContainer}>
      <View style={styles.body}>
        <TouchableOpacity style={checkBox()} onPress={_onPressItem}>
          <Ionicons
            name="checkmark"
            size={15}
            color={Colors.appWhite}
          />
        </TouchableOpacity>

        <AppText style={styles.textName} text={item.name} />
      </View>
    </View>
  );
};
export default ItemBoard;
