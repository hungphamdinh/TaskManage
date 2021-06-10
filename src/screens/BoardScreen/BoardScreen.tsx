import React, { useEffect } from "react";
import RecursiveContainer from "./components/BoardForm/BoardForm";
import { StyleSheet, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ReduxState from "../../redux/ReduxState";
import { Colors } from "../../themes";
import { Task } from "../../services/model/Task";
import { getMembers } from "../../redux/member/action/members";
const BoardScreen = ({ navigation }: { navigation: any }) => {
  const { user } = useSelector((state: ReduxState) => state.user);
  const { members } = useSelector((state: ReduxState) => state.members);
  const dispatch = useDispatch();
  useEffect(() => {
    if (members.length == 0) {
      dispatch(
        getMembers({
          userId: user.id,
        })
      );
    }
  }, []);

  const _onNavigate = (value: any, item?: Task) => {
    item
      ? navigation.navigate(value, {
          taskId: item.id,
        })
      : navigation.navigate(value);
  };
  return (
    <SafeAreaView style={styles.container}>
      <RecursiveContainer
        onNavigate={_onNavigate}
        dispatch={dispatch}
        user={user}
      />
    </SafeAreaView>
  );
};

export default BoardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appSecondaryColor,
  },
});
