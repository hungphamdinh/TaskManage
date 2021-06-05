import React from "react";
import RecursiveContainer from "./components/BoardForm/BoardForm";
import { StyleSheet, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ReduxState from "../../redux/ReduxState";
import { Colors } from "../../themes";
import { getTasksByUserId } from "../../redux/task/action/tasks";
import { Task } from "../../services/model/Task";
const BoardScreen = ({ navigation }: { navigation: any }) => {
  const { user } = useSelector((state: ReduxState) => state.user);
  const dispatch = useDispatch();
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      dispatch(
        getTasksByUserId({
          id: user.id,
        })
      );
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
