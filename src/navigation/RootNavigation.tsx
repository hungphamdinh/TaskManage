import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen/SignUpScreen";
import DynamicFormScreen from "../screens/DynamicFormScreen/DynamicFormScreen";

const MenuNavigator = createStackNavigator();
function MenuNavigatorScreen() {
  return (
    <MenuNavigator.Navigator
      initialRouteName="Menu"
      screenOptions={{
        headerStyle: { backgroundColor: "#512DA8" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <MenuNavigator.Screen options={{headerShown: false}} name="LoginScreen" component={LoginScreen} />
      <MenuNavigator.Screen name="SignUpScreen" component={SignUpScreen} />
      <MenuNavigator.Screen name="DynamicFormScreen" component={DynamicFormScreen} />
    </MenuNavigator.Navigator>
  );
}

class Main extends Component {
  render() {
    return (
      <NavigationContainer>
        <MenuNavigatorScreen />
      </NavigationContainer>
    );
  }
}
export default Main;
