import React, { useState, useEffect } from 'react';
import {
  View,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';
import { observer } from 'mobx-react';
import ImageViewer from 'react-native-image-zoom-viewer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Shimmer from 'react-native-shimmer';

import { Layout } from '../../views';
import { useStore } from '../../context';
import { colors } from '../../constants';
import { hScale, scale } from '../../utils/resolutions';
import { Header, Button, ImageAspectRatio } from '../../components';


const DetailScreen = ({ route }) => {
  const { name } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const {
    dogsStore: { fetchDogsApi, listDogs },
  } = useStore();
  let imagesData = listDogs?.map(item => ({ url: item }))

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    fetchDogsApi(name);

    return () => fetchDogsApi(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const keyExtractor = (item, index) => `${item}-${index}`;

  const renderItem = ({ item, index }) => {
    return (
      <Button onPress={() => setModalVisible({ item, index })}>
        <ImageAspectRatio uri={item.url} style={styles.imageAspectRatio} />
      </Button>
    );
  };

  if (listDogs.length === 0) {
    return (
      <Layout>
        <Header title={name} />
        <View style={styles.loadingsContainer}>
          {[1, 2, 3, 4].map(i => (
            <Shimmer key={i} style={styles.loadingCard} animating={true} />
          ))}
        </View>
      </Layout>
    );
  };

  return (
    <Layout>
      <Header title={name} />
      <FlatList
        data={imagesData}
        renderItem={renderItem}
        style={styles.flatlist}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
      />
      <Modal visible={!!modalVisible} transparent={true}>
        <ImageViewer
          imageUrls={imagesData}
          enableSwipeDown={true}
          onSwipeDown={handleCloseModal}
          index={modalVisible?.index || 0}
        />
        <Button style={styles.closeBtn} onPress={handleCloseModal}>
          <AntDesign name="close" size={scale(19)} color={colors.white} />
        </Button>
      </Modal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  flatlist: {
    paddingHorizontal: scale(15),
  },
  closeBtn: {
    padding: scale(15),
    position: 'absolute',
    top: scale(5),
    right: scale(5),
    zIndex: 9999,
  },
  imageAspectRatio: {
    marginBottom: scale(8),
  },
  loadingsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: scale(15),
  },
  loadingCard: {
    width: '46%',
    height: hScale(95),
    borderRadius: scale(3),
    backgroundColor: colors.gray,
    marginHorizontal: scale(6),
    marginVertical: scale(6),
  },
});

export default observer(DetailScreen);
