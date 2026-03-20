import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "intro",
};

export default function AuthLayout() {
  return (
    <Stack
      initialRouteName="intro"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="intro" options={{ headerShown: false }} />
      <Stack.Screen name="registerForm" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
    </Stack>
  );
}
