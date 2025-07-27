// import React from 'react';
// import {
//     Alert,
//     Text,
//     Modal,
//     StyleSheet,
//     TouchableOpacity,
//     TouchableWithoutFeedback,
//     View,
//     Platform,
// } from 'react-native';
// import ImageCropPicker from 'react-native-image-crop-picker';
// import { Scale } from '../helper/Scale';

// import FontAwesome from 'react-native-vector-icons/FontAwesome';

// import * as Permissions from 'react-native-permissions';

// interface ModalProps {
//     modalVisible: boolean;
//     modalClose?: () => void;
//     onSelectImage?: (imagePath: any) => void;
// }

// interface ImageObject {
//     name: string;
//     type: string;
//     uri: string
// }



// const UploadMedia: React.FC<ModalProps> = ({ modalVisible, modalClose, onSelectImage }) => {
// const androidVersion = Number(Platform.Version);


//     const handleGalleryPress = async () => {
//         try {

//             // Request permission based on platform and Android version
//             const permission = Platform.select({
//                 android:
//                   androidVersion <= 32
//                         ? Permissions.PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
//                         : Permissions.PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
//                 ios: androidVersion >= 14 ? Permissions.PERMISSIONS.IOS.PHOTO_LIBRARY : Permissions.PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
//             });

//             const result = await Permissions.request(permission);
//             console.log('Gallery permission granted:', result);

//             if (result !== Permissions.RESULTS.GRANTED) {
//                 throw new Error(`No permission: ${result}`);
//             }


//             const image = await ImageCropPicker.openPicker({
//                 cropperCircleOverlay: true,
//                 mediaType: 'photo',
//                 multiple: false,
//                 cropping: true,
//                 width: 800,
//                 height: 800,
//                 compressImageQuality: 1,
//             });
//             console.log('image path gallery >>', image);


//             const _obj: ImageObject = {
//                 name: `${new Date().getTime()}.jpg`,
//                 type: image?.mime,
//                 uri: image?.path,
//             };
//             console.log('Image picker obj: ', _obj);

//             // return
//             if (onSelectImage) {
//                 onSelectImage(_obj); // Call only if onSelectImage is defined
//             }
//         } catch (error) {
//             console.log('Error selecting image from gallery:', error);
//         }
//     };

//     return (
//         <Modal
//             animationType='fade'
//             visible={modalVisible}
//             transparent={true}
//             onRequestClose={modalClose}
//         >
//             <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPress={modalClose}>
//                 <TouchableWithoutFeedback>
//                     <View style={styles.modalContent}>
//                         <TouchableOpacity
//                             onPress={handleGalleryPress}
//                         // onPress={pickImageHandler}
//                         >
//                             <FontAwesome name="star" size={18} color="gold" />

//                             <Text>Gallery</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                         // onPress={handleCameraPress}
//                         // onPress={pickImageHandlerCamera}
//                         >
//                             <Text>Czmera</Text>
//                         </TouchableOpacity>

//                     </View>
//                 </TouchableWithoutFeedback>

//             </TouchableOpacity>

//         </Modal>
//     )

// }


// const styles = StyleSheet.create({
//     modalContainer: {
//         flex: 1,
//         backgroundColor: 'rgba(0,0,0,0.5)'
//     },
//     modalContent: {
//         backgroundColor: 'white',
//         padding: 20,
//         elevation: 5,
//         flexDirection: 'row',
//         width: '100%',
//         height: '20%',
//         bottom: 0,
//         position: 'absolute',
//         justifyContent: 'space-around',
//         paddingTop: Scale(50),
//         alignItems: 'center',
//         borderTopStartRadius: Scale(22),
//         borderTopRightRadius: Scale(20),
//     },
// })

// export default UploadMedia