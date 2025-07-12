import React from "react";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import HomeScreen from "../screens/HomeScreen";
import CreateTimerScreen from "../screens/CreateTimerScreen";
import HistoryScreen from "../screens/HistoryScreen";

const Tab = createBottomTabNavigator();

const AddButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={styles.addButtonContainer}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.addButton}>{children}</View>
  </TouchableOpacity>
);

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") iconName = focused ? "home" : "home-outline";
          else if (route.name === "History") iconName = focused ? "time" : "time-outline";

          if (route.name === "CreateTimer") return null;

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#222222",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: Platform.OS === "ios" ? 20 : 10,
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 5,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: true }} />

      <Tab.Screen
        name="Add Timer"
        component={CreateTimerScreen}
        options={{
          headerShown: true,
          tabBarButton: (props) => (
            <AddButton {...props} onPress={props.onPress}>
              <Icon name="add" size={30} color="white" />
            </AddButton>
          ),
        }}
      />

      <Tab.Screen name="History" component={HistoryScreen} options={{ headerShown: true }} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  addButtonContainer: {
    top: -30,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BottomTabNavigator;
