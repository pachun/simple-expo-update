module.exports = {
  preset: "jest-expo",
  transform: {
    "^.+\\.(js|ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(expo-modules-core|expo|react-native|@react-native|@expo|@react-native-community)/)",
  ],
}
