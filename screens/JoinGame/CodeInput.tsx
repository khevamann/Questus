import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from 'react-native';

import { color, fonts } from '../../util/theme';

type Props = {
  updateCode(code: string): any;
  code: string;
};

export default class CodeInput extends Component<Props> {
  input: React.RefObject<any> = React.createRef();

  handleClick = () => {
    this.input.current.focus();
  };
  handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    const { code } = this.props;
    if (e.nativeEvent.key === 'Backspace') {
      this.props.updateCode(code.slice(0, code.length - 1));
    }
  };
  handleChange = (newVal: string): any => {
    const { code } = this.props;
    newVal = newVal.replace(/[\W_]/, '').toUpperCase();
    if (!newVal || code.length >= 4) return null;
    this.props.updateCode(code + newVal);
  };
  render() {
    const { code } = this.props;

    const values = code.split('');
    const selectedIndex = values.length < 4 ? values.length : 3;
    const hideInput = !(values.length < 4);

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.handleClick}>
          <View style={styles.wrap}>
            <TextInput
              value=""
              ref={this.input}
              onChangeText={this.handleChange}
              onKeyPress={this.handleKeyPress}
              autoFocus
              autoCapitalize="characters"
              selectionColor={color.transparent}
              style={[
                styles.input,
                {
                  left: selectedIndex * 90 + 10,
                  opacity: hideInput ? 0 : 1,
                },
              ]}
            />
            {[...Array(4)].map((v, index) => {
              return (
                <View style={[styles.display]} key={index}>
                  <Text style={styles.text}>{values[index] || ''}</Text>
                </View>
              );
            })}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 40,
  },
  wrap: {
    position: 'relative',
    flexDirection: 'row',
  },

  input: {
    position: 'absolute',
    fontSize: 32,
    textAlign: 'center',
    backgroundColor: color.transparent,
    color: color.transparent,
    borderColor: color.blue,
    borderWidth: 5,
    borderRadius: 10,
    width: 70,
    height: 70,
    top: 10,
    bottom: 0,
  },
  display: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: color.blue,
    width: 70,
    height: 70,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  text: {
    marginTop: 8,
    fontFamily: fonts.bungee,
    color: color.blue,
    fontSize: 50,
    lineHeight: 50,
  },
});
