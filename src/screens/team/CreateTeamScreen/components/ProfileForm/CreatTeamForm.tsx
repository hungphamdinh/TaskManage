import React, { useState, useEffect } from "react";
import { View, Image, Platform, TouchableOpacity } from "react-native";
import styles from "./styles";
import { User } from "../../../../../services/model/User";
import {
  TextInputForm,
  AppText,
  AppButton,
  Divider,
  AlertDialog,
} from "../../../../../components";
import { Colors, Images, Fonts } from "../../../../../themes";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import ReduxState from "../../../../../redux/ReduxState";
import { clearMemberLocal } from "../../../../../redux/member/action/members";
import { strings } from "../../../../../languages";
import * as ImagePicker from "expo-image-picker";
import {
  postTeamProfilePic,
  clearTeamMember as clearPostProfile,
} from "../../../../../redux/team/action/teamProfile";
import {
  addTeamMember,
  clearTeamMember,
} from "../../../../../redux/team/action/teamMemberAdd";
import {
  clearLocalUser,
  deleteLocalUser,
  initialMemberLocal,
  getUsers,
} from "../../../../../redux/user/reducer/usersById";
import { TeamMember } from "../../../../../services/model/request/TeamMember";
import { getTeams } from "../../../../../redux/team/action/teamsMemberByUserId";
import {
  updateTeamMember,
  clearTeamMember as clearUpdateResponse,
} from "../../../../../redux/team/action/teamMemberUpdate";
import { showMessage } from "react-native-flash-message";
import {
  deleteTeamMember,
  clearDeleteTeamMember,
} from "../../../../../redux/team/action/teamMemberDelete";
import { getTeamDetail } from "../../../../../redux/team/action/teamDetail";
import { TeamMemberDetail } from "../../../../../services/model/TeamMember";

