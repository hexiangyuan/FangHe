import { ActivityIndicator, ActivityIndicatorProps } from "react-native";
import React from "react";
import { Colors } from "../../theme/Theme";

export const LoadingView = (props: ActivityIndicatorProps) => <ActivityIndicator color={Colors.primary} {...props} />;
