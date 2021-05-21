import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Text } from 'react-native';
import { Colors } from '../../themes';
import styles from './styles';
import AppText from '../AppText';
import { strings } from '../../languages';
import { Metrics } from '../../themes';
export default (props: any) => {
  const { inputRef, label, isValidate = false } = props;
  const [isFocus, setIsFocus] = useState(false);
  const _onFocus = () => {
    setIsFocus(true);
  };

  const _onBlur = () => {
    setIsFocus(false);
  };
  function borderProps() {
    if (isFocus) {
      return {
        marginTop: Metrics.margin.large,
        marginBottom: Metrics.margin.small,
        paddingBottom: Metrics.margin.regular,
        borderBottomWidth: 2,
        borderBottomColor: Colors.overlay5,
      };
    } else {
      return {
        marginTop: Metrics.margin.large,
        marginBottom: Metrics.margin.small,
        paddingBottom: Metrics.margin.regular,
        borderBottomWidth: 1,
        borderBottomColor: Colors.appGrayColor,
      };
    }
  }
  let lineStyle = {
    ...borderProps(),
  };
  return (
    <View style={lineStyle}>
      <Text style={styles.textTextInput}>
        <AppText text={label} color={Colors.appGrayColor} />
        {isValidate ? (
          <AppText
            style={styles.textValidate}
            text={strings.common.blank_input}
          />
        ) : null}
      </Text>

      <TextInput
        onFocus={_onFocus}
        onBlur={_onBlur}
        {...props}
        style={styles.textInput}
        ref={inputRef}
      />
    </View>
  );
};
