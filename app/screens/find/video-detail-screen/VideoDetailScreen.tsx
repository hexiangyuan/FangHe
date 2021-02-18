import React, {useState} from 'react';
import Video from 'react-native-video';
import {Dimensions, FlatList, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useLocalStore} from "mobx-react-lite";
import {Icon} from "../../../components";
import {CommentItem} from "../../main-screen/find-tab/components/CommentItem";
import {BottomModal, ModalContent} from 'react-native-modals';
import FindApi from "../FindApi";

const VideoDetailScreen = () => {

  const store = useLocalStore(() => ({
      commentPage: 0,
    }
  ))

  const [rate, setRate] = useState(1)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)
  const [resizeMode, setResizeMode] = useState('contain')
  const [duration, setDuration] = useState(0.0)
  const [currentTime, setCurrentTime] = useState(0.0)
  const [paused, setPaused] = useState(false)
  const [commentList, setCommentList] = useState([])
  const [isCollected, setIsCollected] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likesNum, setLikesNum] = useState(0)
  const [commentNum, setCommentNum] = useState(0)
  const [commentValue, setCommentValue] = useState("")
  const [commentListWindowVisible, setCommentListWindowVisible] = useState(false)
  const [addCommentWindowVisible, setAddCommentWindowVisible] = useState(false)


  function getCurrentTimePercentage() {
    if (currentTime > 0) {
      return currentTime / duration;
    } else {
      return 0;
    }
  }

  function onLoad(data) {
    setDuration(data.duration)
  }

  function onProgress(data) {
    setCurrentTime(data.currentTime)
  }

  function renderRateControl(newRate) {
    const isSelected = (rate == newRate);

    return (
      <TouchableOpacity onPress={() => {
        setRate(newRate)
      }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {newRate}x
        </Text>
      </TouchableOpacity>
    )
  }

  function renderResizeModeControl(newResizeMode) {
    const isSelected = (resizeMode == newResizeMode);

    return (
      <TouchableOpacity onPress={() => {
        setResizeMode(newResizeMode)
      }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {newResizeMode}
        </Text>
      </TouchableOpacity>
    )
  }

  function renderVolumeControl(newVolume) {
    const isSelected = (volume == newVolume);

    return (
      <TouchableOpacity onPress={() => {
        setVolume(newVolume)
      }}>
        <Text style={[styles.controlOption, {fontWeight: isSelected ? "bold" : "normal"}]}>
          {newVolume * 100}%
        </Text>
      </TouchableOpacity>
    )
  }

  function getCommentList(isRefresh) {

    FindApi.getVideoCommentList(store.id, isRefresh ? 0 : store.commentPage).then(value => {
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

  /**
   * 点击收藏
   */
  function clickCollect() {
    // TODO 检查登陆
    if (isCollected) {
      FindApi.cancelVideoCollect(store.id).then(value => {
        if (value.code === 200) {
          setIsCollected((current) => !current)
        } else {

        }
      })
    } else {
      FindApi.addVideoCollect(store.id).then(value => {
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
      FindApi.cancelVideoLike(store.id).then(value => {
        if (value.code === 200) {
          setIsLiked((current) => !current)
        }
      })
    } else {
      FindApi.addVideoLike(store.id).then(value => {
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
    FindApi.addVideoComment({
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

  function onLoadMore() {
    getCommentList(false)
  }

  const flexCompleted = getCurrentTimePercentage() * 100;
  const flexRemaining = (1 - getCurrentTimePercentage()) * 100;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.fullScreen} onPress={() => {
        setPaused((current) => !current)
      }}>
        <Video source={require('./broadchurch.mp4')}
               style={styles.fullScreen}
               rate={rate}
               paused={paused}
               volume={volume}
               muted={muted}
               resizeMode={resizeMode}
               onLoad={onLoad}
               onProgress={onProgress}
               onEnd={() => {
                 console.log('Done!')
               }}
               controls={true}
               repeat={true}/>
      </TouchableOpacity>

      <View style={styles.controls}>
        <View style={styles.generalControls}>
          <View style={styles.rateControl}>
            {renderRateControl(0.25)}
            {renderRateControl(0.5)}
            {renderRateControl(1.0)}
            {renderRateControl(1.5)}
            {renderRateControl(2.0)}
          </View>

          <View style={styles.volumeControl}>
            {renderVolumeControl(0.5)}
            {renderVolumeControl(1)}
            {renderVolumeControl(1.5)}
          </View>

          <View style={styles.resizeModeControl}>
            {renderResizeModeControl('cover')}
            {renderResizeModeControl('contain')}
            {renderResizeModeControl('stretch')}
          </View>
        </View>

        <View style={styles.trackingControls}>
          <View style={styles.progress}>
            <View style={[styles.innerProgressCompleted, {flex: flexCompleted}]}/>
            <View style={[styles.innerProgressRemaining, {flex: flexRemaining}]}/>
          </View>
        </View>
      </View>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: "transparent",
    borderRadius: 5,
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 4,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: "white",
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
  trackingControls: {},
  bottom_wrapper: {
    position: "absolute",
    bottom: 10,
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

export default VideoDetailScreen;
