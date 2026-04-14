import { BackButton } from "@/components/BackButton";
import { images } from "@/constants/images";
import { useAuth } from "@/context/authContext";
import { Octicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ForgotPassword() {
  const router = useRouter();
  const { forgottenPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      alert("Please enter your email address.");
      return;
    }
    try {
      setLoading(true);
      const response = await forgottenPassword(email);
      console.log("Password reset email sent!", response);
      alert("A password reset link has been sent to your email.");
      router.push("/login");
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View className="h-full">
      <View className="z-10">
        <BackButton />
      </View>
      <View className="flex-col items-center justify-center gap-6 w-full h-full px-4">
        <View className="mt-20">
          <View className="w-[200px] h-[200px] bg-primary rounded-full items-center">
            <Image
              source={images.cowLock}
              className="w-full h-full items-center z-10 p-5 ml-5"
              resizeMode="contain"
            />
          </View>
        </View>

        <Text className="text-black text-[30px] font-extrabold mt-10 px-6">
          Forgot Password
        </Text>
        <Text className="text-black text-[20px] font-normal mt-10 px-6 text-center">
          Please enter in your email address and we will send you a link to
          reset your password.
        </Text>

        {/* Email Input */}
        <View className="flex-row items-center h-[70px] w-full px-6 border border-black rounded-full">
          <Octicons name="mail" size={20} color="gray" />
          <TextInput
            className="flex-1 h-full ml-4 bg-transparent"
            placeholder="Enter your recovery email"
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
        <View className="flex-row items-center justify-center w-full mt-4">
          <TouchableOpacity
            className="h-[70px] w-full bg-primary rounded-full items-center justify-center"
            onPress={handleForgotPassword}
            disabled={loading}
          >
            <Text className="text-white text-lg font-bold">
              {loading ? "Sending..." : "Send Reset Link"}
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center justify-center w-full mt-4">
          <Link href="/login">
            <Text className="text-gray-500 text-lg font-normal">
              Back to login
            </Text>
          </Link>
        </View>

        <View className="flex-1 mt-10 px-4 relative gap-6 w-full">
          <KeyboardAvoidingView behavior="padding"></KeyboardAvoidingView>
        </View>
      </View>
    </View>
  );
}
