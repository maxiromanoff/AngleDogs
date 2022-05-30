import React from 'react';
import { View, StyleSheet } from 'react-native';
import Shimmer from 'react-native-shimmer';

import { colors } from '../constants';
import { hScale, scale, wScale } from '../utils/resolutions';

const RowImageLoading = ({ style }) => {
    return (
        <View style={[styles.container, style]}>
            <Shimmer animating={true}>
                <View style={styles.row}>
                    <View style={styles.image} />
                    <View style={styles.info}>
                        <View style={styles.filename} />
                        <View style={styles.btnRemove} />
                    </View>
                </View>
            </Shimmer>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: scale(4),
    },
    row: {
        flexDirection: 'row',
    },
    image: {
        width: '50%',
        height: hScale(95),
        borderRadius: scale(2),
        backgroundColor: colors.gray,
    },
    info: {
        marginLeft: scale(15),
    },
    filename: {
        width: wScale(130),
        height: hScale(15),
        borderRadius: scale(2),
        backgroundColor: colors.gray,
    },
    btnRemove: {
        marginTop: scale(8),
        width: wScale(40),
        height: hScale(13),
        borderRadius: scale(2),
        backgroundColor: colors.gray,
    },
});

export default React.memo(RowImageLoading);