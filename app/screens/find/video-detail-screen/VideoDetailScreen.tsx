import React, { useEffect, useState } from "react";
import Video from "react-native-video";
import { Dimensions, FlatList, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useLocalStore, useObserver } from "mobx-react-lite";
import { Icon } from "../../../components";
import { CommentItem } from "../../main-screen/find-tab/components/CommentItem";
import { BottomModal, ModalContent } from "react-native-modals";
import FindApi from "../FindApi";
import { RootNavigation } from "../../../navigation";
import { userUserStore } from "../../../models/user-store/user-store";
import { Colors } from "../../../theme/Theme";
import FastImage from "react-native-fast-image";

export interface VideoPlayProps {
  id: number;
  playing: boolean;
}

const VideoDetailScreen = (props: VideoPlayProps) => {
  const store = useLocalStore(() => ({
    mainImg: null,
    videoUrl: null,
    isLike: false,
    isCollected: false,
    likeNum: 0,
    commentNum: 0,
    loadingVideo: false,
    commentList: []
  }));

  const [id, setId] = useState(0);
  const [duration, setDuration] = useState(0.0);
  const [currentTime, setCurrentTime] = useState(0.0);
  const [paused, setPaused] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentListWindowVisible, setCommentListWindowVisible] = useState(false);
  const [addCommentWindowVisible, setAddCommentWindowVisible] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  let commentPage = 0;

  const fetchVideoInfo = (id: number) => {
    store.loadingVideo = true;
    FindApi.getVideoDetail(id).then(value => {
      if (value.code === 200) {
        store.videoUrl = value.data.content;
        store.mainImg = value.data.mainImg;
        store.isLike = value.data.likes;
        store.isCollected = value.data.collected;
        store.likeNum = value.data.likesNum;
        store.commentNum = value.data.commentNum;
      }
    });
  };

  function getCommentList(isRefresh: boolean, id: number) {
    if (isRefresh) commentPage = 0;
    FindApi.getVideoCommentList(id, commentPage).then(value => {
      if (value.code === 200) {
        if (isRefresh) {
          store.commentList = value.data;
        } else {
          if (value.data.length > 0) {
            store.commentList = store.commentList.concat(value.data);
            commentPage += 1;
          }
        }
      }
    });
  }

  const user = userUserStore();

  function getCurrentTimePercentage() {
    if (currentTime > 0) {
      return currentTime / duration;
    } else {
      return 0;
    }
  }

  function onLoad(data) {
    setDuration(data.duration);
  }

  function onProgress(data) {
    if (data.currentTime > 0) {
      setVideoReady(true);
    }
    setCurrentTime(data.currentTime);
  }

  function checkLogin(): boolean {
    if (user.isLogin()) {
      return true;
    } else {
      RootNavigation.push("MobileLoginScreen");
      return false;
    }
  }

  /**
   * 点击收藏
   */
  function clickCollect(id: number) {
    if (!checkLogin()) {
      return;
    }
    if (store.isCollected) {
      store.isCollected = false;
      FindApi.cancelVideoCollect(id).then(value => {});
    } else {
      store.isCollected = true;
      FindApi.addVideoCollect(id).then(value => {});
    }
  }

  /**
   * 点击喜欢
   */
  function clickLike(id: number) {
    if (!checkLogin()) {
      return;
    }
    if (store.isLike) {
      store.isLike = false;
      store.likeNum--;
      FindApi.cancelVideoLike(id).then(value => {});
    } else {
      store.isLike = true;
      store.likeNum++;
      FindApi.addVideoLike(id).then(value => {});
    }
  }

  /**
   * 点击评论，弹出评论列表
   */
  function clickComment() {
    setCommentListWindowVisible(true);
  }

  /**
   * 发表评论
   */
  function commitComment(id: number) {
    FindApi.addVideoComment({
      id: id,
      content: commentValue,
      img: ""
    }).then(value => {
      if (value.code === 200) {
        setCommentValue("");
        setAddCommentWindowVisible(false);
      }
    });
  }

  function onLoadMore() {
    getCommentList(false, id);
  }

  useEffect(() => {
    setId(props.id);
  }, []);

  useEffect(() => {
    fetchVideoInfo(id);
    getCommentList(true, id);
  }, [id]);

  const flexCompleted = getCurrentTimePercentage() * 100;
  const flexRemaining = (1 - getCurrentTimePercentage()) * 100;

  return useObserver(() => (
    <View style={styles.container}>
      {props.playing ? (
        <Pressable
          style={styles.fullScreen}
          onPress={() => {
            setPaused(current => !current);
          }}
        >
          {!!store.videoUrl && (
            <Video
              source={{
                uri: store.videoUrl.startsWith("http")
                  ? store.videoUrl
                  : "http://qqejj8oyy.hd-bkt.clouddn.com/" + store.videoUrl
              }}
              style={styles.fullScreen}
              paused={paused}
              resizeMode={"cover"}
              onLoad={onLoad}
              onProgress={onProgress}
              onEnd={() => {
                store.loadingVideo = false;
              }}
              controls={false}
              repeat={true}
            />
          )}
          {paused && <Icon icon={"video_play"} />}
        </Pressable>
      ) : (
        <View style={styles.fullScreen} />
      )}

      {!videoReady && (
        <FastImage
          style={[styles.fullScreen]}
          source={{ uri: store.mainImg }}
          resizeMode={FastImage.resizeMode.cover}
        />
      )}

      {props.playing && (
        <View style={styles.controls}>
          <View style={styles.trackingControls}>
            <View style={styles.progress}>
              <View style={[styles.innerProgressCompleted, { flex: flexCompleted }]} />
              <View style={[styles.innerProgressRemaining, { flex: flexRemaining }]} />
            </View>
          </View>
        </View>
      )}
      <View style={styles.bottom_wrapper}>
        <Pressable
          style={styles.bottom_button_wrapper}
          onPress={() => {
            clickCollect(id);
          }}
        >
          <Icon style={styles.bottom_button_image} icon={store.isCollected ? "collect_true" : "collect_false"} />

          <Text style={styles.bottom_button_text}>收藏</Text>
        </Pressable>
        <Pressable
          style={styles.bottom_button_wrapper}
          onPress={() => {
            clickLike(id);
          }}
        >
          <Icon style={styles.bottom_button_image} icon={store.isLike ? "like_true" : "like_false"} />
          <Text style={styles.bottom_button_text}>{store.likeNum}</Text>
        </Pressable>
        <Pressable style={styles.bottom_button_wrapper} onPress={clickComment}>
          <Icon style={styles.bottom_button_image} icon={"comment"} />
          <Text style={styles.bottom_button_text}>{store.commentNum}</Text>
        </Pressable>
      </View>

      <BottomModal
        visible={commentListWindowVisible}
        onTouchOutside={() => {
          setCommentListWindowVisible(false);
        }}
        height={0.6}
        width={1}
        onSwipeOut={() => setCommentListWindowVisible(false)}
      >
        <ModalContent style={styles.commentListWindow}>
          <View style={{ height: 400, display: "flex" }}>
            <Text style={styles.commentCount}>{store.commentNum}条评论</Text>

            <FlatList
              style={{ flex: 1, marginVertical: 10 }}
              data={store.commentList}
              numColumns={1}
              keyExtractor={(item, index) => index.toString()}
              onEndReachedThreshold={0.1}
              onEndReached={() => onLoadMore()}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity style={{ flex: 1 }}>
                    <CommentItem {...item} />
                  </TouchableOpacity>
                );
              }}
            />

            <Pressable
              onPress={() => {
                if (!checkLogin()) {
                  return;
                }
                setAddCommentWindowVisible(true);
              }}
            >
              <Text style={styles.btnAddComment}>留下你的精彩评论吧</Text>
            </Pressable>
          </View>
        </ModalContent>
      </BottomModal>

      <BottomModal
        visible={addCommentWindowVisible}
        onTouchOutside={() => {
          setAddCommentWindowVisible(false);
        }}
        height={0.2}
        width={1}
        onSwipeOut={() => setAddCommentWindowVisible(false)}
      >
        <ModalContent style={{ backgroundColor: "#fff" }}>
          <View style={styles.inputCommentWrapper}>
            <TextInput
              style={[styles.inputComment, { flex: 1 }]}
              value={commentValue}
              onChangeText={text => {
                setCommentValue(text);
              }}
              autoFocus={true}
              clearButtonMode={"while-editing"}
              placeholder={"留下你的精彩评论吧"}
              placeholderTextColor={"#c0c0c0"}
            />
            <Pressable style={styles.btnCommitCommentWrapper} onPress={commitComment}>
              <Icon style={styles.btnCommitComment} icon={"commit"} />
            </Pressable>
          </View>
        </ModalContent>
      </BottomModal>
    </View>
  ));
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  },
  fullScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  controls: {
    backgroundColor: "transparent",
    borderRadius: 5,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  progress: {
    flex: 1,
    height: 2,
    flexDirection: "row",
    borderRadius: 3,
    overflow: "hidden"
  },
  innerProgressCompleted: {
    height: 2,
    backgroundColor: Colors.primaryDark
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: "#2C2C2C"
  },
  generalControls: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 4,
    overflow: "hidden",
    paddingBottom: 10
  },
  rateControl: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  volumeControl: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  controlOption: {
    alignSelf: "center",
    fontSize: 11,
    color: "white",
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12
  },
  trackingControls: {},
  bottom_wrapper: {
    position: "absolute",
    bottom: 10,
    width: Dimensions.get("window").width,
    height: 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  bottom_button_wrapper: {
    marginHorizontal: 0,
    width: 70,
    height: 50,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  bottom_button_image: {
    width: 22,
    height: 22
  },
  bottom_button_text: {
    width: 70,
    height: 20,
    lineHeight: 20,
    color: "white",
    fontSize: 14,
    textAlign: "center"
  },
  title: {
    fontSize: 46,
    lineHeight: 46,
    fontWeight: "800"
  },
  headerContainer: {
    paddingVertical: 24,
    backgroundColor: "white"
  },
  commentListWindow: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white"
  },
  commentCount: {
    height: 30,
    fontSize: 14,
    color: "black",
    alignSelf: "center"
  },
  btnAddComment: {
    height: 40,
    fontSize: 14,
    lineHeight: 40,
    color: "#c0c0c0",
    alignSelf: "center",
    backgroundColor: "#e7e8e9",
    paddingHorizontal: 20,
    borderRadius: 50
  },
  inputCommentWrapper: {
    width: "100%",
    flexDirection: "row"
  },
  inputComment: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderRadius: 50,
    backgroundColor: "#e7e8e9",
    paddingHorizontal: 20,
    color: "black"
  },
  btnCommitCommentWrapper: {
    width: 40,
    height: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  btnCommitComment: {
    width: 22,
    height: 22
  }
});

export default VideoDetailScreen;
