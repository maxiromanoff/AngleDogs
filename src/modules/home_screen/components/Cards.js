import React, { useEffect } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { Text, Button } from '../../../components';
import { colors } from '../../../constants';
import { resolutions } from '../../../utils';
import { useNavigation } from '@react-navigation/native';
import routes from '../../routes';
import Feather from 'react-native-vector-icons/Feather';
import { observer } from 'mobx-react';
import { useStore } from '../../../context';

const { scale } = resolutions;

const Cards = ({ textFilter }) => {
  const { dogsStore: { listItems, fetchListItemApi, filterItems } } = useStore();

  useEffect(() => {
    fetchListItemApi();
  }, []);

  const navigation = useNavigation();

  const gotoDetail = name => {
    navigation.navigate(routes.DETAIL_SCREEN, { name });
  };

  const keyExtractor = item => String(item);

  const renderItem = ({ item }) => {
    return (
      <Button style={styles.card} onPress={() => gotoDetail(item)}>
        <Text style={styles.itemName}>{item.replace(/-/gi, ' ')}</Text>
        <Feather name="chevron-right" size={20} color={colors.black} />
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
      removeClippedSubviews
    />
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
    paddingVertical: scale(7),
  },
  itemName: {
    textTransform: 'capitalize',
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
  },
});

export default React.memo(observer(Cards));
