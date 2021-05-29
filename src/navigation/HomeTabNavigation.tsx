import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Images from '../themes/Images';
import BoardScreen from "../screens/BoardScreen/BoardScreen";

import { Colors } from '../themes';
import { SafeAreaView, Image, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

function HomeTab() {
  return (
    <>
      <SafeAreaView
        style={{ flexGrow: 0, backgroundColor: Colors.appPrimaryColor }}
      />
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: Colors.appPrimaryColor,
          keyboardHidesTabBar: true,
        }}
        screenOptions={({ route }: { route: any }) => ({
          // header: null,
          tabBarIcon: ({ color, focused }: { color: string; focused: any }) => {
            let iconName;
            color = focused ? Colors.appPrimaryColor : Colors.appGrayColor;
            switch (route.name) {
              case 'BoardScreen':
                iconName = Images.icTabDashBoard;
                break;
              case 'BoardScreen':
                iconName = Images.icTabBoard;
                break;
              case 'BoardScreen':
                iconName = Images.icTabTask;
                break;
              case 'BoardScreen':
                iconName = Images.icTabMessage;
                break;

              default:
                iconName = Images.icTabPlus;

                break;
            }

            return (
              <Image
                source={iconName}
                style={styles.icon as any}
              />
            );
          },
        })}>
        <Tab.Screen
          name="BoardScreen"
          component={BoardScreen}
          options={{
            title: 'Trang chủ',
          }}
        />
        <Tab.Screen
          name="BoardScreen"
          component={BoardScreen}
          options={{
            title: 'Tư vấn',
          }}
        />
        <Tab.Screen
          name="BoardScreen"
          component={BoardScreen}
          options={{ title: 'Hợp đồng' }}
        />

        <Tab.Screen
          name="BoardScreen"
          component={BoardScreen}
          options={{ title: 'Tin tức' }}
        />
        <Tab.Screen
          // component={UserDetailScreen}
          name="BoardScreen"
          component={BoardScreen}
          options={{ title: 'Cá nhân' }}
        />
      </Tab.Navigator>
      {/* <MessageButton onPressDetail={_onPressMessageButton}/> */}
    </>
  );
}
export default HomeTab;
const styles = StyleSheet.create({
  icon: {
    color: Colors.appPrimaryColor,
  },
});
