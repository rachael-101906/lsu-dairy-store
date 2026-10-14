import { Stack, useRouter } from "expo-router";
import React from "react";
import { AuthProvider, useAuth } from "../context/authContext";
import "./globals.css";

function InitialLayout() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect once auth state is known. Hooks must run unconditionally,
  // so we call `useRouter` and `useEffect` before returning early.
  React.useEffect(() => {
    if (loading) return;
    if (user) {
      router.replace("/");
    } else {
      router.replace("/intro");
    }
  }, [loading, user, router]);

  if (loading) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Register screens unconditionally so the router can resolve them */}
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(screens)" />
      <Stack.Screen name="flavor/[id]" />
      <Stack.Screen name="(auth)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}
