import { BackButton } from "@/components/BackButton";
import { images } from "@/constants/images";
import { useAuth } from "@/context/authContext";
import { Octicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
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

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsDisabled(!email || !password);
  }, [email, password]);

  const handleLogin = async () => {
    if (isDisabled) {
      alert("Please enter both email and password.");
      return;
    }
    try {
      setLoading(true);
      await login(email, password);
      console.log("User account created & signed in!");
      router.push("/");
    } catch (error) {
      alert(
        (error as Error).message ||
          "An error occurred during login. Please try again.",
      );
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async () => {
    try {
      setLoading(true);
      await login("admin@gmail.com", "puppy!");
    } catch (error) {
      alert(
        (error as Error).message ||
          "An error occurred during admin login. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
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
          Login
        </Text>

        <View className="flex-1 mt-10 px-4 relative gap-6">
          <KeyboardAvoidingView behavior="padding">
            {/* Email Input */}
            <View className="flex-row items-center h-[70px] w-full px-6 border border-black rounded-full">
              <Octicons name="mail" size={20} color="gray" />
              <TextInput
                className="flex-1 h-full ml-4 bg-transparent"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                textContentType="emailAddress"
                importantForAutofill="yes"
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
                autoComplete="current-password"
                textContentType="password"
                importantForAutofill="yes"
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
          </KeyboardAvoidingView>

          <View className="gap-4">
            <View className="items-end">
              <Link href="/forgotPassword">
                <Text className="text-primary font-bold text-sm mt-6 border-b border-primary">
                  Forgot Password?
                </Text>
              </Link>
            </View>

            <View className="flex-1">
              <TouchableOpacity
                className={`h-[60px] w-fit rounded-full items-center justify-center ${isDisabled ? "bg-primary/50" : "bg-primary"}`}
                onPress={handleLogin}
              >
                <Text className="text-white text-center font-bold text-lg">
                  {loading ? "Logging in..." : "Continue"}
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex-1">
              <TouchableOpacity
                className="h-[60px] w-fit rounded-full items-center justify-center border border-gray mt-4"
                onPress={handleAdminLogin}
              >
                <View className="flex-row gap-5 items-center">
                  <Text className="text-gray-500 text-center font-bold text-lg">
                    Login as Admin
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
