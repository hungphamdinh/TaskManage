import React from "react";
import { useFormik } from "formik";
import RecursiveContainer from "./components/RecursiveContainer";
import { View, StyleSheet } from "react-native";
import { AppButton } from "../../components";
import { Metrics } from "../../themes";
import { strings } from "../../languages";
const response = [
  {
    type: "text",
    field: "name",
    label: "User's name",
    style: {
      color: "green",
      margin: "10px",
    },
  },
  {
    type: "number",
    field: "number",
    label: "User's age",
    style: {
      color: "green",
      margin: "10px",
    },
  },
  {
    type: "array",
    field: "user",
    children: [
      {
        type: "text",
        field: "user.hobbies",
        label: "User's hobbies",
        style: {
          color: "green",
          margin: "10px",
        },
      },
      {
        type: "text",
        field: "user.os",
        label: "User's operating system",
        style: {
          color: "green",
          margin: "10px",
        },
      },
    ],
  },
];
const DynamicFormScreen = () => {
  const formik = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <>
      <RecursiveContainer config={response} formik={formik} />
      <View style={styles.loginButton}>
        <AppButton
          onPress={formik.handleSubmit}
          text={strings.auth_info.login.toUpperCase()}
        />
      </View>
    </>
  );
};

export default DynamicFormScreen;

const styles = StyleSheet.create({
  loginButton: {
    marginTop: Metrics.margin.large,
  },
});
