import StoreCard from "@/components/StoreCard";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SearchBar from "../../components/SearchBar";
import { icons } from "../../constants/icons";
import { images } from "../../constants/images";
import { useFlavors } from "../../services/useFlavors";

const Store = () => {
  const router = useRouter();
  const { products, isLoading, error } = useFlavors();

  return (
    <View className="flex-1 justify-center items-center bg-white">
      {isLoading ? (
        <View className="flex flex-col items-center justify-center top-auto">
          <ActivityIndicator size="large" color="black" />
          <Text className="text-black mt-2 justify-items-center align-middle">
            Loading...
          </Text>
        </View>
      ) : error ? (
        <>
          <Image
            source={images.sadCow}
            className="w-60 h-60 mx-auto mt-5 items-center rounded-full p-5 bg-primary/30"
          ></Image>
          <Text className="text-2xl text-black font-normal text-center mb-5 mt-20 mx-10">
            Oh no! Something went wrong. Please retry.
          </Text>
          <Text className="text-xl text-gray-600 font-normal text-center mb-5 mt-20">
            Error: {error}
          </Text>
        </>
      ) : (
        <>
          <Image
            source={images.iceCreamBackground}
            className="w-full min-h-40 mb-5 z-0"
          ></Image>
          <View className="flex-row justify-between items-center px-5 absolute top-12 left-5 right-2 z-10">
            <Text className="text-2xl text-secondary font-bold mt-5 mb-3 z-10 border-b-2 border-primary stroke-white">
              Good morning, Rachael!
            </Text>
            <View className="flex-row gap-4">
              <Image source={icons.account} className="w-10 h-10" />
              <Image source={icons.settings} className="w-10 h-10" />
            </View>
          </View>
          <Image
            source={images.happyCow}
            className={
              "w-[200px] h-[200px] absolute top-[90px] left-[5px] right-5 z-10"
            }
            resizeMode="contain"
          ></Image>

          <View className="flex-row items-center justify-between px-10">
            <SearchBar
              placeHolder="Search for a cool flavor MOOOOO"
              onPress={() => router.push("/")}
            />
            <Image source={icons.filter} className="w-10 h-10" />
          </View>
          <View className="flex-row items-center justify-between px-10 mt-5 mb-5">
            <TouchableOpacity className="flex-1 h-10 w-full bg-primary rounded-full">
              <Text className="text-black text-center font-bold">Popular</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 h-10 w-full">
              <Text>Ice Cream</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 h-10 w-full">
              <Text>Meat</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            className="mb-20"
            data={products}
            keyExtractor={(item: any) => item.id}
            scrollEnabled={true}
            numColumns={2}
            contentContainerStyle={{
              justifyContent: "center",
              paddingBottom: 5,
            }}
            columnWrapperStyle={{ gap: 5 }}
            renderItem={({ item }) => <StoreCard product={item} />}
          />
        </>
      )}
    </View>
  );
};

export default Store;
