import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Images from "../themes/Images";
import BoardScreen from "../screens/BoardScreen/BoardScreen";
import DashBoardScreen from "../screens/DashBoard/DashboardScreen";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Metrics } from "../themes";
import { SafeAreaView, Image, StyleSheet } from "react-native";
import { store } from "../redux/configureStore";
import { getTasksByUserId } from "../redux/task/action/tasks";
import { useSelector } from "react-redux";
import ReduxState from "../redux/ReduxState";

const Tab = createBottomTabNavigator();

function HomeTab() {
  const { user } = useSelector((state: ReduxState) => state.user);
  return (
    <>
      <SafeAreaView
        style={{ flexGrow: 0, backgroundColor: Colors.appPrimaryColor }}
      />
      <LinearGradient
        // Background Linear Gradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={styles.background}
      >
        <Tab.Navigator
          tabBarOptions={{
            tabStyle: {
              height: Metrics.screenHeight / 7,
              marginTop: -Metrics.screenHeight / 20,
            },
            keyboardHidesTabBar: true,
            inactiveBackgroundColor: Colors.appPrimaryColor,
            activeBackgroundColor: Colors.appPrimaryColor,
          }}
          screenOptions={({ route }: { route: any }) => ({
            // header: null,
            tabBarIcon: ({
              color,
              focused,
            }: {
              color: string;
              focused: any;
            }) => {
              let iconName;
              color = focused ? Colors.appWhite : Colors.appLightGrayColor;
              switch (route.name) {
                case "DashBoardScreen":
                  iconName = Images.icTabDashBoard;
                  break;
                case "BoardScreen":
                  iconName = Images.icTabBoard;
                  break;
                case "PlusScreen":
                  iconName = Images.icTabPlus;
                  break;
                case "TaskScreen":
                  iconName = Images.icTabMessage;
                  break;

                default:
                  iconName = Images.icTabMessage;

                  break;
              }

              return (
                <Image
                  source={iconName}
                  resizeMode={"contain"}
                  style={[styles.icon as any, { tintColor: color }]}
                />
              );
            },
          })}
        >
          <Tab.Screen
            name="DashBoardScreen"
            component={DashBoardScreen}
            options={{
              title: "",
            }}
          />
          <Tab.Screen
            name="PlusScreen"
            component={BoardScreen}
            listeners={{
              tabPress: () => {
                // Prevent default action
                // e.preventDefault();
                store.dispatch(
                  getTasksByUserId({
                    id: user?.id,
                  })
                );
              },
            }}
            options={{ title: "" }}
          />
          <Tab.Screen
            name="BoardScreen"
            listeners={{
              tabPress: () => {
                // Prevent default action
                // e.preventDefault();
                store.dispatch(
                  getTasksByUserId({
                    id: user?.id,
                  })
                );
              },
            }}
            component={BoardScreen}
            options={{
              title: "",
            }}
          />

          {/* <Tab.Screen
            name="TaskScreen"
            component={BoardScreen}
            options={{ title: "" }}
          />
          <Tab.Screen
            // component={UserDetailScreen}
            name="MessageScreen"
            component={BoardScreen}
            options={{ title: "" }}
          /> */}
        </Tab.Navigator>
      </LinearGradient>

      {/* <MessageButton onPressDetail={_onPressMessageButton}/> */}
    </>
  );
}
export default HomeTab;
const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "red",
    // height: 300,
  },
});
