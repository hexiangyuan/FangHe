import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import ImageViewer from "react-native-image-zoom-viewer";
import {SafeAreaView} from "react-native-safe-area-context";
import {useLocalStore} from "mobx-react-lite";
import {Icon} from "../../../components";
import {BottomModal, ModalContent} from 'react-native-modals';
import {CommentItem} from "../../main-screen/find-tab/components/CommentItem";
import FindApi from "../FindApi";

const PhotoDetailScreen = (props) => {

  const store = useLocalStore(() => ({
    id: 0,
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
    },
    commentPage: 0,
    refreshing: false,
    get empty() {
      if (store.data) {
        return store.data.length === 0;
      } else {
        return false;
      }
    },
    refreshData() {
      // store.refreshing = true;
      // props.imgs.forEach((value, index) => store.data.images[index] = {url: value, props: {}})
      FindApi.getImgsDetail(store.id).then(value => {
        store.refreshing = false;
        console.log("response data==== ", value.code);
        if (value.code === 200) {
          const imgs = value.data.imgs
          if (imgs != null && imgs.length > 0) {
            const list = new Array(imgs.length)
            imgs.forEach((v, i) => {
              list[i] = {
                url: v,
                props: {}
              }
            })
            setDataList(list)
          }
          if (value.data.collected) {
            setIsCollected(true)
          }
          if (value.data.likes) {
            setIsLiked(true)
          }
          setLikesNum(value.data.likesNum)
          setCommentNum(value.data.commentNum)
        }
      });

    }
  }));

  const [dataList, setDataList] = useState([])
  const [commentList, setCommentList] = useState([])
  const [isCollected, setIsCollected] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likesNum, setLikesNum] = useState(0)
  const [commentNum, setCommentNum] = useState(0)
  const [commentValue, setCommentValue] = useState("")

  /**
   * 点击收藏
   */
  function clickCollect() {
    // TODO 检查登陆
    if (isCollected) {
      FindApi.cancelImgsCollect(store.id).then(value => {
        if (value.code === 200) {
          setIsCollected((current) => !current)
        } else {

        }
      })
    } else {
      FindApi.addImgsCollect(store.id).then(value => {
        if (value.code === 200) {
          setIsCollected((current) => !current)
        } else {

        }
      });
    }
  }

  /**
   * 点击喜欢
   */
  function clickLike() {
    // TODO 检查登陆
    if (isLiked) {
      FindApi.cancelImgsLike(store.id).then(value => {
        if (value.code === 200) {
          setIsLiked((current) => !current)
        }
      })
    } else {
      FindApi.addImgsLike(store.id).then(value => {
        if (value.code === 200) {
          setIsLiked((current) => !current)
        }
      });
    }
  }

  /**
   * 点击评论，弹出评论列表
   */
  function clickComment() {
    setCommentListWindowVisible(true)
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
        // setCommentList(current => current.concat([commentValue]))
        setCommentValue("")
        setAddCommentWindowVisible(false)
      }
    });
  }

  function getCommentList(isRefresh) {

    FindApi.getImgsCommentList(store.id, isRefresh ? 0 : store.commentPage).then(value => {
      console.log("response data==== ", value.code);
      if (value.code === 200) {
        if (isRefresh) {
          setCommentList(value.data)
          store.commentPage = 1
        } else {
          if (value.data.length > 0) {
            setCommentList(current => current.concat(value.data))
            store.commentPage += 1
          }
        }
      }
    });
  }

  function onLoadMore() {
    getCommentList(false)
  }

  useEffect(() => {
    store.id = props.route.params.id
    store.refreshData();
    getCommentList(true)
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
            <Text style={styles.bottom_button_text}>{likesNum}</Text>
          </Pressable>
          <Pressable style={styles.bottom_button_wrapper}
                     onPress={clickComment}>
            <Icon style={styles.bottom_button_image}
                  icon={"comment"}/>
            <Text style={styles.bottom_button_text}>{commentNum}</Text>
          </Pressable>
        </View>

        <BottomModal
          visible={commentListWindowVisible}
          onTouchOutside={() => {
            setCommentListWindowVisible(false)
          }}
          height={0.6}
          width={1}
          onSwipeOut={() => setCommentListWindowVisible(false)}
        >
          <ModalContent style={styles.commentListWindow}>
            <View style={{height: 400, display: "flex"}}>

              <Text style={styles.commentCount}>{commentList.length}条评论</Text>

              <FlatList style={{flex: 1, marginVertical: 10}}
                        data={commentList}
                        numColumns={1}
                        keyExtractor={(item, index) => index.toString()}
                        onEndReachedThreshold={0.1}
                        onEndReached={() => onLoadMore()}
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
          height={0.2}
          width={1}
          onSwipeOut={() => setAddCommentWindowVisible(false)}
        >
          <ModalContent style={{backgroundColor: '#fff'}}>
            <View style={styles.inputCommentWrapper}>
              <TextInput style={styles.inputComment} value={commentValue} onChangeText={text => {
                setCommentValue(text)
              }}
                         autoFocus={true}
                         clearButtonMode={"while-editing"}
                         placeholder={"留下你的精彩评论吧"}
                         placeholderTextColor={"#c0c0c0"}/>
              <Pressable style={styles.btnCommitCommentWrapper}
                         onPress={commitComment}>
                <Icon style={styles.btnCommitComment}
                      icon={"commit"}/>
              </Pressable>
            </View>
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
    color: "#c0c0c0",
    alignSelf: "center",
    backgroundColor: "#e7e8e9",
    paddingHorizontal: 20,
    borderRadius: 50
  },
  inputCommentWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  inputComment: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
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
    height: 22,
  }
});

export default PhotoDetailScreen;
