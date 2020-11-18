import React from "react";
import { View } from "react-native";
import { Circle } from "react-native-animated-spinkit";

const LoadingAnimation = () => {
  return(
    <View>
      <Circle color="#E32F34" size={72} />
    </View>
  );
}

export default LoadingAnimation;