import React, {useEffect, useState} from "react";
import {Dimensions, FlatList, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import {SafeAreaView} from "react-native-safe-area-context";
import {useLocalStore, useObserver} from "mobx-react-lite";
import {Icon} from "../../../components";
import {BottomModal, ModalContent} from "react-native-modals";
import {CommentItem} from "../../main-screen/find-tab/components/CommentItem";
import FindApi from "../FindApi";
import {userUserStore} from "../../../models/user-store/user-store";
import {RootNavigation} from "../../../navigation";

const PhotoDetailScreen = props => {
  const store = useLocalStore(() => ({
    id: 0,
    data: {
      count: 1,
      isLiked: false,
      isCollected: false,
      images: null,
      likesNum: 0,
      commentNum: 0,
      commentList: []
    },
    commentPage: 0,
    refreshing: false,
    get empty() {
      if (store.data) {
        return store.data.images.length === 0;
      } else {
        return false;
      }
    },
    cancelLike() {
      store.data.isLiked = false;
    },
    cancelCollect() {
      store.data.isCollected = false;
    }
  }));

  const user = userUserStore();

  const [commentValue, setCommentValue] = useState("");

  function getImgDetails(id: number) {
    store.refreshing = true;
    FindApi.getImgsDetail(id).then(value => {
      store.refreshing = false;
      console.log("response data==== ", value.code);
      if (value.code === 200) {
        if (value.data && value.data.imgs) {
          store.data.images = value.data.imgs;
        }
        store.data.isLiked = value.data.likes;
        store.data.isCollected = value.data.collected;
        store.data.likesNum = value.data.likesNum;
        store.data.commentNum = value.data.commentNum;
        console.log(store.data.images);
      }
    });
  }

  /**
   * 点击收藏
   */
  function clickCollect() {
    if (!checkLogin()) {
      return
    }
    if (store.data.isCollected) {
      store.cancelCollect();
      FindApi.cancelImgsCollect(store.id).then(value => {
      });
    } else {
      store.data.isCollected = true;
      FindApi.addImgsCollect(store.id).then(value => {
      });
    }
  }

  function checkLogin(): boolean {
    if (user.isLogin()) {
      return true
    } else {
      RootNavigation.push("MobileLoginScreen");
      return false
    }
  }


  /**
   * 点击喜欢
   */
  function clickLike() {
    if (!checkLogin()) {
      return
    }
    if (store.data.isLiked) {
      store.cancelLike();
      store.data.likesNum--;
      FindApi.cancelImgsLike(store.id).then(value => {
      });
    } else {
      store.data.isLiked = true;
      store.data.likesNum++;
      FindApi.addImgsLike(store.id).then(value => {
      });
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
  function commitComment() {
    FindApi.addImgsComment({
      id: store.id,
      content: commentValue,
      img: ""
    }).then(value => {
      if (value.code === 200) {
        // TODO 需要返回当前评论
        setAddCommentWindowVisible(false);
      }
    });
  }

  function getCommentList(isRefresh) {
    FindApi.getImgsCommentList(store.id, isRefresh ? 0 : store.commentPage).then(value => {
      if (value.code === 200) {
        if (isRefresh) {
          store.data.commentList = value.data;
          store.commentPage = 1;
        } else {
          if (value.data.length > 0) {
            store.data.commentList = store.data.commentList.concat(value.data);
            store.commentPage += 1;
          }
        }
      }
    });
  }

  function onLoadMore() {
    getCommentList(false);
  }

  useEffect(() => {
    store.id = props.route.params.id;
    getImgDetails(store.id);
    getCommentList(true);
  }, []);

  const [commentListWindowVisible, setCommentListWindowVisible] = useState(false);
  const [addCommentWindowVisible, setAddCommentWindowVisible] = useState(false);

  return useObserver(() => {
    console.log(store.data.images);
    return (
      <SafeAreaView
        edges={["top"]}
        style={{
          flex: 1,
          backgroundColor: "white",
          flexDirection: "row"
        }}
      >
        <View style={styles.main_wrapper}>
          {store.data.images && (
            <ImageViewer imageUrls={store.data.images?.map(item => ({url: item}))} backgroundColor={"#333"}/>
          )}

          <View style={styles.bottom_wrapper}>
            <Pressable style={styles.bottom_button_wrapper} onPress={clickCollect}>
              <Icon
                style={styles.bottom_button_image}
                icon={store.data.isCollected ? "collect_true" : "collect_false"}
              />

              <Text style={styles.bottom_button_text}>收藏</Text>
            </Pressable>
            <Pressable style={styles.bottom_button_wrapper} onPress={clickLike}>
              <Icon style={styles.bottom_button_image} icon={store.data.isLiked ? "like_true" : "like_false"}/>
              <Text style={styles.bottom_button_text}>{store.data.likesNum}</Text>
            </Pressable>
            <Pressable style={styles.bottom_button_wrapper} onPress={clickComment}>
              <Icon style={styles.bottom_button_image} icon={"comment"}/>
              <Text style={styles.bottom_button_text}>{store.data.commentNum}</Text>
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
              <View
                style={{
                  height: 400,
                  display: "flex"
                }}
              >
                <Text style={styles.commentCount}>{store.data.commentNum}条评论</Text>

                <FlatList
                  style={{
                    flex: 1,
                    marginVertical: 10
                  }}
                  data={store.data.commentList}
                  numColumns={1}
                  keyExtractor={(item, index) => index.toString()}
                  onEndReachedThreshold={0.1}
                  onEndReached={() => onLoadMore()}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity
                        style={{flex: 1}}
                        onPress={() => {
                          console.log(item.content);
                        }}
                      >
                        <CommentItem {...item} />
                      </TouchableOpacity>
                    );
                  }}
                />

                <Pressable
                  onPress={() => {
                    if (!checkLogin()) {
                      return
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
            <ModalContent style={{backgroundColor: "#fff"}}>
              <View style={styles.inputCommentWrapper}>
                <TextInput
                  style={styles.inputComment}
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
                  <Icon style={styles.btnCommitComment} icon={"commit"}/>
                </Pressable>
              </View>
            </ModalContent>
          </BottomModal>
        </View>
      </SafeAreaView>
    );
  });
};

const styles = StyleSheet.create({
  main_wrapper: {
    flex: 1
  },
  bottom_wrapper: {
    position: "absolute",
    bottom: 55,
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
    display: "flex",
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

export default PhotoDetailScreen;
