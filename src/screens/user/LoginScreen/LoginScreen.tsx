import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { strings } from "../../../languages/index";
import { Colors, Metrics, Images, Fonts, Styles } from "../../../themes";
import { AppText, TextInputForm, AppButton } from "../../../components";
import * as Google from "expo-google-app-auth";
import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from "../../../services/google";
import { useSelector } from "react-redux";
import ReduxState from "../../../redux/ReduxState";

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email(strings.auth_info.warning.email)
    .required(strings.auth_info.warning.email_required),
  password: yup
    .string()
    .min(
      8,
      ({ min }) =>
        `${strings.auth_info.warning.password_least} ${min} ${strings.auth_info.warning.characters}`
    )
    .required(strings.auth_info.warning.password_required),
});
const state = {
  email: "email",
  password: "password",
};

const config = {
  androidClientId: ANDROID_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
  scopes: ["profile", "email"],
};

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [googleResult, setGoogleResult] = useState(
    (undefined as unknown) as any
  );
  const { user } = useSelector((state: ReduxState) => state.user);
  const [error, setError] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      //   title: strings.update_password_screen.title,
      headerBackTitle: " ",
    });
  });

  useEffect(() => {
    fetchUserInfo();
  }, [googleResult]);

  const fetchUserInfo = async () => {
    if (googleResult) {
      let userInfoResponse = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${googleResult.accessToken}` },
        }
      );
      // console.log(userInfoResponse);
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

  const _onSubmit = (value: any) => {
    navigation.navigate("SignUpScreen");
  };

  const _onPressSignInWithGoogle = async () => {
    const result: any = await signInWithGoogleAsync();
    if (result.error || result.cancelled) {
      setError(result?.toString() as any);
    } else {
      setGoogleResult(result as any);
    }
  };
  const { email, password } = state;
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
            <Formik
              validateOnMount={true}
              validationSchema={loginValidationSchema}
              initialValues={{ email: "", password: "" }}
              onSubmit={_onSubmit}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isValid,
              }) => (
                <>
                  <TextInputForm
                    key={email}
                    placeholder={strings.auth_info.email_address}
                    label={strings.auth_info.email}
                    autoFocus={true}
                    style={styles.textInput}
                    onChangeText={handleChange(email)}
                    onBlur={handleBlur(email)}
                    value={values.email}
                    keyboardType="email-address"
                  />
                  {errors.email && touched.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}

                  <TextInputForm
                    key={password}
                    placeholder={strings.auth_info.password}
                    label={strings.auth_info.password}
                    style={styles.textInput}
                    onChangeText={handleChange(password)}
                    onBlur={handleBlur(password)}
                    value={values.password}
                    secureTextEntry
                  />
                  {errors.password && touched.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                  <View style={styles.loginButton}>
                    <AppButton
                      onPress={() => handleSubmit()}
                      text={strings.auth_info.login.toUpperCase()}
                      disabled={!isValid || values.email === ""}
                    />
                  </View>
                </>
              )}
            </Formik>
            <View style={styles.buttonSignUp}>
              <TouchableOpacity onPress={_onPressSignInWithGoogle}>
                <AppText
                  bold
                  color={Colors.appPrimaryColor}
                  text={"Register new Account"}
                />
              </TouchableOpacity>
            </View>
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
  title: {
    textAlign: "center",
  },
  subTitle: {
    textAlign: "center",
    // marginVertical: Metrics.margin.regular,
    marginHorizontal: Metrics.margin.huge + 10,
  },
  loginButton: {
    marginTop: Metrics.margin.large,
  },
  buttonSignUp: {
    marginTop: Metrics.margin.regular,
    alignItems: "center",
  },
  or: {
    alignItems: "center",
    marginVertical: Metrics.margin.regular,
  },
});

export default LoginScreen;
