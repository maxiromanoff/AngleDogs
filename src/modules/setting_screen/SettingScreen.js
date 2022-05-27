import React from 'react';
import { View, StyleSheet } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import { Layout } from '../../views';
import { Text, Header } from '../../components';
import { scale } from '../../utils/resolutions';
import { colors, fontSize } from '../../constants';

const SettingScreen = () => {
  return (
    <Layout>
      <Header title="Settings" />
      <View style={styles.appInfo}>
        <Text style={styles.title}>Version:{' '}{DeviceInfo.getVersion()}</Text>
        <Text style={styles.message}>{'A gift for all dog lovers around the world !'}</Text>
      </View>
      <View style={styles.copyright}>
        <Text style={styles.textCopyright}>{'Copyright © maxiromanoff'}</Text>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  appInfo: {
    marginTop: scale(8),
    paddingHorizontal: scale(15),
  },
  title: {
    color: colors.brown_1,
    fontSize: fontSize.small,
    marginBottom: scale(8),
  },
  message: {
    color: colors.brown_1,
    fontSize: fontSize.small,
  },
  copyright: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
  },
  textCopyright: {
    fontSize: fontSize.smallest,
    textAlign: 'center',
    color: colors.brown_1,
  },
});

export default React.memo(SettingScreen);