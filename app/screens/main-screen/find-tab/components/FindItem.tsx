import React from "react";
import {FindItemProps} from "./FindItem.props";
import {Dimensions, StyleSheet, Text, View} from "react-native";
import FastImage from 'react-native-fast-image'

const imageWidth = (Dimensions.get('window').width - 12 * 3) / 2

const styles = StyleSheet.create({
  imgStyle: {
    flex: 1,
    height: 200,
    width: imageWidth,
    backgroundColor: "#610"
  },
  itemContainer: {
    flex: 1,
    paddingTop: 21,
    paddingHorizontal: 12,
    flexWrap: "wrap",
    alignItems: "center",
  }
});

export interface FindListProps {
  key: "30" | "40" | "50";
}

const keyTabArticle = 1;
const keyTabPhoto = 2;
const keyTabVideo = 3;

export const FindItem = (props: FindItemProps) => {

  function transformLikeNum(num: number): string {
    if (num >= 1000) {
      return (num / 1000.0).toString() + "k"
    }
    return num.toString()
  }

  return (
    <View style={styles.itemContainer}>
      <FastImage
        source={{
          uri: props.type == keyTabVideo ? props.mainImg : props.imgs[0],
        }}
        resizeMode={FastImage.resizeMode.cover}
        style={styles.imgStyle}
      />
      <Text
        style={{
          fontSize: 16,
          lineHeight: 22,
          color: "#333",
          flexWrap: "wrap",
          height: 44,
        }}>
        {props.title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          marginTop: 5,
        }}>
        <Text style={{lineHeight: 17, fontSize: 12, color: "#666", flex: 1}}>
          评论 {props.commentNum}
        </Text>
        <Text
          style={{lineHeight: 17, fontSize: 12, color: "#666", flex: 1, textAlign: "right"}}>
          点赞 {transformLikeNum(props.likesNum)}
        </Text>
      </View>
    </View>
  );
};
