module.exports = {
  presets: [
    '@react-native/babel-preset',
  ],
  plugins: [
    ['@babel/plugin-transform-private-methods', { loose: true }],
    ['@babel/plugin-transform-class-properties', { loose: true }],
    ['@babel/plugin-transform-private-property-in-object', { loose: true }],
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
    }],
    // 경로 별칭 설정
    [
      'module-resolver',
      {
        alias: {
          src: './src',
          '@shared': './src/shared',  // @shared -> src/shared로 매핑
          '@assets' : './src/assets',
          '@entities' : './src/entities',
          '@features' : './src/features',
        },
      },
    ],
    'react-native-reanimated/plugin', // 이 부분은 마지막에 위치해야 합니다.
  ],
};
