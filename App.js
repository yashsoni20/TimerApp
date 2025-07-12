import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { TimerProvider } from "./assets/contexts/TimerContext";
import BottomTabNavigator from "./assets/navigator/BottomTabNavigator";



export default function App() {
  return (
    <TimerProvider>
      <NavigationContainer>
     
       <BottomTabNavigator />
      </NavigationContainer>
    </TimerProvider>
  );
}

