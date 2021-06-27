/* eslint-disable prettier/prettier */
import React, { useMemo } from 'react';
import { Colors } from '../../../../../../../../themes';
import { View, TouchableOpacity } from 'react-native';
import { AppText } from '../../../../../../../../components';
import styles from './styles';
import { Ionicons } from "@expo/vector-icons";
const TextInfo = ({ item, index, onPressItem }: { item: any; index: number; onPressItem: Function }) => {
  return useMemo(() => {
    const _onPressItem = () => {
      onPressItem(item, index);
    };
    return (
      <TouchableOpacity style={styles.textInfoContainer} onPress={_onPressItem}>
        <View style={styles.textContent}>
          <AppText text={item.content} color={item.isActive ? Colors.appPrimaryColor : Colors.appGrayColor} />
        </View>
        <View style={styles.textContent2}>
        <Ionicons
          size={25}
          name={'checkmark'}
          color={!item.isActive ? Colors.appWhite : Colors.appPrimaryColor}
        />
        </View>
      </TouchableOpacity>
    );
  }, [index, item, onPressItem]);
};

export default TextInfo;
