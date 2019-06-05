import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Permissions, ImagePicker } from 'expo';
import { ReactNativeFile } from 'apollo-upload-client';
import { NavigationScreenProps } from 'react-navigation';

export default class Image extends Component<NavigationScreenProps> {
  onWillFocus = () => {
    this.openCameraRoll();
  };

  openCameraRoll = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      const image = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1]
      });
      if (!image.cancelled) {
        const { uri } = image;
        const profilePicture = new ReactNativeFile({
          uri,
          name: 'profilePitcure.png',
          type: 'image/png'
        });
        this.setState({
          profilePicture,
          photo: uri
        });

        this.props.navigation.navigate('Upload', {
          photoURL: uri
        });
      } else {
        this.props.navigation.navigate('Home');
      }
    }
  };
  render() {
    return (
      <SafeAreaView>
        <NavigationEvents onWillFocus={this.onWillFocus} />
      </SafeAreaView>
    );
  }
}
