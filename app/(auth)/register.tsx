import { BackButton } from "@/components/BackButton";
import { images } from "@/constants/images";
import { useAuth } from "@/context/authContext";
import { saveUser } from "@/services/useMembers";
import { Octicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
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
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function Register() {
  const { register } = useAuth();
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { firstName, lastName, isStudent } = useLocalSearchParams();
  const isStudentBool = isStudent === "true" ? true : false;

  useEffect(() => {
    setIsDisabled(!isChecked || !email || !password || !confirmPassword);
  }, [isChecked, email, password, confirmPassword]);

  const handleRegister = async () => {
    if (isDisabled) {
      alert("Please fill in all fields and agree to the terms and conditions.");
      return;
    }

    try {
      setLoading(true);
      const response = await register(
        email,
        password,
        confirmPassword,
        firstName as string,
      );
      await saveUser(
        response.user.uid,
        email,
        firstName as string,
        lastName as string,
        isStudentBool,
      );
      console.log("Registration successful!", response);
      router.push("/");
    } catch (error) {
      alert(
        (error as Error).message ||
          "An error occurred during registration. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
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
        <Text className="text-black text-[30px] font-extrabold mt-10 px-6">
          Register
        </Text>

        <View className="flex-1 mt-10 px-4 relative gap-6">
          <KeyboardAvoidingView behavior="padding">
            <View className="flex-row items-center h-[70px] w-full px-6 border border-black rounded-full">
              <Octicons name="mail" size={20} color="gray" />
              <TextInput
                className="flex-1 h-full ml-4 bg-transparent"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoComplete="email"
                keyboardType="email-address"
                textContentType="emailAddress"
                placeholderTextColor="#999"
              />
            </View>

            {/* Password Input */}
            <View className="flex-row items-center h-[70px] w-full px-6 border border-black rounded-full mt-4">
              <Octicons name="lock" size={20} color="gray" />
              <TextInput
                className="flex-1 h-full ml-4 bg-transparent"
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                autoComplete="password"
                textContentType="password"
                placeholderTextColor="#999"
              />
              <TouchableOpacity onPress={handleTogglePasswordVisibility}>
                <Octicons
                  name={showPassword ? "eye" : "eye-closed"}
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
            {/* Confirm Password Input */}
            <View className="flex-row items-center h-[70px] w-full px-6 border border-black rounded-full mt-4">
              <Octicons name="lock" size={20} color="gray" />
              <TextInput
                className="flex-1 h-full ml-4 bg-transparent"
                placeholder="Confirm password"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                autoCapitalize="none"
                autoComplete="password"
                textContentType="password"
                placeholderTextColor="#999"
              />
              <TouchableOpacity onPress={handleToggleConfirmPasswordVisibility}>
                <Octicons
                  name={showConfirmPassword ? "eye" : "eye-closed"}
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
          <View className="gap-2">
            <View className="flex-row items-center justify-center">
              <BouncyCheckbox
                size={25}
                fillColor="#E2A9F1"
                unFillColor="#FFFFFF"
                text="By using the LSU Dairy Store App, you acknowledge that you have read, understood, and agreed to these Terms and Conditions of the LSU Dairy Store."
                innerIconStyle={{
                  borderWidth: 4,
                }}
                iconStyle={{ borderColor: "black" }}
                textStyle={{
                  color: "black",
                  fontSize: 13,
                  fontWeight: "500",
                  marginLeft: 8,
                  textDecorationLine: "none",
                }}
                onPress={(isChecked: boolean) => {
                  setIsChecked(isChecked);

                  console.log(
                    "Checkbox is " + (isChecked ? "checked" : "unchecked"),
                  );
                }}
              />
            </View>
            <View className="flex-row items-center justify-center mt-2">
              <View className="flex-row gap-2 border-b border-gray-300">
                <Octicons name="link" size={16} color="gray" />
                <Text className="text-gray-600 font-normal text-sm">
                  {" "}
                  View Terms and Conditions{" "}
                </Text>
              </View>
            </View>
          </View>

          <View className="gap-4">
            <View className="flex-1">
              <TouchableOpacity
                className={`h-[60px] w-fit rounded-full items-center justify-center bg-primary ${isDisabled ? "bg-primary/50" : "bg-primary"}`}
                onPress={handleRegister}
              >
                <Text className="text-white text-center font-bold text-lg">
                  {loading ? "Signing up..." : "Continue"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
