import { useAuth } from "@/context/authContext";
import { db } from "@/services/firebase";
import { router } from "expo-router";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { icons } from "../constants/icons";
import { images } from "../constants/images";

export default function PointsCard() {
  const [points, setPoints] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.uid) {
      return;
    }

    const pointsRef = doc(db, "users", user?.uid);
    const unsubscribe = onSnapshot(pointsRef, (snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.data();
        setPoints(userData.points || 0);
      }
    });
    return () => unsubscribe();
  }, [user]);

  if (!user || !user.uid) {
    return null;
  }

  return (
    <>
      <View className="items-start mt-4">
        {/* Start of View for the Rewards Individual Card */}
        <View className="bg-white w-full h-[170px] rounded-[50px] shadow-gray-950 shadow-2xl border border-gray-400 overflow-hidden mt-2">
          {/* Row for Rewards Balance and Rewards Info*/}
          <View className="flex flex-row justify-between">
            {/* Text for Rewards and Rewards Balance */}
            <View className="flex flex-col items-start px-10 py-5">
              <View className="flex-row">
                <Text className="text-primary font-extrabold text-2xl">
                  {points}
                </Text>
                <Text className="text-gray-400 font-extrabold text-2xl">
                  /1000
                </Text>
              </View>
              <Text className="text-gray-600 font-light text-sm">
                Rewards Balance
              </Text>
            </View>
            <TouchableOpacity onPress={() => router.push("/rewards")}>
              <Text className="text-primary hover:bg-primary/20 font-bold text-sm mt-6 border-b border-primary right-10">
                Rewards Info
              </Text>
            </TouchableOpacity>
          </View>
          {/* Reward Progress Bar */}
          <View className="flex-row items-center justify-center gap-x-2 m-1">
            {/* First Reward Icon */}
            {points >= 0 && points < 100 ? (
              <Image source={icons.rewardUnfilled} className="w-10 h-20" />
            ) : points >= 100 && points < 200 ? (
              <Image
                source={icons.rewardHalfFilled}
                className="w-10 h-20 m-1"
              />
            ) : points >= 200 ? (
              <Image source={icons.rewardFill} className="w-10 h-20" />
            ) : (
              <Image source={icons.rewardUnfilled} className="w-10 h-20" />
            )}

            <Image
              source={images.rewardLineGray}
              className="w-5 h-1"
              resizeMode="contain"
            />

            {/* Second Reward Icon */}
            {points >= 200 && points < 300 ? (
              <Image source={icons.rewardUnfilled} className="w-10 h-20" />
            ) : points >= 300 && points < 400 ? (
              <Image source={icons.rewardHalfFilled} className="w-10 h-20" />
            ) : points >= 400 ? (
              <Image source={icons.rewardFill} className="w-10 h-20" />
            ) : (
              <Image source={icons.rewardUnfilled} className="w-10 h-20" />
            )}

            <Image
              source={images.rewardLineGray}
              className="w-5 h-1"
              resizeMode="contain"
            />

            {/* Third Reward Icon */}
            {points >= 400 && points < 500 ? (
              <Image source={icons.rewardUnfilled} className="w-10 h-20" />
            ) : points >= 500 && points < 600 ? (
              <Image source={icons.rewardHalfFilled} className="w-10 h-20" />
            ) : points >= 600 ? (
              <Image source={icons.rewardFill} className="w-10 h-20" />
            ) : (
              <Image source={icons.rewardUnfilled} className="w-10 h-20" />
            )}

            <Image
              source={images.rewardLineGray}
              className="w-5 h-1"
              resizeMode="contain"
            />

            {/* Fourth Reward Icon */}
            {points >= 600 && points < 700 ? (
              <Image source={icons.rewardUnfilled} className="w-10 h-20" />
            ) : points >= 700 && points < 800 ? (
              <Image source={icons.rewardHalfFilled} className="w-10 h-20" />
            ) : points >= 800 ? (
              <Image source={icons.rewardFill} className="w-10 h-20" />
            ) : (
              <Image source={icons.rewardUnfilled} className="w-10 h-20" />
            )}

            <Image
              source={images.rewardLineGray}
              className="w-5 h-1"
              resizeMode="contain"
            />

            {/* Fifth Reward Icon */}
            {points >= 800 && points < 900 ? (
              <Image source={icons.rewardUnfilled} className="w-10 h-20" />
            ) : points >= 900 && points < 1000 ? (
              <Image source={icons.rewardHalfFilled} className="w-10 h-20" />
            ) : points >= 1000 ? (
              <Image source={icons.rewardFill} className="w-10 h-20" />
            ) : (
              <Image source={icons.rewardUnfilled} className="w-10 h-20" />
            )}
          </View>
        </View>
      </View>
    </>
  );
}
