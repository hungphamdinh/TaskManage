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
// import * as Google from "expo-google-app-auth";
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from "../../services/google";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { loginWithEmail } from "../../redux/user/reducer/user";
import ReduxState from "../../redux/ReduxState";
// import * as WebBrowser from 'expo-web-browser';
import * as Google from "expo-auth-session/providers/google";
import UserAPI from "../../services/api/UserAPI";
const config = {
  expoClientId:
    "236664760197-n5ccjmtddest9e2p3dcsah2j51gulqd5.apps.googleusercontent.com",
  androidClientId: ANDROID_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
  webClientId:
    "236664760197-994074nhkda8nqv52br8rshiuuamqe2u.apps.googleusercontent.com",
  // scopes: ["profile", "email"],
};

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const dispatch = useDispatch();
  const [googleResult, setGoogleResult] = useState(
    (undefined as unknown) as any
  );
  const { user } = useSelector((state: ReduxState) => state.user);
  const [error, setError] = useState("");
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "236664760197-n5ccjmtddest9e2p3dcsah2j51gulqd5.apps.googleusercontent.com",
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    webClientId:
      "236664760197-994074nhkda8nqv52br8rshiuuamqe2u.apps.googleusercontent.com",
    // scopes: ["profile", "email"],
  });
  useLayoutEffect(() => {
    navigation.setOptions({
      //   title: strings.update_password_screen.title,
      headerBackTitle: " ",
    });
  });

  useEffect(() => {
    if (googleResult) {
      dispatch(
        loginWithEmail({
          userId: googleResult.id,
          name: googleResult.name,
          profile: googleResult.picture,
          mail: googleResult.email,
          role: "",
        })
      );
    }
  }, [googleResult]);

  React.useEffect(() => {
    async function fetchMyAPI() {
      if (response?.type === "success") {
        const { authentication } = response;
        if (authentication) {
          try {
            let userInfoResponse = await UserAPI.getGoogleUserInfo(
              authentication.accessToken
            );
            setGoogleResult(userInfoResponse);
          } catch (error) {
            console.log(error);
            setError(error);
          }
        }
      }
    }
    fetchMyAPI();
  }, [response]);

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
        {/* {googleResult ? (
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
        ) : ( */}
        <View style={styles.loginContainer}>
          <TouchableOpacity
            style={styles.buttonLoginByGoogle}
            onPress={() => {
              promptAsync();
            }}
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
        {/* )} */}
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
