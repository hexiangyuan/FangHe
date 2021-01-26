import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class VideoDetailScreen extends Component {
  state = {};

  constructor(props) {
    super(props)
  }

  static propTypes = {};

  componentDidMount() {
  }

  render() {
    return (
      <View
        style={styles.style}>
        <Text>VideoDetailScreen</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  style: {},
});
