import React, { useState, useEffect } from "react";
import { AppText } from "../../../../components";
import { View, Image } from "react-native";
import { strings } from "../../../../languages";
import { Fonts, Colors } from "../../../../themes";
import styles from "./styles";
import { User } from "../../../../services/model/User";
import { TouchableOpacity, FlatList } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { useSelector } from "react-redux";
import ReduxState from "../../../../redux/ReduxState";
import { SubTask } from "../../../../services/model/Task";
import Item from "./components/Item/Item";
import { Member } from "../../../../services/model/Member";
import { addSubTask } from "../../../../redux/task/action/subTask";
import BottomModal from "./components/BottomModal";
import { doneSubTask, clearSubTaskStatus } from "../../../../redux/task/action/subTaskStatus";
import { getTaskDetail } from "../../../../redux/task/action/taskDetail";
const BoardForm = ({ dispatch, user }: { dispatch: any; user: User }) => {
  const { taskDetail } = useSelector((state: ReduxState) => state.taskDetail);
  const { subTaskResponse } = useSelector(
    (state: ReduxState) => state.subTaskStatus
  );
  const {response} = useSelector((state: ReduxState) => state.subTask);
  const [isShowModal, setIsShowModal] = useState(false);
  const _keyExtractor = (item: SubTask) => item.id;
  const _renderItem = ({ item, index }: { item: SubTask; index: number }) => (
    <Item onPressItem={_onPressItemSubTask} item={item} index={index} />
  );
  useEffect(() => {
    if (subTaskResponse?.id || response) {
      dispatch(
        getTaskDetail({
          userId: user.id,
          id: taskDetail?.id,
        })
      );
      dispatch(clearSubTaskStatus());
    }
  }, [subTaskResponse?.id, response]);

  const _onPressItemSubTask = (item: SubTask) => {
    dispatch(
      doneSubTask({
        id: item.id,
      })
    );
  };
  const _onPressAddSubTask = (name: string) => {
    dispatch(
      addSubTask({
        name: name,
        parentId: taskDetail.id,
        timeCreated: new Date(),
      })
    );
  };

  const _onChangeModalVisible = () => {
    setIsShowModal(!isShowModal);
  };
  return taskDetail ? (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText
          style={styles.title}
          text={taskDetail.name}
          bold
          size={Fonts.size.h5}
        />
        <AppText
          style={styles.description}
          text={taskDetail.description}
          color={Colors.appGrayColor}
        />
      </View>
      <View style={styles.mainInfoContainer}>
        <View style={styles.team}>
          <AppText
            text={strings.detail_screen.teams.toUpperCase()}
            bold
            color={Colors.appGrayColor}
          />
          <View style={styles.teamContainer}>
            {taskDetail.members.map((item: Member, idx: number) => (
              <View key={idx.toString()} style={styles.imageMember}>
                <Image style={styles.profile} source={{ uri: item.profile }} />
              </View>
            ))}
          </View>
        </View>
        <View style={styles.estContainer}>
          <AppText
            text={strings.detail_screen.est_date.toUpperCase()}
            bold
            color={Colors.appGrayColor}
          />
          <AppText
            size={Fonts.size.large}
            style={styles.timeCreated}
            text={moment(taskDetail.timeCreated).format("LL").toUpperCase()}
          />
        </View>
      </View>
      <View style={styles.addSubTask}>
        <AppText
          size={Fonts.size.large}
          bold
          style={styles.tasks}
          text={strings.detail_screen.task}
        />
        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={_onChangeModalVisible}
        >
          <Ionicons
            name="add-outline"
            size={20}
            color={Colors.appPrimaryColor}
          />
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={taskDetail.subTasks}
          renderItem={_renderItem}
          keyExtractor={_keyExtractor}
        />
      </View>
      <BottomModal
        visible={isShowModal}
        onPressOut={_onChangeModalVisible}
        onPressAdd={_onPressAddSubTask}
      />
    </View>
  ) : null;
};

export default BoardForm;
