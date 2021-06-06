import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';
import Button from './Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, fontSize } from '../constants';
import { scale } from '../utils/resolutions';
import { useNavigation } from '@react-navigation/native';

const Header = ({ title }) => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Button onPress={goBack}>
        <Ionicons name="arrow-back" size={25} color={colors.black} />
      </Button>
      <Text bold style={styles.title}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(12),
    paddingHorizontal: scale(15),
    marginBottom: scale(12),
  },
  title: {
    fontSize: fontSize.larger,
    marginLeft: scale(10),
  },
});

export default Header;
