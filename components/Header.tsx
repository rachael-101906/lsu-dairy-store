import { useAuth } from "@/context/authContext";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { icons } from "../constants/icons";

export default function Header() {
  const displayName = useAuth().displayName;
  const route = useRouter();

  return (
    <View className="flex-row justify-center items-center absolute top-12 z-10 gap-10 w-full">
      <Text className="text-xl text-black font-bold mt-5 px-4 mb-3 z-10 bg-white rounded-full text-wrap py-1">
        Hey there, {displayName}!
      </Text>
      <View className="flex-row gap-4">
        <TouchableOpacity onPress={() => route.push("/(tabs)/store")}>
          <Image
            source={icons.blackHeart}
            className="w-10 h-10 "
            resizeMode="contain"
          />
          s
        </TouchableOpacity>
        <TouchableOpacity onPress={() => route.push("/(screens)/Account")}>
          <Image source={icons.account} className="w-10 h-10" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => route.push("/(screens)/Settings")}>
          <Image source={icons.settings} className="w-10 h-10" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
