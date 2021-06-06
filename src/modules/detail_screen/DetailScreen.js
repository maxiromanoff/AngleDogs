import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image as RNImage,
  Dimensions,
  Modal,
} from 'react-native';
import { Header, Button } from '../../components';
import { hScale, scale } from '../../utils/resolutions';
import { Layout } from '../../views';
import { ApiDogs } from '../../action/Api';
import FastImage from 'react-native-fast-image';
import ImageViewer from 'react-native-image-zoom-viewer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from '../../constants';

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
  }, [uri]);

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
  const [modalVisible, setModalVisible] = useState(false);

  const { name } = route.params;

  const handleCloseBtn = () => {
    setModalVisible(false);
  };

  const fetchInit = async () => {
    let resDogs = await ApiDogs(name);
    _setDogs(resDogs.data.message);
  };

  useEffect(() => {
    fetchInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const keyExtractor = item => String(item);

  const renderItem = ({ item }) => {
    return (
      <Button onPress={() => setModalVisible(item)}>
        <Image uri={item} />
      </Button>
    );
  };

  if (!dogs) {
    return (
      <Layout>
        <Header title="Detail" />
        <View style={styles.loadings}>
          {[1, 2, 3].map(i => (
            <View style={styles.loading} key={i} />
          ))}
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <Header title="Detail" />
      <FlatList
        data={dogs}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
      <Modal visible={!!modalVisible} transparent={true}>
        <ImageViewer
          imageUrls={[{ url: modalVisible }]}
          renderHeader={() => (
            <Button style={styles.closeBtn} onPress={handleCloseBtn}>
              <AntDesign name="close" size={18} color={colors.white} />
            </Button>
          )}
        />
      </Modal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  image: {
    marginVertical: scale(5),
    backgroundColor: '#f9f9f9',
  },
  loading: {
    backgroundColor: '#f9f9f9',
    height: hScale(175),
    width: '100%',
    marginVertical: scale(7),
    borderRadius: 1,
  },
  closeBtn: {
    padding: scale(15),
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 9999,
  },
});

export default DetailScreen;
