import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { icons } from "../constants/icons";

const Header = () => {
  return (
    <View className="flex-row justify-center items-center absolute top-12 z-10 gap-10 w-full">
      <Text className="text-xl text-black font-bold mt-5 px-4 mb-3 z-10 bg-white rounded-full text-wrap py-1">
        Welcome back, User!
      </Text>
      <View className="flex-row gap-4">
        <TouchableOpacity onPress={() => alert("Favorites coming soon!")}>
          <Image
            source={icons.blackHeart}
            className="w-10 h-10 "
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert("Account coming soon!")}>
          <Image source={icons.account} className="w-10 h-10" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert("Settings coming soon!")}>
          <Image source={icons.settings} className="w-10 h-10" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
