import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { colors, fontSize } from '../constants';
import { scale } from '../utils/resolutions';

const Input = ({
  name,
  handleChange,
  handleBlur,
  values,
  errors,
  touched,
  ...rest
}) => {
  return (
    <View>
      <TextInput
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        value={values[name]}
        {...rest}
      />
      {errors && touched && errors[name] && touched[name]
        ? <Text style={styles.error}>{errors[name]}</Text>
        : null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  error: {
    color: colors.red,
    fontSize: fontSize.tiny,
    marginLeft: scale(5),
  },
});

export default Input;
