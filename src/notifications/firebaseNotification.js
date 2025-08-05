import { getApp } from '@react-native-firebase/app';
import {
  getMessaging,
  onMessage,
  onNotificationOpenedApp,
  getInitialNotification,
  isDeviceRegisteredForRemoteMessages,
  registerDeviceForRemoteMessages,
  requestPermission,
  getToken,
  setBackgroundMessageHandler,
  AuthorizationStatus,
} from '@react-native-firebase/messaging';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import notifee from '@notifee/react-native';

 

import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  checkNotifications,
  openSettings,
} from 'react-native-permissions';

const firebaseApp = getApp();
const messaging = getMessaging(firebaseApp);

export const setupNotificationHandlers =  () => {

  // Foreground notifications
  const unsubscribeForeground = onMessage(messaging, async remoteMessage => {
    console.log('[Foreground] Notification:', remoteMessage);

        await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        });

        await notifee.displayNotification({
            title: remoteMessage.notification?.title || 'Notification',
            body: remoteMessage.notification?.body || '',
            android: {
                channelId: 'default',
            },
        });

    // Alert.alert(
    //   remoteMessage.notification?.title || 'New Notification',
    //   remoteMessage.notification?.body || ''
    // );
  });

  // App opened from background state
  onNotificationOpenedApp(messaging, remoteMessage => {
    console.log('[Background] Notification caused app to open:', remoteMessage);
    // handle navigation or other logic here
  });

  // App opened from quit state
  getInitialNotification(messaging).then(remoteMessage => {
    if (remoteMessage) {
      console.log('[Quit] Notification caused app to open:', remoteMessage);
      // handle navigation or other logic here
    }
  });

  return () => {
    unsubscribeForeground();
  };
};

// Background notifications (outside of component scope)
setBackgroundMessageHandler(messaging, async remoteMessage => {
  console.log('[Background Handler] Notification:', remoteMessage);
  // You could use local notifications here if desired
});

// export const requestNotificationPermission = async () => {
//   try {
//     if (Platform.OS === 'android' && Platform.Version >= 33) {
//       const result = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
//       );
//       if (result !== PermissionsAndroid.RESULTS.GRANTED) {
//         Alert.alert('Permission Required', 'Notification permission not granted.');
//         return false;
//       }
//     } else {
//       // For Android versions < 13, no runtime notification permission needed
//       return true;
//     } 


//     if (Platform.OS === 'ios') {
//       const iosStatus = await PERMISSIONS.IOS.NOTIFICATIONS;
//         const { status, settings } = await checkNotifications();

//       const isGranted =
//         iosStatus?.alert === true ||
//         iosStatus?.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
//         iosStatus?.authorizationStatus === AuthorizationStatus.PROVISIONAL;

//       if (!isGranted) {
//         Alert.alert('Permission Required', 'Notification permission not granted on iOS.');
//         return false;
//       }
//     }

//      //   authStatus === 1 || // AUTHORIZED
//     //   authStatus === 2;   // PROVISIONAL

//     const authStatus = await requestPermission(messaging);
//     const enabled =
//         authStatus === AuthorizationStatus.AUTHORIZED ||
//         authStatus === AuthorizationStatus.PROVISIONAL;

//     console.log('code enabled >>>', enabled);

//     if (!enabled) {
//       Alert.alert('Permission Required', 'Notification permission not granted.');
//     }

//     return enabled;
//   } catch (error) {
//     console.error('Notification permission error:', error);
//     return false;
//   }
// };


export const requestNotificationPermission = async () => {
  try {
    if (Platform.OS === 'android') {
      if (Platform.Version >= 33) {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );

        if (result !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission Required', 'Notification permission not granted.');
          return false;
        }
      }

      // Request FCM permissions on Android
      const authStatus = await requestPermission();
      const enabled =
        authStatus === AuthorizationStatus.AUTHORIZED ||
        authStatus === AuthorizationStatus.PROVISIONAL;

      if (!enabled) {
        Alert.alert('Permission Required', 'Notification permission not granted.');
        return false;
      }

      return true;
    }

    if (Platform.OS === 'ios') {
      const { status } = await checkNotifications();

      if (
        status !== RESULTS.GRANTED &&
        status !== RESULTS.LIMITED
      ) {
        const { status: newStatus } = await request(PERMISSIONS.IOS.NOTIFICATIONS);

        if (
          newStatus !== RESULTS.GRANTED &&
          newStatus !== RESULTS.LIMITED
        ) {
          Alert.alert('Permission Required', 'Notification permission not granted.');
          return false;
        }
      }

      // Optional: Request FCM permissions on iOS too
      const authStatus = await requestPermission();
      const enabled =
        authStatus === AuthorizationStatus.AUTHORIZED ||
        authStatus === AuthorizationStatus.PROVISIONAL;

      if (!enabled) {
        Alert.alert('Permission Required', 'Notification permission not granted.');
        return false;
      }

      return true;
    }

    return false;
  } catch (error) {
    console.error('Notification permission error:', error);
    return false;
  }
};

export const getFCMToken = async () => {
  try {
    const isRegistered = await isDeviceRegisteredForRemoteMessages(messaging);
    if (!isRegistered) {
      await registerDeviceForRemoteMessages(messaging);
    }
    const token = await getToken(messaging);
    return token;
  } catch (error) {
    console.error('Error getting FCM 7token 123:', error);
    return null;
  }
};
