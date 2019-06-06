import React, { Component } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { TextInput } from 'react-native-gesture-handler';
import { styles } from '../styles/styles';

export default class Comment extends Component<NavigationScreenProps> {
  state = {
    text: ''
  };
  postComment = () => {};
  render() {
    const postId = this.props.navigation.getParam('postId');
    const { text } = this.state;
    return (
      <SafeAreaView>
        <Text> {postId}</Text>
        <Text> {text}</Text>

        <TextInput
          style={styles.input}
          placeholder="Add comment..."
          value={text}
          onChangeText={text => this.setState({ text })}
          returnKeyType="send"
          onSubmitEditing={this.postComment}
        />
      </SafeAreaView>
    );
  }
}
