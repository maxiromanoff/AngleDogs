import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from '../../components';
import { colors, fontSize } from '../../constants';
import { Layout } from '../../views';
import { scale, wScale } from '../../utils/resolutions';
import Feather from 'react-native-vector-icons/Feather';
import { Formik } from 'formik';
import * as yup from 'yup';
import routes from '../routes';
import { Cards } from './components';
import RNBootSplash from "react-native-bootsplash";

const schema = yup.object().shape({
  input: yup.string().trim(),
});

const initialValues = {
  input: '',
};

const HomeScreen = ({ navigation }) => {
  const gotoSetting = () => {
    navigation.navigate(routes.SETTING_SCREEN);
  };

  useEffect(() => {
    RNBootSplash.hide();
  }, [])

  return (
    <Layout>
      <View style={styles.header}>
        <Text bold style={styles.appName}>
          {'Angel Dogs'}
        </Text>
        <Button onPress={gotoSetting}>
          <Feather name="menu" size={24} color={colors.black} />
        </Button>
      </View>
      <View style={styles.searchPet}>
        <Formik
          initialValues={initialValues}
          onSubmit={values => console.log(values)}
          validationSchema={schema}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            resetForm,
          }) => (
            <View>
              <View style={styles.search}>
                <Button style={styles.btnSearch}>
                  <Feather
                    name="search"
                    size={17}
                    color={colors.black}
                    style={styles.iconSearch}
                  />
                </Button>
                <Input
                  name="input"
                  placeholder="Search here"
                  style={styles.input}
                  returnKeyType="search"
                  onSubmitEditing={handleSubmit}
                  {...{ values, errors, touched, handleChange, handleBlur }}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
      <Cards />
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(15),
    marginTop: scale(15),
    marginBottom: scale(10),
  },

  appName: {
    fontSize: fontSize.big,
    color: colors.black,
  },
  searchPet: {
    paddingHorizontal: scale(15),
    marginBottom: scale(15),
  },
  search: {
    borderRadius: wScale(25),
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  input: {
    paddingLeft: scale(38),
    paddingVertical: scale(6),
    fontSize: 15,
  },
  iconSearch: {
    position: 'absolute',
    top: 12,
    left: 15,
    zIndex: 99999,
  },
});

export default HomeScreen;
