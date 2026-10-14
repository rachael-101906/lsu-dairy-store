import { BackButton } from "@/components/BackButton";
import { images } from "@/constants/images";
import { useFlavorById } from "@/services/useFlavors";
import { useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { icons } from "../../constants/icons";

export default function FlavorPage({
  isFavorite,
  onLikedPress,
}: ItemDetailsProps) {
  const { id } = useLocalSearchParams();
  const { flavor, isLoading, error } = useFlavorById(id as string);

  const makeCall = () => {
    const phoneNumber = "12255784392";
    const url = `tel:${phoneNumber}`;
    const success = Linking.canOpenURL(url);
    if (!success) {
      console.error("Unable to open phone dialer");
      return;
    }

    Linking.openURL(url).catch((err) =>
      console.error("Error opening phone dialer:", err),
    );
  };

  if (error) {
    console.error("Error fetching flavor:", error);
  }

  return (
    <>
      <View className="flex-1 bg-secondary">
        {isLoading ? (
          <View className="flex flex-col items-center justify-center top-auto">
            <ActivityIndicator
              size="large"
              color="black"
              className="justify-center items-center"
            />
            <Text className="text-black mt-2 text-center align-middle">
              Loading...
            </Text>
          </View>
        ) : null}

        {error ? (
          <>
            <BackButton />
            <View className="mt-40 justify-center items-center">
              <Image
                source={images.sadCow}
                className="w-60 h-60 mx-auto mt-5 items-center rounded-full p-5 bg-primary"
              />
              <Text className="text-2xl text-black font-normal text-center mb-5 mt-20 mx-10">
                Oh no! Something went wrong. Please retry.
              </Text>
              <Text className="text-xl text-gray-600 font-normal text-center mb-5 mt-20">
                Error: {error}
              </Text>
            </View>
          </>
        ) : null}

        {!isLoading && !error && flavor && (
          <View className="justify-center items-center">
            <BackButton />
            <View className="flex-1 justify-center items-center mt-[300px]">
              <View className="flex items-center justify-center gap-5">
                <Image
                  source={flavor.image ? { uri: flavor.image } : images.sadCow}
                  className="w-[250px] h-[250px] mx-auto mt-5 items-center rounded-full p-5 bg-primary/30"
                />
                {/* Flavor and Favorite Button */}
                <View className="items-start py-3">
                  <View className="flex items-center justify-center gap-5">
                    <FavoriteDetails
                      product={flavor}
                      isFavorite={isFavorite}
                      onLikedPress={onLikedPress}
                    />
                    <SpeechBubble flavor={flavor} makeCall={makeCall} />
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </>
  );
}

export function FavoriteDetails({
  product,
  isFavorite,
  onLikedPress,
}: ItemDetailsProps) {
  return (
    <TouchableOpacity
      className="absolute z-10 bg-primary/20 rounded-full py-2 px-3"
      onPress={() => onLikedPress(product)}
    >
      <Image
        source={isFavorite ? icons.heartFilled : icons.heart}
        className="w-5 h-5"
      />
    </TouchableOpacity>
  );
}

export function SpeechBubble({
  flavor,
  makeCall,
}: {
  flavor: any;
  makeCall: () => void;
}) {
  return (
    <View className="bg-white w-[400px] h-fit p-[24px] items-center rounded-lg shadow-md gap-y-5">
      <Text className="text-primary font-extrabold text-[50px] text-center mt-10">
        {flavor.flavor}
      </Text>

      <Text className="text-black font-normal text-sm text-center leading-5 px-10">
        {flavor.description}
      </Text>

      <View className="flex flex-col items-center gap-y-5 w-full">
        <TouchableOpacity
          className="h-10 w-full px-10 rounded-full items-center justify-center bg-primary"
          onPress={makeCall}
        >
          <Text className="text-light text-center align-middle font-bold">
            Call for more info
          </Text>
        </TouchableOpacity>

        <View className="w-0 h-0 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-l-[20px] border-l-white self-start -mt-10 ml-10" />
      </View>
    </View>
  );
}
