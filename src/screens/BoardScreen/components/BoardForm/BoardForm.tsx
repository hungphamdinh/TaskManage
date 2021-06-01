import React, { useMemo } from "react";
import { Divider, AppText } from "../../../../components";
import { Text, View, Image } from "react-native";
import { strings } from "../../../../languages";
import { Fonts, Colors, Metrics, Images } from "../../../../themes";
import styles from "./styles";
import { User } from "../../../../services/model/User";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import { logout } from "../../../../redux/user/reducer/user";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { useSelector } from "react-redux";
import ReduxState from "../../../../redux/ReduxState";
import { Task } from "../../../../services/model/Task";
import ItemBoard from "./components/Item";
const week = [
  {
    day: "Mon",
  },
  {
    day: "Tue",
  },
  {
    day: "Wed",
  },
  {
    day: "Thu",
  },
  {
    day: "Fri",
  },
  {
    day: "Sat",
  },
  {
    day: "Sun",
  },
];
let now = new Date();
let date = new Array();
week.map(() => {
  now.setDate(now.getDate() - 1); // sets the date to the previous day each time
  date.push(now.getDate() + 1);
});
const arrayDate = date.reverse();

const BoardForm = ({ user, dispatch }: { user: User; dispatch: any }) => {
  const { tasks } = useSelector((state: ReduxState) => state.tasks);

  const _onPress = () => {
    dispatch(logout());
  };

  const weekContainer = (index: number) => {
    const isToday = new Date().getDate() === arrayDate[index];

    return {
      ...styles.weekContainer,
      zIndex: isToday ? 1 : 0,
      borderBottomColor: isToday
        ? Colors.appPrimaryColor
        : Colors.appSecondaryColor,
    };
  };
  const _keyExtractor = (item: Task) => item.id;
  const _renderItem = ({ item, index }: { item: Task; index: number }) => (
    <ItemBoard item={item} index={index} />
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText text={strings.board_screen.task} bold size={Fonts.size.h6} />
        <TouchableOpacity style={styles.profilePicture} onPress={_onPress}>
          <Image
            source={{ uri: user?.profile }}
            style={styles.avatar}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.subHeader}>
        <View style={styles.date}>
          <AppText
            text={moment(new Date()).format("LL")}
            color={Colors.overlay7}
          />
          <AppText
            style={styles.marginTopSmall}
            text={strings.board_screen.today}
            bold
            size={Fonts.size.h6}
          />
        </View>
        <TouchableOpacity style={styles.buttonAdd}>
          <Ionicons name="add-outline" size={20} color={Colors.appWhite} />
          <AppText
            color={Colors.appWhite}
            bold
            text={strings.board_screen.add_task}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        {week.map((item: any, index: number) => (
          <View style={weekContainer(index)}>
            <AppText
              color={Colors.appGrayColor}
              text={item.day.toUpperCase()}
            />
            <AppText
              color={
                new Date().getDate() === arrayDate[index]
                  ? Colors.appPrimaryColor
                  : Colors.appTextBlack
              }
              bold
              style={styles.marginTopSmall}
              center
              text={arrayDate[index]}
            />
          </View>
        ))}
        <Divider style={styles.divider} />
        <View style={styles.listContainer}>
          <FlatList
            renderItem={_renderItem}
            data={tasks}
            keyExtractor={_keyExtractor}
          />
        </View>
      </View>
    </View>
  );
};

export default BoardForm;
