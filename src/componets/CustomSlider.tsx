// import React, { useEffect } from 'react';
// import { View, StyleSheet, Dimensions, Image } from 'react-native';
// import { PanGestureHandler } from 'react-native-gesture-handler';

// import Animated, {
//   useAnimatedScrollHandler,
//   useSharedValue,
//   useAnimatedStyle,
//   withSpring,
//   runOnJS,
// } from 'react-native-reanimated';

// const { width } = Dimensions.get('window');
// const TRACK_WIDTH = width - 60;
// const THUMB_SIZE = 30;
// const MAX_VALUE = 5;
// const STEP = 0.5;

// interface CustomSliderProps {
//   value?: number;
//   onValueChange?: (val: number) => void;
//   thumbImage?: any;
//   trackColor?: string;
//   thumbColor?: string;
// }

// const CustomSlider: React.FC<CustomSliderProps> = ({
//   value = 4,
//   onValueChange,
//   thumbImage,
//   trackColor = '#FFD700',
//   thumbColor = '#FFD700',
// }) => {
//   const x = useSharedValue((value / MAX_VALUE) * TRACK_WIDTH);

//   useEffect(() => {
//     x.value = withSpring((value / MAX_VALUE) * TRACK_WIDTH);
//   }, [value]);

//   const gestureHandler = useAnimatedScrollHandler({
//     onActive: (event) => {
//       let newX = event.translationX + x.value;
//       newX = Math.max(0, Math.min(newX, TRACK_WIDTH));
//       const ratio = newX / TRACK_WIDTH;
//       const stepped = Math.round(ratio * (MAX_VALUE / STEP)) * STEP;
//       x.value = (stepped / MAX_VALUE) * TRACK_WIDTH;

//       if (onValueChange) {
//         runOnJS(onValueChange)(stepped);
//       }
//     },
//   });

//   const thumbStyle = useAnimatedStyle(() => ({
//     transform: [{ translateX: x.value }],
//   }));

//   const progressStyle = useAnimatedStyle(() => ({
//     width: x.value + THUMB_SIZE / 2,
//     backgroundColor: trackColor,
//   }));

//   return (
//     <View style={styles.container}>
//       <View style={styles.track}>
        
          
//         <Animated.View style={[styles.filledTrack, progressStyle]}  />
//         <PanGestureHandler onGestureEvent={gestureHandler}>
    
//           <Animated.View style={[styles.thumb, thumbStyle]}>
//             {thumbImage ? (
//               <Image
//                 source={thumbImage}
//                 style={[styles.thumbImage, { tintColor: thumbColor }]}
//               />
//             ) : (
//               <View
//                 style={[
//                   styles.thumbDot,
//                   { backgroundColor: thumbColor },
//                 ]}
//               />
//             )}
//           </Animated.View>
//         </PanGestureHandler>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginVertical: 16,
//     alignItems: 'center',
//   },
//   track: {
//     width: TRACK_WIDTH,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: '#ccc',
//     justifyContent: 'center',
//   },
//   filledTrack: {
//     height: 6,
//     borderRadius: 3,
//     position: 'absolute',
//     left: 0,
//   },
//   thumb: {
//     width: THUMB_SIZE,
//     height: THUMB_SIZE,
//     borderRadius: THUMB_SIZE / 2,
//     position: 'absolute',
//     top: -12,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   thumbDot: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//   },
//   thumbImage: {
//     width: 30,
//     height: 30,
//     resizeMode: 'contain',
//   },
// });

// export default CustomSlider;


// new


// import React, { useEffect } from 'react';
// import { View, StyleSheet, Dimensions, Image } from 'react-native';
// import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
// import Animated, {
//   useSharedValue,
//   useAnimatedGestureHandler,
//   useAnimatedStyle,
//   withSpring,
//   runOnJS,
// } from 'react-native-reanimated';

// const { width } = Dimensions.get('window');
// const TRACK_WIDTH = width - 60;
// const THUMB_SIZE = 30;
// const MAX_VALUE = 5;
// const STEP = 0.5;

// interface CustomSliderProps {
//   value?: number;
//   onValueChange?: (val: number) => void;
//   thumbImage?: any;
//   trackColor?: string;
//   thumbColor?: string;
// }

// const CustomSlider: React.FC<CustomSliderProps> = ({
//   value = 4,
//   onValueChange,
//   thumbImage,
//   trackColor = '#FFD700',
//   thumbColor = '#FFD700',
// }) => {
//   const x = useSharedValue((value / MAX_VALUE) * TRACK_WIDTH);

