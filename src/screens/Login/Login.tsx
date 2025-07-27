import React, { useRef, useState } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Button, FlatList } from 'react-native'
import Scale from '../../helper/Scale';
import Entypo from 'react-native-vector-icons/Entypo';
import { IMAGES } from '../../assets/imagePath';
import Colors from '../../helper/Color';
import { TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RBSheet from 'react-native-raw-bottom-sheet';

interface LoginProps {
  navigation: any
}

const Login: React.FC<LoginProps> = ({ navigation }) => {


  const [email, onChangeNumber] = useState<string>('abc@gmail.com');
  const [pasword, setPassword] = useState<string>('37637');

  const refRBSheet = useRef<RBSheet>(null);



  type ErrorFields = 'userNameError' | 'emailError' | 'passwordError';


  const [errors, setErrors] = useState<{
    emailError?: string;
    passwordError?: string;
  }>({});


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


    if (pasword.trim() === '') {
      errorsCopy.passwordError = 'Password is required';
      valid = false
    } else if (pasword.length < 4) {
      errorsCopy.passwordError = 'Password must be 4 chracters.';
      valid = false
    }

    setErrors(errorsCopy);

    return valid
  }

  const handleLogin = () => {

    //  refRBSheet.current?.open()

    // return
    if (validate()) {
      console.log('hi')
      navigation.navigate('Home')
    }
  }

  const renderError = (field: keyof typeof errors) => {
    const errorMsg = errors[field];
    return errorMsg ? (
      <View style={styles.errorViewStyle}>
        <Text style={styles.nameErrorStyle}>{errorMsg}</Text>
      </View>
    ) : null;
  };

  const handleInputChange = (field: 'email' | 'password', value: string) => {
    if (field === 'email') {
      onChangeNumber(value);
      if (errors.emailError) {
        setErrors({ ...errors, emailError: '' });
      }
    }

  }

  const sampleData = new Array(10).fill(null).map((_, index) => ({
    id: index.toString(),
    title: `Title ${index + 1}`,
    subtitle: `This is subtitle ${index + 1}`,
    image: 'https://via.placeholder.com/60',
  }));


  const renderItem = ({ item }: { item: typeof sampleData[0] }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.subtitleRow}>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
          <FontAwesome name="star" size={18} color="gold" style={styles.star} />
        </View>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{
          flex: 1,
          backgroundColor: Colors.mainColor,
          // alignItems: 'center', 
          justifyContent: 'center'
        }}>
          <View style={{
            flex: 0.3,
            // backgroundColor:'yellow',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: Scale(20)

          }}>
            <Image
              source={IMAGES.Logo}
              style={{ width: Scale(250), height: Scale(250) }}
              resizeMode='contain'
            />
            <Text style={{ fontSize: Scale(40), color: 'red', fontWeight: '700', marginTop: 30 }}>Welcome To My App</Text>
          </View>


          <View style={{
            flex: 0.7,
            // backgroundColor:'red', 
            paddingHorizontal: Scale(15),
            // alignItems: 'center', 
            // justifyContent: 'center'
          }}>
            {/* <Entypo name="flow-branch" size={Scale(60)} /> */}

            <Text style={{ textAlign: 'left' }}>Email</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeNumber}
              value={email}
              placeholder="useless placeholder"
              keyboardType="default"
            />
            {renderError('emailError')}



            <Text style={{ textAlign: 'left' }}>Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => handleInputChange('email', text)}
              value={pasword}
              placeholder="useless placeholder"
              keyboardType="default"
            />
            {renderError('passwordError')}

            <TouchableOpacity
              onPress={handleLogin}
              style={{
                backgroundColor: 'green', marginTop: Scale(120),
                alignSelf: "center",
                width: Scale(450), height: Scale(100), borderRadius: Scale(20), alignItems: 'center', justifyContent: 'center'
              }}>

              <Text style={{ fontSize: 25, color: 'white' }}>Please Login</Text>

            </TouchableOpacity>

            <Text style={{ fontSize: Scale(40), color: 'red', fontWeight: '700', textAlign: 'center', marginVertical: 10 }}>Or</Text>
            <FontAwesome.Button name="facebook" backgroundColor="#3b5998">
              <Text style={{ fontFamily: 'Arial', fontSize: 15, color: Colors.white, textAlign: 'center' }}>
                Login with google
              </Text>
            </FontAwesome.Button>


            <RBSheet
              ref={refRBSheet}
              height={300}
              openDuration={250}
              // closeOnDragDown={true}
              closeOnPressMask={true}
              customStyles={{
                wrapper: {
                  backgroundColor: 'rgba(0,0,0,0.5)',
                },
                draggableIcon: {
                  backgroundColor: '#000',
                },
                container: {
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  padding: 20,
                },
              }}
            >
              <Text style={styles.sheetText}>👋 Hello from Bottom Sheet</Text>
              <Button title="Close" onPress={() => refRBSheet.current?.close()} />
              <FlatList
                data={sampleData}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 16 }}
              />
            </RBSheet>


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

export default Login