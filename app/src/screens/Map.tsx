import React, { Component } from 'react';
import { MapView, MapViewProps } from 'expo';
import { styles } from '../styles/styles';

//@ts-ignore
const { Marker } = MapView;
interface Props {}
export default class Map extends Component<MapViewProps> {
  render() {
    return (
      <MapView
        style={styles.container}
        initialRegion={{
          latitude: 37.7749,
          longitude: -122.4194,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        <Marker
          coordinate={{
            latitude: 37.7749,
            longitude: -122.4194
          }}
        />
      </MapView>
    );
  }
}
