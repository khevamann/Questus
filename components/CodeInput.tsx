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

import { color, fonts } from '../util/theme';
const CODE_LENGTH = new Array(4).fill(0);

type StateTypes = {
  value: string;
};

export default class App extends Component {
  input: React.RefObject<any> = React.createRef();
  state: StateTypes = {
    value: '',
  };

  handleClick = () => {
    this.input.current.focus();
  };
  handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (e.nativeEvent.key === 'Backspace') {
      this.setState((state: StateTypes) => {
        return {
          value: state.value.slice(0, state.value.length - 1),
        };
      });
    }
  };
  handleChange = (value: string) => {
    this.setState((state: StateTypes) => {
      if (state.value.length >= CODE_LENGTH.length) return null;
      return {
        value: (state.value + value).slice(0, CODE_LENGTH.length),
      };
    });
  };
  render() {
    const { value } = this.state;

    const values = value.split('');

    const selectedIndex =
      values.length < CODE_LENGTH.length
        ? values.length
        : CODE_LENGTH.length - 1;

    const hideInput = !(values.length < CODE_LENGTH.length);

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
              selectionColor={color.transparent}
              style={[
                styles.input,
                {
                  left: selectedIndex * 90 + 10,
                  opacity: hideInput ? 0 : 1,
                },
              ]}
            />
            {CODE_LENGTH.map((v, index) => {
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
    backgroundColor: 'transparent',
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
    marginTop: 7,
    fontFamily: fonts.bungee,
    color: color.blue,
    fontSize: 50,
  },
  noBorder: {
    borderRightWidth: 0,
  },
});
