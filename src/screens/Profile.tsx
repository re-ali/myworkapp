import React, { useRef, useState } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Button, FlatList } from 'react-native'
import Scale from '../helper/Scale';
import Entypo from 'react-native-vector-icons/Entypo';
import { IMAGES } from '../assets/imagePath';
import Colors from '../helper/Color';
import { TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
import Swiper from 'react-native-swiper';

interface LoginProps {
  navigation: any;
}



const Profile: React.FC<LoginProps> = ({ navigation }) => {

  return (
    <View style={{
      flex: 1,
    }}>
      <Swiper
        showsButtons={true}
        loop={false}
        activeDotColor={Colors.blue}
        activeDotStyle={{ width: Scale(10), height: Scale(10), borderRadius: Scale(20) }}
        buttonWrapperStyle={styles.buttonStyle}
        nextButton={
          <Text>Next</Text>

        }
        prevButton={
          <Text>Back</Text>
        }
      >

        <Text>Back394830948</Text>
        <Text>Back43434343</Text>
        <Text>Back34343</Text>
        <Text>Backfff</Text>


      </Swiper>
 
    </View>
  )
}

const styles = StyleSheet.create({

 
  map: {
    flex: 1,
  },
  mapImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  notch: {
    // your notch styling here
  },
  currentLocationButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 10,
    elevation: 5, // shadow for android
    shadowColor: '#000', // shadow for ios
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },

  buttonStyle: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    position: 'absolute',
    marginTop: Scale(360),
    left: 0,
    lex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sheetText: {
    fontSize: 18,
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
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
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
    backgroundColor: 'pink'
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
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
})

export default Profile