import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  LogBox,
} from 'react-native';
import { Text, Button } from '../../../components';
import DATA from './data';
import { colors } from '../../../constants';
import { hScale } from '../../../utils/resolutions';
import { useNavigation } from '@react-navigation/native';
import routes from '../../routes';

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

const WIDTH = (Dimensions.get('window').width - 60) / 2;

const Cards = () => {

  const navigation = useNavigation();

  const gotoDetail = id => {
    navigation.navigate(routes.DETAIL_SCREEN, { id })
  }

  const keyExtractor = item => String(item.id);

  const renderItem = ({ item }) => {
    return (
      <Button style={styles.card} onPress={() => gotoDetail(item.id)}>
        <Image
          source={{ uri: item.avatar }}
          style={styles.image}
        />
        <View style={styles.title}>
          <Text bold style={styles.itemName}>{item.name}</Text>
        </View>
      </Button>
    )
  };

  return (
    <ScrollView>
      <FlatList
        numColumns={2}
        data={DATA}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
    borderRadius: 25,
  },
  image: {
    width: WIDTH,
    height: hScale(210),
    borderRadius: 25,
    backgroundColor: colors.gray,
    opacity: 0.8,
  },
  itemName: {
    color: colors.white,
  },
  title: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    zIndex: 99999,
  }
});

export default Cards;
