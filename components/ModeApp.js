import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

const ModeApp = (props) => {
  const { icon, text, onPress } = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row justify-center items-center border-gray-100 border bg-white rounded-2xl py-4 px-10 my-1`}
    >
      <View className="text-black">{icon}</View>
      <Text className="text-black mx-2">{text}</Text>
    </TouchableOpacity>
  );
};

export default ModeApp;
