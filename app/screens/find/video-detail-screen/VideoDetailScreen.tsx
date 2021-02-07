import React, {useState} from 'react';
import Video from 'react-native-video';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useLocalStore} from "mobx-react-lite";

const VideoDetailScreen = () => {

  const store = useLocalStore(() => ({}
  ))

  const [rate, setRate] = useState(1)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)
  const [resizeMode, setResizeMode] = useState('contain')
  const [duration, setDuration] = useState(0.0)
  const [currentTime, setCurrentTime] = useState(0.0)
  const [paused, setPaused] = useState(false)


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
    bottom: 20,
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
  trackingControls: {}
});

export default VideoDetailScreen;
