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
  if (
    !__DEV__ &&
    (await ExpoUpdates.checkForUpdateAsync()).isAvailable &&
    (await ExpoUpdates.fetchUpdateAsync()).isNew
  ) {
    if (whenPresent === "applyUpdate") {
      await ExpoUpdates.reloadAsync()
    } else {
      const applyUpdateAndRestart = ExpoUpdates.reloadAsync
      await whenPresent(applyUpdateAndRestart)
    }
  }
}

export default simpleExpoUpdate
