import { useAuth } from "@/context/authContext";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Scan() {
  const { user } = useAuth();
  const [image, setImage] = useState<string | null>(null);

  const captureReceipt = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      throw new Error("Camera access is required to scan receipts.");
    }

    const result = await ImagePicker.launchCameraAsync({
      base64: true,
      quality: 0.8,
    });

    if (result.canceled) {
      return;
    }

    const firstAsset = result.assets[0];
    if (!firstAsset?.uri) {
      alert("No image was captured. Please try again.");
      return;
    }

    setImage(firstAsset.uri);
    await processReceipt();
  };

  const processReceipt = async () => {
    if (!user?.uid) {
      throw new Error("User not authenticated. Please log in and try again.");
    }

    throw new Error(
      "Receipt processing is disabled because this project has been archived.",
    );
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold">Scan</Text>
      <TouchableOpacity
        className="mt-4 rounded bg-primary px-4 py-2"
        onPress={captureReceipt}
      >
        <Text className="text-lg text-white">Start Scanning</Text>
      </TouchableOpacity>
      {image && (
        <View className="mt-4 items-center justify-center">
          <Text className="text-lg font-medium">Captured Receipt:</Text>
          <Image source={{ uri: image }} style={{ width: 200, height: 300 }} />
        </View>
      )}
      <Text className="mt-4 px-6 text-center text-gray-600">
        Receipt processing is disabled in this archived project.
      </Text>
    </View>
  );
}
