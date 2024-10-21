[![npm version](https://img.shields.io/npm/v/@pachun/simple-expo-updates.svg)](https://www.npmjs.com/package/@pachun/simple-expo-update)
[![cov](https://pachun.github.io/simple-expo-updates/badges/coverage.svg)](https://github.com/pachun/simple-expo-updates/actions)

# Simple Expo Update

```
yarn add @pachun/react-native-use-app-lifecycle
yarn add @pachun/simple-expo-updates
```

```ts
import useAppLifecycle from "@pachun/react-native-use-app-lifecycle"
import simpleExpoUpdate from "@pachun/simple-expo-update"

const askPermissionToApplyUpdate = async (
  applyUpdateAndRestart: () => Promise<void>,
) => {
  Alert.alert(
    "An app update is available",
    "May we restart the app to apply the update?",
    [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          await applyUpdateAndRestart()
        },
      },
    ],
  )
}

const App = () => {
  useAppLifecycle({
    onLaunch: () =>
      simpleExpoUpdate({ whenPresent: "applyUpdate" }),
    onFocus: () =>
      simpleExpoUpdate({ whenPresent: askPermissionToApplyUpdate }),
  })
  return <></>
}
```

`"applyUpdate"` applies the update immediately, restarting the app.

You can also pass a function to `whenPresent` which accepts an argument that's an async function that you can run to apply the update on your own terms.
