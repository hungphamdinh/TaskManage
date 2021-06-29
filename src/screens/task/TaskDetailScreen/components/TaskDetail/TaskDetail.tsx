import React, { useState, useEffect } from "react";
import { AppText } from "../../../../../components";
import {
  View,
  Image,
  Keyboard,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { strings } from "../../../../../languages";
import { Fonts, Colors, Images, Metrics } from "../../../../../themes";
import styles from "./styles";
import { User } from "../../../../../services/model/User";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { useSelector } from "react-redux";
import ReduxState from "../../../../../redux/ReduxState";
import { SubTask } from "../../../../../services/model/Task";
import Item from "./components/Item/Item";
import ItemComment from "./components/ItemComment/ItemComment";
import { Member } from "../../../../../services/model/Member";
import { addSubTask } from "../../../../../redux/task/action/subTask";
import BottomModal from "./components/BottomModal";
import {
  doneSubTask,
  clearSubTaskStatus,
} from "../../../../../redux/task/action/subTaskStatus";
import { getTaskDetail } from "../../../../../redux/task/action/taskDetail";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  addComment,
  clearComment,
} from "../../../../../redux/comment/action/comment";
import { getComments } from "../../../../../redux/comment/action/comments";
import { Comment } from "../../../../../services/model/Comment";
import { getSubTask } from "../../../../../redux/task/action/subTasks";
import { androidOS } from "../../../../../helpers/Constants";
import { TeamMemberDetail } from "../../../../../services/model/TeamMember";
import {
  deleteSubTask,
  clearDeleteSubTaskResponse,
} from "../../../../../redux/task/action/subTaskDelete";
const TaskDetail = ({
  dispatch,
  user,
  isInvitation,
}: {
  dispatch: any;
  user: User;
  isInvitation: boolean;
}) => {
  const { taskDetail } = useSelector((state: ReduxState) => state.taskDetail);
  const { subTaskResponse } = useSelector(
    (state: ReduxState) => state.subTaskStatus
  );
  const subTaskDeleteResponse = useSelector(
    (state: ReduxState) => state.subTaskDelete.response
  );
  const { response } = useSelector((state: ReduxState) => state.subTask);
  const { subTasks } = useSelector((state: ReduxState) => state.subTasks);
  const commentResponse = useSelector(
    (state: ReduxState) => state.comment.response
  );
  const { comments } = useSelector((state: ReduxState) => state.comments);
  const [isShowModal, setIsShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [pushFooter, setPusFooter] = useState(false);
  const [isShortText, setIsShortText] = useState(false);
  const status = {
    inProgress: 0,
    done: 1,
  };
  const _keyExtractor = (item: any) => item.id;
  const _renderItem = ({ item, index }: { item: SubTask; index: number }) => (
    <Item
      onPressDelete={_onPressDeleteSubTask}
      onPressItem={_onPressItemSubTask}
      item={item}
      index={index}
    />
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
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      keyboardDidHide
    );
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      keyboardDidShow
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const keyboardDidHide = () => {
    setPusFooter(false);
  };

  const _onPressDeleteSubTask = (item: SubTask) => {
    dispatch(
      deleteSubTask({
        id: item.id,
      })
    );
  };
  const keyboardDidShow = () => {
    setPusFooter(true);
  };

  const footer = () => {
    return {
      marginBottom: pushFooter
        ? !androidOS
          ? Metrics.screenHeight / 2
          : 0
        : 0,
    };
  };

  useEffect(() => {
    return () => {
      dispatch(clearComment());
      dispatch(clearSubTaskStatus());
      dispatch(clearDeleteSubTaskResponse());
    };
  }, []);
  useEffect(() => {
    if (commentResponse?.statusCode === 200) {
      dispatch(
        getComments({
          taskId: taskDetail?.id,
        })
      );
    }
  }, [commentResponse]);
  useEffect(() => {
    if (subTaskResponse?.id || response || subTaskDeleteResponse) {
      dispatch(
        getSubTask({
          id: taskDetail?.id,
        })
      );
    }
  }, [subTaskResponse?.id, response, subTaskDeleteResponse]);

  useEffect(() => {
    if (taskDetail) {
      if (taskDetail.description.length > 100) {
        setIsShortText(true);
      }
    }
  }, [taskDetail]);

  const _onPressItemSubTask = (item: SubTask) => {
    dispatch(
      doneSubTask({
        id: item.id,
        status: status.done,
      })
    );
  };

  const _onPressItemComment = () => {};
  const _onPressAddSubTask = (name: string) => {
    dispatch(
      addSubTask({
        name: name,
        parentId: taskDetail.id,
        timeCreated: new Date(),
      })
    );
    _onChangeModalVisible();
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

  const _onShowFullText = () => {
    setIsShortText(false);
  };
  return taskDetail ? (
    <>
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <AppText
            style={styles.title}
            text={taskDetail.name}
            bold
            size={Fonts.size.h5}
          />
          {isShortText ? (
            <TouchableOpacity
              style={styles.shortText}
              onPress={_onShowFullText}
            >
              <Text>
                <AppText
                  text={taskDetail.description.substring(0, 100) + "..."}
                  color={Colors.appGrayColor}
                />
                <AppText
                  text={" " + strings.detail_screen.more}
                  color={Colors.appLightGrayColor}
                />
              </Text>
            </TouchableOpacity>
          ) : (
            <AppText
              style={styles.description}
              text={taskDetail.description}
              color={Colors.appGrayColor}
            />
          )}
        </View>
        <View style={styles.mainInfoContainer}>
          <View style={styles.team}>
            <AppText
              text={strings.detail_screen.teams.toUpperCase()}
              bold
              color={Colors.appGrayColor}
            />
            <View style={styles.teamContainer}>
              {taskDetail.members.map((item: any, idx: number) => (
                <>
                  {item.isAdmin ? null : (
                    <View key={idx.toString()} style={styles.imageMember}>
                      <Image
                        style={styles.profile}
                        source={{ uri: item.profile }}
                      />
                    </View>
                  )}
                </>
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
        {!isInvitation ? (
          <>
            <View style={styles.addSubTask}>
              <AppText
                size={Fonts.size.large}
                bold
                style={styles.tasks}
                text={strings.detail_screen.task}
              />
              {taskDetail.isAdmin ? (
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
              ) : null}
            </View>
            <View style={styles.taskContainer}>
              <FlatList
                data={subTasks}
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
          </>
        ) : null}

        <BottomModal
          visible={isShowModal}
          onPressOut={_onChangeModalVisible}
          onPressAdd={_onPressAddSubTask}
        />
      </KeyboardAwareScrollView>
      {!isInvitation ? (
        <View style={footer()}>
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
                style={[
                  styles.icContainer,
                  { marginLeft: Metrics.margin.small },
                ]}
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
      ) : null}
    </>
  ) : null;
};

export default TaskDetail;
