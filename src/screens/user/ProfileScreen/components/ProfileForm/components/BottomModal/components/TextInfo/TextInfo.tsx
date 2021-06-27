/* eslint-disable prettier/prettier */
import React, { useMemo } from 'react';
import { Colors } from '../../../../../../../themes';
import { View, TouchableOpacity } from 'react-native';
import { AppText } from '../../../../../../../components';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HomeItem } from '../../../../../../../services/model/Product';
const TextInfo = ({ item, index, onPressItem }: { item: HomeItem; index: number; onPressItem: Function }) => {
  return useMemo(() => {
    const _onPressItem = () => {
      onPressItem(item, index);
    };
    return (
      <TouchableOpacity style={styles.textInfoContainer} onPress={_onPressItem}>
        <View style={styles.textContent}>
          <AppText text={item.content} color={item.isActive ? Colors.appPrimaryColor : Colors.appTextGray} />
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
