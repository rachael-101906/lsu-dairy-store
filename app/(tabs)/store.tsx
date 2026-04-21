import Header from "@/components/Header";
import StoreCard from "@/components/StoreCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SearchBar from "../../components/SearchBar";
import { icons } from "../../constants/icons";
import { images } from "../../constants/images";
import { useFlavors } from "../../services/useFlavors";

const chunkArray = (arr: any[], size: number): any[][] => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

const Store = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const params = useLocalSearchParams();
  const { products, isLoading, error } = useFlavors();
  const [activeFilter, setActiveFilter] = useState<string>("");
  const [isFavorite, setIsFavorite] = useState<string[]>([]);

  const handleFilterPress = (category: string) => {
    setActiveFilter(category);
  };

  const handleLikedProduct = useCallback((product: Product) => {
    setIsFavorite((prev) => {
      if (prev.some((id) => id === product.id)) {
        console.log("removing from favorites: ", product.id);
        alert("Removed from favorites");
        return prev.filter((id) => id !== product.id);
      } else {
        console.log("adding to favorites: ", product.id);
        alert("Added to favorites");
        return [...prev, product.id];
      }
    });
  }, []);

  const loadFavorites = useCallback(async () => {
    try {
      const favorites = await AsyncStorage.getItem("favorites");
      if (favorites) {
        setIsFavorite(JSON.parse(favorites));
      }
    } catch (error: any) {
      console.error("Error loading favorites: ", error.message);
      alert(error.message);
    }
  }, []);

  const saveFavorites = useCallback(async () => {
    try {
      await AsyncStorage.setItem("favorites", JSON.stringify(isFavorite));
    } catch (error: any) {
      console.error("Error saving favorites: ", error.message);
      alert(error.message);
    }
  }, [isFavorite]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  useEffect(() => {
    saveFavorites();
  }, [isFavorite, saveFavorites]);

  const favoriteIds = useMemo(() => new Set(isFavorite), [isFavorite]);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (searchQuery.trim()) {
      filtered = filtered.filter((product) =>
        product.flavor?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (activeFilter === "Favorites") {
      filtered = filtered.filter((product) => favoriteIds.has(product.id));
    } else if (activeFilter === "Ice Cream") {
      filtered = filtered.filter((product) => product.type === "icecream");
    } else if (activeFilter === "Meat") {
      filtered = filtered.filter((product) => product.type === "meat");
    } else if (activeFilter === "Popular") {
      filtered = filtered.filter((product) => product.isPopular);
    }

    return filtered;
  }, [products, searchQuery, activeFilter, favoriteIds]);

  if (typeof params.filter === "string") {
    useEffect(() => {
      setActiveFilter(params.filter as string);
    }, [params.filter]);
  }

  const iceCreamProducts = filteredProducts.filter(
    (product) => product.type === "icecream",
  );
  const meatProducts = filteredProducts.filter(
    (product) => product.type === "meat",
  );

  const sections = [
    ...(iceCreamProducts.length > 0
      ? [
          {
            title: "Ice Cream",
            data: chunkArray(iceCreamProducts, 2),
          },
        ]
      : []),
    ...(meatProducts.length > 0
      ? [{ title: "Meat", data: chunkArray(meatProducts, 2) }]
      : []),
  ];

  const ListHeader = () => (
    <>
      <Header />
      <View pointerEvents="none">
        <Image
          source={images.iceCreamBackground}
          className="w-full mb-5 z-0 overflow-hidden"
        />
        <Image
          source={images.happyCow}
          className="w-[400px] h-[400px] absolute -top-[25px] left-[5px] right-[50px] z-10"
          resizeMode="contain"
        />
      </View>

      <View className="flex-row items-center justify-center px-10">
        <SearchBar
          placeHolder="Search for a cool flavor MOOOOO"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Image source={icons.filter} className="w-10 h-10" />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="w-full h-20"
      >
        <View className="justify-between flex-row gap-6 mt-4 px-4">
          {["Popular", "Ice Cream", "Meat", "Favorites"].map((category) => (
            <TouchableOpacity
              key={category}
              className={`h-10 w-fit px-10 rounded-full items-center justify-center ${activeFilter === category ? "bg-secondary" : "bg-primary"}`}
              onPress={() => handleFilterPress(category)}
            >
              <Text className="text-black text-center align-middle font-bold">
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );

  return (
    <View className="flex-1 bg-white">
      {isLoading && (
        <View className="flex flex-col items-center justify-center top-auto">
          <ActivityIndicator size="large" color="black" />
          <Text className="text-black mt-2 text-center align-middle">
            Loading...
          </Text>
        </View>
      )}

      {error && (
        <>
          <Image
            source={images.sadCow}
            className="w-60 h-60 mx-auto mt-5 items-center rounded-full p-5 bg-primary/30"
          />
          <Text className="text-2xl text-black font-normal text-center mb-5 mt-20 mx-10">
            Oh no! Something went wrong. Please retry.
          </Text>
          <Text className="text-xl text-gray-600 font-normal text-center mb-5 mt-20">
            Error: {error}
          </Text>
        </>
      )}

      {!isLoading && !error && (
        <View className="mb-[100px]">
          <SectionList
            className="w-full h-full"
            sections={sections}
            keyExtractor={(row: any[]) => row.map((item) => item.id).join("-")}
            ListHeaderComponent={<ListHeader />}
            renderSectionHeader={({ section }) => (
              <Text className="text-lg font-bold px-5 mt-3 mb-3 text-center">
                {section.title}
              </Text>
            )}
            renderItem={({ item: row }) => (
              <View className="flex-row justify-around mb-2">
                {row.map((item: any) => (
                  <StoreCard
                    key={item.id}
                    product={item}
                    isFavorite={isFavorite.includes(item.id)}
                    onLikedPress={handleLikedProduct}
                  />
                ))}
              </View>
            )}
            ListEmptyComponent={noProducts}
          />
        </View>
      )}
    </View>
  );
};

const noProducts = () => (
  <View className="w-full h-32 items-center justify-center mt-20 gap-4">
    <Text className="text-gray-500 text-3xl px-6 text-center">
      We&apos;re sorry, there are no products available in this category.
    </Text>
  </View>
);

export default Store;
