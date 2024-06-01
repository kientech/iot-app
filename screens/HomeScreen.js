import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useRef } from "react";
import {
  ArrowDownIcon,
  Bars3CenterLeftIcon,
  BoltIcon,
  LightBulbIcon,
} from "react-native-heroicons/solid";
import { storeColors } from "../theme";
import SensorInfo from "../components/SensorInfo";
import ModeApp from "../components/ModeApp";
import ButtonSwitch from "../components/ButtonSwitch";
import { useState } from "react";
import WebSocket from "react-native-websocket";

const SERVER_URL = "ws://192.168.1.2:8080";
const HomeScreen = () => {
  const [isSwitchEnableFan, setIsSwitchEnableFan] = useState(false);
  const [isSwitchEnableLed, setIsSwitchEnableLed] = useState(false);
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    humidity: 0,
  });
  const [onFan, setOnFan] = useState("Off");
  const [onLed, setOnLed] = useState("Off");
  const websocketRef = useRef(null);

  const onMessage = (event) => {
    const data = JSON.parse(event.data);
    setSensorData(data);
  };

  const handleOnError = (error) => {
    console.log("🚀 ~ handleOnError ~ error:", error);
  };

  const toggleSwitchFan = () => {
    if (websocketRef.current) {
      const message = {
        type: "fanControl",
        status: !isSwitchEnableFan ? "on" : "off",
      };
      websocketRef.current.send(JSON.stringify(message));
    }
    const newState = !isSwitchEnableFan;
    setIsSwitchEnableFan(newState);
    setOnFan(newState ? "On" : "Off");
  };

  const toggleSwitchLed = () => {
    if (websocketRef.current) {
      const message = {
        type: "ledControl",
        status: !isSwitchEnableLed ? "on" : "off",
      };
      websocketRef.current.send(JSON.stringify(message));
    }
    const newState = !isSwitchEnableLed;
    setIsSwitchEnableLed(newState);
    setOnLed(newState ? "On" : "Off");
  };

  return (
    <SafeAreaView>
      <View className="p-4">
        <View className="flex-row justify-between items-center">
          <Bars3CenterLeftIcon size={25} color={storeColors.textBlack} />
          <View className="flex-row justify-center items-center">
            <Text>My home</Text>
            <ArrowDownIcon size={15} color={storeColors.textBlack} />
          </View>
          <TouchableOpacity onPress={() => Alert.alert("Go to Profile Screen")}>
            <Image
              source={require("../assets/images/avatar.jpg")}
              className="w-8 h-8 rounded-full"
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <WebSocket ref={websocketRef} url={SERVER_URL} />

        <View className="mt-4 mx-4">
          <View className="flex-row item-center justify-between gap-2">
            <SensorInfo
              title="Temperature"
              source={require("../assets/icons/temperature.png")}
              value="0"
            />
            <SensorInfo
              title="Humidity"
              source={require("../assets/icons/humidity.png")}
              value="0"
            />
            <SensorInfo
              title="Co2"
              source={require("../assets/icons/cloud.png")}
              value="0"
            />
          </View>

          <View className="flex-row justify-between items-center flex-1 w-full mt-4">
            <View className="my-2">
              <ModeApp
                icon={<LightBulbIcon size={15} color={storeColors.textBlack} />}
                text="Light mode"
                onPress={() => Alert.alert(`Light mode`)}
              />
              <ModeApp
                icon={<LightBulbIcon size={15} color={storeColors.textBlack} />}
                text="Dark mode"
                onPress={() => Alert.alert(`Dark mode`)}
              />
            </View>

            <View className="my-2">
              <ModeApp
                icon={<LightBulbIcon size={15} color={storeColors.textBlack} />}
                text="Sunline mode"
              />
              <ModeApp
                icon={<LightBulbIcon size={15} color={storeColors.textBlack} />}
                text="Light mode"
              />
            </View>
          </View>

          <View className="my-6 rounded-2xl bg-blue-400">
            <View className="px-4 py-5">
              <TouchableOpacity className="flex-row items-center">
                <View className="bg-white p-3 rounded-full">
                  <BoltIcon />
                </View>
                <View className="ml-5">
                  <Text className="text-white font-bold py-1">2.45kWh</Text>
                  <Text className="text-white">Power usage today</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <View className="flex">
              <ButtonSwitch
                title="Fan"
                state={onFan}
                source={require("../assets/icons/fan.png")}
                value={isSwitchEnableFan}
                onValueChange={toggleSwitchFan}
              />
              <ButtonSwitch
                title="Light"
                state={onLed}
                source={require("../assets/icons/led.png")}
                value={isSwitchEnableLed}
                onValueChange={toggleSwitchLed}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
