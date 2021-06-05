import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import { Indicator, AppText } from "../components";
import { Styles } from "../themes";
import RootNavigation from "./RootNavigation";
import { connect } from "react-redux";
import FlashMessage from "react-native-flash-message";
class Main extends Component {
  state = {
    isShowIndicator: false,
  };

  componentWillReceiveProps = (nextProp: any) => {
    const {isShowIndicator} = this.props as any;
    if (isShowIndicator != nextProp.isShowIndicator) {
      this.setState({ isShowIndicator: nextProp.isShowIndicator });
    }
  };

  handlerPressBackDrop = () => {
    this.setState({
      isShowIndicator: false,
    });
  };

  render() {
    const { backDropColor } = this.props as any;
    const { isShowIndicator } = this.state;
    return (
      <View style={Styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <Indicator
          visible={isShowIndicator}
          backdropColor={backDropColor}
          onPressBackDrop={this.handlerPressBackDrop}
        />
        <FlashMessage position="top" />

        <RootNavigation />
      </View>
    );
  }
}
const mapStateToProp = (state: any) => ({
  isShowIndicator: state.app.isShowIndicator,
  backDropColor: state.app.backdropColor,
});

const mapDispatchToProp = {};

export default connect(mapStateToProp, mapDispatchToProp)(Main);
