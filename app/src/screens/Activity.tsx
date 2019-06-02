import * as React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Image
} from 'react-native';
import { styles } from '../styles/styles';
import { AcitivityQueryComponent } from '../generated/apolloComponents';
import { ImageURL, userImage } from './Home';
interface Props {}

const Activity: React.FC<Props> = () => {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
        <AcitivityQueryComponent>
          {({ data, loading }) => {
            if (loading) return <ActivityIndicator />;
            if (!data || !data.activities) return <Text>No activities</Text>;
            return (
              <FlatList
                data={data.activities}
                keyExtractor={activity => activity.id}
                renderItem={({ item: activity }) => (
                  <View style={[styles.row, styles.center]}>
                    <Image
                      style={styles.roundImage}
                      source={{
                        uri: activity.post.photoUrl
                          ? activity.post.photoUrl
                          : ImageURL
                      }}
                    />
                    <View>
                      <Text>{activity.sender.name}</Text>
                      <Text>Liked your photo</Text>
                    </View>
                    <Image
                      style={styles.roundImage}
                      source={{ uri: userImage }}
                    />
                  </View>
                )}
              />
            );
          }}
        </AcitivityQueryComponent>
      </SafeAreaView>
    </View>
  );
};

export default Activity;
