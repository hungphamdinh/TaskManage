import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

export default class Divider extends Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    color: PropTypes.string,
  };

  render() {
    const { style, width, height, color } = this.props;

    return (
      <View
        style={[
          {
            width: width ? width : styles.divider.width,
            height: height ? height : styles.divider.height,
            backgroundColor: color ? color : styles.divider.backgroundColor,
          },
          style,
        ]}
      />
    );
  }
}
