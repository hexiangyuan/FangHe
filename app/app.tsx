/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app or storybook.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigation, so head over there
 * if you're interested in adding screens and navigators.
 */
import "./i18n"
import "./utils/ignore-warnings"
import React, { useState, useEffect, useRef } from "react"
import { NavigationContainerRef } from "@react-navigation/native"
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context"
import * as storage from "./utils/storage"
import {
  useBackButtonHandler,
  RootNavigator,
  canExit,
  useNavigationPersistence,
  setRootNavigation,
} from "./navigation"
import { RootStore, RootStoreProvider, setupRootStore } from "./models"

import { enableScreens } from "react-native-screens"
import { StatusBar } from "react-native"

enableScreens()

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

/**
 * This is the root component of our app.
 */
function App() {
  const navigationRef = useRef<NavigationContainerRef>()

  const statusBarRef = useRef()
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)
  useBackButtonHandler(navigationRef, canExit)
  const { initialNavigationState, onNavigationStateChange } = useNavigationPersistence(
    storage,
    NAVIGATION_PERSISTENCE_KEY,
  )

  // Kick off initial async loading actions, like loading fonts and RootStore
  useEffect(() => {
    ;(async () => {
      setupRootStore().then(setRootStore)
    })()
  }, [])

  useEffect(() => {
    setRootNavigation(navigationRef)
  })

  if (!rootStore) return null

  // otherwise, we're ready to render the app
  return (
    <RootStoreProvider value={rootStore}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <StatusBar
          ref={statusBarRef}
          barStyle={"dark-content"}
          backgroundColor={"white"}
          translucent={true}
        />
        <RootNavigator
          ref={navigationRef}
          initialState={initialNavigationState}
          onStateChange={onNavigationStateChange}
        />
      </SafeAreaProvider>
    </RootStoreProvider>
  )
}

export default App
