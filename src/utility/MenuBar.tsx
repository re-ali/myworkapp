// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Modal,
//   StyleSheet,
//   GestureResponderEvent,
// } from "react-native";
// import { useTheme } from "../navigation/ThemeProvider";
// import Ionicons from 'react-native-vector-icons/Ionicons';


// interface MenuBarProps {
//   visible: boolean;
//   onClose: (event: GestureResponderEvent) => void;
//   onLogout: (event: GestureResponderEvent) => void;
// }

// const MenuBar: React.FC<MenuBarProps> = ({ visible, onClose, onLogout }) => {
//   const { theme } = useTheme();

//   return (
//     <Modal visible={visible} animationType="slide" transparent>
//       <TouchableOpacity style={styles.overlay} onPress={onClose} />
//       <View
//         style={[
//           styles.menuContainer,
//           { backgroundColor: theme.colors.background },
//         ]}
//       >
//         {/* User Profile */}
//         <View style={styles.profileSection}>
//           <Ionicons name="person-circle" size={60} color={theme.colors.text} />
//           <Text style={[styles.userName, { color: theme.colors.text }]}>
//             John Doe
//           </Text>
//         </View>

//         {/* Menu Items */}
//         <TouchableOpacity style={styles.menuItem}>
//           <Ionicons
//             name="help-circle-outline"
//             size={22}
//             color={theme.colors.text}
//           />
//           <Text style={[styles.menuText, { color: theme.colors.text }]}>
//             FAQ
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.menuItem}>
//           <Ionicons
//             name="person-outline"
//             size={22}
//             color={theme.colors.text}
//           />
//           <Text style={[styles.menuText, { color: theme.colors.text }]}>
//             Profile
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.menuItem} onPress={onLogout}>
//           <Ionicons
//             name="log-out-outline"
//             size={22}
//             color={theme.colors.text}
//           />
//           <Text style={[styles.menuText, { color: theme.colors.text }]}>
//             Logout
//           </Text>
//         </TouchableOpacity>

//         {/* Version */}
//         <Text style={[styles.version, { color: theme.colors.text }]}>
//           Version 1.0.0
//         </Text>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.3)",
//   },
//   menuContainer: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: "70%",
//     height: "100%",
//     padding: 20,
//   },
//   profileSection: {
//     alignItems: "center",
//     marginBottom: 30,
//   },
//   userName: {
//     marginTop: 10,
//     fontSize: 18,
//     fontWeight: "600",
//   },
//   menuItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingVertical: 12,
//   },
//   menuText: {
//     marginLeft: 10,
//     fontSize: 16,
//   },
//   version: {
//     position: "absolute",
//     bottom: 20,
//     left: 20,
//     fontSize: 14,
//     opacity: 0.6,
//   },
// });

// export default MenuBar;

// new
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { useTheme } from "../navigation/ThemeProvider";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from "react-native-safe-area-context"; // <-- Add this import

interface MenuBarProps {
  visible: boolean;
  onClose: (event: GestureResponderEvent) => void;
  onLogout: (event: GestureResponderEvent) => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ visible, onClose, onLogout }) => {
    const { theme, isDark, toggleTheme } = useTheme(); // added isDark and toggleTheme

  const insets = useSafeAreaInsets(); // <-- Add this line

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableOpacity style={styles.overlay} onPress={onClose} />
      <View
        style={[
          styles.menuContainer,
          {
            backgroundColor: theme.colors.background,
            paddingTop: insets.top + 8, // <-- Add paddingTop for safe area
          },
        ]}
      >
        {/* User Profile */}
        <View style={styles.profileSection}>
          <Ionicons name="person-circle" size={60} color={theme.colors.text} />
          <Text style={[styles.userName, { color: theme.colors.text }]}>
            John Doe
          </Text>
        </View>

        {/* Menu Items */}
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons
            name="help-circle-outline"
            size={22}
            color={theme.colors.text}
          />
          <Text style={[styles.menuText, { color: theme.colors.text }]}>
            FAQ
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons
            name="person-outline"
            size={22}
            color={theme.colors.text}
          />
          <Text style={[styles.menuText, { color: theme.colors.text }]}>
            Profile
          </Text>
        </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={toggleTheme}>
          <Ionicons
            name={isDark ? "sunny-outline" : "moon-outline"}
            size={22}
            color={theme.colors.text}
          />
          <Text style={[styles.menuText, { color: theme.colors.text }]}>
            Switch to {isDark ? "Light" : "Dark"} Theme
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={onLogout}>
          <Ionicons
            name="log-out-outline"
            size={22}
            color={theme.colors.text}
          />
          <Text style={[styles.menuText, { color: theme.colors.text }]}>
            Logout
          </Text>
        </TouchableOpacity>

        {/* Version */}
        <Text style={[styles.version, { color: theme.colors.text }]}>
          Version 1.0.0
        </Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  menuContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "70%",
    height: "100%",
    padding: 20,
    // paddingTop handled dynamically using insets
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  userName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "600",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 16,
  },
  version: {
    position: "absolute",
    bottom: 20,
    left: 20,
    fontSize: 14,
    opacity: 0.6,
  },
});

export default MenuBar;


