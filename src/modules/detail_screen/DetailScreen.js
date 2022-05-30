import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  FlatList,
  Modal,
  Text,
} from 'react-native';
import { observer } from 'mobx-react';
import ImageViewer from 'react-native-image-zoom-viewer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Shimmer from 'react-native-shimmer';

import { colors, fontSize } from '../../constants';
import { Header, Button, ImageAspectRatio } from '../../components';
import { hScale, scale } from '../../utils/resolutions';
import { Layout } from '../../views';
import { useStore } from '../../context';


const DetailScreen = ({ route }) => {
  const { name } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const {
    dogsStore: { fetchDogsApi, listDogs },
  } = useStore();

  const handleCloseBtn = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    fetchDogsApi(name);

    return () => fetchDogsApi(null);
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

  if (listDogs.length === 0) {
    return (
      <Layout>
        <Header title={name} />
        {[1, 2, 3].map(i => (
          <Shimmer key={i} style={styles.loading}>
            <Text style={styles.textLoading}>Loading...</Text>
          </Shimmer>
        ))}
      </Layout>
    );
  }

  return (
    <Layout>
      <Header title={name} />
      <FlatList
        data={listDogs}
        renderItem={renderItem}
        style={styles.flatlist}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
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
  flatlist: {
    paddingHorizontal: scale(15),
  },
  loading: {
    width: '100%',
    height: hScale(175),
    marginVertical: scale(7),
    backgroundColor: colors.yellow_1,
  },
  textLoading: {
    color: colors.brown_1,
    fontSize: fontSize.small,
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
  },
  icon: {
    width: '100%',
    height: '100%',
  },
});

export default observer(DetailScreen);
