import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SignUpContextProvider } from "@/hooks/useSignUpContext";
import Colors from "@/styles/colors";

export default function RootLayout() {
  const queryClient = new QueryClient();
  const headerStyle = {
    headerTransparent: true,
    headerShown: true,
    headerTitleStyle: {
      fontSize: 0,
      color: Colors.PADPALS_WHITE // scuffed
    },
    headerBackTitleVisible: false,
    headerStyle: {
      backgroundColor: Colors.PADPALS_WHITE,
    },
    headerShadowVisible: false,
    headerTintColor: Colors.PADPALS_BLACK,
  }
  

  return (
    <QueryClientProvider client={queryClient}>
      <SignUpContextProvider>
        <Stack>
          <Stack.Screen name="index" />
          <Stack.Screen name="getStarted" options={headerStyle} />
          <Stack.Screen name="profileSetup" options={headerStyle} />
          <Stack.Screen name="loginPage" options={headerStyle} />
          <Stack.Screen name="createHouse" options={headerStyle} />
          <Stack.Screen name="(tabs)" options={{headerShown: false}} />
        </Stack>
      </SignUpContextProvider>
    </QueryClientProvider>
  );
}