const CreateTeamForm = ({
  dispatch,
  user,
  navigation,
  isUpdate,
  isInvite,
}: {
  dispatch: any;
  user: User;
  navigation: any;
  isUpdate: boolean;
  isInvite: boolean;
}) => {
  const { users } = useSelector(
    (state: ReduxState) => state.usersById
  );
  const [image, setImage] = useState("" as any);
  const { id } = useSelector(
    (state: ReduxState) => state.teamMemberAdd.response
  );
  const { teamDetail } = useSelector((state: ReduxState) => state.teamDetail);
  const postProfilePicResponse = useSelector(
    (state: ReduxState) => state.teamProfile.response
  );
  const updateResponse = useSelector(
    (state: ReduxState) => state.teamMemberUpdate.response
  );
  const teamMemberDeleteResponse = useSelector(
    (state: ReduxState) => state.teamMemberDelete.response
  );
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [name, setName] = useState("");
  const [teamMemberItem, setTeamMemberItem] = useState('' as unknown as TeamMemberDetail);

  const isCurrentImage = teamDetail?.profile === image?.uri;
  const isAdmin = teamDetail?.isAdmin;

  //initial with team Detail
  useEffect(() => {
    if (isUpdate) {
      if (teamDetail) {
        setImage({ uri: teamDetail.profile });
        setName(teamDetail.teamName);
        initialMemberLocal(teamDetail.members);
      }
    }
  }, [teamDetail, isUpdate]);

  useEffect(() => {
    // dispatch(
    //   getUsers({
    //     id: user.id,
    //     teamId: teamDetail?.teamId,
    //   })
    // );
    return () => {
      dispatch(clearMemberLocal());
      dispatch(clearTeamMember());
      dispatch(clearPostProfile());
      dispatch(clearLocalUser());
      dispatch(clearDeleteTeamMember());
      if (teamDetail?.isAdmin) {
        dispatch(clearUpdateResponse());
      }
    };
  }, []);

  useEffect(() => {
    if (teamMemberDeleteResponse) {
      dispatch(
        getTeamDetail({
          id: teamDetail.teamId,
          userId: user?.id,
        })
      );
    }
  }, [teamMemberDeleteResponse]);
  //add success
  useEffect(() => {
    if (id) {
      dispatch(
        postTeamProfilePic({
          teamId: id,
          file: image,
        })
      );
    }
  }, [id, dispatch]);

  //isAdmin & update success
  useEffect(() => {
    if (updateResponse) {
      if (teamDetail?.isAdmin && !isCurrentImage) {
        dispatch(
          postTeamProfilePic({
            teamId: teamDetail.teamId,
            file: image,
          })
        );
      } else {
        navigation.goBack();
        dispatch(
          getTeams({
            userId: user?.id,
          })
        );
      }
    }
  }, [dispatch, updateResponse]);

  //After upload Image
  useEffect(() => {
    if (postProfilePicResponse) {
      dispatch(
        getTeams({
          userId: user.id,
        })
      );
      navigation.goBack();
    }
  }, [postProfilePicResponse]);

  //Permission
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const _onChangeTaskName = (value: any) => {
    setName(value);
  };

  const _onPressDone = () => {
    let members = [] as Array<TeamMember>;
    if (isUpdate) {
      dispatch(
        updateTeamMember({
          teamName: name,
          teamId: teamDetail.teamId,
          members: teamDetail.members,
          profile: !isCurrentImage ? image.uri : teamDetail?.profile,
        })
      );
    } else {
      if (
        name === "" ||
        users.filter((item: User) => item.isActive).length === 0
      ) {
        showMessage({
          message: strings.warning.not_full_fill,
          type: "warning",
        });
      } else {
        users.map((item: User) => {
          if (item.isActive) {
            members.push({
              googleUserId: item.googleUserId,
              mail: item.mail,
              memberId: item.id,
              name: item.name,
              profile: item.profile,
              role: item.role,
              userId: user.id,
            });
          }
        });
        dispatch(
          addTeamMember({
            teamName: name,
            profile: "",
            userId: user.id,
            members: members,
          })
        );
      }
    }
  };

  const _onPressAdd = () => {
    navigation.navigate("AddMemberScreen", {
      isTeamMember: true,
    });
  };

  const pickImage = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);
    }
  };

  const imageStyle = () => {
    return {
      ...styles.image,
      width: image ? 80 : 40,
      height: image ? 80 : 40,
    };
  };

  const _onPressDeleteItem = (item: User) => {
    dispatch(deleteLocalUser(item));
  };

  const _onPressDeleteTeamMember = (item: User) => {
    changeModalVisible();
    setTeamMemberItem(item as any);
  };

  const changeModalVisible = () => {
    setIsShowDialog(!isShowDialog);
  };

  const _onPressDelete = () => {
    dispatch(
      deleteTeamMember({
        id: teamMemberItem.teamMemberId,
      })
    );
    changeModalVisible();
  };
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.buttonUpload}
          disabled={!isAdmin && isUpdate}
          onPress={pickImage}
        >
          <Image
            style={imageStyle()}
            source={image !== "" ? { uri: image?.uri as any } : Images.icUpload}
          />
        </TouchableOpacity>
        <AppText
          text={
            isUpdate ? teamDetail?.teamName : strings.create_team_screen.upload
          }
          size={Fonts.size.h6}
          bold
          style={styles.title}
        />
        <AppText
          text={
            isUpdate
              ? teamDetail?.admin.mail
              : strings.create_team_screen.logo_description
          }
          color={Colors.overlay3}
        />
      </View>
      <View style={styles.inputTask}>
        <TextInputForm
          label={"Team name".toUpperCase()}
          disabled={!isAdmin && isUpdate}
          value={name}
          onChangeText={_onChangeTaskName}
        />
      </View>
      <View style={styles.inputTask}>
        <AppText
          text={strings.create_team_screen.member.toUpperCase()}
          color={Colors.appGrayColor}
        />
        <View style={styles.selectContainer}>
          {users.length > 0 || teamDetail?.members.length > 0 ? null : (
            <AppText
              size={Fonts.size.large}
              text={strings.create_team_screen.select_member}
            />
          )}
          <View style={styles.teamContainer}>
            <>
              {isUpdate ? (
                <>
                  {teamDetail?.members.map((item: any) => (
                    <RenderMember
                      key={item.memberId}
                      onPressDeleteItem={_onPressDeleteTeamMember}
                      item={item}
                    />
                  ))}
                </>
              ) : (
                <>
                  {users.map((item: User) => (
                    <>
                      {item.isActive ? (
                        <RenderMember
                          key={item.id}
                          onPressDeleteItem={_onPressDeleteItem}
                          item={item}
                        />
                      ) : null}
                    </>
                  ))}
                </>
              )}
            </>
          </View>
          <View style={styles.buttonAdd}>
            {!isUpdate ? (
              <TouchableOpacity onPress={_onPressAdd}>
                <Ionicons
                  name="add-outline"
                  size={30}
                  color={Colors.appPrimaryColor}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        <Divider />
      </View>

      <View style={styles.buttonDone}>
        {isAdmin || !isUpdate ? (
          <AppButton text={"Done"} onPress={_onPressDone} />
        ) : null}
      </View>
      <AlertDialog
        visible={isShowDialog}
        title={strings.alert.notify}
        content={strings.create_team_screen.delete_member}
        textBtnAccept={strings.alert.accept}
        textBtnOut={strings.alert.cancel}
        onPressButtonLeft={changeModalVisible}
        onPressOut={changeModalVisible}
        onPressSubmit={_onPressDelete}
      />
    </KeyboardAwareScrollView>
  );
};

export default CreateTeamForm;
const RenderMember = ({
  item,
  onPressDeleteItem,
}: {
  item: User;
  onPressDeleteItem?: any;
}) => {
  return (
    <View style={styles.memberContainer}>
      <Image style={styles.profile} source={{ uri: item.profile }} />
      <AppText style={styles.textMemberName} text={item.name} />
      <TouchableOpacity
        style={styles.buttonClose}
        onPress={() => onPressDeleteItem(item)}
      >
        <Ionicons name="close-outline" size={12} />
      </TouchableOpacity>
    </View>
  );
};
