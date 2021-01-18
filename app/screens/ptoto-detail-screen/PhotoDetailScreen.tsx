import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";

export default class PhotoDetailScreen extends Component {
  state = {};

  constructor(props) {
    super(props)
  }

  static propTypes = {};

  componentDidMount() {
  }

  render() {
    return (
      <SafeAreaView
        edges={["top"]}
        style={{
          flex: 1,
          backgroundColor: "white",
          flexDirection: "row"
        }}
      >
        <View style={{flex: 1}}>
          

        </View>

      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  style: {},
});
