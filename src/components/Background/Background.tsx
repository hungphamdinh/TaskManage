import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors, Images, Metrics, Fonts } from "../../themes";
import { AppText } from "..";
import { Ionicons } from "@expo/vector-icons";

const Background = ({
  mainComponent,
  navigation,
}: {
  mainComponent: any;
  navigation: any;
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Image resizeMode={"contain"} source={Images.bg} style={styles.bg} />
      <TouchableOpacity
        style={styles.buttonBack}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={30} color={Colors.appWhite} />
        <AppText
          size={Fonts.size.h6}
          text={"Add Tasks"}
          color={Colors.appWhite}
          bold
        />
      </TouchableOpacity>
      <View style={styles.mainContainer}>{mainComponent}</View>
    </SafeAreaView>
  );
};

export default Background;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appSecondaryColor,
  },
  bg: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    opacity: 1,
    backgroundColor: Colors.appPrimaryColor,
  },
  buttonBack: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: Metrics.margin.regular,
    marginTop: Metrics.margin.large,
  },
  mainContainer: {
    backgroundColor: Colors.appSecondaryColor,
    flexGrow: 1,
    marginTop: 40,
    borderRadius: 40,
  },
});
