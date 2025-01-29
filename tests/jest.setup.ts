jest.mock("expo-updates", () => ({
  checkForUpdateAsync: jest.fn().mockResolvedValue({ isAvailable: false }),
  fetchUpdateAsync: jest.fn().mockResolvedValue({ isNew: false }),
  reloadAsync: jest.fn().mockResolvedValue(undefined),
}))
