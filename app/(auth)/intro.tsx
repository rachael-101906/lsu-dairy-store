import { images } from "@/constants/images";
import { Link, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Intro() {
  const router = useRouter();

  return (
    <>
      <View className="h-full">
        <ImageBackground
          source={images.introBackground}
          className="absolute w-full h-full"
          resizeMode="cover"
        />
        <View className="flex-1 items-center mt-10">
          <Image
            source={images.dairyStoreLogo}
            className="w-[400px] h-[400px]"
            resizeMode="contain"
          />
        </View>
        <View className="flex-col z-10 mb-[200px]">
          <Image
            source={images.layingCow}
            className="w-full h-[125px] items-center"
            resizeMode="contain"
          ></Image>

          <View className="flex-1 gap-6 px-4">
            <TouchableOpacity
              className="h-[60px] w-full rounded-full bg-primary justify-center items-center"
              onPress={() => router.push("/registerForm")}
            >
              <Text className="text-white text-center font-bold text-xl">
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center justify-center top-[70px] gap-2">
            <View className="hover:border-b hover:border-white px-2 py-1">
              <Text className="text-white font-bold text-lg z-10 px-2">
                Already have an account?
              </Text>
            </View>
            <View className="bg-secondary rounded-full px-2 py-1">
              <Link href="/login" className="text-black font-bold text-lg px-2">
                Login
              </Link>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
