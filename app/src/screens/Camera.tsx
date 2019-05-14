import React, { Component } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { Camera, Permissions, CameraObject, ImageManipulator } from "expo";
import { Ionicons } from "@expo/vector-icons";
import { NavigationScreenProps } from "react-navigation";
import { ReactNativeFile } from "apollo-upload-client";
import { styles } from "../styles/styles";
import {
   UploadPhotoComponent,
   UploadPhotoMutation,
   UploadPhotoMutationVariables
} from "../generated/apolloComponents";
import { MutationFn } from "react-apollo";

type UploadPhotoType = MutationFn<
   UploadPhotoMutation,
   UploadPhotoMutationVariables
>;
export default class CameraUpload extends Component<NavigationScreenProps> {
   state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back
   };
   camera: any = null;

   async componentDidMount() {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasCameraPermission: status === "granted" });
   }

   snapPhoto = async (mutate: UploadPhotoType) => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status === "granted") {
         const image = await this.camera.takePictureAsync();
         if (image.cancelled) return;

         const { uri } = await ImageManipulator.manipulateAsync(image.uri, [], {
            format: "png",
            compress: 0.1
         });

         const file = new ReactNativeFile({
            uri,
            name: "picture.png",
            type: "image/png"
         });
         const res = await mutate({
            variables: {
               file
            }
         });
         if (res && res.data && res.data.uploadPhoto) {
            this.props.navigation.navigate("Upload", {
               photoURL: res.data.uploadPhoto
            });
            // console.log(res.data.uploadPhoto);
         }
      }
   };

   render() {
      return (
         <UploadPhotoComponent>
            {mutate => (
               <Camera
                  style={{ flex: 1 }}
                  ref={(ref: any) => {
                     this.camera = ref;
                  }}
                  type={Camera.Constants.Type.back}
               >
                  <SafeAreaView style={{ flex: 1 }}>
                     <TouchableOpacity
                        style={{ paddingLeft: 30 }}
                        onPress={() => this.props.navigation.navigate("Home")}
                     >
                        <Ionicons
                           color={"white"}
                           name={"ios-arrow-back"}
                           size={50}
                        />
                     </TouchableOpacity>
                  </SafeAreaView>
                  <TouchableOpacity
                     style={styles.cameraButton}
                     onPress={() => this.snapPhoto(mutate)}
                  />
               </Camera>
            )}
         </UploadPhotoComponent>
      );
   }
}
