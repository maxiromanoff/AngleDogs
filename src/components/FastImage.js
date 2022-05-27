import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import RNFastImage from 'react-native-fast-image';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { colors } from '../constants';
import { scale } from '../utils/resolutions';

const FastImage = ({ style, handleError, resizeMode, ...rest }) => {
    const [isError, setError] = useState(false);

    const onError = () => {
        if (!isError) {
            setError(true);
            handleError && handleError();
        }
    };

    if (isError) {
        return (
            <View style={[styles.error, style]}>
                <MCIcons
                    name="image-remove"
                    color={colors.gray}
                    size={scale(24)}
                />
            </View>
        );
    }

    return (
        <RNFastImage
            {...rest}
            {...{ style }}
            resizeMode={resizeMode || RNFastImage.resizeMode.cover}
            onError={onError}
        />
    );
};

const styles = StyleSheet.create({
    error: {
        backgroundColor: colors.graySystem3,
    },
});

export default React.memo(FastImage);