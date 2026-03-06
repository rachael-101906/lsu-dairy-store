import { ImageBackground, ScrollView, View } from "react-native";
import { images } from "../../constants/images";

export default function Home() {
  return (
    <View className="flex-1 justify-center items-center">
      <ImageBackground
        source={images.indexBackground}
        className="absolute w-full h-full mt-2"
      />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      />
    </View>
  );
}
