import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { icons } from "../constants/icons";
import { images } from "../constants/images";

export default function StoreCard({
  product,
  isFavorite,
  onLikedPress,
}: StoreCardProps) {
  return (
    /* Outermost View for the Card */
    <View className="items-start py-3">
      {/* Start of View for the Card */}
      <View className="bg-white w-[200px] h-[320px] rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-black overflow-hidden">
        {/* Heart Icon in the Top Right Corner */}
        <TouchableOpacity
          className="absolute top-4 right-4 z-10 bg-primary/20 rounded-full py-2 px-3"
          onPress={() => onLikedPress(product)}
        >
          <Image
            source={isFavorite ? icons.heartFilled : icons.heart}
            className="w-5 h-5"
          />
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 items-center"
          onPress={() => router.push(`/flavor/${product.id}`)}
        >
          {/* Inner View for the Title of Flavor and Picture */}
          <View className="w-full h-full pt-6 px-3 pb-3 items-center flex-1">
            {/* Flavor Picture */}
            <View className="w-32 h-32 mb-3">
              <Image
                source={
                  product.available ? { uri: product.image } : images.sadCow
                }
                className={`w-full h-full ${!product.available && "rounded-full bg-primary-20 p-2"}`}
                resizeMode="contain"
              ></Image>
            </View>

            {/* Title and Description of Flavor */}
            <Text
              className="text-primary font-extrabold text-2xl text-center"
              numberOfLines={2}
            >
              {product.flavor}
            </Text>
            <Text
              className="text-black font-normal text-sm text-center leading-5 p-3"
              numberOfLines={4}
            >
              {product.available
                ? product.description
                : "Sorry, this product is currently unavailable."}
            </Text>
            <View className=" w-full mt-auto">
              <View className="h-10 justify-center items-center bg-primary rounded-full border border-black">
                <Text className="text-black text-sm font-medium text-center">
                  View More Details
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
