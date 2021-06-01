import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Image,
} from "react-native";
import { strings } from "../../languages/index";
import { Colors, Metrics, Images, Fonts, Styles } from "../../themes";
import { AppText, AppButton } from "../../components";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Google from "expo-google-app-auth";
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from "../../services/google";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { loginWithEmail } from "../../redux/user/reducer/user";
import ReduxState from "../../redux/ReduxState";

const config = {
  androidClientId: ANDROID_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
  scopes: ["profile", "email"],
};

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const [googleResult, setGoogleResult] = useState(
    (undefined as unknown) as any
  );
  const {user} = useSelector((state: ReduxState) => state.user);
  const [, setError] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      //   title: strings.update_password_screen.title,
      headerBackTitle: " ",
    });
  });

  useEffect(() => {
    if (googleResult) {
      const { user } = googleResult;
      dispatch(
        loginWithEmail({
          userId: user.id,
          name: user.name,
          profile: user.photoUrl,
          mail: user.email,
          role: "Developer",
        })
      );
    }
  }, [googleResult]);

  const fetchUserInfo = async () => {
    if (googleResult) {
      let userInfoResponse = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${googleResult.accessToken}` },
        }
      );
      console.log(userInfoResponse);
    }
  };
  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync(config);

      if (result.type === "success") {
        return result;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  const _onPressSignInWithGoogle = async () => {
    const result: any = await signInWithGoogleAsync();
    if (result.error || result.cancelled) {
      setError(result?.toString() as any);
    } else {
      setGoogleResult(result as any);
    }
  };
  return (
    <ScrollView style={Styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.logo}
          source={Images.logo}
          resizeMode={"contain"}
        />
        <AppText
          bold
          size={Fonts.size.h2}
          text={strings.login_screen.title}
          style={styles.title}
        />
        <AppText
          size={Fonts.size.regular}
          text={strings.login_screen.sub_title}
          style={styles.subTitle}
        />
        {googleResult ? (
          <AppButton
            onPress={async () => {
              setGoogleResult(undefined);
              await Google.logOutAsync({
                accessToken: googleResult.accessToken,
                ...config,
              });
            }}
            text={"Log Out"}
          />
        ) : (
          <View style={styles.loginContainer}>
            <TouchableOpacity
              style={styles.buttonLoginByGoogle}
              onPress={_onPressSignInWithGoogle}
            >
              <View style={styles.logoContainer}>
                <AppText text={"Sign in with"} />
                <Image
                  style={styles.logoGoogle}
                  source={Images.logoGoogle}
                  resizeMode={"contain"}
                />
              </View>
              <View style={styles.imageArrow}>
                <Ionicons name="arrow-forward" size={20} color="#6B8CFF" />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: Metrics.screenHeight / 10,
  },
  loginContainer: {
    width: "100%",
    paddingHorizontal: Metrics.margin.huge,
    marginTop: Metrics.screenHeight / 8,
  },
  textInput: {
    height: 40,
    width: "100%",
    margin: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },
  errorText: {
    fontSize: 10,
    color: "red",
  },
  logo: {
    width: Metrics.screenWidth / 2,
    height: Metrics.screenHeight / 6,
  },
  logoGoogle: {
    width: 50,
    height: 50,
    marginLeft: Metrics.margin.large,
  },
  title: {
    textAlign: "center",
    marginBottom: Metrics.margin.huge,
  },
  subTitle: {
    textAlign: "center",
    // marginVertical: Metrics.margin.regular,
    marginHorizontal: Metrics.margin.huge + 10,
  },
  buttonLoginByGoogle: {
    marginTop: Metrics.margin.regular,
    backgroundColor: Colors.appWhite,
    paddingVertical: Metrics.margin.regular,
    paddingHorizontal: Metrics.margin.huge,
    borderRadius: Metrics.borderRadius.regular,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  imageArrow: {
    backgroundColor: Colors.appBackgroundColor,
    padding: Metrics.margin.regular,
    borderRadius: Metrics.borderRadius.regular,
  },
});

export default LoginScreen;
