import React from 'react';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import Text from './Text';
import Button from './Button';
import { colors, fontSize } from '../constants';
import { scale } from '../utils/resolutions';

const Header = ({ title }) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <Button style={styles.container} onPress={handleGoBack}>
      <Ionicons name="arrow-back" size={24} color={colors.brown_1} />
      <Text style={styles.title}>{title}</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(15),
    marginTop: scale(15),
    marginBottom: scale(10),
  },
  title: {
    fontSize: fontSize.fontSize14,
    color: colors.brown_1,
    marginLeft: scale(8),
  },
});

export default React.memo(Header);