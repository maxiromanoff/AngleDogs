import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Text, Button } from '../../../components';
import { colors } from '../../../constants';
import { resolutions, formatList } from '../../../utils';
import { useNavigation } from '@react-navigation/native';
import routes from '../../routes';
import Feather from 'react-native-vector-icons/Feather';
import { ApiList } from '../../../action/Api';

const { scale } = resolutions;

const Cards = () => {
  const [list, _setList] = useState(null);

  const fetchList = async () => {
    let resList = await ApiList();
    _setList(formatList(resList.data));
  };

  useEffect(() => {
    fetchList();
  }, []);

  const navigation = useNavigation();

  const gotoDetail = name => {
    navigation.navigate(routes.DETAIL_SCREEN, { name });
  };

  const keyExtractor = item => String(item);

  const renderItem = ({ item }) => {
    return (
      <Button style={styles.card} onPress={() => gotoDetail(item)}>
        <Text style={styles.itemName}>{item.replace(/-/gi, " ")}</Text>
        <Feather name="chevron-right" size={20} color={colors.black} />
      </Button>
    );
  };

  return (
    <FlatList
      data={list}
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
  }
});

export default React.memo(Cards);
