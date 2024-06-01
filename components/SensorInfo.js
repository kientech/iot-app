import { View, Text, Image } from "react-native";
import React from "react";

const SensorInfo = (props) => {
  const { title, source, value } = props;
  return (
    <View className='border border-gray-200 bg-white rounded-2xl w-full flex-1 mx-1'>
      <Image className='mx-auto my-2' source={source} />
      <View>
        <Text className='text-center py-2 font-semibold'>{title}</Text>
        <Text className='text-center pb-4 font-bold'>{value}</Text>
      </View>
    </View>
  );
};

export default SensorInfo;
