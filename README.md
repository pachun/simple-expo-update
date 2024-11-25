[![npm version](https://img.shields.io/npm/v/@pachun/simple-expo-update.svg)](https://www.npmjs.com/package/@pachun/simple-expo-update)
[![cov](https://pachun.github.io/simple-expo-update/badges/coverage.svg)](https://github.com/pachun/simple-expo-update/actions)

# Simple Expo Update

```
yarn add @pachun/react-native-use-app-lifecycle
yarn add @pachun/simple-expo-update
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

## Jest

```
"jest": {
  "setupFilesAfterEnv": ["<rootDir>/node_modules/@pachun/simple-expo-update/tests/jest.setup.ts"]
}
```

## Contributing

PRs are exciting 🤟 Bump the version number in `package.json` and open one.

- Please do not submit AI generated pull requests.
- Please keep coverage at or above where it is when you clone the repo (`yarn test --collectCoverage`).
