import React, { useState, useEffect } from "react";
import { View, Image, Platform } from "react-native";
import styles from "./styles";
import { User } from "../../../../services/model/User";
import {
  TextInputForm,
  AppText,
  AppButton,
  Divider,
} from "../../../../components";
import { Colors, Images, Fonts } from "../../../../themes";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { clear } from "../../../../redux/task/action/task";
import { useSelector } from "react-redux";
import ReduxState from "../../../../redux/ReduxState";
import {
  getMembers,
  clearMemberLocal,
} from "../../../../redux/member/action/members";
import { CommonActions } from "@react-navigation/native";
import { strings } from "../../../../languages";
import * as ImagePicker from "expo-image-picker";
import {
  postTeamProfilePic,
  clearTeamMember as clearPostProfile,
} from "../../../../redux/team/action/teamProfile";
import {
  addTeamMember,
  clearTeamMember,
} from "../../../../redux/team/action/teamMemberAdd";
import {
  clearLocalUser,
  deleteLocalUser,
  initialMemberLocal,
} from "../../../../redux/user/reducer/usersById";
import { TeamMember } from "../../../../services/model/request/TeamMember";
import { getTeams } from "../../../../redux/team/action/teamsMemberByUserId";
import { getTeamDetail } from "../../../../redux/team/action/teamDetail";
import { updateTeamMember } from "../../../../redux/team/action/teamMemberUpdate";
import { TeamMemberDetail } from "../../../../services/model/TeamMember";

const BoardForm = ({
  dispatch,
  user,
  navigation,
  isUpdate,
}: {
  dispatch: any;
  user: User;
  navigation: any;
  isUpdate: boolean;
}) => {
  const { usersLocal, users } = useSelector(
    (state: ReduxState) => state.usersById
  );
  const [image, setImage] = useState("" as any);
  const { response } = useSelector((state: ReduxState) => state.task);
  const { id } = useSelector(
    (state: ReduxState) => state.teamMemberAdd.response
  );
  const { teamDetail } = useSelector((state: ReduxState) => state.teamDetail);
  const postProfilePicResponse = useSelector(
    (state: ReduxState) => state.teamProfile.response
  );
  const isAdmin = teamDetail?.isAdmin;
  const [name, setName] = useState("");

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
    if (users.length == 0) {
      dispatch(
        getMembers({
          userId: user.id,
        })
      );
    }
    return () => {
      dispatch(clearMemberLocal());
      dispatch(clearTeamMember());
      dispatch(clearPostProfile());
      dispatch(clearLocalUser());
    };
  }, []);

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

  useEffect(() => {
    if (response) {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "HomeTabNavigation" }],
        })
      );
      dispatch(clear());
    }
  }, [response]);
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
        })
      );
    } else {
      usersLocal.map((item: User) => {
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

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.buttonUpload}
          disabled={!isAdmin}
          onPress={pickImage}
        >
          <Image
            style={imageStyle()}
            source={image !== "" ? { uri: image?.uri as any } : Images.icUpload}
          />
        </TouchableOpacity>
        <AppText
          text={strings.create_team_screen.upload}
          size={Fonts.size.h6}
          bold
          style={styles.title}
        />
        <AppText
          text={strings.create_team_screen.logo_description}
          color={Colors.overlay3}
        />
      </View>
      <View style={styles.inputTask}>
        <TextInputForm
          label={"Team name".toUpperCase()}
          disabled={!isAdmin}
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
          {usersLocal.length > 0 || teamDetail?.members.length > 0 ? null : (
            <AppText
              size={Fonts.size.large}
              text={strings.create_team_screen.select_member}
            />
          )}
          <View style={styles.teamContainer}>
            <>
              {!isAdmin ? (
                <>
                  {teamDetail?.members.map((item: any) => (
                    <RenderMember
                      key={item.teamId}
                      onPressDeleteItem={_onPressDeleteItem}
                      item={item}
                    />
                  ))}
                </>
              ) : (
                <>
                  {usersLocal.map((item: User) => (
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
            <TouchableOpacity onPress={_onPressAdd} disabled={!isAdmin}>
              <Ionicons
                name="add-outline"
                size={30}
                color={Colors.appPrimaryColor}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Divider />
      </View>

      <View style={styles.buttonDone}>
        {isAdmin ? <AppButton text={"Done"} onPress={_onPressDone} /> : null}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default BoardForm;
const RenderMember = ({
  item,
  onPressDeleteItem,
}: {
  item: User;
  onPressDeleteItem?: any;
}) => {
  console.log(item);
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
