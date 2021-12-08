import React, { useState } from "react";
import { View, Text, Image, ImageSourcePropType, TouchableOpacity } from "react-native";
import { Colors } from "../../../theme/Theme";

const ModeItem = (props: {
  title: string;
  img: ImageSourcePropType;
  selected: boolean;
  pressed?: (title: string) => void;
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.pressed(props.title);
      }}
    >
      <View>
        <View
          style={{
            width: 60,
            height: 60,
            borderWidth: 2,
            borderRadius: 60,
            borderColor: props.selected ? Colors.primary : "transparent",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image
            source={props.img}
            style={{
              width: 48,
              height: 48
            }}
          />
        </View>
        <Text
          style={{
            textAlign: "center",
            marginTop: 12,
            color: props.selected ? Colors.primaryDark : "black"
          }}
        >
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const ModelAll = (props: { onModeChange: (index: number, title: string) => void }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  function selected(index: number, title: string) {
    setSelectedIndex(index);
    props.onModeChange(index, title);
  }

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <ModeItem
          title={"模式一"}
          img={require("../../../../assets/mode1_.png")}
          selected={selectedIndex === 0}
          pressed={title => {
            selected(0, title);
          }}
        />
        <ModeItem
          title={"模式二"}
          img={require("../../../../assets/mode2_.png")}
          selected={selectedIndex === 1}
          pressed={title => selected(1, title)}
        />
        <ModeItem
          title={"模式三"}
          img={require("../../../../assets/mode3_.png")}
          selected={selectedIndex === 2}
          pressed={title => selected(2, title)}
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 16 }}>
        <ModeItem
          title={"模式四"}
          img={require("../../../../assets/mode4_.png")}
          selected={selectedIndex === 3}
          pressed={title => selected(3, title)}
        />
        <ModeItem
          title={"模式五"}
          img={require("../../../../assets/mode5_.png")}
          selected={selectedIndex === 4}
          pressed={title => selected(4, title)}
        />
        <ModeItem
          title={"模式六"}
          img={require("../../../../assets/mode6_.png")}
          selected={selectedIndex === 5}
          pressed={title => selected(5, title)}
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 16 }}>
        <ModeItem
          title={"模式七"}
          img={require("../../../../assets/mode7_.png")}
          selected={selectedIndex === 6}
          pressed={title => selected(6, title)}
        />
        <ModeItem
          title={"模式八"}
          img={require("../../../../assets/mode8_.png")}
          selected={selectedIndex === 7}
          pressed={title => selected(7, title)}
        />
        <ModeItem
          title={"模式九"}
          img={require("../../../../assets/mode9_.png")}
          selected={selectedIndex === 8}
          pressed={title => selected(8, title)}
        />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 16 }}>
        <ModeItem
          title={"停止"}
          img={require("../../../../assets/mode3_.png")}
          selected={selectedIndex === 9}
          pressed={title => selected(9, title)}
        />
      </View>
    </View>
  );
};
