import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image as RNImage,
  Dimensions,
  Modal,
} from 'react-native';
import { observer } from 'mobx-react';
import ImageViewer from 'react-native-image-zoom-viewer';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { colors } from '../../constants';
import { Header, Button, ImageAspectRatio } from '../../components';
import { hScale, scale } from '../../utils/resolutions';
import { Layout } from '../../views';
import { useStore } from '../../context';


const DetailScreen = ({ route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const {
    dogsStore: { listDogs, fetchDogsApi },
  } = useStore();

  const { name } = route.params;

  const handleCloseBtn = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    fetchDogsApi(name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const keyExtractor = item => String(item);

  const renderItem = ({ item }) => {
    return (
      <Button onPress={() => setModalVisible(item)}>
        <ImageAspectRatio uri={item} style={styles.imageAspectRatio} />
      </Button>
    );
  };

  if (!listDogs) {
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
      <Header title={name} />
      <FlatList
        data={listDogs}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
      <Modal visible={!!modalVisible} transparent={true}>
        <ImageViewer
          useNativeDriver={true}
          imageUrls={[{ url: modalVisible }]}
          enableSwipeDown={true}
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
  imageAspectRatio: {
    marginBottom: scale(8),
  }
});

export default observer(DetailScreen);
