import React from 'react';

import {
  Text,
  View,
  AsyncStorage,
  ActivityIndicator,
  Image,
  ShadowPropTypesIOS,
  Button,
  Alert,
  TouchableOpacity
} from 'react-native';
import { styles } from '../styles/styles';

import {
  PostsQueryComponent,
  LikePostComponent,
  MeComponent
} from '../generated/apolloComponents';
import { NavigationScreenProps } from 'react-navigation';
import { FlatList } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { ME_QUERY } from '../graphql/user/qureries/me';
import { POSTS_QUERY } from '../graphql/post/queries/posts';
import { ACTIVITIETS_QUERY } from '../graphql/activity/queries/activitites';

export const userImage =
  'https://www.thesun.co.uk/wp-content/uploads/2017/08/nintchdbpict000228849890.jpg?strip=all&w=456&quality=100';
export const ImageURL =
  'https://images.unsplash.com/photo-1550007488-acbcd2b1be4f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60';

interface Props {}

type userType = {
  id: string;
};
class Home extends React.PureComponent<Props & NavigationScreenProps> {
  navigateMap = () => this.props.navigation.navigate('Map');

  render() {
    return (
      <PostsQueryComponent>
        {({ data, loading }) => {
          if (loading) return <ActivityIndicator />;

          return (
            <View style={styles.container}>
              <FlatList
                data={data!.posts}
                keyExtractor={post => post.id}
                renderItem={({ item: post }) => (
                  <View>
                    <View style={[styles.row, styles.center]}>
                      <View style={[styles.row, styles.center]}>
                        <Image
                          source={{
                            uri: post.owner.photo || userImage
                          }}
                          style={styles.roundImage}
                        />
                        <View>
                          <Text>{post.owner.firstName}</Text>
                          <TouchableOpacity onPress={this.navigateMap}>
                            <Text>{post.city}</Text>
                          </TouchableOpacity>
                        </View>
                      </View>

                      <Ionicons
                        name="ios-flag"
                        size={25}
                        style={{ padding: 5 }}
                      />
                    </View>

                    <Image
                      source={{
                        uri: post.photoUrl ? post.photoUrl : ImageURL
                      }}
                      style={styles.postPhoto}
                    />
                    <View style={[styles.row]}>
                      <MeComponent>
                        {({ data }) => {
                          let hasLiked = false;
                          if (data && data.me && data.me.id) {
                            hasLiked = post.likedUsers.some(
                              (user: userType) => user.id === data.me!.id
                            );
                          }
                          return (
                            <LikePostComponent
                              variables={{ postId: post.id }}
                              refetchQueries={[
                                { query: POSTS_QUERY },
                                { query: ACTIVITIETS_QUERY }
                              ]}
                            >
                              {likePost => (
                                <TouchableOpacity
                                  onPress={async () => await likePost()}
                                >
                                  <Ionicons
                                    name={
                                      hasLiked ? 'ios-heart' : 'ios-heart-empty'
                                    }
                                    size={25}
                                    color={hasLiked ? '#fb3958' : 'black'}
                                    style={{ padding: 5 }}
                                  />
                                </TouchableOpacity>
                              )}
                            </LikePostComponent>
                          );
                        }}
                      </MeComponent>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('Comment', {
                            postId: post.id
                          })
                        }
                      >
                        <Ionicons
                          name="ios-chatbubbles"
                          size={25}
                          style={{ padding: 5 }}
                        />
                      </TouchableOpacity>

                      <Ionicons
                        name="ios-send"
                        size={25}
                        style={{ padding: 5 }}
                      />
                    </View>
                    <Text>{post.description}</Text>
                  </View>
                )}
              />
            </View>
          );
        }}
      </PostsQueryComponent>
    );
  }
}

export default Home;
