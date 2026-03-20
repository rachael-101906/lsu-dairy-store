import { BackButton } from "@/components/BackButton";
import { images } from "@/constants/images";
import { useAuth } from "@/context/authContext";
import { Octicons } from "@expo/vector-icons";
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
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <View className="h-full">
      <View className="z-10">
        <BackButton />
      </View>
      <View className="flex-col items-center justify-center gap-6 w-full h-full px-4">
        <View className="w-[200px] h-[200px] bg-primary rounded-full items-center justify-center">
          <Image
            source={images.cowLock}
            className="w-full h-full absolute top-[147px] left-[5px] right-5 z-10"
            resizeMode="contain"
          />
        </View>

        <Text className="text-black text-[30px] font-extrabold mt-10 px-6">
          Forgot Password
        </Text>

        <View className="flex-1 mt-10 px-4 relative gap-6 w-full">
          <KeyboardAvoidingView behavior="padding">
            {/* Email Input */}
            <View className="flex-row items-center h-[70px] w-full px-6 border border-black rounded-full">
              <TextInput
                className="flex-1 h-full ml-4"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            {/* Password Input */}
            <View className="flex-row items-center h-[70px] w-full px-6 border border-black rounded-full mt-4">
              <TextInput
                className="flex-1 h-full ml-4"
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword((prev) => !prev)}
              >
                <Octicons
                  name={showPassword ? "eye" : "eye-closed"}
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </View>
  );
}
