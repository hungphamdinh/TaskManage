import React, { useState, useEffect } from "react";
import { AppText } from "../../../../components";
import { View, Image } from "react-native";
import { strings } from "../../../../languages";
import { Fonts, Colors, Images, Metrics } from "../../../../themes";
import styles from "./styles";
import { User } from "../../../../services/model/User";
import {
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { useSelector } from "react-redux";
import ReduxState from "../../../../redux/ReduxState";
import { SubTask } from "../../../../services/model/Task";
import Item from "./components/Item/Item";
import ItemComment from "./components/ItemComment/ItemComment";
import { Member } from "../../../../services/model/Member";
import { addSubTask } from "../../../../redux/task/action/subTask";
import BottomModal from "./components/BottomModal";
import {
  doneSubTask,
  clearSubTaskStatus,
} from "../../../../redux/task/action/subTaskStatus";
import { getTaskDetail } from "../../../../redux/task/action/taskDetail";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  addComment,
  clearComment,
} from "../../../../redux/comment/action/comment";
import { getComments } from "../../../../redux/comment/action/comments";
import comments from "../../../../redux/comment/reducer/comments";
import { Comment } from "../../../../services/model/Comment";
const BoardForm = ({ dispatch, user }: { dispatch: any; user: User }) => {
  const { taskDetail } = useSelector((state: ReduxState) => state.taskDetail);
  const { subTaskResponse } = useSelector(
    (state: ReduxState) => state.subTaskStatus
  );
  const { response } = useSelector((state: ReduxState) => state.subTask);
  const commentResponse = useSelector(
    (state: ReduxState) => state.comment.response
  );
  const { comments } = useSelector((state: ReduxState) => state.comments);
  const [isShowModal, setIsShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const _keyExtractor = (item: any) => item.id;
  const _renderItem = ({ item, index }: { item: SubTask; index: number }) => (
    <Item onPressItem={_onPressItemSubTask} item={item} index={index} />
  );
  const _renderComment = ({
    item,
    index,
  }: {
    item: Comment;
    index: number;
  }) => (
    <ItemComment onPressItem={_onPressItemComment} item={item} index={index} />
  );
  useEffect(() => {
    if (commentResponse?.statusCode === 200) {
      dispatch(
        getComments({
          taskId: taskDetail?.id,
        })
      );
      dispatch(clearComment());
    }
  }, [commentResponse]);

  useEffect(() => {
    dispatch(
      getComments({
        taskId: taskDetail?.id,
      })
    );
  }, []);

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

  const _onPressItemComment = (item: Comment) => {};
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

  const _onChangeMessage = (value: string) => {
    setMessage(value);
  };

  const _onPressSend = () => {
    dispatch(
      addComment({
        message: message,
        timeCreated: new Date(),
        taskId: taskDetail?.id,
        user: user,
      })
    );
    setMessage("");
  };
  return taskDetail ? (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
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
      <View style={styles.taskContainer}>
        <FlatList
          data={taskDetail.subTasks}
          renderItem={_renderItem}
          keyExtractor={_keyExtractor}
        />
      </View>
      <View style={styles.commentContainer}>
        <FlatList
          data={comments}
          renderItem={_renderComment}
          keyExtractor={_keyExtractor}
        />
      </View>
      <View style={styles.footer}>
        <View style={styles.messageContainer}>
          <View style={styles.icon}>
            <View style={styles.icContainer}>
              <Image
                source={Images.icMessage}
                resizeMode={"contain"}
                style={styles.icMessage}
              />
            </View>
            <View
              style={[styles.icContainer, { marginLeft: Metrics.margin.small }]}
            >
              <Image
                source={Images.icShare}
                resizeMode={"contain"}
                style={styles.icMessage}
              />
            </View>
            <TextInput
              style={styles.textPlaceHolder}
              placeholder={strings.detail_screen.write_comment}
              onChangeText={_onChangeMessage}
              value={message}
            />
          </View>
          <TouchableOpacity style={styles.icContainer} onPress={_onPressSend}>
            <Image
              source={Images.icSend}
              resizeMode={"contain"}
              style={styles.icMessage}
            />
          </TouchableOpacity>
        </View>
      </View>
      <BottomModal
        visible={isShowModal}
        onPressOut={_onChangeModalVisible}
        onPressAdd={_onPressAddSubTask}
      />
    </KeyboardAwareScrollView>
  ) : null;
};

export default BoardForm;
