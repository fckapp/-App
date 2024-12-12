// src/components/TextInputWithIcon.js
import React from 'react';
import { View, TextInput, Text, StyleSheet, Image } from 'react-native';

export const BoxTextInput = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  errorMessage = '',
  onBlur,
}) => {

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, errorMessage && styles.invalidInput]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#b0b0b0"
          secureTextEntry={secureTextEntry}
          onBlur={onBlur}
        />
      </View>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d0d0d0',
    borderRadius: 5,
    marginBottom: 10,
    paddingVertical: 3,
  },
  invalidInput: {
    borderColor: '#fa0202',
    borderWidth: 2,
  },
  input: {
    flex: 1,
    fontSize: 14,
    marginHorizontal: 10,
  },
  errorText: {
    color: '#fa0202',
    fontSize: 14,
    marginBottom: 10,
  },
});
