import React, {useEffect, useState} from 'react';
import {Button, Dimensions, FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ImageViewer from "react-native-image-zoom-viewer";
import {SafeAreaView} from "react-native-safe-area-context";
import {useLocalStore} from "mobx-react-lite";
import {Icon} from "../../../components";
import {BottomModal, ModalContent} from 'react-native-modals';
import {CommentItem} from "../../main-screen/find-tab/components/CommentItem";

const PhotoDetailScreen = () => {

  const store = useLocalStore(() => ({
    data: {
      count: 1,
      images: [{
        // Simplest usage.
        url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fg-search1.alicdn.com%2Fimg%2Fbao%2Fuploaded%2Fi4%2F2910563675%2FTB2T8mailjTBKNjSZFDXXbVgVXa_%21%212910563675.png_300x300.jpg&refer=http%3A%2F%2Fg-search1.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1613271649&t=794423d2d74da04983ed7b4cde2c826b',

        // width: number
        // height: number
        // Optional, if you know the image size, you can set the optimization performance

        // You can pass props to <Image />.
        props: {
          // headers: ...
        }
      }, {
        url: '',
        props: {
          // Or you can set source directory.
          source: "require('../../../components/icon/icons/home_empty.png')"
        }
      }],
      commentList: [{id: 1, content: "评论1", userAvatar: ""}, {id: 2, content: "美女真好看", userAvatar: ""}, {
        id: 3,
        content: "好大",
        userAvatar: ""
      }, {
        id: 4,
        content: "好白", userAvatar: ""
      }, {id: 1, content: "评论1", userAvatar: ""}, {id: 2, content: "美女真好看", userAvatar: ""}, {
        id: 3,
        content: "好大",
        userAvatar: ""
      }, {id: 4, content: "好白", userAvatar: ""}]
    },
    refreshing: false,
    get empty() {
      if (store.data) {
        return store.data.length === 0;
      } else {
        return false;
      }
    },
    refreshData() {
      store.data.count += 1
      console.log("refreshData")
      // store.refreshing = true;
      // getLocation()
      //   .then(location => {
      //     HomeApi.getFindArticleList().then(value => {
      //       store.refreshing = false;
      //       console.log("response data==== ", value.code);
      //       if (value.code === 200) {
      //         store.data = value.data;
      //       }
      //     });
      //   })
      //   .catch(e => {
      //     store.refreshing = false;
      //     console.log(e);
      //   });
    }
  }));

  const [isCollected, setIsCollected] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  function clickCollect() {
    setIsCollected((current) => !current)
  }

  function clickLike() {
    setIsLiked((current) => !current)
  }

  function clickComment() {
    setCommentListWindowVisible(true)
    // bottomSheetRef.current?.expand();
  }

  useEffect(() => {
    store.refreshData();
  }, []);

  const [commentListWindowVisible, setCommentListWindowVisible] = useState(false)
  const [addCommentWindowVisible, setAddCommentWindowVisible] = useState(false)

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

        <ImageViewer imageUrls={store.data.images} backgroundColor={"#333"}/>

        <View style={styles.bottom_wrapper}>
          <Pressable style={styles.bottom_button_wrapper}
                     onPress={clickCollect}>
            <Icon style={styles.bottom_button_image}
                  icon={isCollected ? "collect_true" : "collect_false"}/>

            <Text style={styles.bottom_button_text}>收藏</Text>
          </Pressable>
          <Pressable style={styles.bottom_button_wrapper}
                     onPress={clickLike}>
            <Icon style={styles.bottom_button_image}
                  icon={isLiked ? "like_true" : "like_false"}/>
            <Text style={styles.bottom_button_text}>30.8W</Text>
          </Pressable>
          <Pressable style={styles.bottom_button_wrapper}
                     onPress={clickComment}>
            <Icon style={styles.bottom_button_image}
                  icon={"comment"}/>
            <Text style={styles.bottom_button_text}>120</Text>
          </Pressable>
        </View>

        <BottomModal
          visible={commentListWindowVisible}
          onTouchOutside={() => {
            setCommentListWindowVisible(false)
          }}
          height={0.75}
          width={1}
          onSwipeOut={() => setCommentListWindowVisible(false)}
        >
          <ModalContent style={styles.commentListWindow}>
            <View style={{height: 400, display: "flex"}}>

              <Text style={styles.commentCount}>210条评论</Text>

              <FlatList style={{flex: 1, marginVertical: 10}}
                        data={store.data.commentList}
                        numColumns={1}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => {
                          return (
                            <TouchableOpacity style={{flex: 1}}
                                              onPress={() => {
                                                console.log(item.content)
                                              }}>
                              <CommentItem {...item}/>
                            </TouchableOpacity>
                          )
                        }}/>

              <Pressable onPress={() => {
                setAddCommentWindowVisible(true)
              }}>
                <Text style={styles.btnAddComment}>留下你的精彩评论吧</Text>
              </Pressable>

            </View>

          </ModalContent>
        </BottomModal>

        <BottomModal
          visible={addCommentWindowVisible}
          onTouchOutside={() => {
            setAddCommentWindowVisible(false)
          }}
          height={0.5}
          width={1}
          onSwipeOut={() => setAddCommentWindowVisible(false)}
        >
          <ModalContent style={{backgroundColor: '#fff'}}>
            <Text>Default Animation</Text>
            <Text>No onTouchOutside handler. will not dismiss when touch overlay.</Text>

            <Button
              title="To Empty Screen"
              onPress={() => {
              }}
            />
          </ModalContent>
        </BottomModal>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main_wrapper: {
    flex: 1,
  },
  bottom_wrapper: {
    position: "absolute",
    bottom: 55,
    width: Dimensions.get('window').width,
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
    height: 22,
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
    fontWeight: '800',
  },
  headerContainer: {
    paddingVertical: 24,
    backgroundColor: 'white',
  },
  commentListWindow: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
  },
  commentCount: {
    height: 30,
    fontSize: 14,
    color: "black",
    alignSelf: "center",
  },
  btnAddComment: {
    height: 40,
    fontSize: 14,
    lineHeight: 40,
    color: "black",
    alignSelf: "center",
    backgroundColor: "#c0c0c0",
    paddingHorizontal: 20,
    borderRadius: 50
  }
});

export default PhotoDetailScreen;
