import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  View, Text, TouchableOpacity, Image, StyleSheet,
  UIManager,
  findNodeHandle,
  KeyboardAvoidingView, Platform, ScrollView, FlatList, Dimensions, Pressable,
  TouchableHighlight,
  Alert
} from 'react-native'
import Scale from '../helper/Scale';
import Entypo from 'react-native-vector-icons/Entypo';
import { IMAGES } from '../assets/imagePath';
import Colors from '../helper/Color';
import { TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';

import Popover, { PopoverMode, Rect } from 'react-native-popover-view';


import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
// import { Tooltip } from '@rneui/themed';
import { Button } from '@rneui/base';

import { HomeSvg } from '../assets/svgPath';
import RNModal from 'react-native-modal';
import Tooltip from 'react-native-walkthrough-tooltip';
import CustomSlider from '../componets/CustomSlider';
import { useLazyGetVideoListQuery } from '../redux/ServiceApis/VideoSlice';
import { ActivityIndicator } from 'react-native';

import Video from 'react-native-video';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;

const tooltipWidth = 250;


interface LoginProps {
  navigation: any;
}
;

const dataff = [
  { id: '1', title: 'Item 1 COntin meri ksfl fdfds fdf d ', description: 'Desc 1j,hdjfd fdsfdhfkdsfdsfksjdfbdksjhfkdj', color: '#FF5733' }, // red-orange
  { id: '2', title: 'Item 2lkljfdsf dsf dfdfd', description: 'Desc 2 fdjfdfdkfdfdf', color: '#33C1FF' }, // sky blue
  { id: '3', title: 'Item 3 lkfsdlfdsfdf', description: 'Desc 3 jfdjfdfdfd', color: '#28A745' }, // green
  { id: '4', title: 'Item 4fdsfdsf dfkdlfd', description: 'Desc 4 kjfdjkfdkfdf', color: '#FFC107' }, // yellow
  { id: '5', title: 'Item 5fdsfdsfdsd', description: 'Desc 5 kjbfdkfbdkjf', color: '#9C27B0' }, // purple
];

const screen = Dimensions.get('screen');


const Home: React.FC<LoginProps> = ({ navigation }) => {

  const [visibleId, setVisibleId] = useState<string | null>(null);
  const insets = useSafeAreaInsets();


  const [visible, setVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const itemRefs = useRef<{ [key: string]: any }>({});

  const [tooltipSize, setTooltipSize] = useState({ width: 0, height: 0 });
  const [arrowOffset, setArrowOffset] = useState(0); // X-offset for the arrow

  const [ratings, setRatings] = useState<{ [key: string]: number }>(() => {

    const initialRatings: any = {};

    dataff.forEach((item) => {
      initialRatings[item.id] = 1;
    });
    return initialRatings;
  });

  const [items, setItems] = useState<any[]>([]);

    const [trigerVideoList, { data, isLoading, isFetching }] = useLazyGetVideoListQuery();

      useEffect(() => {
        loadNotifications(0, true);
      }, []);

        const loadNotifications = useCallback(
          async (customOffset = 0, isRefresh = false) => {
            try {
      
              const res = await trigerVideoList({});
              console.log('data res video>>>', res?.data)
              const fetched = res.data?.videos[0]?.video_files;
      
              if (isRefresh || customOffset === 0) {
                setItems(fetched);
              } else {
                setItems(prev => [...prev, ...fetched]);
              }
      
            } catch (err) {
              console.log('Pagination error:', err);
            } finally {
            }
          },
          []
        );
    
  

  const openPopover = (item: any) => {
    const ref = itemRefs.current[item.id];

    if (ref) {
      const nodeHandle = findNodeHandle(ref);
      if (nodeHandle != null) {
        UIManager.measureInWindow(
          nodeHandle,
          (x, y, width, height) => {
            setTooltipPosition({ x: x + width / 2, y: y });
            setSelectedItem(item);
            setVisible(true);
          }
        );
      }
    }

    // if (ref) {
    //   UIManager.measureInWindow(
    //     findNodeHandle(ref),
    //     (x, y, width, height) => {
    //       setTooltipPosition({ x: x + width / 2, y });
    //       setSelectedItem(item);
    //       setVisible(true);
    //     }
    //   );
    // }
  };

  const closePopover = () => {
    setVisible(false);
    setSelectedItem(null);
  };

  const handleRatingChange = (id: string, value: number) => {
    setRatings((prev) => ({ ...prev, [id]: value }));
  };


  const renderStars = (rating: number, color: string) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      let iconName = 'star-o'; // empty
      if (i <= rating) {
        iconName = 'star'; // full
      } else if (i - 0.5 <= rating) {
        iconName = 'star-half-full'; // half
      }

      stars.push(
        <FontAwesome
          key={i}
          name={iconName}
          size={16}
          color={i <= rating ? 'red' : '#cc5c'} // gold or grey
          style={{ marginHorizontal: 5 }}
        />
      );
    }
    return stars;
  };


  const renderItemd = ({ item }: any) => (
    <>
      <View
        // ref={(ref) => (itemRefs.current[item.id] = ref)}
        style={styles.itemContainer}
      >
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          // flex: 1,
          width: 300,
          justifyContent: 'space-between'
        }}>
          <View style={{
            // flex: 0.7,
            width: 230,
            // backgroundColor:'pink'
          }}>
            <Text style={styles.itemText} numberOfLines={2}>{item.title}
              <View
              // ref={(ref) => { itemRefs.current[item.id] = ref }}
              // collapsable={false} // IMPORTANT for Android
              >
                <TouchableOpacity
                  ref={(ref) => { itemRefs.current[item.id] = ref }}
                  onPress={() => openPopover(item)}
                  style={{ paddingHorizontal: 2 }}
                >
                  <Feather name='info' size={15} color={'gray'} style={{ marginLeft: 4 }} />
                </TouchableOpacity>
              </View>
            </Text>

          </View>

          <TouchableOpacity
            onPress={() => Alert.alert('hi')}
            style={{
              flexDirection: 'row',
              // flex: 0.2,
              width: 120,
              // backgroundColor:'green'
              // backgroundColor:'red'
            }}>
            {renderStars(ratings[item.id], item.color)}
          </TouchableOpacity>
        </View>
        <CustomSlider
          value={ratings[item.id] || 0}
          onValueChange={(val: number) => handleRatingChange(item.id, val)}
          trackColor={item.color}
          thumbColor={item.color}
        />
      </View>

      {/* <Slider
        style={{
          width: 250,
          height: 40,
        }}
        minimumValue={0}
        maximumValue={5}
        step={0.5}
        value={ratings}
        onValueChange={(value) => handleRatingChange(item.id, value)}
        onSlidingStart={() => setSelectedSliderId(item.id)}
        minimumTrackTintColor={item.color}
        maximumTrackTintColor="#c5cc"
        thumbTintColor={item.color}

      /> */}



    </>

  );
 
