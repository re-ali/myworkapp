import React, { useRef, useState } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet,
    Animated,
  KeyboardAvoidingView, Platform, ScrollView, Button, FlatList, StatusBar, 
  Easing} from 'react-native'
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


  // const refRBSheet = useRef<RBSheet>(null);
  // const refRBSheet = useRef<typeof RBSheet | null>(null);
  const refRBSheet = useRef<any>(null); // ✅ Works in all cases



  const [showModal, setShowModal] = useState<boolean>(false);
  const [imagePath, setImage] = useState<imapeProp>({ uri: '' });


  const [expandedCardIds, setExpandedCardIds] = useState<number[]>([]);


  const [errors, setErrors] = useState<{
    emailError?: string;
    passwordError?: string;
  }>({});


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
 
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

      <ScrollView contentContainerStyle={[{ flexGrow: 1 },{
        // marginTop: insets.top,
          // backgroundColor: Colors.mainColor,
        backgroundColor:'red'
      }]}>
        <View style={{
          flex: 1,
          backgroundColor: Colors.mainColor,
          // alignItems: 'center', 
          justifyContent: 'center'
        }}>

         
          <View style={{
            flex: 0.3,
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: Scale(20)

          }}>
            {/* <Image
              source={IMAGES.Logo}
              // source={imagePath ? { uri: imagePath?.uri } : IMAGES.Logo}

              style={{ width: Scale(250), height: Scale(250) }}
              resizeMode='contain'
            /> */}
            {/* <Text style={{ fontSize: Scale(40), color: 'red', fontWeight: '700', marginTop: 30 }}>Welcome To My App</Text> */}
          </View>


          <View style={{
            flex: 0.7,
            // backgroundColor:'red', 
            paddingHorizontal: Scale(15),
            // alignItems: 'center', 
            // justifyContent: 'center'
          }}>
            {/* <Entypo name="flow-branch" size={Scale(60)} /> */}

           

             <FlatList
                data={parentData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 2,  marginTop: 20}}
              /> 

                <FlatList
      data={benefitsData}
      renderItem={renderCard}
      keyExtractor={item => item.id.toString()}
    />
        

          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
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
 
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  available: {
    fontSize: 15,
    fontWeight: '600',
  },
})

export default Home