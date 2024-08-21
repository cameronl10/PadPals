import React, { useRef } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
  Animated,
  StatusBar,
  Platform,
  Dimensions,
} from "react-native";
import { Button } from "@/components/ui/button";
import { Stack, Link, router } from "expo-router";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { OnboardingCarousel } from "@/components/ui/onboarding-carousel";
import { Paginator } from "@/components/ui/paginator";

import onboardingSlides from "./onboardingSlides";

const LandingPage = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const { width } = Dimensions.get("window");

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ header: () => null }} />
      <View style={[styles.backgroundContainer, { flex: 1 }]}>
        <ImageBackground
          source={require("@/assets/images/padpals-image.png")}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.6)", "transparent", "transparent"]}
            style={styles.linearGradient}
          />
        </ImageBackground>

        <View style={styles.whiteSpace} />
      </View>

      <SafeAreaView style={styles.overlay}>
        <Image
          source={require("@/assets/images/padpals-logo.svg")}
          style={styles.logo}
          contentFit="contain"
        />
        <View style={styles.carouselImage}>
          <FlatList
            data={onboardingSlides}
            renderItem={({ item }) => <OnboardingCarousel item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
            pagingEnabled={true}
            snapToInterval={width}
            decelerationRate={0.8}
            overScrollMode="never"
            disableIntervalMomentum
          />
        </View>
        <Paginator data={onboardingSlides} scrollX={scrollX} />
        <Button
          variant="default"
          title="Get Started"
          onPress={() => {
            router.push("/getStarted");
          }}
        />
        <Link style={styles.loginText} href={{ pathname: "logIn" }}>
          Log In
        </Link>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },
  backgroundContainer: {
    flex: 1,
  },
  imageBackground: {
    width: "100%",
    height: "80%",
    flex: 3,
  },
  whiteSpace: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0)",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  logo: {
    width: "35%",
    height: 100,
    marginTop: 10,
    marginBottom: 15,
    flex: 0.1,
  },
  carouselImage: {
    flex: 1,
    height: "auto",
    width: "auto",
    paddingBottom: 5,
    paddingLeft: 0,
    paddingRight: 0,
  },
  loginText: {
    paddingTop: 20,
    flex: 0.1,
  },
  linearGradient: {
    width: "100%",
    height: "100%",
  },
});

export default LandingPage;
