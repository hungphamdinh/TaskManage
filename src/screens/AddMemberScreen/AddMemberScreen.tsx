import React from "react";
import RecursiveContainer from "./components/AddForm/AddForm";
import { useSelector, useDispatch } from "react-redux";
import ReduxState from "../../redux/ReduxState";
import { getTasksByUserId } from "../../redux/task/action/tasks";
import { Background } from "../../components";
import { strings } from "../../languages";

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

  const _onNavigate = () => {
    navigation.goBack();
  }
  return (
    <Background
      title={strings.add_member_screen.title}
      navigation={navigation}
      mainComponent={<RecursiveContainer onNavigate={_onNavigate} dispatch={dispatch} user={user} />}
    />
  );
};

export default BoardScreen;
