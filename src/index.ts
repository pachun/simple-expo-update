import * as ExpoUpdates from "expo-updates"

type SimpleExpoUpdate = ({
  whenPresent,
}: {
  whenPresent: WhenPresent
}) => Promise<void>

type WhenPresent =
  | "applyUpdate"
  | ((applyUpdateAndRestart: () => Promise<void>) => Promise<void>)
  | ((applyUpdateAndRestart: () => Promise<void>) => void)

const simpleExpoUpdate: SimpleExpoUpdate = async ({ whenPresent }) => {
  const updateExists = (await ExpoUpdates.checkForUpdateAsync()).isAvailable
  const updateDownloaded = (await ExpoUpdates.fetchUpdateAsync()).isNew
  if (!__DEV__ && updateExists && updateDownloaded) {
    if (whenPresent === "applyUpdate") {
      await ExpoUpdates.reloadAsync()
    } else {
      const applyUpdateAndRestart = ExpoUpdates.reloadAsync
      await whenPresent(applyUpdateAndRestart)
    }
  }
}

export default simpleExpoUpdate
