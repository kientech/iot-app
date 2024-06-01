import { View, Text, Switch, Image } from "react-native";
import React from "react";

const ButtonSwitch = (props) => {
  const { source, title, state, thumbColor, onValueChange, value } = props;
  return (
    <View className='my-1 bg-[#f6f6f6] rounded-2xl p-5'>
      <View class="">
        <View className="w-16 h-16 bg-[#fff] rounded-full flex justify-center items-center">
          <Image source={source} />
        </View>
        <Text className=" py-2 text-left text-3xl font-bold">{title}</Text>
        <View className="flex-row items-center justify-between mt-3">
          <Text className="font-bold text-xl">{state}</Text>
          <Switch
            thumbColor={thumbColor}
            onValueChange={onValueChange}
            value={value}
          />
        </View>
      </View>
    </View>
  );
};

export default ButtonSwitch;
