import PointsCard from "@/components/PointsCard";
import { useAuth } from "@/context/authContext";
import { db } from "@/services/firebase";
import { router } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/Header";
import { icons } from "../../constants/icons";
import { images } from "../../constants/images";

export default function Home() {
  const [points, setPoints] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await getDoc(doc(db, "users", user?.uid));
        if (response.exists()) {
          setPoints(response.data().points || 0);
        }
      } catch (error) {
        console.error("Error fetching points:", error);
      }
    };
    fetchPoints();
  }, [user, points]);

  return (
    <>
      <Header />
      <View className="flex-1 justify-center items-center">
        <ImageBackground
          source={images.indexBackground}
          className="absolute w-full h-full mt-2"
          resizeMode="cover"
        />
        <View className="w-40 h-40 absolute top-20 z-10 mb-10">
          <Image
            className="w-full h-full"
            source={images.dairyStoreLogo}
            resizeMode="contain"
          />
        </View>

        {/* ScrollView for the Rewards Card, Filters, and Upcoming Events (this marks the start of the overapping white card */}
        <ScrollView
          className="w-full bg-white rounded-t-[80px] px-2 mt-[170px] mb-[85px]"
          showsVerticalScrollIndicator={false}
        >
          <View className="px-4">
            <PointsCard />

            {/* ScrollView for the Filters */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="w-full"
            >
              <View className="justify-between flex-row gap-6 mt-4 px-4">
                {["FAQs", "Invite", "History", "Location"].map((category) => (
                  <TouchableOpacity
                    key={category}
                    className="h-10 w-fit px-10 rounded-full items-center justify-center bg-primary/30 border border-black/20"
                    onPress={() => alert(`${category} filter coming soon!`)}
                  >
                    <Text className="text-black text-center align-middle font-normal">
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            {/* TouchableOpacity for the Flavor Card that redirects to the Store Tab */}
            <TouchableOpacity
              className="w-full mt-5 mb-5 aspect-[200/90] px-6 items-center justify-center"
              onPress={() => router.push("/store")}
            >
              <Image
                source={images.flavorCard}
                className="w-full h-full rounded-[100px]"
                resizeMode="contain"
              />
            </TouchableOpacity>

            <View className="flex-col gap-x-2 items-center justify-center">
              <Text className="text-black text-lg font-extrabold text-center">
                Upcoming Events
              </Text>
              <View className="flex-row items-center gap-x-9 justify-center">
                <Image source={icons.backArrow} className="w-10 h-10" />
                <Image
                  source={images.eventPlaceholder}
                  resizeMode="stretch"
                  className="w-70 h-100 mt-2 mb-5"
                />
                <Image source={icons.forwardArrow} className="w-10 h-10" />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
