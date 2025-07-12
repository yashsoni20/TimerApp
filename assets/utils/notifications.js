// utils/notifications.js
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

export const registerForPushNotificationsAsync = async () => {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Failed to get permission for notifications');
    }
  } else {
    alert('Must use physical device for notifications');
  }
};

export const sendLocalNotification = async (title, body) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: true,
    },
    trigger: null, // fire immediately
  });
};
