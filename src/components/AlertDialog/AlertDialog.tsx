import React from 'react';
import { View, TouchableOpacity, Modal } from 'react-native';

import styles from './styles';
import AppText from '../AppText';
import { Colors, Fonts } from '../../themes';

export default ({
  visible = false,
  title,
  content,
  onPressSubmit = () => {},
  onPressOut = () => {},
  onPressButtonLeft = () => {},
  textBtnOut,
  textBtnAccept,
  textButtonLeftColor,
  isOneButton,
  noButton,
}: {
  visible: boolean;
  title?: string;
  content: string;
  onPressSubmit?: Function;
  onPressOut?: Function;
  onPressButtonLeft?: Function;
  textBtnOut?: string;
  textBtnAccept?: string;
  isOneButton?: boolean;
  textButtonLeftColor?: string;
  noButton?: boolean;
}) => {
  const _onPressOut = () => {
    onPressOut();
  };

  const _onPressSubmit = () => {
    onPressSubmit();
  };

  const _onPressButtonNo = () => {
    onPressButtonLeft();
  };
  return visible ? (
    <Modal transparent={true} visible={visible} onRequestClose={_onPressOut}>
      <TouchableOpacity
        style={styles.container}
        onPress={_onPressOut}
        activeOpacity={1}>
        <TouchableOpacity style={styles.modal} activeOpacity={1}>
          <View style={styles.modalContent}>
            {title ? (
              <AppText
                style={styles.title}
                text={title}
                bold
                center
                size={Fonts.size.large}
              />
            ) : null}

            <AppText
              style={styles.content}
              text={content}
              size={Fonts.size.large}
            />
          </View>
          <>
            {noButton ? null : (
              <View style={styles.buttonContainer}>
                {isOneButton ? (
                  <TouchableOpacity
                    style={styles.buttonAccept}
                    onPress={_onPressSubmit}>
                    <AppText
                      text={textBtnAccept}
                      color={Colors.appGreen}
                      bold
                    />
                  </TouchableOpacity>
                ) : (
                  <>
                    <TouchableOpacity
                      style={styles.buttonNo}
                      onPress={
                        onPressButtonLeft ? _onPressButtonNo : _onPressOut
                      }>
                      <AppText
                        color={
                          textButtonLeftColor
                            ? textButtonLeftColor
                            : Colors.appTextBlack
                        }
                        bold={textButtonLeftColor ? true : false}
                        text={textBtnOut}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.buttonYes}
                      onPress={_onPressSubmit}>
                      <AppText
                        text={textBtnAccept}
                        color={Colors.appGreen}
                        bold
                      />
                    </TouchableOpacity>
                  </>
                )}
              </View>
            )}
          </>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  ) : null;
};
