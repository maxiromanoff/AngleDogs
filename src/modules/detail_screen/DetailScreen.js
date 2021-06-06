import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  FlatList,
  Image as RNImage,
  Dimensions,
} from 'react-native';
import { Header } from '../../components';
import { scale } from '../../utils/resolutions';
import { Layout } from '../../views';
import { ApiDogs } from '../../action/Api';
import FastImage from 'react-native-fast-image';

const { width, height } = Dimensions.get('window');

const Image = ({ uri }) => {
  const [sizeImage, setSizeImage] = useState({
    width: '100%',
    height: height / 2,
  });

  useEffect(() => {
    RNImage.getSize(uri, (srcWidth, srcHeight) => {
      let ratio = Math.min(width / srcWidth, height / srcHeight);
      setSizeImage({
        width: srcWidth * ratio,
        height: srcHeight * ratio,
      });
    });
  }, []);

  return (
    <FastImage
      source={{
        uri,
        priority: FastImage.priority.high,
      }}
      resizeMode={FastImage.resizeMode.cover}
      style={[styles.image, sizeImage]}
    />
  );
};

const DetailScreen = ({ route }) => {
  const [dogs, _setDogs] = useState(null);
  const { name } = route.params;

  const fetchInit = async () => {
    let resDogs = await ApiDogs(name);
    _setDogs(resDogs.data.message);
  };

  useEffect(() => {
    fetchInit();
  }, []);
  const keyExtractor = item => String(item);

  const renderItem = ({ item }) => {
    return <Image uri={item} />;
  };

  return (
    <Layout>
      <Header title="Detail" />
      <FlatList
        data={dogs}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  image: {
    marginVertical: scale(5),
  },
});

export default DetailScreen;
