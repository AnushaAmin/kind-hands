module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
          ['react-native-reanimated/plugin',
           { relativeSourceLocation: true }
          ]
        ],
    
  };
};
// module.exports = {
//   presets: ["@babel/preset-react"],
//   plugins: [
//     ['react-native-reanimated/plugin',
//      { relativeSourceLocation: true }
//     ]
//   ],
// };