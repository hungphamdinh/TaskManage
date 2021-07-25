import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  Button,
} from "react-native";
import * as Notifications from "expo-notifications";
import { AppText, ModalInput } from "../../../components";
import { Metrics, Fonts, Colors, Images } from "../../../themes";
import { strings } from "../../../languages";
import { useSelector, useDispatch } from "react-redux";
import ReduxState from "../../../redux/ReduxState";
import { updateRole } from "../../../redux/user/reducer/user";
import { getTotalTask } from "../../../redux/task/action/totalTask";
import { PieChart } from "react-native-chart-kit";
import Constants from "expo-constants";
const chartSize = Metrics.screenHeight / 4;
const chartConfig = {
  backgroundColor: "#26872a",
  backgroundGradientFrom: "#43a047",
  backgroundGradientTo: "#66bb6a",
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

const graphStyle = {
  marginVertical: 8,
  ...chartConfig.style,
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const DashboardScreen = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: ReduxState) => state.user);
  const width = Dimensions.get("window").width;
  const { totalTask } = useSelector((state: ReduxState) => state.totalTask);
  const height = Metrics.screenHeight / 4;
  const pieChartData = [
    {
      name: "Urgent",
      population: totalTask ? totalTask.urgent : 0,
      color: Colors.sponsoredColor,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Running",
      population: totalTask ? totalTask.running : 0,
      color: Colors.appGreen,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Done",
      population: totalTask ? totalTask.done : 0,
      color: Colors.appPrimaryColor,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [role, setRole] = useState("");
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef() as any;
  const responseListener = useRef() as any;

  useEffect(() => {
    registerForPushNotificationsAsync().then((token: any) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification as any);
      }
    );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    if (user.role === "") {
      _onChangeModalVisible();
    }
    dispatch(
      getTotalTask({
        id: user?.id,
      })
    );
  }, []);

  // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/notifications
  async function sendPushNotification(expoPushToken: any) {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Original Title",
      body: "And here is the body!",
      data: { someData: "goes here" },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const {
        status: existingStatus,
      } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  const _onPressProfile = () => {
    navigation.navigate("ProfileScreen");
  };

  const _onChangeModalVisible = () => {
    setIsModalVisible(!isModalVisible);
  };

  const _onChangeRole = (value: string) => {
    setRole(value);
  };

  const _onPressSubmitRole = () => {
    dispatch(
      updateRole({
        userId: user.id,
        role: role,
      })
    );
    _onChangeModalVisible();
  };
  return (
    <>
      <SafeAreaView style={styles.headerView} />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <AppText
            size={Fonts.size.h6}
            bold
            text={strings.dashboard_screen.title}
          />
          <Button
            title="Press to Send Notification"
            onPress={async () => {
              await sendPushNotification(expoPushToken);
            }}
          />
          <View style={styles.headerRightContainer}>
            {/* <TouchableOpacity style={styles.buttonNoti} onPress={_onPress}>
              <Image
                source={Images.icNoti}
                style={[styles.notification, { tintColor: Colors.overlay6 }]}
                resizeMode={"contain"}
              />
              <TouchableOpacity style={styles.count}>
                <AppText
                  bold
                  color={Colors.appWhite}
                  size={Fonts.size.tiny}
                  text={invitationsReceiver.length}
                />
              </TouchableOpacity>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.profilePicture}
              onPress={_onPressProfile}
            >
              <Image
                source={{ uri: user?.profile }}
                style={styles.avatar}
                resizeMode={"contain"}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.body}>
          <PieChart
            data={pieChartData}
            height={height}
            width={width}
            chartConfig={chartConfig}
            accessor="population"
            style={graphStyle}
            backgroundColor={Colors.appWhite}
            paddingLeft={Metrics.margin.small as any}
          />
        </View>
        <ScrollView style={styles.subBody}>
          <Item
            image={Images.icTotalTask}
            text={"Total Task"}
            count={totalTask?.totalTask}
          />
          <Item
            image={Images.icPending}
            text={"Urgent"}
            count={totalTask?.urgent}
          />
          <Item
            image={Images.icWorkingOn}
            text={"Running"}
            count={totalTask?.running}
          />
          <Item
            image={Images.icCompletedTask}
            text={"Done"}
            count={totalTask?.done}
          />
        </ScrollView>
        <ModalInput
          visible={isModalVisible}
          data={role}
          onPressOut={_onChangeModalVisible}
          title={"Complete Info"}
          textInputTitle={"Your role"}
          onPressSubmit={_onPressSubmitRole}
          onChangeData={_onChangeRole}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerView: {
    flex: 0,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingTop: Metrics.margin.very_huge,
    paddingHorizontal: Metrics.margin.large,
    backgroundColor: Colors.appWhite,
  },
  profilePicture: {
    borderRadius: 40,
    width: 40,
    height: 40,
    backgroundColor: Colors.appPrimaryColor,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: Metrics.borderRadius.huge,
  },
  notification: {
    width: 40,
    height: 40,
  },
  buttonNoti: {
    width: 40,
    height: 40,
    marginRight: Metrics.margin.small,
  },
  headerRightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  count: {
    position: "absolute",
    width: 18,
    height: 18,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    right: 5,
    borderColor: Colors.overlay6,
    borderRadius: Metrics.borderRadius.large,
  },
  body: {
    height: Metrics.screenHeight / 3,
    backgroundColor: Colors.appWhite,
    alignItems: "center",
    justifyContent: "center",
  },
  subBody: {
    marginTop: Metrics.margin.large,
    marginBottom: 40,
  },
  itemContainer: {
    marginHorizontal: Metrics.margin.large,
    marginTop: Metrics.margin.large,
    flexDirection: "row",
    backgroundColor: Colors.appWhite,
    borderRadius: Metrics.borderRadius.regular,
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageBackground: {
    width: 40,
    backgroundColor: Colors.appGrayBackground,
    borderRadius: Metrics.borderRadius.regular,
    margin: Metrics.margin.large,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 20,
    height: 20,
  },
  textItem: {
    marginLeft: Metrics.margin.regular,
  },
  itemHalfChildContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textTotalTask: {
    marginRight: Metrics.margin.large,
  },
  dashBoardChart: {
    height: chartSize,
    width: chartSize,
    backgroundColor: Colors.appBlue,
    borderRadius: 150,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    // borderWidth: 40,
    borderColor: Colors.appSecondaryColor,
  },
  circleCenter: {
    width: Metrics.screenHeight / 10,
    height: Metrics.screenHeight / 10,
    borderRadius: Metrics.borderRadius.h5,
    backgroundColor: Colors.appSecondaryColor,
  },
  percentageElement: {
    // width: "50%",
    // height: "50%",
    borderRadius: Metrics.borderRadius.h5,
    backgroundColor: "red",
  },
});

export default DashboardScreen;

const Item = ({
  count,
  text,
  image,
}: {
  count: number;
  text: string;
  image: any;
}) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemHalfChildContainer}>
        <View style={styles.imageBackground}>
          <Image source={image} style={styles.image} />
        </View>
        <AppText size={Fonts.size.large} text={text} style={styles.textItem} />
      </View>
      <AppText
        size={Fonts.size.large}
        color={Colors.overlay3}
        style={styles.textTotalTask}
        text={count}
      />
    </View>
  );
};
