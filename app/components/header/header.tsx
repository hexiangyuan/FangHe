import React from "react";
import { View, ViewStyle, TextStyle } from "react-native";
import { HeaderProps } from "./header.props";
import { Button } from "../button/button";
import { Text } from "../text/text";
import { Icon } from "../icon/icon";
import { spacing } from "../../theme";
import { translate } from "../../i18n/";
import { RootNavigation } from "../../navigation";

// static styles
const ROOT: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing[4],
  alignItems: "center",
  paddingTop: spacing[3],
  paddingBottom: spacing[3],
  justifyContent: "flex-start"
};
const TITLE: TextStyle = {
  textAlign: "center",
  color: "#333",
  fontSize: 18,
  fontWeight: "bold"
};
const TITLE_MIDDLE: ViewStyle = {
  flex: 1,
  justifyContent: "center"
};
const LEFT: ViewStyle = { width: 32 };
const RIGHT: ViewStyle = { width: 32 };

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export function Header(props: HeaderProps) {
  const {
    onLeftPress = () => {
      RootNavigation.goBack();
    },
    onRightPress,
    rightIcon,
    leftIcon = "back",
    headerText,
    headerTx,
    style,
    titleStyle
  } = props;
  const header = headerText || (headerTx && translate(headerTx)) || "";

  return (
    <View style={{ ...ROOT, ...style }}>
      {leftIcon ? (
        <Button
          style={{
            width: 32,
            height: 32
          }}
          preset="link"
          onPress={onLeftPress}
        >
          <Icon
            icon={leftIcon}
            style={{
              width: 21,
              height: 21
            }}
            containerStyle={{
              width: 32,
              height: 32,
              justifyContent: "center",
              alignItems: "center"
            }}
          />
        </Button>
      ) : (
        <View style={LEFT} />
      )}
      <View style={TITLE_MIDDLE}>
        <Text style={{ ...TITLE, ...titleStyle }} text={header} />
      </View>
      {rightIcon ? (
        <Button preset="link" onPress={onRightPress}>
          <Icon
            style={{
              width: 24,
              height: 24
            }}
            icon={rightIcon}
          />
        </Button>
      ) : (
        <View style={RIGHT} />
      )}
    </View>
  );
}
