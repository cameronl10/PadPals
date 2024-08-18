import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SignUpContextProvider } from "@/hooks/useSignUpContext";
export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SignUpContextProvider>
        <Stack>
          <Stack.Screen name="index" />
          <Stack.Screen name="getStarted" options={{ headerShown: false }} />
          <Stack.Screen name="profileSetup" options={{ headerShown: false }} />
          <Stack.Screen name="loginPage" options={{ headerShown: false }} />
          <Stack.Screen name="createHouse" options={{ headerShown : false}}/>
        </Stack>
      </SignUpContextProvider>
    </QueryClientProvider>
  );
}
