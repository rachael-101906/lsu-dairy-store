import { addPoints, saveReceipt } from "@/services/receiptService";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Scan({ userId }: { userId: string }) {
  const [image, setImage] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<Receipt | null>(null);

  const captureReceipt = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Camera access is required to scan receipts.");
      return;
    } else if (permissionResult.granted === null) {
      alert("Camera permission is required to scan receipts.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      base64: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const localBase64 = result.assets[0].base64;

      if (localBase64) {
        setBase64Image(localBase64);
        await processReceipt(localBase64);
      } else {
        return;
      }
    } else {
      return;
    }
  };

  const processReceipt = async (localBase64: string) => {
    if (!localBase64) return;

    setScanning(true);
    setScanResult(null);

    try {
      const apiUrl = process.env.EXPO_PUBLIC_CLAUDE_API_URL;
      if (!apiUrl) {
        throw new Error("Missing EXPO_PUBLIC_CLAUDE_API_URL");
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiUrl || "",
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "image",
                  source: {
                    type: "base64",
                    media_type: "image/jpeg",
                    data: localBase64,
                  },
                },
                {
                  type: "text",
                  text: `analyze the receipt and extract the following information from top to bottom in a structured JSON format:
                      - "Date": Date of purchase
                      - "Time": Time of purchase
                      - "Transaction #": Transaction number or receipt ID, usually four digits. Return field as receiptId.
                      - "Cashier Name": LSU Dairy Store 2, but return as just LSU Dairy Store. Return field as storeName. 
                      - "Subtotal": Total amount as a number only, do not include final total with tax
                      - "Valid": If the receipt was void or not completed, return false here. If the receipt is valid and completed, return true.
                      - "error" : If the receipt is too blurry or cannot be processed, return an error message here instead of the other fields or null if it is valid

                    Return the information in a structured JSON format with no explanation and no markdown. 
                    The information might be a little difficult to see because the ends of the paper get cut off in the reciept printer. 
                    For example, instead of Date at the top, it might say "ate" or "ubtotal" instead of "Subtotal". 
                    Use your best judgement to determine what the text is most likely supposed to say based on the context and location on the receipt. 
                    If you cannot find a field, return null for that field. 
                    If you cannot find the transaction number or receipt ID, generate a random 4 digit number for the "Transaction #" field.
                    Return these fields as lowercase in the JSON response. For example, return "date" instead of "Date".`,
                },
              ],
            },
          ],
        }),
      });

      const result = await response.json();
      const extractedData = result.content[0].text;
      const scanResult = JSON.parse(extractedData);
      setScanResult(scanResult);

      if (scanResult.valid === true) {
        await saveReceiptData(scanResult);
        await addPoints(userId, scanResult.subtotal);
      }
    } catch (error) {
      alert(
        (error as Error).message ||
          "An error occurred while processing the receipt. Please try again.",
      );
    } finally {
      setScanning(false);
    }
  };

  const saveReceiptData = async (scanResult: Receipt) => {
    try {
      await saveReceipt(
        userId,
        scanResult.storeName,
        scanResult.date,
        scanResult.valid,
        scanResult.subtotal,
        scanResult.receiptId,
        scanResult.time,
        scanResult.error,
      );
    } catch (error) {
      alert(
        (error as Error).message ||
          "An error occurred while saving the receipt. Please try again.",
      );
    }
  };
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold">Scan</Text>
      <TouchableOpacity
        className="mt-4 px-4 py-2 font-normal bg-primary rounded"
        onPress={captureReceipt}
      >
        <Text className="text-white text-lg">Start Scanning</Text>
      </TouchableOpacity>
      {image && (
        <View className="mt-4 items-center justify-center">
          <Text className="text-lg font-medium">Captured Receipt:</Text>
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        </View>
      )}
    </View>
  );
}
