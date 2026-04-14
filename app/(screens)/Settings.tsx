import { BackButton } from "@/components/BackButton";
import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../context/authContext";

export default function Settings() {
  const { user, logout } = useAuth();
  return (
    <View className="h-full">
      <View className="z-10">
        <BackButton />
      </View>
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold">Settings</Text>
        <TouchableOpacity
          className="mt-4 px-4 py-2 bg-blue-500 rounded"
          onPress={() => {
            user && logout();
          }}
        >
          <Text className="text-white">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
