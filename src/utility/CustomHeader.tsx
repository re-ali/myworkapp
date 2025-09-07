import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type CustomHeaderProps = {
  leftIcon?: 'profile' | 'back' | 'menu';
  centerText?: string;
  rightIcon?: 'setting' | 'right' | null;
  onLeftPress?: () => void;
  onRightPress?: () => void;
};

const CustomHeader: React.FC<CustomHeaderProps> = ({
  leftIcon,
  centerText,
  rightIcon,
  onLeftPress,
  onRightPress,
}) => {
  const renderLeftIcon = () => {
    switch (leftIcon) {
      case 'profile':
        return (
          <TouchableOpacity onPress={onLeftPress}>
            <Ionicons name="person-circle-outline" size={28} color="black" />
          </TouchableOpacity>
        );
      case 'back':
        return (
          <TouchableOpacity onPress={onLeftPress}>
            <Ionicons name="arrow-back-outline" size={28} color="black" />
          </TouchableOpacity>
        );
      case 'menu':
        return (
          <TouchableOpacity onPress={onLeftPress}>
            <Ionicons name="menu-outline" size={28} color="black" />
          </TouchableOpacity>
        );
      default:
        return <View style={{ width: 28 }} />; // empty space if no icon
    }
  };

  const renderRightIcon = () => {
    switch (rightIcon) {
      case 'setting':
        return (
          <TouchableOpacity onPress={onRightPress}>
            <Ionicons name="settings-outline" size={28} color="black" />
          </TouchableOpacity>
        );
      case 'right':
        return <View style={{ width: 28 }} />; // placeholder for alignment
      default:
        return <View style={{ width: 28 }} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderLeftIcon()}
      {centerText ? <Text style={styles.centerText}>{centerText}</Text> : <View />}
      {renderRightIcon()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  centerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomHeader;
