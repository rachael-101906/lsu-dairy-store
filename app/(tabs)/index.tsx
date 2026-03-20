import { Link, router } from "expo-router";
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
            <View className="items-start mt-4">
              {/* Start of View for the Rewards Individual Card */}
              <View className="bg-white w-full h-[170px] rounded-[50px] shadow-gray-950 shadow-2xl border border-gray-400 overflow-hidden mt-2">
                {/* Row for Rewards Balance and Rewards Info*/}
                <View className="flex flex-row justify-between">
                  {/* Text for Rewards and Rewards Balance */}
                  <View className="flex flex-col items-start px-10 py-5">
                    <View className="flex-row">
                      <Text className="text-primary font-extrabold text-2xl">
                        335
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
                  <Image
                    source={icons.rewardHalfFilled}
                    className="w-10 h-20"
                  />
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
          </View>

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
        </ScrollView>
      </View>
    </>
  );
}
