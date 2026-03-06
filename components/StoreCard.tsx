import { Link } from "expo-router";
import { useCallback, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { icons } from "../constants/icons";

const StoreCard = (props: ProductProps) => {
  const [isFavorite, setIsFavorite] = useState<Product[]>([]);

  const handleLikedProduct = useCallback(() => {
    setIsFavorite((prev) => {
      if (prev.includes(props.product.id)) {
        console.log("removing from favorites: ", props.product.id);
        alert("Removed from favorites");
        return prev.filter((id) => id !== props.product.id);
      } else {
        console.log("adding to favorites: ", props.product.id);
        alert("Added to favorites");
        return [...prev, props.product.id];
      }
    });
  }, []);

  return (
    <Link href={`/store/${props.product.id}`} asChild>
      {/* Outermost View for the Card */}
      <TouchableOpacity className="px-1/2 py-2 mt-2">
        {/* Start of View for the Card */}
        <View className="bg-white w-[200px] h-[320px] rounded-3xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-black mx-auto">
          {/* Heart Icon in the Top Right Corner */}
          <View className="absolute top-4 right-4 z-10">
            <View className="bg-primary/20 rounded-full py-2 px-3">
              {isFavorite.includes(props.product.id) ? (
                <TouchableOpacity onPress={handleLikedProduct}>
                  <Image source={icons.heartFilled} className="w-5 h-5" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={handleLikedProduct}>
                  <Image source={icons.heart} className="w-5 h-5" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Inner View for the Title of Flavor and Picture */}
          <View className="w-full h-full pt-6 px-3 pb-3 items-center flex-1">
            {/* Flavor Picture */}
            <View className="w-32 h-32 mb-3">
              <Image
                source={{
                  uri: props.product.image,
                }}
                className="w-full h-full"
                resizeMode="contain"
              ></Image>
            </View>

            {/* Title and Description of Flavor */}
            <Text
              className="text-primary font-extrabold text-2xl text-center"
              numberOfLines={2}
            >
              {props.product.flavor}
            </Text>
            <Text
              className="text-black font-normal text-sm text-center leading-5 p-3"
              numberOfLines={4}
            >
              {props.product.description}
            </Text>
            <View className="fixed w-full mt-auto">
              <View className="h-10 justify-center items-center bg-primary rounded-full border border-black">
                <Text className="text-black text-sm font-medium text-center">
                  View More Details
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default StoreCard;

///// Notes

// also have to create a useEffect if someone clicks on a flavor
// and then it will pull up the details of that flavor and then display it in a new screen
