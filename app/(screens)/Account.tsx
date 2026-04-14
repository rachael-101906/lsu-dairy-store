import { BackButton } from "@/components/BackButton";
import { Text, View } from "react-native";

export default function Settings() {
  return (
    <View className="h-full">
      <View className="z-10">
        <BackButton />
      </View>
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold">Account</Text>
      </View>
    </View>
  );
}
