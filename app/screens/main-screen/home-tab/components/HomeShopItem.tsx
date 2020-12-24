import { HomeShopItemProps } from "./HomeShopItem.props";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { UIImage, Subtitle1 } from "react-native-pjt-ui-lib";
import { Tags } from "../../../../components/tag/Tags";
import { Score } from "../../../../components/score/Score";

const styles = StyleSheet.create({
  imgStyle: {
    height: 96,
    width: 96
  },
  itemContainer: {
    flex: 1,
    paddingTop: 21,
    flexDirection: "row",
    paddingHorizontal: 12
  }
});

export const HomeShopItem = (props: HomeShopItemProps) => {
  return (
    <View style={styles.itemContainer}>
      <UIImage
        source={{
          uri: props.img
        }}
        resizeMode={"center"}
        style={styles.imgStyle}
      />
      <View
        style={{
          flex: 1,
          marginLeft: 12
        }}
      >
        <Subtitle1 numberOfLines={1}>{props.shopName}</Subtitle1>
        <View style={{ height: 8 }} />
        <Score score={props.score} />
        <View
          style={{
            flexDirection: "row",
            marginTop: 8,
            marginBottom: 16,
            justifyContent: "space-between"
          }}
        >
          <Text
            style={{
              fontSize: 10,
              color: "#333"
            }}
          >
            ￥{props.averPrice}/人
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: "#666"
            }}
          >
            {props.distanceMeter}
          </Text>
        </View>
        <Tags tag={props.tag} />
        {!!props.info && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <View
              style={{
                backgroundColor: "#FA6400",
                justifyContent: "center",
                alignItems: "center",
                width: 14,
                height: 14,
                marginRight: 8
              }}
            >
              <Text
                style={{
                  fontSize: 10,
                  color: "white"
                }}
              >
                惠
              </Text>
            </View>
            <Text
              style={{
                fontSize: 12,
                color: "#333"
              }}
            >
              {props.info}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
