const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
 
/**
* Metro configuration
* https://reactnative.dev/docs/metro
*
* @type {import('@react-native/metro-config').MetroConfig}
*/
// const config = {};
 
// module.exports = mergeConfig(getDefaultConfig(__dirname), config);
 
module.exports = (async () => {
  // Get the default configuration
  const defaultConfig = await getDefaultConfig(__dirname);
  
  // Extract the resolver configurations
  const {
    resolver: { sourceExts, assetExts },
  } = defaultConfig;
 
  // Define your custom configuration
  const customConfig = {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
    // replaceAttrValues: {
    //   "@fill": "{props.fill}"
    // },
  };
 
  // Merge the default and custom configurations
  return mergeConfig(defaultConfig, customConfig);
})(); 