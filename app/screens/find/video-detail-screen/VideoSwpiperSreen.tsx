import { useLocalStore, useObserver } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { ParallaxSwiper, ParallaxSwiperPage } from "../../../components/react-native-parallax-swiper/src";
import { Animated, View, Image, StyleSheet, Dimensions } from "react-native";
import VideoDetailScreen from "./VideoDetailScreen";
const { width, height } = Dimensions.get("window");

export const VideoSwiperScreen = props => {
  const localStore = useLocalStore(() => ({
    dataList: [],
    currentData: null,
    currentIndex: 0,
    hasMore: true
  }));

  const [activeIndex, setActiveIndex] = useState<number>();
  const scrollRef = useRef(null);

  useEffect(() => {
    localStore.dataList = props.route.params.idList;
    localStore.currentData = props.route.params.currentId;
    localStore.currentIndex = props.route.params.currentIndex;
    setActiveIndex(localStore.currentIndex);
  }, []);

  return useObserver(() =>
    localStore.dataList?.length > 0 ? (
      <ParallaxSwiper
        speed={0.5}
        ref={scrollRef}
        dividerWidth={8}
        scrollToIndex={localStore.currentIndex}
        dividerColor="black"
        backgroundColor="#000"
        vertical={true}
        onMomentumScrollEnd={index => {
          setActiveIndex(index);
        }}
      >
        {localStore.dataList.map((value, index, array) => {
          return (
            <ParallaxSwiperPage
              key={value}
              BackgroundComponent={<View style={styles.backgroundImage} />}
              ForegroundComponent={<VideoDetailScreen id={value} playing={index === activeIndex} />}
            />
          );
        })}
      </ParallaxSwiper>
    ) : (
      <View style={{ backgroundColor: "black" }} />
    )
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width,
    height
  },
  foregroundTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  foregroundText: {
    fontSize: 34,
    fontWeight: "700",
    letterSpacing: 0.41,
    color: "white"
  }
});
