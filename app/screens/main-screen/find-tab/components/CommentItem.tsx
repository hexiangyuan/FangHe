import React from "react";
import {CommentItemProps} from "./CommentItem.props";
import {StyleSheet, Text, View} from "react-native";
import FastImage from 'react-native-fast-image'

const styles = StyleSheet.create({
  imgStyle: {
    height: 50,
    width: 50,
    backgroundColor: "#610",
    alignSelf: "flex-start",
    borderRadius: 25
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 21,
    paddingHorizontal: 12,
    flexWrap: "wrap",
    alignItems: "center",
  },
  userName: {
    fontSize: 16,
    lineHeight: 18,
    color: "#7e7f80",
    flexWrap: "wrap",
    height: 18,
  },
  comment: {
    fontSize: 16,
    lineHeight: 22,
    color: "#090c12",
    flexWrap: "wrap",
    height: 22,
  },
  commentTime: {
    color: "#a8a9aa"
  }
});

export const CommentItem = (props: CommentItemProps) => {
  return (
    <View style={styles.itemContainer}>
      <FastImage
        source={{
          uri: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fg-search1.alicdn.com%2Fimg%2Fbao%2Fuploaded%2Fi4%2F2910563675%2FTB2T8mailjTBKNjSZFDXXbVgVXa_%21%212910563675.png_300x300.jpg&refer=http%3A%2F%2Fg-search1.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613271649&t=794423d2d74da04983ed7b4cde2c826b',
        }}
        resizeMode={FastImage.resizeMode.cover}
        style={styles.imgStyle}
      />
      <View style={{flex: 1, display: "flex", flexDirection: "column", paddingHorizontal: 8}}>
        <Text
          style={styles.userName}>
          用户名 {props.id}
        </Text>
        <Text style={styles.comment}>{props.content}</Text>
        <Text style={styles.commentTime}>2021-01-23 14:51:23</Text>
      </View>

    </View>
  );
};
