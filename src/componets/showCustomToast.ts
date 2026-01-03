import Toast from 'react-native-toast-message';

type ToastType = 'success' | 'error' | 'info' | 'warning';

export const showCustomToast = (
  type: ToastType,
  message: string,
  title?: string
) => {
  Toast.show({
    type,
    text1: title || type.toUpperCase(),
    text2: message,
    position: 'top',
    visibilityTime: 3000,
  });
};
