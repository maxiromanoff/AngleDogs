import React from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import { Header } from '../../components';
import { hScale, wScale } from '../../utils/resolutions';
import { Layout } from '../../views';
import DATA from '../home_screen/components/data';

const DetailScreen = ({ route }) => {
  const { id } = route.params

  const data = DATA.find(d => parseInt(d.id) === parseInt(id));

  console.log(data)

  const keyExtractor = item => String(item)

  const renderItem = ({ item }) => {
    return (
      <View>
        <Image
          source={{ uri: item }}
          style={styles.image}
        />
      </View>
    )
  };

  return (
    <Layout>
      <Header title="Detail" />
      <FlatList
        data={data.images}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </Layout>
  )
}

const styles = StyleSheet.create({
  image: {
    width: wScale(50),
    height: hScale(50),
  }
});

export default DetailScreen;
