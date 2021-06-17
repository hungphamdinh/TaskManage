import React, { useMemo, useState } from "react";
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
import { Task, Item } from "../../../../services/model/Task";
import ItemBoard from "./components/Item";
import { statusType } from "../../../../helpers/Constants";
import { getTasksByUserId } from "../../../../redux/task/action/tasks";
const week = [
  {
    id: 0,
    day: "Mon",
  },
  {
    id: 1,
    day: "Tue",
  },
  {
    id: 2,
    day: "Wed",
  },
  {
    id: 3,
    day: "Thu",
  },
  {
    id: 4,
    day: "Fri",
  },
  {
    id: 5,
    day: "Sat",
  },
  {
    id: 6,
    day: "Sun",
  },
];
let now = new Date();
let date = new Array();
week.map((item) => {
  now.setDate(now.getDate() - 1); // sets the date to the previous day each time
  date.push({
    data: moment(now).format("llll"),
  });
});

var dt = new Date();
var dt3 = new Date();
var dt4 = new Date();
var dt5 = new Date();
var dt6 = new Date();
var dt7 = new Date();
var dt8 = new Date();

const mon = (dt.getDay() + 7 - 1) % 7;
const tue = (dt.getDay() + 7 - 2) % 7;
const wed = (dt.getDay() + 7 - 3) % 7;
const thu = (dt.getDay() + 7 - 4) % 7;
const fri = (dt.getDay() + 7 - 5) % 7;
const sat = (dt.getDay() + 7 - 6) % 7;
const sun = (dt.getDay() + 7 - 0) % 7;

dt.setDate(dt.getDate() - mon);
dt3.setDate(dt3.getDate() - tue);
dt4.setDate(dt4.getDate() - wed);
dt5.setDate(dt5.getDate() - thu);
dt6.setDate(dt6.getDate() - fri);
dt7.setDate(dt7.getDate() - sat);
dt8.setDate(dt8.getDate() - sun);

const monday = dt.toString();
const tuesday = dt3.toString();
const wednesday = dt4.toString();
const thursday = dt5.toString();
const friday = dt6.toString();
const saturday = dt7.toString();
const sunday = dt8.toString();

const arrayDate = date.reverse();
const BoardForm = ({
  user,
  dispatch,
  onNavigate,
}: {
  user: User;
  dispatch: any;
  onNavigate: Function;
}) => {
  const STATUS_ALL_ID = 6;
  const { tasks } = useSelector((state: ReduxState) => state.tasks);
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [status, setStatus] = useState([
    {
      id: STATUS_ALL_ID,
      name: "All",
      isActive: true,
      color: Colors.appBlue,
    },
    {
      id: statusType.urgent,
      name: "Urgent",
      isActive: false,
      color: Colors.sponsoredColor,
    },
    {
      id: statusType.ongoing,
      name: "OnGoing",
      isActive: false,
      color: Colors.appPrimaryColor,
    },
    {
      id: statusType.running,
      name: "Running",
      isActive: false,
      color: Colors.appGreen,
    },
    {
      id: statusType.done,
      name: "Done",
      isActive: false,
      color: Colors.appBlue,
    },
  ] as Array<Item>);

  const _onPress = () => {
    dispatch(logout());
  };

  const _keyExtractor = (item: Task) => item.id;
  const _renderItem = ({ item, index }: { item: Task; index: number }) => (
    <ItemBoard item={item} onPressItem={_onPressItem} />
  );

  const _onPressAdd = () => {
    onNavigate("AddTaskScreen");
  };

  const _onPressItem = (item: Task) => {
    onNavigate("TaskDetailScreen", item);
  };

  const _onPresShowFilter = () => {
    setIsShowFilter(!isShowFilter);
  };

  const _onPressDropDownItem = (item: Item) => {
    dispatch(
      getTasksByUserId({
        id: user?.id,
        type: item.id === STATUS_ALL_ID ? undefined : item.id,
      })
    );
    setStatus(
      status.map((value: Item) =>
        item.id === value.id
          ? { ...value, isActive: true }
          : { ...value, isActive: false }
      )
    );
    _onPresShowFilter();
  };

  const buttonShowDropdown = () => {
    return {
      ...styles.buttonShowDropdown,
      backgroundColor: status.filter((item: Item) => item.isActive)[0].color
    }
  }
  return (
    <View style={styles.container}>
      {isShowFilter ? (
        <View style={styles.dropdown}>
          {status.map((item: Item) => (
            <TouchableOpacity
              key={item.id.toString()}
              style={styles.itemDropdown}
              onPress={() => _onPressDropDownItem(item)}
            >
              <AppText text={item.name} />
            </TouchableOpacity>
          ))}
        </View>
      ) : null}
      <View style={styles.header}>
        <AppText text={strings.board_screen.task} bold size={Fonts.size.h6} />
        <TouchableOpacity style={styles.buttonAdd} onPress={_onPressAdd}>
          <Ionicons name="add-outline" size={20} color={Colors.appWhite} />
          <AppText
            color={Colors.appWhite}
            bold
            text={strings.board_screen.add_task}
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

        <TouchableOpacity
          style={buttonShowDropdown()}
          onPress={_onPresShowFilter}
        >
          <AppText
            color={Colors.appWhite}
            bold
            style={styles.textDropdown}
            text={status.filter((item: Item) => item.isActive)[0].name}
          />
          <Ionicons name="chevron-down" size={20} color={Colors.appWhite} />
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        {week.map((item: any, index: number) => (
          <DateItem
            item={item}
            index={index}
            key={index.toString()}
            date={arrayDate}
          />
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
const DateItem = ({
  item,
  index,
  date,
}: {
  item: any;
  index: number;
  date: Array<any>;
}) => {
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
  return (
    <View style={weekContainer(index)}>
      <AppText color={Colors.appGrayColor} text={item.day.toUpperCase()} />
      <AppText
        color={
          new Date().getDate() === item.date
            ? Colors.appPrimaryColor
            : Colors.appTextBlack
        }
        bold
        style={styles.marginTopSmall}
        center
        text={
          item.day === monday.substring(0, 3)
            ? monday.substring(8, 10)
            : item.day === tuesday.substring(0, 3)
            ? tuesday.substring(8, 10)
            : item.day === wednesday.substring(0, 3)
            ? wednesday.substring(8, 10)
            : item.day === thursday.substring(0, 3)
            ? thursday.substring(8, 10)
            : item.day === friday.substring(0, 3)
            ? friday.substring(8, 10)
            : item.day === saturday.substring(0, 3)
            ? saturday.substring(8, 10)
            : sunday.substring(8, 10)
        }
      />
    </View>
  );
};
