import { icons } from "@/constants/icons";
import { useNavigation } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";

export function BackButton() {
  const navigation = useNavigation();

  return (
    <View className="w-[50px] h-[50px] absolute top-10 left-4">
      <TouchableOpacity
        className="w-full h-full top-10 left-4 bg-primary rounded-full justify-center items-center"
        onPress={() => navigation.goBack()}
      >
        <Image
          source={icons.backArrow}
          className="w-full h-full z-10 px-[10px] py-[10px]"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}
