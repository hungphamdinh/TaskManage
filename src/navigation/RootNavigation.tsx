import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen/Login";
import AddTaskScreen from "../screens/AddTaskScreen/AddTaskScreen";
import EditTaskScreen from "../screens/EditTaskScreen/EditTaskScreen";
import SignUpScreen from "../screens/SignUpScreen/SignUpScreen";
import DynamicFormScreen from "../screens/DynamicFormScreen/DynamicFormScreen";
import BoardScreen from "../screens/BoardScreen/BoardScreen";
import AddMemberScreen from "../screens/AddMemberScreen/AddMemberScreen";
import InviteMemberScreen from "../screens/InviteMemberScreen/InviteMemberScreen";
import TaskDetailScreen from '../screens/TaskDetailScreen/TaskDetailScreen';
import HomeTab from "./HomeTabNavigation";
import { useSelector } from "react-redux";
import ReduxState from "../redux/ReduxState";
const Stack = createStackNavigator();
function RootNavigation() {
  const { user } = useSelector((state: ReduxState) => state.user);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Menu"
        screenOptions={{
          headerStyle: { backgroundColor: "#512DA8" },
          headerTintColor: "#fff",
          headerTitleStyle: { color: "#fff" },
        }}
      >
        {user ? (
          <Stack.Screen
            name="HomeTabNavigation"
            component={HomeTab}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            options={{ headerShown: false }}
            name="LoginScreen"
            component={LoginScreen}
          />
        )}
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="DynamicFormScreen" component={DynamicFormScreen} />
        <Stack.Screen name="BoardScreen" component={BoardScreen} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="AddTaskScreen"
          component={AddTaskScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="AddMemberScreen"
          component={AddMemberScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="EditTaskScreen"
          component={EditTaskScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="TaskDetailScreen"
          component={TaskDetailScreen}
        />
         <Stack.Screen
          options={{ headerShown: false }}
          name="InviteMemberScreen"
          component={InviteMemberScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigation;
