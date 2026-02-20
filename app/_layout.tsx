import { Stack } from 'expo-router';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {

  return (
<<<<<<< Updated upstream
      <Stack>
      </Stack>
=======
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="store/[id]" options={{ headerShown: true }} />
    </Stack>
>>>>>>> Stashed changes
  );
}
