import { BackButton } from "@/components/BackButton";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Register() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isStudent, setIsStudent] = useState<boolean | null>(null);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (firstName && lastName && isStudent !== null) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [firstName, lastName, isStudent]);

  const handleNext = async () => {
    try {
      setLoading(true);
      if (disabled) {
        alert("Please fill out all fields and select an option.");
        return;
      }
      console.log(
        "Name: ",
        firstName + " " + lastName + " Is Student: " + isStudent,
      );
      await router.push({
        pathname: "/register",
        params: {
          firstName,
          lastName,
          isStudent: isStudent ? "true" : "false",
        },
      });
    } catch (error) {
      alert(
        (error as Error).message ||
          "An error occurred during registration. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOption = (option: string) => {
    if (option === "Yes") {
      setIsStudent(true);
    } else {
      setIsStudent(false);
    }
  };

  return (
    <View className="flex-1 h-full align-center">
      <View className="z-10">
        <BackButton />
      </View>

      <Image source={images.counterStore} className="w-full h-[280px]" />
      <Image
        source={images.cowOverBorder}
        className="w-[200px] h-[200px] absolute top-[147px] left-[5px] right-5 z-10"
        resizeMode="contain"
      />

      <ScrollView
        className="flex-1 mt-10 px-4 relative gap-6"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Text className="text-black text-[30px] font-extrabold mt-10 px-6 items-center">
          Welcome to the Dairy Store App!
        </Text>
        <Text className="text-gray text-[20px] font-light mt-10 px-6 items-center">
          We have just a few questions before you join LSU&apos;s iconic sweet
          treat spot. Please fill out the information below.
        </Text>

        <View className="flex-1 mt-10 px-4 relative gap-6">
          <KeyboardAvoidingView behavior="padding">
            <TextInput
              className="h-[70px] w-fit px-10 rounded-full items-center justify-center border border-gray"
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize="none"
              autoComplete="name"
              keyboardType="default"
              placeholderTextColor="#999"
            />
            <TextInput
              className="h-[70px] w-fit px-10 rounded-full items-center justify-center border border-gray mt-4"
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              autoCapitalize="none"
              autoComplete="family-name"
              keyboardType="default"
              placeholderTextColor="#999"
            />
          </KeyboardAvoidingView>

          <View className="gap-4">
            <View className="flex-1">
              <Text className="text-black text-xl">
                {" "}
                Are you an LSU student?{" "}
              </Text>
            </View>

            <View className="flex-row justify-between items-center gap-10 my-6">
              {["Yes", "No"].map((option) => {
                const isSelected =
                  (option === "Yes" && isStudent === true) ||
                  (option === "No" && isStudent === false);

                return (
                  <TouchableOpacity
                    key={option}
                    className={`h-[60px] flex-1 rounded-full border border-black items-center justify-center ${
                      isSelected ? "bg-secondary" : "bg-transparent"
                    }`}
                    onPress={() => handleOption(option)}
                  >
                    <View className="flex-1 justify-center items-center">
                      <Text className="text-black text-center font-bold text-lg">
                        {option}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View>
              <TouchableOpacity
                className={`h-[60px] w-fit rounded-full items-center justify-center border-black ${disabled ? "bg-primary/50" : "bg-primary"}`}
                onPress={handleNext}
              >
                <Text className="text-white text-center font-bold text-lg">
                  {loading ? "Please wait" : "Next"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
