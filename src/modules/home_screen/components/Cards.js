import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, FlatList, View, Image, Dimensions } from 'react-native';

import routes from '../../routes';
import { colors, fontSize } from '../../../constants';
import { useStore } from '../../../context';
import { Text, Button } from '../../../components';
import { hScale, scale } from '../../../utils/resolutions';

const CARD_WIDTH = Dimensions.get('window').width / 2 - scale(20)

const Cards = ({ textFilter }) => {
  const {
    dogsStore: { listItems, fetchListItemApi, filterItems },
  } = useStore();

  useEffect(() => {
    fetchListItemApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigation = useNavigation();

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

  if (!listItems) {
    return (
      <View style={styles.loadings}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
          <View style={styles.loading} key={n} />
        ))}
      </View>
    );
  }

  return (
    <FlatList
      data={textFilter ? filterItems(textFilter) : listItems}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      initialNumToRender={20}
      numColumns={2}
      removeClippedSubviews
      showsVerticalScrollIndicator={false}
      style={styles.flatlist}
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
  loadings: {
    paddingHorizontal: scale(15),
  },
  loading: {
    backgroundColor: '#f9f9f9',
    height: 35,
    width: '100%',
    marginVertical: scale(7),
    borderRadius: 1,
  }
});

export default React.memo(observer(Cards));
