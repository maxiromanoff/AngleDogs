import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Header } from '../../components';
import { Layout } from '../../views';
import DeviceInfo from 'react-native-device-info';
import { scale } from '../../utils/resolutions';
import { fontSize } from '../../constants';


const SettingScreen = () => {
  return (
    <Layout>
      <Header title="Settings" />
      <View style={styles.appInfo}>
        <View style={styles.appName}>
          <Text bold style={styles.title}>App Name: </Text>
          <Text>{DeviceInfo.getApplicationName()}</Text>
        </View>
        <View style={styles.version}>
          <Text bold style={styles.title}>Version: </Text>
          <Text>{DeviceInfo.getVersion()}</Text>
        </View>
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  appInfo: {
    paddingHorizontal: scale(15),
  },
  title: {
    fontSize: fontSize.normal,
    marginRight: scale(10),
  },
  appName: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(8),
  },
  version: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default SettingScreen;
