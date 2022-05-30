import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image as RNImage } from 'react-native';

import FastImage from './FastImage';

const ImageAspectRatio = ({ style, uri }) => {
    const [aspectRatio, setAspectRatio] = useState(1);

    useEffect(() => {
        if (uri) {
            RNImage.getSize(uri, (width, height) => {
                setAspectRatio(width / height);
            });
        }
    }, []);

    if (!uri) { return null };

    return (
        <View>
            <FastImage
                style={[styles.img, { aspectRatio }, style]}
                source={{ uri }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    img: {
        width: '100%',
    },
});

export default ImageAspectRatio;