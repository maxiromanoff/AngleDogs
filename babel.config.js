module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src/'],
        alias: {
          '@components': './src/components',
          '@constants': './src/constants',
          '@utils': './src/utils',
          '@views': './src/views',
          '@routes': './src/modules/routes',
          '@context': './src/context',
        },
      },
    ],
  ],
};
