import * as ExpoUpdates from "expo-updates"
import simpleExpoUpdate from "../src/index"

let originalDev: boolean

describe("simpleExpoUpdate({ whenPresent: ... })", () => {
  beforeAll(() => {
    originalDev = __DEV__
  })

  afterAll(() => {
    Object.defineProperty(global, "__DEV__", {
      value: originalDev,
      configurable: true,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("whenPresent is 'applyUpdate'", () => {
    it("applies the update", async () => {
      Object.defineProperty(global, "__DEV__", {
        value: false,
        configurable: true,
      })
      ;(ExpoUpdates.checkForUpdateAsync as jest.Mock).mockResolvedValue({
        isAvailable: true,
      })
      ;(ExpoUpdates.fetchUpdateAsync as jest.Mock).mockResolvedValue({
        isNew: true,
      })

      await simpleExpoUpdate({ whenPresent: "applyUpdate" })

      expect(ExpoUpdates.reloadAsync).toHaveBeenCalled()
    })
  })

  describe("when isPresent is a callback", () => {
    it("calls the callback", async () => {
      const reloadAsyncSpy = jest.spyOn(ExpoUpdates, "reloadAsync")
      Object.defineProperty(global, "__DEV__", {
        value: false,
        configurable: true,
      })
      ;(ExpoUpdates.checkForUpdateAsync as jest.Mock).mockResolvedValue({
        isAvailable: true,
      })
      ;(ExpoUpdates.fetchUpdateAsync as jest.Mock).mockResolvedValue({
        isNew: true,
      })
      const callback = jest.fn()

      await simpleExpoUpdate({ whenPresent: callback })

      expect(callback).toHaveBeenCalledWith(reloadAsyncSpy)
    })
  })

  describe("when __DEV__ is true", () => {
    it("does not apply an update", async () => {
      Object.defineProperty(global, "__DEV__", {
        value: true,
        configurable: true,
      })
      ;(ExpoUpdates.checkForUpdateAsync as jest.Mock).mockResolvedValue({
        isAvailable: true,
      })
      ;(ExpoUpdates.fetchUpdateAsync as jest.Mock).mockResolvedValue({
        isNew: true,
      })

      await simpleExpoUpdate({ whenPresent: "applyUpdate" })

      expect(ExpoUpdates.reloadAsync).not.toHaveBeenCalled()
    })
  })

  describe("when there is no update", () => {
    it("does not apply an update", async () => {
      Object.defineProperty(global, "__DEV__", {
        value: false,
        configurable: true,
      })
      ;(ExpoUpdates.checkForUpdateAsync as jest.Mock).mockResolvedValue({
        isAvailable: false,
      })
      ;(ExpoUpdates.fetchUpdateAsync as jest.Mock).mockResolvedValue({
        isNew: false,
      })

      await simpleExpoUpdate({ whenPresent: "applyUpdate" })

      expect(ExpoUpdates.reloadAsync).not.toHaveBeenCalled()
    })
  })

  describe("when the update wont download", () => {
    it("does not apply an update", async () => {
      Object.defineProperty(global, "__DEV__", {
        value: false,
        configurable: true,
      })
      ;(ExpoUpdates.checkForUpdateAsync as jest.Mock).mockResolvedValue({
        isAvailable: true,
      })
      ;(ExpoUpdates.fetchUpdateAsync as jest.Mock).mockResolvedValue({
        isNew: false,
      })

      await simpleExpoUpdate({ whenPresent: "applyUpdate" })

      expect(ExpoUpdates.reloadAsync).not.toHaveBeenCalled()
    })
  })
})
