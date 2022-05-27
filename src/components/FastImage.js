import React from 'react';
import RNFastImage from 'react-native-fast-image';

const FastImage = ({ style, ...rest }) => {
    return (
        <RNFastImage
            {...rest}
            {...{ style }}
            resizeMode={RNFastImage.resizeMode.cover}
        />
    );
};

export default React.memo(FastImage);