//   useEffect(() => {
//     x.value = withSpring((value / MAX_VALUE) * TRACK_WIDTH);
//   }, [value]);

//   const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
//     onStart: (_, ctx: any) => {
//       ctx.startX = x.value;
//     },
//     onActive: (event, ctx: any) => {
//       let newX = ctx.startX + event.translationX;
//       newX = Math.max(0, Math.min(newX, TRACK_WIDTH));
//       const ratio = newX / TRACK_WIDTH;
//       const stepped = Math.round(ratio * (MAX_VALUE / STEP)) * STEP;
//       x.value = (stepped / MAX_VALUE) * TRACK_WIDTH;

//       if (onValueChange) {
//         runOnJS(onValueChange)(stepped);
//       }
//     },
//   });

//   const thumbStyle = useAnimatedStyle(() => ({
//     transform: [{ translateX: x.value }],
//   }));

//   const progressStyle = useAnimatedStyle(() => ({
//     width: x.value + THUMB_SIZE / 2,
//     backgroundColor: trackColor,
//   }));

//   return (
//     <View style={styles.container}>
//       <View style={styles.track}>
//         <Animated.View style={[styles.filledTrack, progressStyle]} />
//         <PanGestureHandler onGestureEvent={gestureHandler}>
//           <Animated.View style={[styles.thumb, thumbStyle]}>
//             {thumbImage ? (
//               <Image source={thumbImage} style={[styles.thumbImage, { tintColor: thumbColor }]} />
//             ) : (
//               <View style={[styles.thumbDot, { backgroundColor: thumbColor }]} />
//             )}
//           </Animated.View>
//         </PanGestureHandler>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginVertical: 16,
//     alignItems: 'center',
//   },
//   track: {
//     width: TRACK_WIDTH,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: '#ccc',
//     justifyContent: 'center',
//   },
//   filledTrack: {
//     height: 6,
//     borderRadius: 3,
//     position: 'absolute',
//     left: 0,
//   },
//   thumb: {
//     width: THUMB_SIZE,
//     height: THUMB_SIZE,
//     borderRadius: THUMB_SIZE / 2,
//     position: 'absolute',
//     top: -12,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   thumbDot: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//   },
//   thumbImage: {
//     width: 30,
//     height: 30,
//     resizeMode: 'contain',
//   },
// });

// export default CustomSlider;


// new 2222



import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
const TRACK_WIDTH = width - 60;
const THUMB_SIZE = 30;
const MAX_VALUE = 5;
const STEP = 0.5;

interface CustomSliderProps {
  value?: number;
  onValueChange?: (val: number) => void;
  thumbImage?: any;
  trackColor?: string;
  thumbColor?: string;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  value = 4,
  onValueChange,
  thumbImage,
  trackColor = '#FFD700',
  thumbColor = '#FFD700',
}) => {
  const x = useSharedValue((value / MAX_VALUE) * TRACK_WIDTH);

  useEffect(() => {
    x.value = withSpring((value / MAX_VALUE) * TRACK_WIDTH);
  }, [value]);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      let newX = x.value + event.translationX;
      newX = Math.max(0, Math.min(newX, TRACK_WIDTH));
      const ratio = newX / TRACK_WIDTH;
      const stepped = Math.round(ratio * (MAX_VALUE / STEP)) * STEP;
      x.value = (stepped / MAX_VALUE) * TRACK_WIDTH;

      if (onValueChange) {
        runOnJS(onValueChange)(stepped);
      }
    });

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: x.value + THUMB_SIZE / 2,
    backgroundColor: trackColor,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <Animated.View style={[styles.filledTrack, progressStyle]} />
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.thumb, thumbStyle]}>
            {thumbImage ? (
              <Image source={thumbImage} style={[styles.thumbImage, { tintColor: thumbColor }]} />
            ) : (
              <View style={[styles.thumbDot, { backgroundColor: thumbColor }]} />
            )}
          </Animated.View>
        </GestureDetector>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    marginTop:10,
    alignItems: 'center',
  },
  track: {
    width: TRACK_WIDTH,
    height: 3,
    borderRadius: 3,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignSelf:'flex-start'
  },
  filledTrack: {
    height: 2,
    borderRadius: 3,
    position: 'absolute',
    left: 0,
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    position: 'absolute',
    top: -12,
    justifyContent: 'center',
    paddingHorizontal:20,
    alignItems: 'center',
  },
  thumbDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
  },
  thumbImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default CustomSlider;

