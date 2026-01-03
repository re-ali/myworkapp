import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ToastType = 'success' | 'error' | 'info' | 'warning';

const TOAST_STYLES: Record<
  ToastType,
  { bg: string; border: string; title: string }
> = {
  success: {
    bg: '#E8F7EE',
    border: '#2ECC71',
    title: '#1E8449',
  },
  error: {
    bg: '#FDEDEC',
    border: '#E74C3C',
    title: '#922B21',
  },
  info: {
    bg: '#EBF5FB',
    border: '#3498DB',
    title: '#1B4F72',
  },
  warning: {
    bg: '#FEF9E7',
    border: '#F1C40F',
    title: '#7D6608',
  },
};

const BaseToast = ({
  text1,
  text2,
  type,
}: {
  text1?: string;
  text2?: string;
  type: ToastType;
}) => {
  const theme = TOAST_STYLES[type];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.bg,
          borderLeftColor: theme.border,
        },
      ]}
    >
      {text1 ? (
        <Text style={[styles.title, { color: theme.title }]}>
          {text1}
        </Text>
      ) : null}

      {text2 ? <Text style={styles.message}>{text2}</Text> : null}
    </View>
  );
};

export const CustomToast = {
  success: (props: any) => <BaseToast {...props} type="success" />,
  error: (props: any) => <BaseToast {...props} type="error" />,
  info: (props: any) => <BaseToast {...props} type="info" />,
  warning: (props: any) => <BaseToast {...props} type="warning" />,
};

const styles = StyleSheet.create({
  container: {
    width: '92%',
    padding: 14,
    borderRadius: 10,
    borderLeftWidth: 6,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});
