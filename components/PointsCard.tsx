import { useAuth } from "@/context/authContext";
import { couponGeneration } from "@/services/couponService";
import { db } from "@/services/firebase";
import { Link } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { icons } from "../constants/icons";
import { images } from "../constants/images";

export default function PointsCard() {
  const [points, setPoints] = useState(0);
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  // Fetch points from Firestore on component mount and whenever user or points change
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
  }, [user]);

  // Check if points have reached or exceeded 1000 and generate coupon if so
  useEffect(() => {
    const generateCoupon = async () => {
      try {
        if (points >= 1000) {
          await couponGeneration(user?.uid || "", "active", "", "", new Date());
          alert(
            "Congratulations! You've earned a coupon for a FREE scoop of ice cream! Check your rewards for details.",
          );
        }
      } catch (error) {
        console.error("Error generating coupon:", error);
      }
    };
    generateCoupon();
  }, [points]);

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
            <Link href="/rewards">
              <View className="hover:bg-gray-200">
                <Text className="text-primary font-bold text-sm mt-6 border-b border-primary right-10">
                  Rewards Info
                </Text>
              </View>
            </Link>
          </View>
          {/* Reward Progress Bar */}
          <View className="flex-row items-center justify-center gap-x-2">
            <Image source={icons.rewardFill} className="w-10 h-20 m-1" />
            <Image
              source={images.rewardLineGray}
              className="w-5 h-1"
              resizeMode="contain"
            />
            <Image source={icons.rewardHalfFilled} className="w-10 h-20" />
            <Image
              source={images.rewardLineGray}
              className="w-5 h-1"
              resizeMode="contain"
            />
            <Image source={icons.rewardUnfilled} className="w-10 h-20" />
            <Image
              source={images.rewardLineGray}
              className="w-5 h-1"
              resizeMode="contain"
            />
            <Image source={icons.rewardUnfilled} className="w-10 h-20" />
            <Image
              source={images.rewardLineGray}
              className="w-5 h-1"
              resizeMode="contain"
            />
            <Image source={icons.rewardUnfilled} className="w-10 h-20" />
          </View>
        </View>
      </View>
    </>
  );
}
