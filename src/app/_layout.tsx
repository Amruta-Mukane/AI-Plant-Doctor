import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="camera" />
      <Stack.Screen name="history" />
      <Stack.Screen name="prediction" />
      <Stack.Screen name="treatment" />

      <Stack.Screen name="plants/apple" />
      <Stack.Screen name="plants/tomato" />
      <Stack.Screen name="plants/chilli" />
      <Stack.Screen name="plants/rose" />
    </Stack>
  );
}