const getBestVideo = (videoFiles = []) => {
  return (
    videoFiles.find(v => v.quality === 'hd' && v.file_type === 'video/mp4') ||
    videoFiles.find(v => v.quality === 'sd') ||
    videoFiles[0]
  );
};




const renderItemT = ({ item, index }: any) => {
  const video = getBestVideo(item ? [item] : []);

  if (!item?.link) return null;

  return (
    <View style={styles.videoCard}>
      <Video
        source={{ uri: item.link }}

        style={styles.video}
        resizeMode="cover"

        paused={true}              // autoplay
        muted={true}                // silent autoplay (important)
        repeat={true}               // loop video

        controls={true}             // native controls
        fullscreen={false}

        playInBackground={false}
        playWhenInactive={false}

        ignoreSilentSwitch="ignore" // iOS
        allowsExternalPlayback={false}

        bufferConfig={{
          minBufferMs: 15000,
          maxBufferMs: 50000,
          bufferForPlaybackMs: 2500,
          bufferForPlaybackAfterRebufferMs: 5000,
        }}

        onLoad={(data) => {
          console.log('Video loaded', data.duration);
        }}

        onError={(error) => {
          console.log('Video error', error);
        }}

        onBuffer={({ isBuffering }) => {
          console.log('Buffering:', isBuffering);
        }}
      />
    </View>
  );
};


  return (
        <View style={{ flex: 1 , paddingTop: insets.top}}>
    
 
      {/* 
          <Popover
            isVisible={visible}
            from={new Rect(330, 33, 40, 20)}
            onRequestClose={closePopover}
            mode={PopoverMode.RN_MODAL}
            backgroundStyle={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
            popoverStyle={
              {
                width: Scale(200),
                height: Scale(250),
                shadowColor: '#000',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                backgroundColor: Colors.red,
                paddingTop: Scale(20),
                marginRight: Scale(20),
                borderRadius: Scale(10),
                top: tooltipPosition.y - 50,
                // left: tooltipPosition.x - 95, // half of tooltip width
                left: Math.max(10, tooltipPosition.x + tooltipPosition.x / 2 - tooltipWidth / 2), // center above icon

              }
            }
          >
            <Text style={{ fontWeight: 'bold' }}>
              {selectedItem?.title}
            </Text>
            <Text>{selectedItem?.description}</Text>
          </Popover> */}
          

         <RNModal
            isVisible={visible}
            onBackdropPress={closePopover}
            backdropOpacity={0.3}
            useNativeDriver
            style={StyleSheet.absoluteFill}
            animationIn="fadeIn"
            animationOut="fadeOut"
          >
            <View
              style={[
                styles.tooltipWrapper,
                {
                  top: tooltipPosition.y - 50,
                  // left: tooltipPosition.x - 95, // half of tooltip width
                  left: Math.max(10, tooltipPosition.x + tooltipPosition.x / 2 - tooltipWidth / 2), // center above icon

                },
              ]}
            >
              <View style={[styles.tooltipBox, {
                top: tooltipPosition.y - tooltipSize.height - 10,
                left: Math.min(
                  Math.max(tooltipPosition.x - tooltipSize.width / 2, 8),
                  screenWidth - tooltipSize.width - 8
                ),
              }]}

                onLayout={(event) => {
                  const { width, height } = event.nativeEvent.layout;
                  setTooltipSize({ width, height });

                  const leftPadding = Math.min(
                    Math.max(tooltipPosition.x - width / 2, 8),
                    screenWidth - width - 8
                  );
                  setArrowOffset(tooltipPosition.x - leftPadding); // align arrow relative to tooltip box
                }}

              >
                <Text style={styles.tooltipText}>{selectedItem?.description}</Text>
              </View>
              <View style={[styles.tooltipArrow, {
                position: 'absolute',
                top: tooltipSize.height - 1,
                left: arrowOffset - 8, // center notch (8 is half the arrow width)
              }]} />
            </View>
          </RNModal> 

          <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItemT}
        contentContainerStyle={{ paddingBottom: Scale(100) }}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={false}
        ListFooterComponent={
          isFetching && items.length > 0 ? (
            <ActivityIndicator
              size="large"
              color={Colors.THEAME_GREEN}
              style={{ marginVertical: 12 }}
            />
          ) : null
        }

        ListEmptyComponent={
          !isLoading && !isFetching ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No data found</Text>
            </View>
          ) : null
        }
      />
 
    
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // backgroundColor:'pink'
  },

  starRow: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
  touchable: {
    flex: 1,
    backgroundColor: 'red'
  },
  sheetText: {
    fontSize: 18,
    textAlign: 'center',
  },
  itemContainer: {
    marginVertical: 4,
    // alignItems: 'center',
    // backgroundColor: Colors.red,
    borderRadius: 10,
    paddingHorizontal: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.white,
    position: 'relative', // ADD THIS
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 1,
  },
  itemText: {
    // backgroundColor: '#4287f5',
    color: '#000',
    fontSize: 13,
  },

  errorViewStyle: {
    alignSelf: 'flex-start',
    paddingLeft: Scale(10),
    // backgroundColor:'pink'
  },
  nameErrorStyle: {
    textAlign: 'left',
    color: Colors.red,
    fontFamily: 'Chivo-Regular',
    marginLeft: Scale(2),
    fontSize: Scale(16)
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
  },
  textContainer: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
  },
  star: {
    marginLeft: 8,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  popover: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  popoverTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  popoverDescription: {
    fontSize: 15,
    color: '#444',
    textAlign: 'center',
    marginBottom: 20,
  },

  tooltipWrapper: {
    position: 'absolute',
    alignItems: 'center',
  },
  tooltipBox: {
    // backgroundColor: '#ddd',
    // paddingVertical: 10,
    // paddingHorizontal: 16,
    // borderRadius: 8,
    // zIndex: 10,
    width: tooltipWidth,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  tooltipText: {
    color: '#000',
    fontWeight: 'bold',
  },
  tooltipArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#fff',
  },



   
  card: {
    backgroundColor: '#eff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: '600',
  },
  childText: {
    fontSize: 16,
    color: '#333',
    paddingLeft: 10,
  },
 
  message: {
    fontSize: Scale(19),
    color: Colors.BLACK,
    marginBottom: Scale(10),
  },
 
  icon: {
    width: 20,
    height: 20,
  },
  limit: {
    fontSize: 14,
    color: '#444',
    marginTop: 8,
  },
  used: {
    fontSize: 12,
    color: '#999',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 8,
  },
  dateText: {
    fontSize: Scale(14),
    color: Colors.GREY_7,
    marginBottom: Scale(6),
  },

  notificationCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: Colors.GREY_3,
    // marginBottom: Scale(18),
    paddingHorizontal: Scale(10),
    // backgroundColor:'red',

  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: Scale(12),
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  available: {
    fontSize: 15,
    fontWeight: '600',
  },
 
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: Scale(30),
  },

  emptyText: {
    color: Colors.BLACK,
    fontSize: Scale(25),
    // fontFamily: FONTS.gilroy_medium,
    marginTop: Scale(150)
  },


   videoCard: {
    width: '100%',
    height: 500,
    marginBottom: 20,
    // backgroundColor:'red',
    borderRadius: 12,
    alignSelf:"center",
    gap:10,
    marginHorizontal:10,
    paddingHorizontal:10,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
  },
})

export default Home

 