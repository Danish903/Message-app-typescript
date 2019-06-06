import React, { Component } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { TextInput } from 'react-native-gesture-handler';
import { styles } from '../styles/styles';
import {
  CreateCommentComponent,
  CreateCommentMutation,
  CreateCommentMutationVariables
} from '../generated/apolloComponents';
import { MutationFn } from 'react-apollo';

type CreateCommentMutationType = MutationFn<
  CreateCommentMutation,
  CreateCommentMutationVariables
>;
export default class Comment extends Component<NavigationScreenProps> {
  state = {
    text: ''
  };
  postComment = async (createComment: CreateCommentMutationType) => {
    const postId = this.props.navigation.getParam('postId');
    const { text } = this.state;
    if (text.length > 0) {
      await createComment({
        variables: {
          postId,
          text
        }
      });
      this.setState({ text: '' });
    }
  };
  render() {
    const postId = this.props.navigation.getParam('postId');
    const { text } = this.state;
    return (
      <SafeAreaView>
        <Text> {postId}</Text>
        <Text> {text}</Text>
        <CreateCommentComponent>
          {createComment => (
            <TextInput
              style={styles.input}
              placeholder="Add comment..."
              value={text}
              onChangeText={text => this.setState({ text })}
              returnKeyType="send"
              onSubmitEditing={() => this.postComment(createComment)}
            />
          )}
        </CreateCommentComponent>
      </SafeAreaView>
    );
  }
}
