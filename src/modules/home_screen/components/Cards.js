import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import Shimmer from 'react-native-shimmer';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, FlatList, View, Image, Dimensions } from 'react-native';

import routes from '../../routes';
import { colors, fontSize } from '../../../constants';
import { useStore } from '../../../context';
import { Text, Button } from '../../../components';
import { hScale, scale } from '../../../utils/resolutions';

const CARD_WIDTH = Dimensions.get('window').width / 2 - scale(20)

const Cards = ({ textFilter }) => {
  const navigation = useNavigation();
  const {
    dogsStore: { fetchListItemApi, filterItems, listItems },
  } = useStore();

  useEffect(() => {
    fetchListItemApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gotoDetail = (name) => {
    navigation.navigate(routes.DETAIL_SCREEN, { name });
  };

  const keyExtractor = (item, index) => `${String(item)}-${index}`;

  const renderItem = ({ item }) => {
    return (
      <Button style={styles.cards} onPress={() => gotoDetail(item)}>
        <Image
          style={styles.logo}
          source={require('../../../Images/dog_icon.png')}
        />
        <Text style={styles.itemName}>{item}</Text>
      </Button>
    );
  };

  if (listItems.length === 0) {
    return (
      <View style={styles.loadingsContainer}>
        {[1, 2, 3, 4, 5, 6].map(i => (
          <Shimmer key={i} style={styles.loading}>
          </Shimmer>
        ))}
      </View>
    );
  }

  return (
    <FlatList
      data={textFilter
        ? filterItems(textFilter)
        : listItems
      }
      numColumns={2}
      initialNumToRender={10}
      renderItem={renderItem}
      removeClippedSubviews
      style={styles.flatlist}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  flatlist: {
    paddingVertical: scale(8),
    paddingHorizontal: scale(9),
  },
  cards: {
    marginTop: scale(2),
    height: hScale(135),
    width: CARD_WIDTH,
    marginBottom: scale(6),
    borderRadius: scale(6),
    marginHorizontal: scale(5),
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  itemName: {
    color: colors.brown_1,
    textTransform: 'capitalize',
    fontSize: fontSize.smallest,
    textAlign: 'center',
    paddingVertical: scale(2),
  },
  logo: {
    width: CARD_WIDTH,
    height: hScale(110),
    borderTopLeftRadius: scale(6),
    borderTopRightRadius: scale(6),
  },
  loadingsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: scale(15),
  },
  loading: {
    width: '46%',
    height: hScale(115),
    backgroundColor: colors.yellow_1,
    marginHorizontal: scale(6),
    marginVertical: scale(6),
  },
});

export default observer(Cards);
