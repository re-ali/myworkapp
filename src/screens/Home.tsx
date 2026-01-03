import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  View, Text, TouchableOpacity, Image, StyleSheet,
  Animated,
  KeyboardAvoidingView, Platform, ScrollView, Button, FlatList, StatusBar,
  Easing,
  RefreshControl
} from 'react-native'
import Scale from '../helper/Scale';
import Entypo from 'react-native-vector-icons/Entypo';
import { IMAGES } from '../assets/imagePath';
import Colors from '../helper/Color';
import { TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';
// import UploadMedia from '../componets/UploadMedia';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getFCMToken, requestNotificationPermission, setupNotificationHandlers } from '../notifications/firebaseNotification';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { keepLocalCopy, pick, types } from '@react-native-documents/picker';
import { viewDocument } from '@react-native-documents/viewer';
import CustomHeader from '../utility/CustomHeader';
import MenuBar from '../utility/MenuBar';
import { useLazyGetHomeListQuery, useLazyGetProfileQuery } from '../redux/ServiceApis/HomeSlice';
import { ActivityIndicator } from 'react-native';
import moment from 'moment'
import NotificationsShimmer from './NotificationsShimmer';
import { showCustomToast } from '../componets/showCustomToast';
import { useFocusEffect } from '@react-navigation/native';


let _lat = '';
let _lng = '';
let _city = '';
let _industryId = '';
let _startDate = '';
let _endDate = '';
let _maxDistance = 0;

interface LoginProps {
  navigation: any;
}

interface imapeProp {
  uri: string
};

const parentData = [
  { id: '1', title: 'Item 1', children: ['A', 'B', 'C'] },
  { id: '2', title: 'Item 2', children: ['D', 'E', 'F'] },
  { id: '3', title: 'Item 3', children: ['G', 'H'] },
];

const benefitsData = [
  {
    id: 0,
    title: 'After Hours Visits',
    subTitle: 'used of your After hour visits benefit.',
    annualLimit: '3',
    usedLimit: '0',
    isExpend: false,
  },
  {
    id: 1,
    title: 'Breathing Device',
    subTitle: 'used of your After hour visits benefit.',
    annualLimit: '3',
    usedLimit: '0',
    isExpend: false,
  },
  {
    id: 2,
    title: 'COVID Antigen Testing',
    subTitle: 'used of your After hour visits benefit.',
    annualLimit: '3',
    usedLimit: '0',
    isExpend: false,
  },
  {
    id: 3,
    title: 'Over Counter Medication',
    subTitle: 'used of your After hour visits benefit.',
    annualLimit: '3',
    usedLimit: '0',
    isExpend: false,
  },
  {
    id: 4,
    title: 'After Hours Visits',
    subTitle: 'used of your After hour visits benefit.',
    annualLimit: '3',
    usedLimit: '0',
    isExpend: false,
  },
];

const Home: React.FC<LoginProps> = ({ navigation }) => {

  const insets = useSafeAreaInsets();


  const [email, onChangeNumber] = useState<string>('');
  const [pasword, setPassword] = useState<string>('');

  const [openCard, setOpenCard] = useState<string | null>(null);
  const animValuesRef = useRef<{ [key: string]: Animated.Value[] }>({});
  const [fileInfo, setFileInfo] = useState(null);

  const [uri, setUri] = useState<string | null>(null);

  //  _lat = _userLocation?.latitude;
  // _lng = _userLocation?.longitude;
  // _maxDistance = 123710000000000;

  // const refRBSheet = useRef<RBSheet>(null);
  // const refRBSheet = useRef<typeof RBSheet | null>(null);
  const refRBSheet = useRef<any>(null); // ✅ Works in all cases

  const handlePick = async () => {
    try {
      const [result] = await pick({
        type: [types.pdf, types.plainText], // allow PDFs and plain-text files
      });
      console.log('Picked file info:', result);
      setFileInfo(result);
    } catch (err) {
      console.error('Pick error:', err);
    }
  };

  const [showModal, setShowModal] = useState<boolean>(false);
  const [imagePath, setImage] = useState<imapeProp>({ uri: '' });
  const [expandedCardIds, setExpandedCardIds] = useState<number[]>([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const mapRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 30.720608291270693,
    longitude: 76.7084975602337,
  });

  const limit = 5;
  const [items, setItems] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const isLoadingMore = useRef(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const [triggerWorkerJobList, { data, isLoading, isFetching }] = useLazyGetHomeListQuery();
  const [getProfile, { data:profileData, isLoading:loder, isFetching:fetch }] = useLazyGetProfileQuery();
console.log('data profile >>>', profileData)


  // AUTO GET CURRENT LOCATION ONCE
  useEffect(() => {
    loadNotifications(0, true);
    getProfile({})
    
  }, []);

   
 

  const loadNotifications = useCallback(
    async (customOffset = 0, isRefresh = false) => {
      try {
        const params = {limit, skip: customOffset};

        const res = await triggerWorkerJobList(params,true);
        console.log('data res >>>', res?.data)
        if (!res?.data?.quotes) return;

 

        const fetched = res.data.quotes;

        if (isRefresh || customOffset === 0) {
          setItems(fetched);
        } else {
          setItems(prev => [...prev, ...fetched]);
        }

        setHasMore(fetched.length === limit);
      } catch (err) {
        console.log('Pagination error:', err);
      } finally {
        isLoadingMore.current = false;
        setRefreshing(false);
        setInitialLoading(false);
      }
    },
    [limit]
  );

  const onRefresh = () => {
    setRefreshing(true);
    setOffset(0);
    setHasMore(true);
    loadNotifications(0, true);
  };

  const onEndReached = () => {
    if (
      isLoadingMore.current ||
      isFetching ||
      !hasMore ||
      items.length < limit // 🔥 critical fix
    ) {
      return;
    }

    isLoadingMore.current = true;

    const newOffset = offset + limit;
    setOffset(newOffset);
    loadNotifications(newOffset);
  };


  const handleLogout = () => {
    setMenuVisible(false);
    console.log("User logged out");
  };


  const handleMenu = () => {
    setMenuVisible(true);
    console.log("User logged out");
  };
  const [errors, setErrors] = useState<{
    emailError?: string;
    passwordError?: string;
  }>({});


  const [lat_long, setLat_long] = useState({
    markers: [],
    latitude: _lat || 55.3838026,
    longitude: _lng || 10.0674972,
    latitudeDelta: 0.004100065389053498,
    longitudeDelta: 0.0025863200426243793
  });

  const toggleExpand = (id: number) => {
    setExpandedCardIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };


  // Notification Related Code
  React.useEffect(() => {
    // const initNotifications = async () => {
    //   const granted = await requestNotificationPermission();
    //   console.log('granted use effect >>>', granted);

    //   if (granted) {
    //     const token = await getFCMToken();
    //     console.log('Device  Token:>>>>>>>>', token);
    //     // dispatch(setFcmTokenReduxAction(token));

    //     if (token) {
    //       const unsubscribe = setupNotificationHandlers();
    //       return unsubscribe;
    //     }
    //   }
    // };

    // let unsubscribeHandler:any;
    // initNotifications().then(unsub => {
    //   unsubscribeHandler = unsub;
    // });

    // return () => {
    //   if (typeof unsubscribeHandler === 'function') {
    //     unsubscribeHandler();
    //   }
    // };
  }, []);


  const validate = () => {
    let valid = true;
    const errorsCopy = {
      emailError: '',
      passwordError: ''
    }


    const emailRegex = /^\w+([\.-]?\w+)*(\+\w+)?@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (email.trim() === '') {
      errorsCopy.emailError = "Email is required";
      valid = false
    } else if (!emailRegex.test(email)) {
      errorsCopy.emailError = "Enter Valid Email id";
      valid = false;
    }


    // if (pasword.trim() === '') {
    //   errorsCopy.passwordError = 'Password is required';
    //   valid = false
    // } else if (pasword.length < 4) {
    //   errorsCopy.passwordError = 'Password must be 4 chracters.';
    //   valid = false
    // }

    setErrors(errorsCopy);

    return valid
  };

  const handleLogin = () => {

    // refRBSheet.current?.open()

    // return
    if (validate()) {
      console.log('hi')
    }
  };

  const handlePress = (item: typeof parentData[0]) => {
    const isOpen = openCard === item.id;

    if (!isOpen) {
      setOpenCard(item.id);

      // Reset animation values before replaying
      if (!animValuesRef.current[item.id]) {
        animValuesRef.current[item.id] = item.children.map(() => new Animated.Value(0));
      } else {
        animValuesRef.current[item.id].forEach(anim => anim.setValue(0));
      }

      // Animate each child with stagger
      Animated.stagger(
        500,
        animValuesRef.current[item.id].map(anim =>
          Animated.timing(anim, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
          })
        )
      ).start();
    } else {
      setOpenCard(null);
    }
  };

  const renderItem = ({ item }: { item: typeof parentData[0] }) => {
    const isOpen = openCard === item.id;
    const animValues = animValuesRef.current[item.id] || [];

    return (
      <View style={styles.card}>
        <TouchableOpacity onPress={() => handlePress(item)}>
          <Text style={styles.titleStyle}>{item.title}</Text>
        </TouchableOpacity>

        {isOpen &&
          item.children.map((child, index) => {
            const anim = animValues[index];
            return (
              <Animated.View
                key={index}
                style={{
                  opacity: anim,
                  transform: [
                    {
                      translateY: anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0],
                      }),
                    },
                  ],
                  paddingVertical: 4,
                }}
              >
                <Text style={styles.childText}>{child}</Text>
              </Animated.View>
            );
          })}
      </View>
    );
  };

  const renderError = (field: keyof typeof errors) => {
    const errorMsg = errors[field];
    return errorMsg ? (
      <View style={styles.errorViewStyle}>
        <Text style={styles.nameErrorStyle}>{errorMsg}</Text>
      </View>
    ) : null;
  };

  const renderCard = ({ item }: { item: typeof benefitsData[0] }) => {
    const isExpanded = expandedCardIds.includes(item.id);

    return (
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => toggleExpand(item.id)}
          style={styles.headerRow}>
          <Text style={styles.title}>{item.title}</Text>
          <Ionicons
            name={isExpanded ? 'chevron-down-outline' : 'chevron-forward-outline'}
            size={20}
            color="#000"
          />
        </TouchableOpacity>

        <Text style={styles.limit}>
          {item.usedLimit}/{item.annualLimit}{' '}
          <Text style={styles.used}>used</Text>
        </Text>

        {isExpanded && (
          <>
            <View style={styles.divider} />
            <Text style={styles.subtitle}>{item.subTitle}</Text>
            <View style={styles.row}>
              <Text style={styles.used}>Annual limit</Text>
              <Text style={styles.limit}>{item.annualLimit} times</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.used}>Used</Text>
              <Text style={styles.limit}>{item.usedLimit} times</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={[styles.available, { color: 'black' }]}>Available</Text>
              <Text style={[styles.available, { color: 'orange' }]}>
                {item.annualLimit} <Text style={{ color: 'black' }}>times</Text>
              </Text>
            </View>
          </>
        )}
      </View>
    );
  };

  const handleImportAndSave = async () => {
    try {
      const [{ name, uri }, result] = await pick();
      const [copyResult] = await keepLocalCopy({
        files: [{ uri, fileName: name ?? 'default-name' }],
        destination: 'documentDirectory', // you can also use 'cacheDirectory'
      });

      console.log('Local copy URI:', result, copyResult);


      if (copyResult.status === 'success') {
        console.log('Local copy URI:', copyResult.localUri);
      }
    } catch (err) {
      console.error('Error during pick/copy:', err);
    }
  };

  const handlePickAndView = async () => {
    try {
      const [file] = await pick();

      if (file) {

        let _path = 'https://morth.nic.in/sites/default/files/dd12-13_0.pdf'
        // Open the file directly in viewer modal
        await viewDocument({
          uri: file,          // picked file URI
          name: file.name ?? 'Sample',  // optional, shown in title
        });
      }
    } catch (err) {
      console.error('Error picking or viewing document:', err);
    }
  };

  const handleViewFromApi = async () => {
    try {
      // Example: URL from your backend API response
      let fileUrl = 'https://morth.nic.in/sites/default/files/dd12-13_0.pdf'

      await viewDocument({
        uri: fileUrl,
        name: 'Sample File.pdf', // optional
      });
    } catch (err) {
      console.error('Error viewing document:', err);
    }
  };

  const handleError = (error: any) => {
    console.log('error >>', error)
  }

  const gotoCurrentLocation = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        },
        1000 // animation duration
      );
    }
  };

  const renderItemT = ({ item, index }: any) => {
    let _time = item.createdAt ? moment(item.createdAt).format("MMM D, YYYY | hh:mm A") : "";
    const isRead = item.isRead;

    return (
      <TouchableOpacity
        disabled={item.isRead}
        style={{ 
          backgroundColor: isRead ? Colors.WHITE : Colors.LIGHT_GREEN,
           marginVertical: 5,
            alignItems:'flex-start' 
          }}
      >
        <View style={{
          flexDirection: "row",
          // marginTop: Scale(15),
          justifyContent: "space-between",
          marginBottom: Scale(10),
          gap: Scale(10),
          alignItems: "center",
        }}>
          <View style={styles.divider} />
          <Text style={styles.dateText}>{_time}</Text>
          <View style={styles.divider} />
        </View>
        <View key={item.id} style={[styles.notificationCard,
        ]}>
          <Image source={item?.url ? { uri: item?.url } : IMAGES.Circle1}
            style={styles.avatar} />
          <View style={styles.textContainer}>
            {/* <Text style={styles.message}>{item?.title}</Text> */}
            <Text style={[styles.message, { color: isRead ? Colors.GREY_7 : Colors.BLACK },
            ]}>
              {item?.quote}
            </Text>
            <Text style={{ color: isRead ? Colors.GREY_7 : Colors.BLACK }}>{item?.author}</Text>

          </View>
        </View>
      </TouchableOpacity>
    )
  }

    const isActionLoading = (initialLoading && items.length === 0) ;

  

  return (
    // <KeyboardAvoidingView style={{ flex: 1, paddingTop: insets.top }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

    <View style={{ flex: 1 , paddingTop: insets.top}}>

      <CustomHeader
        leftIcon="menu"
        centerText="Home"
        rightIcon="setting"
        onLeftPress={() => {
          // Open your menu drawer or modal
          console.log('Menu opened');
          handleMenu()
          // For example, if using react-navigation drawer:
          // navigation.openDrawer();
        }}
      />

        {isActionLoading && (
        <View style={{  }}>
         <FlatList
          data={[1, 2, 3, 4]}
          keyExtractor={(i) => i.toString()}
          renderItem={() => <NotificationsShimmer />}
        />
        </View>
      )}

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItemT}
        contentContainerStyle={{ paddingBottom: Scale(100) }}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.2}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.THEAME_GREEN]}
          />
        }
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

  {/* <ScrollView contentContainerStyle={[{ flexGrow: 1 }, {
        // marginTop: insets.top,
        // backgroundColor: Colors.mainColor,
        backgroundColor: 'red'
      }]}> */}
  {/* <View style={{
          flex: 1,
          backgroundColor: Colors.mainColor,
          // alignItems: 'center', 
          justifyContent: 'center'
        }}> */}

  {/* <Entypo name="flow-branch" size={Scale(60)} /> */ }

  {/* <View style={styles.container}> */ }
  {/* <MapView
        key={'AIzaSyDuCIv4b-RqzNzJFYD24fU2U4GqANkDTHA'}
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: 30.720608291270693,
         longitude: 76.7084975602337,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}

     >

         {lat_long?.markers?.map((marker, index) => {
          const scaleStyle = {
            // transform: [
            //   {
            //     Scale: interpolations[index].Scale,
            //   },
            // ],
          };
          return (
            <Marker
              // key={index}
              tracksViewChanges={Platform.OS === 'ios' ? false : true}
              coordinate={marker.coordinate}
              onPress={(e) => {
                console.log('item clciked >>>', marker)
                setModalDetails(marker)
                setShowModal(true)
              }}
            >
              <Image
                source={marker?.image ? { uri: marker?.image } : images.appLogo}
                style={styles.mapImage}
                resizeMode='cover'>
              </Image>
              <View style={styles.notch} />

            </Marker>
          );
        })}
     </MapView>   */}


  {/* </View> */ }


  {/* <FlatList
                data={parentData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 2,  marginTop: 20}}
              /> 

                <FlatList
      data={benefitsData}
      renderItem={renderCard}
      keyExtractor={item => item.id.toString()}
    /> */}
  {/* <Button title="Pick a document" onPress={handlePick} />
          {fileInfo && (
            <Text>{`Name: ${fileInfo.name}, URI: ${fileInfo.uri}`}</Text>
          )} */}

  {/* <Button title="Pick and save locally" onPress={handleImportAndSave} />
          <Button title="Pick & View Document" onPress={handlePickAndView} />
          <Button title="View API Document" onPress={handleViewFromApi} />
          <Button
            title="view the last imported file"
            onPress={() => {
              // const bookmark = '...'
              let bookmark = 'https://morth.nic.in/sites/default/files/dd12-13_0.pdf'
              viewDocument({ bookmark }).catch((err) => handleError(err))
            }}
          />

          <MenuBar
            visible={menuVisible}
            onClose={() => setMenuVisible(false)}
            onLogout={handleLogout}
          /> */}


  {/* </View> */ }
  {/* </ScrollView> */ }


  {/* </KeyboardAvoidingView> */ }

}

const styles = StyleSheet.create({
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
    fontSize: Scale(18)
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
    backgroundColor: 'pink'
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
  message: {
    fontSize: Scale(19),
    color: Colors.BLACK,
    marginBottom: Scale(10),
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
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
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
})

export default Home