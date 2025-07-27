import React, { useRef, useState } from 'react'
import {
  View, Text, TouchableOpacity, Image, StyleSheet,
  UIManager,
  findNodeHandle,
  KeyboardAvoidingView, Platform, ScrollView, FlatList, Dimensions, Pressable,
  TouchableHighlight
} from 'react-native'
import Scale from '../helper/Scale';
import Entypo from 'react-native-vector-icons/Entypo';
import { IMAGES } from '../assets/imagePath';
import Colors from '../helper/Color';
import { TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';

import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
// import { Tooltip } from '@rneui/themed';
import { Button } from '@rneui/base';

import { HomeSvg } from '../assets/svgPath';
import RNModal from 'react-native-modal';
import Tooltip from 'react-native-walkthrough-tooltip';
import CustomSlider from '../componets/CustomSlider';



interface LoginProps {
  navigation: any;
}
;

const dataff = [
  { id: '1', title: 'Item 1', description: 'Desc 1', color: '#FF5733' }, // red-orange
  { id: '2', title: 'Item 2', description: 'Desc 2', color: '#33C1FF' }, // sky blue
  { id: '3', title: 'Item 3', description: 'Desc 3', color: '#28A745' }, // green
  { id: '4', title: 'Item 4', description: 'Desc 4', color: '#FFC107' }, // yellow
  { id: '5', title: 'Item 5', description: 'Desc 5', color: '#9C27B0' }, // purple
];

const screen = Dimensions.get('screen');


const Home: React.FC<LoginProps> = ({ navigation }) => {

  const [visibleId, setVisibleId] = useState<string | null>(null);


  const [visible, setVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const itemRefs = useRef<{ [key: string]: any }>({});

  const [ratings, setRatings] = useState<{ [key: string]: number }>(() => {

    const initialRatings: any = {};

    dataff.forEach((item) => {
      initialRatings[item.id] = 4;
    });
    return initialRatings;
  });

  const [selectedSliderId, setSelectedSliderId] = useState<string | null>(null);


  const [rating, setRating] = useState(0); // From 0 to 5


  // const openPopover = (item: any) => {
  //   setSelectedItem(item);
  //   setVisible(true);
  // };

  // const closePopover = () => {
  //   setVisible(false);
  //   setSelectedItem(null);
  // };


  const openPopover = (item: any) => {
    const ref = itemRefs.current[item.id];

    if (ref) {
      const nodeHandle = findNodeHandle(ref);
      if (nodeHandle != null) {
        UIManager.measureInWindow(
          nodeHandle,
          (x, y, width, height) => {
            setTooltipPosition({ x: x + width / 2, y });
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
          size={12}
          color={i <= rating ? '#FFD700' : '#cc5c'} // gold or grey
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
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}></View>
        <Text style={styles.itemText}>{item.title}
          <TouchableOpacity
            ref={(ref) => { itemRefs.current[item.id] = ref }}
            onPress={() => openPopover(item)}
            style={{ paddingHorizontal: 4 }}
          >
            <Feather name='info' size={15} color={'gray'} style={{ marginLeft: 4 }} />
          </TouchableOpacity>

        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
          {renderStars(ratings[item.id], item.color)}
        </View>

        {/* <Slider
        style={{ width: '100%', marginTop: 10 }}
        minimumValue={0}
        maximumValue={5}
        step={0.5}
        value={ratings[item.id]}
        onValueChange={(value) => handleRatingChange(item.id, value)}
        onSlidingStart={() => setSelectedSliderId(item.id)}
        minimumTrackTintColor="#FFD700"
        maximumTrackTintColor="#000"
      /> */}

      </View>

      <Slider
        style={{
          width: 250,
          height: 40,
        }}
        minimumValue={0}
        maximumValue={5}
        step={0.5}
        value={rating}
        onValueChange={(value) => handleRatingChange(item.id, value)}
        onSlidingStart={() => setSelectedSliderId(item.id)}
        minimumTrackTintColor={item.color}
        maximumTrackTintColor="#c5cc"
        thumbTintColor={item.color}

      />
    </>

  );



  return (
    <KeyboardAvoidingView style={{ flex: 1 }}
    // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        {/* {visibleId && (
          <Pressable
            style={styles.overlay}
            onPress={() => setVisibleId(null)}
          />
        )} */}
        <View style={{
          flex: 1,
          backgroundColor: Colors.mainColor,
          // alignItems: 'center', 
          justifyContent: 'center'
        }}>

          <FlatList
            data={dataff}
            keyExtractor={(item) => item.id}
            renderItem={renderItemd}
            contentContainerStyle={{ padding: 16 }}
          />



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
                  top: tooltipPosition.y - 70,
                  left: tooltipPosition.x - 80, // half of tooltip width
                },
              ]}
            >
              <View style={styles.tooltipBox}>
                <Text style={styles.tooltipText}>{selectedItem?.description}</Text>
              </View>
              <View style={styles.tooltipArrow} />
            </View>
          </RNModal>

          <View style={styles.container}>
            <Text style={styles.text}>Rating: {rating.toFixed(1)}</Text>
            <View style={styles.starRow}>{renderStars()}</View>



            {/* <Tooltip
                isVisible={visible}
                content={<Text>Check this out!</Text>}
                placement="top"
                onClose={closePopover}
              >
                <TouchableHighlight style={styles.touchable}>
                  <Text>Press me</Text>
                </TouchableHighlight>
              </Tooltip> */}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    flexDirection: 'row',
    marginVertical: 4,
    alignItems: 'center',
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
    padding: 2,
    borderRadius: 8,
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
    backgroundColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    zIndex: 10,
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
    marginTop: -1,
  },
})

export default Home