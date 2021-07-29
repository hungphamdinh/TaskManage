import React, { useState } from "react";
import { View, TouchableOpacity, Image, FlatList } from "react-native";
import styles from "./styles";
import { Colors, Fonts } from "../../../../../../themes";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";
import { AppText } from "../../../../../../components";
import { Scale } from "../../../../../../utilities/Utils";
import { strings } from "../../../../../../languages";
import { TeamMemberByUserId } from "../../../../../../services/model/TeamMember";

export default ({
  visible = false,
  onPressOut = () => {},
  onPressAdd,
  data,
  setFieldValues,
}: {
  visible: boolean;
  onPressOut: Function;
  onPressAdd: Function;
  data: Array<TeamMemberByUserId>;
  setFieldValues: any;
}) => {
  const _onPressOut = () => {
    onPressOut();
  };

  const _onPressItem = (item: TeamMemberByUserId) => {
    onPressAdd(item, setFieldValues);
  };

  const _renderItem = ({
    item,
    index,
  }: {
    item: TeamMemberByUserId;
    index: number;
  }) => <Item item={item} index={index} onPress={_onPressItem} />;

  const _keyExtractor = (item: TeamMemberByUserId) => item.teamId;
  return (
    <Modal
      isVisible={visible}
      style={styles.modal}
      propagateSwipe={true}
      onBackdropPress={_onPressOut}
    >
      <View>
        {/* Wrap a View work like parent component to fix size of modal work based on this child View */}
        <View style={styles.container}>
          <View style={styles.header}>
            <AppText
              size={Fonts.size.large}
              bold
              text={strings.add_member_screen.title}
            />

            <TouchableOpacity style={styles.btnClose} onPress={_onPressOut}>
              <Ionicons
                size={Scale(20)}
                name={"ios-close-outline"}
                color={Colors.appGrayColor}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.mainContainer}>
            <FlatList
              data={data}
              renderItem={_renderItem}
              keyExtractor={_keyExtractor}
            />
          </View>
          <View style={styles.bottomPushUp} />
        </View>
      </View>
    </Modal>
  );
};
const Item = ({
  item,
  onPress,
}: {
  item: TeamMemberByUserId;
  index: number;
  onPress: Function;
}) => {
  const _onPressItem = () => {
    onPress(item);
  };
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={_onPressItem}>
      <Image style={styles.image} source={{ uri: item.profile }} />
      <AppText text={item.teamName} bold />
    </TouchableOpacity>
  );
};
