import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
import Colors from '../helper/Color';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Scale from "../helper/Scale";

const Shimmer = ShimmerPlaceHolder;

export default function NotificationsShimmer() {
  const insets = useSafeAreaInsets();

  const renderItem = () => (
    <View style={styles.itemRow}>
      {/* Avatar */}
      <Shimmer
        LinearGradient={LinearGradient}
        style={styles.avatar}
      />

      {/* Content */}
      <View style={styles.textBlock}>
        <Shimmer LinearGradient={LinearGradient} style={styles.title} />
        <Shimmer LinearGradient={LinearGradient} style={styles.action} />
        <Shimmer LinearGradient={LinearGradient} style={styles.date} />
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { }]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Shimmer LinearGradient={LinearGradient} style={styles.backIcon} />
        <Shimmer LinearGradient={LinearGradient} style={styles.headerTitle} />
        <Shimmer LinearGradient={LinearGradient} style={styles.headerAction} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {Array.from({ length: 7 }).map((_, i) => (
          <View key={i}>{renderItem()}</View>
        ))}
        <View style={{ height: Scale(40) }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.WHITE,
      paddingHorizontal: Scale(16),
    },
  
    /** Header */
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: Scale(20),
    },
    backIcon: {
      width: Scale(28),
      height: Scale(28),
      borderRadius: Scale(14),
    },
    headerTitle: {
      width: Scale(140),
      height: Scale(22),
      borderRadius: Scale(6),
      marginLeft: Scale(12),
    },
    headerAction: {
      width: Scale(90),
      height: Scale(16),
      borderRadius: Scale(6),
      marginLeft: "auto",
    },
  
    /** Notification Row */
    itemRow: {
      flexDirection: "row",
      paddingVertical: Scale(16),
      borderBottomWidth: 1,
      borderColor: Colors.GREY_6,
    },
  
    avatar: {
      width: Scale(44),
      height: Scale(44),
      borderRadius: Scale(22),
    },
  
    textBlock: {
      flex: 1,
      marginLeft: Scale(12),
    },
  
    title: {
      width: "90%",
      height: Scale(16),
      borderRadius: Scale(4),
      marginBottom: Scale(6),
    },
  
    action: {
      width: Scale(90),
      height: Scale(14),
      borderRadius: Scale(4),
      marginBottom: Scale(6),
    },
  
    date: {
      width: Scale(120),
      height: Scale(12),
      borderRadius: Scale(4),
    },
  });
  