import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../context/authContext";
import "./globals.css";

export const unstable_settings = {
  anchor: "(tabs)",
};

function InitialLayout() {
  const { user, loading } = useAuth();

  if (loading) return null;
  user && console.log("User is logged in:", user);

  return (
    <Stack>
      <Stack.Protected guard={!!user}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!user}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
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
