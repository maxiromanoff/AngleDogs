import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import RNBootSplash from 'react-native-bootsplash';
import Ionicons from 'react-native-vector-icons/Ionicons';

import routes from '@routes';
import { Layout } from '@views';
import { Cards } from './components';
import { Text, Button } from '@components';
import { colors, fontSize } from '@constants';
import { scale } from '@utils/resolutions';

const HomeScreen = ({ navigation }) => {
  const [textFilter, setTextFilter] = useState(null);

  const gotoSetting = () => {
    navigation.navigate(routes.SETTING_SCREEN);
  };

  useEffect(() => {
    RNBootSplash.hide();
  }, []);

  return (
    <Layout>
      <View style={styles.header}>
        <Text style={styles.appName}>Find the best pet</Text>
        <Button onPress={gotoSetting}>
          <Ionicons name="settings-outline" size={24} color={colors.brown_1} />
        </Button>
      </View>

      <View style={styles.searchPet}>
        <View style={styles.search}>
          <Button style={styles.btnSearch}>
            <Feather
              name="search"
              size={scale(20)}
              color={colors.brown_1}
              style={styles.iconSearch}
            />
          </Button>
          <TextInput
            placeholder="Search here"
            returnKeyType="search"
            style={styles.input}
            multiline={true}
            placeholderTextColor={colors.pink}
            onChangeText={text => setTextFilter(text)}
          />
        </View>
      </View>
      <Cards {...{ textFilter }} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
    marginTop: scale(15),
    marginBottom: scale(10),
  },
  appName: {
    fontSize: fontSize.fontSize14,
    color: colors.brown_1,
  },
  searchPet: {
    paddingHorizontal: scale(15),
    marginBottom: scale(5),
  },
  search: {
    borderRadius: scale(6),
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  input: {
    paddingLeft: scale(42),
    paddingVertical: scale(8),
    fontSize: fontSize.fontSize13,
  },
  iconSearch: {
    position: 'absolute',
    top: 12,
    left: 15,
    zIndex: 99999,
  },
});

export default HomeScreen;
