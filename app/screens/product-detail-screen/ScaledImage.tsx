import React, { Component } from "react";
import { Image } from "react-native";
import { UIImage } from "react-native-pjt-ui-lib";

export default class ScaledImage extends Component {
  constructor(props) {
    super(props);
    this.state = { source: { uri: this.props.uri } };
  }

  componentDidMount() {
    Image.getSize(this.props.uri, (width, height) => {
      if (this.props.width && !this.props.height) {
        this.setState({ width: this.props.width, height: height * (this.props.width / width) });
      } else if (!this.props.width && this.props.height) {
        this.setState({ width: width * (this.props.height / height), height: this.props.height });
      } else {
        this.setState({ width: width, height: height });
      }
    });
  }
  render() {
    return <UIImage source={this.state.source} style={{ height: this.state.height, width: this.state.width }} />;
  }
}
