import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/user/LoginScreen/Login";
import AddTaskScreen from "../screens/task/AddTaskScreen/AddTaskScreen";
import EditTaskScreen from "../screens/task/EditTaskScreen/EditTaskScreen";
import SignUpScreen from "../screens/user/SignUpScreen/SignUpScreen";
import DynamicFormScreen from "../screens/user/DynamicFormScreen/DynamicFormScreen";
import BoardScreen from "../screens/task/BoardScreen/BoardScreen";
import AddMemberScreen from "../screens/team/AddMemberScreen/AddMemberScreen";
import AddMemberToTaskScreen from "../screens/task/AddMemberToTaskScreen/AddMemberToTaskScreen";
import InviteMemberScreen from "../screens/team/InviteMemberScreen/InviteMemberScreen";
import TaskDetailScreen from "../screens/task/TaskDetailScreen/TaskDetailScreen";
import HomeTab from "./HomeTabNavigation";
import { useSelector } from "react-redux";
import ReduxState from "../redux/ReduxState";
import InvitationsScreen from "../screens/task/InvitationsScreen/InvitationsScreen";
import TeamInvitationsScreen from "../screens/team/TeamInvitationsScreen/TeamInvitationsScreen";
import ProfileScreen from "../screens/user/ProfileScreen/ProfileScreen";
import CreateTeamScreen from "../screens/team/CreateTeamScreen/CreateTeamScreen";
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
          <>
            <Stack.Screen
              name="HomeTabNavigation"
              component={HomeTab}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen
              name="DynamicFormScreen"
              component={DynamicFormScreen}
            />
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
              name="AddMemberToTaskScreen"
              component={AddMemberToTaskScreen}
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
            <Stack.Screen
              options={{ headerShown: false }}
              name="InvitationsScreen"
              component={InvitationsScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="ProfileScreen"
              component={ProfileScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="CreateTeamScreen"
              component={CreateTeamScreen}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name="TeamInvitationsScreen"
              component={TeamInvitationsScreen}
            />
          </>
        ) : (
          <Stack.Screen
            options={{ headerShown: false }}
            name="LoginScreen"
            component={LoginScreen}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigation;
